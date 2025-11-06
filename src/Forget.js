import { ImageBackground, View, Text, TouchableOpacity, Alert } from "react-native";
import CustomInput from "../src/components/CustomInput";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
const bg = { uri: "https://i.ibb.co/C1L3wSC/13186366-5125962.jpg" };

const palette = {
  bg: "#0b0f14",
  panel: "#111827",
  input: "#1f2937",
  text: "#e5e7eb",
  sub: "#9ca3af",
  primary: "#3b82f6",
  border: "#2a3342",
};

export default function Forget({ navigation }) {
  const [email, setEmail] = useState("");
  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "ส่งลิงก์รีเซ็ตรหัสผ่านไปที่อีเมลแล้ว");
      setEmail("");
    } catch (error) {
      console.log(error);
      Alert.alert("ผิดพลาด", error.message);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.bg }}>
      <ImageBackground
        source={bg}
        style={{
          flex: 1,
          opacity: 0.25,
        }}
      />
      <View
        style={{
          position: "absolute",
          inset: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "88%",
            paddingVertical: 28,
            backgroundColor: palette.panel,
            borderRadius: 28,
            alignItems: "center",
            borderWidth: 1,
            borderColor: palette.border,
            shadowColor: "#000",
            shadowOpacity: 0.35,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 12 },
            elevation: 8,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: "700",
              color: palette.text,
              marginBottom: 12,
            }}
          >
            Password Recovery
          </Text>
          <Text style={{ color: palette.sub, marginBottom: 20 }}>
            กรอกอีเมลเพื่อรับลิงก์รีเซ็ตรหัสผ่าน
          </Text>

          <View style={{ width: "100%", alignItems: "center", gap: 16, paddingHorizontal: 20 }}>
            <CustomInput
              placeholder={"Email"}
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={palette.sub}
              styleOverride={{
                backgroundColor: palette.input,
                color: palette.text,
                borderColor: palette.border,
                borderWidth: 1,
                height: 52,
                borderRadius: 14,
                paddingHorizontal: 16,
              }}
            />
            <TouchableOpacity
              onPress={handleResetPassword}
              style={{
                width: "100%",
                height: 52,
                backgroundColor: palette.primary,
                borderRadius: 14,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 4,
                shadowColor: "#000",
                shadowOpacity: 0.3,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 8 },
                elevation: 5,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#fff" }}>Send Link</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.goBack?.()}
              style={{
                width: "100%",
                height: 50,
                borderRadius: 14,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: palette.border,
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 16, color: palette.text, fontWeight: "600" }}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
