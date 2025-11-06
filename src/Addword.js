import { Button, ImageBackground, TextInput, TouchableOpacity, View,Text } from "react-native";
import CustomInput from "./components/CustomInput";
import styles from "./components/styles";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { addword } from "./store/collectionSlice";
const bg = {uri : "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3BkMTktMjAwMzEtam9iNTgyLTEuanBn.jpg"}

const palette = {
  bg: "#0b0f14",
  card: "#111827",
  cardSoft: "#1f2937",
  text: "#e5e7eb",
  sub: "#9ca3af",
  primary: "#3b82f6",
  border: "#2a3342",
};

export default function Addword({ route, navigation }) {
  const { name } = route.params;
  const dispatch = useDispatch()
  const [front,setfront] = useState("")
  const [back,setback] = useState("")
  const onChangeTextfront =(text)=> setfront(text)
  const onChangeTextback =(text)=> setback(text)

  const handelclick =()=>{
    const data = {name:name,data:{front:front,back:back}}
    dispatch(addword(data))
    setback("")
    setfront("")
  }

  return (
    <View style={{ flex: 1, backgroundColor: palette.bg }}>
      <ImageBackground style={{ flex:1, opacity: 0.25 }} source={bg} />
      <View style={{ position:"absolute", inset:0, justifyContent:'center', alignItems:'center' }}>
        <View style={{
          width:"88%",
          paddingVertical:28,
          backgroundColor: palette.card,
          borderRadius:28,
          alignItems:'center',
          borderWidth:1,
          borderColor:palette.border,
          shadowColor:"#000", shadowOpacity:0.35, shadowRadius:18, shadowOffset:{width:0,height:12}, elevation:8
        }}>
          <Text style={{fontSize:32, fontWeight:"700", color:palette.text, marginBottom:10}}>Add Word</Text>
          <Text style={{ color: palette.sub, marginBottom: 18 }}>{name}</Text>

          <View style={{width:'100%', alignItems:'center', gap:16, paddingHorizontal:20}}>
            <CustomInput
              placeholder={"Front"}
              onChangeText={onChangeTextfront}
              value={front}
              placeholderTextColor={palette.sub}
              styleOverride={{
                backgroundColor: palette.cardSoft, color: palette.text,
                borderColor: palette.border, borderWidth: 1, height: 52, borderRadius: 14, paddingHorizontal: 16
              }}
            />
            <CustomInput
              placeholder={"Back"}
              onChangeText={onChangeTextback}
              value={back}
              placeholderTextColor={palette.sub}
              styleOverride={{
                backgroundColor: palette.cardSoft, color: palette.text,
                borderColor: palette.border, borderWidth: 1, height: 52, borderRadius: 14, paddingHorizontal: 16
              }}
            />
            <TouchableOpacity onPress={handelclick} style={{ width:"100%", height:52, backgroundColor:palette.primary, borderRadius:14, justifyContent:"center", alignItems:"center" }}>
              <Text style={{ color:"#fff", fontSize:18, fontWeight:"700" }}>ADD</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Main')} style={{ width:"100%", height:52, backgroundColor:palette.cardSoft, borderRadius:14, justifyContent:"center", alignItems:"center", borderWidth:1, borderColor:palette.border }}>
              <Text style={{ color:palette.text, fontSize:16, fontWeight:"600" }}>Exit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
