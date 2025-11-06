import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { insertincorrect } from "./store/collectionSlice";

const QUESTION_TIME_MS = 15000;
const TRANSITION_DELAY = 800;

const shuffle = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const palette = {
  bg: "#0b0f14",
  panel: "#111827",
  soft: "#1f2937",
  text: "#e5e7eb",
  sub: "#9ca3af",
  border: "#2a3342",
  correct: "#16a34a",
  wrong: "#ef4444",
  bar: "#4ade80",
  neutral: "#1f2937",
};

export default function SpeedMode({ route, navigation }) {
  const { index } = route.params;
  const dispatch = useDispatch();
  const col = useSelector((s) => s.collection.collection[index]);
  const name = col?.name ?? "";
  const data = col?.data ?? [];

  const [current, setCurrent] = useState(0);
  const [bgOn, setBgOn] = useState(false);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const incorrectRef = useRef([]);
  const barAnim = useRef(new Animated.Value(1)).current;

  const shuffled = useMemo(() => shuffle(data), [data]);
  const currentQ = shuffled[current];

  const buildChoices = (ans) => {
    let pool = data.filter((x) => x.back !== ans).map((x) => x.back);
    while (pool.length < 5) pool = pool.concat(pool);
    return shuffle([ans, ...shuffle(pool).slice(0, 5)]);
  };
  const choices = useMemo(
    () => (currentQ ? buildChoices(currentQ.back) : []),
    [currentQ]
  );

  const startTimer = () => {
    barAnim.setValue(1);
    Animated.timing(barAnim, {
      toValue: 0,
      duration: QUESTION_TIME_MS,
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) handleAnswer("__TIMEOUT__");
    });
  };

  useEffect(() => {
    if (!currentQ) return;
    setLocked(false);
    setBgOn(false);
    startTimer();
  }, [currentQ]);

  useEffect(() => {
    if (current >= shuffled.length && shuffled.length) {
      dispatch(insertincorrect({ name, incorrect: incorrectRef.current }));
      incorrectRef.current = [];
      navigation.replace("Result", { index, index });
    }
  }, [current, shuffled.length, name, dispatch, navigation, index, score]);

  const handleAnswer = (picked) => {
    if (!currentQ || locked) return;
    setLocked(true);
    const isCorrect = picked === currentQ.back;
    if (!isCorrect) {
      incorrectRef.current.push(currentQ.front);
      setStreak(0);
    } else {
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setScore((s) => s + 10 + Math.min(nextStreak - 1, 5));
    }
    setBgOn(true);
    setTimeout(() => {
      setBgOn(false);
      setCurrent((c) => c + 1);
    }, TRANSITION_DELAY);
  };

  if (!currentQ) return null;

  const barWidth = barAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={{ flex: 1, backgroundColor: palette.bg }}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: 12,
          backgroundColor: palette.panel,
          borderBottomWidth: 1,
          borderColor: palette.border,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 18, color: palette.text }}>Score: {score}</Text>
          <Text style={{ fontSize: 18, color: palette.text }}>
            Streak: {streak}🔥
          </Text>
          <Text style={{ fontSize: 18, color: palette.sub }}>
            {current + 1}/{shuffled.length}
          </Text>
        </View>
        <View
          style={{
            height: 8,
            backgroundColor: palette.soft,
            borderRadius: 4,
            overflow: "hidden",
            marginTop: 10,
            borderWidth: 1,
            borderColor: palette.border,
          }}
        >
          <Animated.View
            style={{
              height: "100%",
              width: barWidth,
              backgroundColor: palette.bar,
            }}
          />
        </View>
      </View>

      <Card front={currentQ.front} back={currentQ.back} />

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          flex: 1,
          padding: 20,
          gap: 18,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {choices.map((ch, i) => {
          const bg = bgOn
            ? currentQ.back === ch
              ? palette.correct
              : palette.wrong
            : palette.soft;
        return (
            <TouchableOpacity
              key={i}
              onPress={() => handleAnswer(ch)}
              activeOpacity={0.9}
              style={{
                backgroundColor: bg,
                borderWidth: 1,
                borderColor: palette.border,
                width: "28%",
                height: "40%",
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
                shadowColor: "#000",
                shadowOpacity: 0.25,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 6 },
                elevation: 4,
                paddingHorizontal: 8,
              }}
            >
              <Text style={{ fontSize: 16, textAlign: "center", color: "#fff" }}>
                {ch}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
