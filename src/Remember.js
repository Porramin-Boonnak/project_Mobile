import { Text, TouchableOpacity, View, Animated } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native';
import Card from './Card';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useState, useRef, useMemo, useEffect } from 'react';

const palette = {
  bg: "#0b0f14",
  ring: "#1f2937",
  border: "#2a3342",
  icon: "#e5e7eb",
};

export default function Remember({ route, navigation }) {
  const { index } = route.params;
  const [current, setcurrent] = useState(0)
  const [next, setnext] = useState(false)
  const collection = useSelector((state) => state.collection.collection[index]?.data)
  const shuffle = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  const shufflecollection = useMemo(() => shuffle(collection), [collection]);
  const cardRef = useRef(null);
  useEffect(() => {
    if (!shufflecollection?.[current]) {
      navigation.navigate('Main');
    }
  }, [shufflecollection, current, navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: palette.bg }}>
      <Card front={shufflecollection[current]?.front} back={shufflecollection[current]?.back} ref={cardRef} />
      {!next ?
        <View style={{ flexDirection: "row", flex: 1, padding: 20, alignItems: "center", justifyContent: "space-around" }}>
          <TouchableOpacity onPress={() => { cardRef.current?.flipCard(); setnext(true) }} style={{ width: 120, height: 120, borderWidth: 1, borderColor: palette.border, backgroundColor: palette.ring, borderRadius: 60, justifyContent: "center", alignItems: "center" }}>
            <FontAwesome6 name="x" size={50} color={palette.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { cardRef.current?.flipCard(); setnext(true) }} style={{ width: 120, height: 120, borderWidth: 1, borderColor: palette.border, backgroundColor: palette.ring, borderRadius: 60, justifyContent: "center", alignItems: "center" }}>
            <FontAwesome6 name="check" size={50} color={palette.icon} />
          </TouchableOpacity>
        </View>
        :
        <View style={{ flexDirection: "row", flex: 1, padding: 20, alignItems: "center", justifyContent: "space-around" }}>
          <TouchableOpacity onPress={() => { cardRef.current?.flipCard(); setcurrent(current + 1); setnext(false) }} style={{ width: 120, height: 120, borderWidth: 1, borderColor: palette.border, backgroundColor: palette.ring, borderRadius: 60, justifyContent: "center", alignItems: "center" }}>
            <Entypo name="arrow-bold-right" size={50} color={palette.icon} />
          </TouchableOpacity>
        </View>}
    </View>
  )
}
