import { Text, TouchableOpacity, View, Animated } from 'react-native';
import { useState, useRef, forwardRef, useImperativeHandle } from 'react';

const Card = forwardRef(({ front, back }, ref) => {
  const rotation = useRef(new Animated.Value(0)).current;
  const [flipped, setFlipped] = useState(false);
  const frontrotate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });
  const backrotate = rotation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const flipToFront = () => {
    Animated.spring(rotation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const flipToBack = () => {
    Animated.spring(rotation, {
      toValue: 180,
      useNativeDriver: true,
    }).start();
  };
  const flipCard = () => {
    flipped ? flipToFront() : flipToBack();
    setFlipped(!flipped);
  };
  useImperativeHandle(ref, () => ({
    flipCard,
  }));
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity >
        <View style={{ width: 300, height: 400 }}>
          <Animated.View
            style={{
              justifyContent: 'center', alignItems: 'center', backgroundColor: 'red', height: 400, width: 300, borderRadius: 10, position: 'absolute',
              transform: [{ rotateY: frontrotate }],
              zIndex: flipped ? 0 : 1, backfaceVisibility: 'hidden',
            }}
          >
            <Text style={{ fontSize: 20 }}>{front}</Text>
          </Animated.View>
          <Animated.View
            style={{
              justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue', height: 400, width: 300, borderRadius: 10, position: 'absolute',
              transform: [{ rotateY: backrotate }],
              zIndex: flipped ? 1 : 0, backfaceVisibility: 'hidden',
            }}
          >
            <Text style={{ fontSize: 20 }}>{back}</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
)
export default Card;
