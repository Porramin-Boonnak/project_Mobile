import { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

const palette = {
  bg: "#0b0f14",
  cardUp: "#fef3c7",
  cardDown: "#111827",
  text: "#e5e7eb",
  textDark: "#111827",
  border: "#2a3342",
  success: "#16a34a"
};

const pickN = (arr, n) => {
  const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}
  return a.slice(0,n);
};
const shuffle = (a)=>{const arr=[...a];for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr}

export default function MatchingGame({ route, navigation }) {
  const { index } = route.params;
  const col = useSelector(s => s.collection.collection[index]);
  const data = col?.data ?? [];

  const sample = useMemo(()=>pickN(data, Math.min(4, data.length)), [data]);
  const cards = useMemo(()=>{
    const pairCards = sample.flatMap((x, i) => ([
      { id:`f${i}`, key:i, type:'front', text:x.front },
      { id:`b${i}`, key:i, type:'back',  text:x.back  }
    ]));
    return shuffle(pairCards);
  }, [sample]);

  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const tap = (id) => {
    if (flipped.includes(id)) return;
    if (flipped.length === 2) return;
    const now = [...flipped, id];
    setFlipped(now);
    if (now.length === 2) {
      const [a, b] = now.map(x => cards.find(c => c.id === x));
      const ok = a.key === b.key && a.type !== b.type;
      setTimeout(() => {
        if (ok) setMatched(m => [...m, a.key]);
        setFlipped([]);
      }, 500);
    }
  };
  const allDone = matched.length === sample.length;

  return (
    <View style={{ flex:1, padding:16, alignItems:'center', backgroundColor: palette.bg }}>
      <Text style={{ fontSize:18, marginBottom:12, color: palette.text }}>จับคู่ความหมายให้ถูกต้อง</Text>
      <View style={{ flexDirection:'row', flexWrap:'wrap', justifyContent:'center', gap:12 }}>
        {cards.map(c => {
          const isFaceUp = flipped.includes(c.id) || matched.includes(c.key);
          return (
            <TouchableOpacity
              key={c.id}
              onPress={() => tap(c.id)}
              disabled={matched.includes(c.key)}
              style={{
                width:'40%', aspectRatio:1.2, borderRadius:16,
                justifyContent:'center', alignItems:'center',
                backgroundColor: isFaceUp ? palette.cardUp : palette.cardDown,
                borderWidth:1, borderColor:palette.border, margin:6, paddingHorizontal:8
              }}
            >
              <Text style={{ color: isFaceUp ? palette.textDark : '#fff', fontSize:18, textAlign:'center' }}>
                {isFaceUp ? c.text : '●'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {allDone && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginTop:16, backgroundColor:palette.success, padding:12, borderRadius:10 }}
        >
          <Text style={{ color:'#fff' }}>เสร็จแล้ว กลับ</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
