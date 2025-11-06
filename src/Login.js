import { ImageBackground, View, Image, Text, TouchableOpacity, Alert } from "react-native";
import CustomInput from "../src/components/CustomInput";
import styles from "../src/components/styles";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from "../firebase";
const bg = { uri: 'https://i.ibb.co/C1L3wSC/13186366-5125962.jpg' };
const logo = { uri: 'https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png' };

const palette = {
  bg: "#0b0f14",
  panel: "#111827",
  input: "#1f2937",
  text: "#e5e7eb",
  sub: "#9ca3af",
  primary: "#3b82f6",
  border: "#2a3342",
};

export default function Login({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const ms = (d) => Number(d * 24 * 60 * 60 * 1000);
  const SESSION_DAYS = 7;

  const Sign_in = async () => {
    try {
      await signInWithEmailAndPassword(auth, username, password);
      await AsyncStorage.setItem('session_expires_at', String(Date.now() + ms(SESSION_DAYS)));
      await AsyncStorage.setItem('userEmail', username);
      await AsyncStorage.setItem('userPassword', password);
      navigation.replace("Main");
    } catch (error) {
      Alert.alert("Wrong username or password");
      console.log(error)
    }
  }
  const Sign_up = () => navigation.navigate('Registration');

  return (
    <View style={{ flex:1, backgroundColor: palette.bg }}>
      <ImageBackground source={bg} style={{ flex: 1, opacity: 0.25 }} />
      <View style={{ position:"absolute", inset:0, justifyContent:"center", alignItems:"center" }}>
        <View style={{
          backgroundColor: palette.panel,
          width: "92%",
          borderRadius: 28,
          paddingVertical: 24,
          borderWidth: 1,
          borderColor: palette.border,
          shadowColor:"#000", shadowOpacity:0.35, shadowRadius:18, shadowOffset:{width:0,height:12}, elevation:8
        }}>
          <View style={{ alignItems: "center", paddingHorizontal: 20 }}>
            <Image source={logo} style={{ width: 110, height: 110, resizeMode: 'contain', marginBottom: 10 }} />
            <CustomInput
              placeholder={"Username"}
              value={username}
              onChangeText={setUsername}
              placeholderTextColor={palette.sub}
              styleOverride={{ backgroundColor: palette.input, color: palette.text, borderColor: palette.border, borderWidth:1, height:52, borderRadius:14, paddingHorizontal:16 }}
            />
            <CustomInput
              placeholder={"Password"}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor={palette.sub}
              secureTextEntry
              styleOverride={{ backgroundColor: palette.input, color: palette.text, borderColor: palette.border, borderWidth:1, height:52, borderRadius:14, paddingHorizontal:16 }}
            />

            <TouchableOpacity style={{ width:"100%", height:52, backgroundColor:palette.primary, borderRadius:14, justifyContent:"center", alignItems:"center", marginTop:8 }} onPress={Sign_in}>
              <Text style={{ fontSize: 18, color:"#fff", fontWeight:"700" }}>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width:"100%", height:52, backgroundColor:palette.input, borderRadius:14, justifyContent:"center", alignItems:"center", borderWidth:1, borderColor:palette.border, marginTop:10 }} onPress={Sign_up}>
              <Text style={{ fontSize: 16, color:palette.text, fontWeight:"600" }}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ width:"100%", height:48, backgroundColor:"transparent", borderRadius:14, justifyContent:"center", alignItems:"center", marginTop:6 }} onPress={()=> navigation.replace("Main")}>
              <Text style={{ fontSize: 14, color:palette.sub }}>Continue without Sign in</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Forget')} style={{ alignSelf:"flex-end", marginRight: 24, marginTop: 10 }}>
            <Text style={{ color: palette.primary, textDecorationLine: 'underline' }}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
