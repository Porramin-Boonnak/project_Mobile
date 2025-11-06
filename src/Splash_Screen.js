import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addcollection } from "./store/collectionSlice";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";

const palette = {
  bg: "#0b0f14",
  text: "#e5e7eb",
  sub: "#9ca3af",
  border: "#2a3342",
  ring: "#1f2937",
};

export default function Splash_Screen({ navigation }) {
  const dispatch = useDispatch();
  const [login, setlogin] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const value = await AsyncStorage.getItem("collection");
        const expires = await AsyncStorage.getItem("session_expires_at");
        const email = await AsyncStorage.getItem("userEmail");
        const password = await AsyncStorage.getItem("userPassword");

        if (!expires) {
          if (JSON.parse(value) !== null) {
            for (let i = 0; i < JSON.parse(value).length; i++) {
              dispatch(addcollection(JSON.parse(value)[i]));
            }
          }
          navigation.replace("Login");
        } else {
          const expired = Date.now() > Number(expires);
          if (expired) {
            await AsyncStorage.multiRemove([
              "session_expires_at",
              "userEmail",
              "userPassword",
            ]);
            navigation.replace("Login");
          } else {
            setlogin(true);
            await signInWithEmailAndPassword(auth, email, password);
            const colRef = collection(db, "users", auth.currentUser.uid, "collection");
            const snapshot = await getDocs(colRef);
            const from_firebase = snapshot.docs.map((doc) => doc.data().items);
            for (let i = 0; i < from_firebase[0].length; i++) {
              dispatch(addcollection(from_firebase[0][i]));
            }
            navigation.replace("Main");
          }
        }
      } catch (e) {
        navigation.replace("Login");
      }
    };
    loadData();
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: palette.bg,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <View
        style={{
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: palette.ring,
          borderWidth: 1,
          borderColor: palette.border,
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 14,
          shadowOffset: { width: 0, height: 10 },
          elevation: 6,
        }}
      >
        <Text style={{ color: palette.text, fontSize: 38, fontWeight: "800" }}>
          V
        </Text>
      </View>
      <Text style={{ color: palette.text, fontSize: 24, fontWeight: "700" }}>
        Vocabulary
      </Text>
      <Text style={{ color: palette.sub, marginTop: 6 }}>
        กำลังเตรียมข้อมูลให้คุณ...
      </Text>
    </View>
  );
}
