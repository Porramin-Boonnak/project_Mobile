import { Button, ImageBackground, TextInput, TouchableOpacity, View, Text, Alert } from "react-native";
import CustomInput from "./components/CustomInput";
import styles from "./components/styles";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import Papa from "papaparse";
import { useDispatch } from 'react-redux'
import { addcollection } from "./store/collectionSlice";
import { useSelector } from 'react-redux'
import { useState } from "react";
const bg = { uri: "https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3BkMTktMjAwMzEtam9iNTgyLTEuanBn.jpg" }
export default function Addcollection({ navigation }) {
    const dispatch = useDispatch()
    const collection = useSelector((state) => state.collection.collection)
    const [collection_name, setcollection] = useState("")
    const handelclick = () => {
        if (collection.find(n => n.name === collection_name)) {
            Alert.alert('Error collection',
                `This collection already exists.`
                , [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
        }
        else {
            const data = { name: collection_name, data: [] }
            dispatch(addcollection(data))
            navigation.navigate('Addword', { name: collection_name })
        }
    }
    const onChangeText = (text) => {
        setcollection(text)
    }
    const handlePick = async () => {
        const res = await DocumentPicker.getDocumentAsync({
            type: "text/csv",
            copyToCacheDirectory: true,
        });
        if (res.canceled) return;
        const file = res.assets[0];

        const text = await FileSystem.readAsStringAsync(file.uri, {
            encoding: FileSystem.EncodingType.UTF8,
        });

        const result = Papa.parse(text, { header: true, skipEmptyLines: true });
        const data = { name: res.assets[0].name, data: result.data }
        if (collection.find(n => n.name === data.name)) {
            Alert.alert('Error collection',
                `This collection already exists.`
                , [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
        }
        else {
            dispatch(addcollection(data))
            navigation.navigate('Main')
        }

    };
    return (
        <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} source={bg}>
            <View style={{ width: "80%", height: "50%", backgroundColor: "#909090ff", borderRadius: 30, alignItems: 'center' }}>
                <Text style={{ fontSize: 60 }}>Addcollection</Text>
                <View style={{ width: '100%', height: '60%', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                    <CustomInput placeholder={"Collection name"} onChangeText={onChangeText} />
                    <TouchableOpacity onPress={handelclick} style={styles.buttonText}><Text>ADD</Text></TouchableOpacity>
                    <TouchableOpacity onPress={handlePick} style={styles.buttonText}><Text>Import file</Text></TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}