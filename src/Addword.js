import { Button, ImageBackground, TextInput, TouchableOpacity, View,Text } from "react-native";
import CustomInput from "./components/CustomInput";
import styles from "./components/styles";
import { useState } from "react";
import { useDispatch } from 'react-redux'
import { addword } from "./store/collectionSlice";
const bg = {uri : "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3BkMTktMjAwMzEtam9iNTgyLTEuanBn.jpg"}
export default function Addword({ route, navigation }) {
    const { name } = route.params;
    const dispatch = useDispatch()
    const [front,setfront] = useState("")
    const [back,setback] = useState("")
    const onChangeTextfront =(text)=>{
        setfront(text)
    }
    const onChangeTextback =(text)=>{
        setback(text)
    }
    const handelclick =()=>{
        const data = {name:name,data:{front:front,back:back}}
        dispatch(addword(data))
        setback("")
        setfront("")
    }
    return (
        <ImageBackground style={{flex:1,justifyContent:'center',alignItems:'center'}} source={bg}>
            <View style={{width:"80%",height:"50%",backgroundColor:"#909090ff",borderRadius:30,alignItems:'center'}}>
                <Text style={{fontSize:60}}>Add word</Text>
                <View style={{width:'100%',height:'60%',justifyContent:'center',alignItems:'center',gap:20}}>
                <CustomInput placeholder={"Front"} onChangeText={onChangeTextfront} value={front}/>
                <CustomInput placeholder={"Back"} onChangeText={onChangeTextback} value={back}/>
                <TouchableOpacity onPress={handelclick} style={styles.buttonText}><Text>ADD</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Main')} style={styles.buttonText}><Text>Exit</Text></TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}