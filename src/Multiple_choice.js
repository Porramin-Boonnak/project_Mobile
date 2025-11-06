import { Text, TouchableOpacity, View, Animated } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Card from './Card';
import { useSelector } from 'react-redux'
import { insertincorrect } from "./store/collectionSlice";
import { useDispatch } from 'react-redux'
import { useState, useRef, useEffect, useMemo } from 'react';

const palette = {
  bg: "#0b0f14",
  text: "#e5e7eb",
  sub: "#9ca3af",
  correct: "#16a34a",
  wrong: "#ef4444",
  neutral: "#1f2937",
  border: "#2a3342"
};

export default function Multiple_choice({ route, navigation }) {
  const { index } = route.params;
  const dispatch = useDispatch()
  const [current, setcurrent] = useState(0)
  const [withtime, setwithtime] = useState(false)
  const [backgroundColor, setbackgroundColor] = useState(false)
  const collection = useSelector((state) => state.collection.collection[index]?.data)
  const name = useSelector((state) => state.collection.collection[index].name)
  const incorrect = useRef([])
  const cardRef = useRef(null);
  const shuffle = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  const shufflecollection = useMemo(() => shuffle(collection), [collection]);
  const choice = (ans) => {
    let allchoice = []
    collection.map(item => { if (item.back !== ans) { allchoice.push(item.back) } })
    while (allchoice.length < 5) {
      collection.map(item => { if (item.back !== ans) { allchoice.push(item.back) } })
    }
    allchoice = shuffle(allchoice)
    let sixchoice = [ans]
    for (let i = 0; i < 5; i++) { sixchoice.push(allchoice[i]) }
    sixchoice = shuffle(sixchoice)
    return sixchoice
  }
  const choices = useMemo(() => {
    const q = shufflecollection?.[current];
    if (!q) return [];
    return choice(q.back);
  }, [current, shufflecollection]);
  useEffect(() => {
    if (!shufflecollection?.[current]) {
      dispatch(insertincorrect({name:name,incorrect:incorrect.current}))
      navigation.replace('MistakesReview', { index: index });
    }
  }, [shufflecollection, current, navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: palette.bg }}>
      {< Card front={shufflecollection[current]?.front} back={shufflecollection[current]?.back} ref={cardRef} />}
      <View style={{ flexDirection: "row", flexWrap: 'wrap', flex: 1, padding: 20, gap: 18, justifyContent: "center" }}>
        {(choices?.map((item, idx) => {
          const handelclick = (back) => {
            if (!withtime) {
              if(back!==shufflecollection[current]?.back) {
                incorrect.current.push(shufflecollection[current].front)
              }
              setbackgroundColor(true)
              setwithtime(true)
              setTimeout(() => {
                setwithtime(false)
                setcurrent(prev => prev + 1);
                setbackgroundColor(false);
              }, 2000);
            }
          }
          const isCorrect = shufflecollection[current]?.back == item;
          return (
            <TouchableOpacity
              onPress={()=>handelclick(item)}
              key={idx}
              style={{
                backgroundColor: backgroundColor ? (isCorrect ? palette.correct : palette.wrong) : palette.neutral,
                borderWidth: 1, borderColor: palette.border,
                width: "28%", height: "40%", borderRadius: 16,
                justifyContent: "center", alignItems: 'center',
                shadowColor:"#000", shadowOpacity:0.25, shadowRadius:10, shadowOffset:{width:0,height:6}, elevation:4,
                paddingHorizontal: 8
              }}>
              <Text style={{ fontSize: 16, color: "#fff", textAlign: "center" }}>{item}</Text>
            </TouchableOpacity>
          )
        })
        )}
      </View>
    </View>
  )
}
