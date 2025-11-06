import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Card from './Card';

const palette = {
  bg: "#0b0f14",
  text: "#e5e7eb",
  sub: "#9ca3af",
  border: "#2a3342",
  btn: "#1f2937",
  primary: "#3b82f6"
};

export default function MistakesReview({ route }) {
  const { index } = route.params;
  const col = useSelector(s => s.collection.collection[index]);
  const incorrectRaw = col?.incorrect ?? [];
  const data = col?.data ?? [];
  const incorrect = useMemo(() => {
    if (!Array.isArray(incorrectRaw)) return [];
    if (incorrectRaw.length && Array.isArray(incorrectRaw[0])) return incorrectRaw.flat();
    return incorrectRaw;
  }, [incorrectRaw]);
  const wrongCards = useMemo(() => {
    if (!incorrect.length) return [];
    const setWrong = new Set(incorrect);
    return data.filter(d => setWrong.has(d.front));
  }, [incorrect, data]);

  const [cur, setCur] = useState(0);
  const q = wrongCards[cur];

  if (!q) return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center', backgroundColor: palette.bg}}>
      <Text style={{ color: palette.text }}>ไม่มีคำที่ต้องทวน 🎉</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: palette.bg }}>
      <Card front={q.front} back={q.back} />
      <View style={{ padding: 20, gap: 12, flexDirection:'row', justifyContent:'space-between' }}>
        <TouchableOpacity onPress={() => setCur(c => Math.max(c-1,0))} style={{ paddingVertical:12, paddingHorizontal:16, borderWidth:1, borderRadius:10, borderColor:palette.border, backgroundColor: palette.btn }}>
          <Text style={{ color: palette.text }}>⬅️ ก่อนหน้า</Text>
        </TouchableOpacity>
        <Text style={{ color: palette.sub }}>{cur+1}/{wrongCards.length}</Text>
        <TouchableOpacity onPress={() => setCur(c => Math.min(c+1, wrongCards.length-1))} style={{ paddingVertical:12, paddingHorizontal:16, borderWidth:1, borderRadius:10, borderColor:palette.border, backgroundColor: palette.btn }}>
          <Text style={{ color: palette.text }}>ถัดไป ➡️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
