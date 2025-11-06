import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import styles from "./components/styles";
import { useSelector } from "react-redux";

const palette = {
  bg: "#0b0f14",
  panel: "#111827",
  soft: "#1f2937",
  text: "#e5e7eb",
  sub: "#9ca3af",
  border: "#2a3342",
  danger: "#ef4444",
  primary: "#3b82f6",
};

export default function Result({ route, navigation }) {
  const { index } = route.params;
  const incorrect = useSelector(
    (state) => state.collection.collection[index]?.incorrect
  );

  return (
    <View style={{ flex: 1, backgroundColor: palette.bg }}>
      <View
        style={{
          paddingVertical: 16,
          paddingHorizontal: 20,
          borderBottomWidth: 1,
          borderColor: palette.border,
          backgroundColor: palette.panel,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 6 },
          elevation: 4,
        }}
      >
        <Text
          style={{
            fontSize: 26,
            textAlign: "center",
            color: palette.text,
            fontWeight: "800",
            letterSpacing: 0.5,
          }}
        >
          Incorrect
        </Text>
        <Text style={{ textAlign: "center", color: palette.sub, marginTop: 4 }}>
          {incorrect?.length ?? 0} รายการที่ควรทบทวน
        </Text>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 16,
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        {incorrect?.map((item, i) => (
          <View
            key={i}
            style={{
              width: "96%",
              backgroundColor: palette.soft,
              borderRadius: 14,
              paddingVertical: 14,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: palette.border,
              marginVertical: 6,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 6 },
              elevation: 4,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: palette.text,
                fontWeight: "600",
              }}
            >
              {item}
            </Text>
          </View>
        ))}

        {!incorrect?.length && (
          <Text style={{ color: palette.sub, marginTop: 16 }}>
            ไม่มีคำที่ผิด 🎉
          </Text>
        )}
      </ScrollView>

      <View style={{ padding: 16 }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Main")}
          style={{
            alignSelf: "center",
            width: "96%",
            height: 52,
            borderRadius: 14,
            backgroundColor: palette.primary,
            justifyContent: "center",
            alignItems: "center",
            shadowColor: "#000",
            shadowOpacity: 0.25,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 8 },
            elevation: 5,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>
            Exit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
