import { Text, TouchableOpacity, View, Animated } from 'react-native';
import { useState, useRef, forwardRef, useImperativeHandle } from 'react';

const palette = {
  face: "#111827",
  back: "#1f2937",
  text: "#e5e7eb",
  border: "#2a3342"
};

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
  useImperativeHandle(ref, () => ({ flipCard }));

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
      <TouchableOpacity activeOpacity={0.9}>
        <View style={{ width: 320, height: 420 }}>
          <Animated.View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: palette.face,
              height: 420, width: 320, borderRadius: 18, position: 'absolute',
              transform: [{ rotateY: frontrotate }],
              zIndex: flipped ? 0 : 1,
              backfaceVisibility: 'hidden',
              borderWidth: 1, borderColor: palette.border,
              shadowColor:"#000", shadowOpacity:0.35, shadowRadius:16, shadowOffset:{width:0,height:10}, elevation:7,
              paddingHorizontal: 18
            }}
          >
            <Text style={{ fontSize: 22, color: palette.text, textAlign: "center" }}>{front}</Text>
          </Animated.View>
          <Animated.View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: palette.back,
              height: 420, width: 320, borderRadius: 18, position: 'absolute',
              transform: [{ rotateY: backrotate }],
              zIndex: flipped ? 1 : 0,
              backfaceVisibility: 'hidden',
              borderWidth: 1, borderColor: palette.border,
              shadowColor:"#000", shadowOpacity:0.35, shadowRadius:16, shadowOffset:{width:0,height:10}, elevation:7,
              paddingHorizontal: 18
            }}
          >
            <Text style={{ fontSize: 22, color: palette.text, textAlign: "center" }}>{back}</Text>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
});
export default Card;
