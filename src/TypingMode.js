import React, { useMemo, useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, Keyboard } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { insertincorrect } from "./store/collectionSlice";
import Card from "./Card";

const palette = {
  bg: "#0b0f14",
  panel: "#111827",
  input: "#1f2937",
  text: "#e5e7eb",
  sub: "#9ca3af",
  border: "#2a3342",
  primary: "#3b82f6",
  correct: "#16a34a",
  wrong: "#dc2626",
};

const lev = (a = "", b = "") => {
  const dp = Array.from({ length: a.length + 1 }, (_, i) =>
    Array(b.length + 1).fill(0)
  );
  for (let i = 0; i <= a.length; i++) dp[i][0] = i;
  for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
  return dp[a.length][b.length];
};
const shuffle = (a) => {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

export default function TypingMode({ route, navigation }) {
  const { index } = route.params;
  const col = useSelector((s) => s.collection.collection[index]);
  const data = col?.data ?? [];
  const name = useSelector((s) => s.collection.collection[index].name);
  const [cur, setCur] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("idle");
  const [select, setselect] = useState(false);
  const incorrectRef = useRef([]);
  const dispatch = useDispatch();
  const list = useMemo(() => shuffle(data), [data]);
  const q = list[cur];
  useEffect(() => {
    setInput("");
    setResult("idle");
  }, [cur]);
  if (!q) return null;

  const submit = () => {
    if (!select) {
      setselect(true);
      const ans = (input || "").trim().toLowerCase();
      const correct = (q.back || "").trim().toLowerCase();
      const distance = lev(ans, correct);
      const ok = ans === correct;
      if (!ok) {
        incorrectRef.current.push(correct);
      }
      setResult(ok ? "correct" : "wrong");
      setTimeout(() => {
        if (cur + 1 < list.length) {
          setCur((c) => c + 1);
          setInput("");
          setselect(false);
        } else {
          dispatch(insertincorrect({ name: name, incorrect: incorrectRef.current }));
          navigation.replace("Result", { index: index });
        }
      }, 800);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.bg }}>
      <Card front={q.front} back={q.back} />
      <View style={{ marginTop: 24, gap: 12, paddingHorizontal: 16 }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="พิมพ์คำตอบ..."
          placeholderTextColor={palette.sub}
          style={{
            borderWidth: 1,
            borderColor: palette.border,
            borderRadius: 14,
            padding: 14,
            fontSize: 18,
            backgroundColor: palette.input,
            color: palette.text,
          }}
          onSubmitEditing={submit}
          returnKeyType="done"
          autoFocus
        />
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss();
            submit();
          }}
          style={{
            backgroundColor: palette.primary,
            padding: 14,
            borderRadius: 14,
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 6 },
            elevation: 4,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
            ตรวจคำตอบ
          </Text>
        </TouchableOpacity>

        {result !== "idle" && (
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: result === "correct" ? palette.correct : palette.wrong,
              marginTop: 4,
            }}
          >
            {result === "correct" ? "ถูกต้อง!" : `ผิด, คำตอบ: ${q.back}`}
          </Text>
        )}

        <Text style={{ textAlign: "center", marginTop: 6, color: palette.sub }}>
          {cur + 1}/{list.length}
        </Text>
      </View>
    </View>
  );
}
