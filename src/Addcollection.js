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

const palette = {
  bg: "#0b0f14",
  card: "#111827",
  cardSoft: "#1f2937",
  text: "#e5e7eb",
  sub: "#9ca3af",
  primary: "#3b82f6",
  border: "#2a3342",
};

export default function Addcollection({ navigation }) {
  const dispatch = useDispatch()
  const collection = useSelector((state) => state.collection.collection)
  const [collection_name, setcollection] = useState("")
  const handelclick = () => {
    if (collection.find(n => n.name === collection_name)) {
      Alert.alert('Error collection',
        `This collection already exists.`,
        [{ text: 'OK' }]);
    } else {
      const data = { name: collection_name, data: [] }
      dispatch(addcollection(data))
      navigation.navigate('Addword', { name: collection_name })
    }
  }
  const onChangeText = (text) => setcollection(text)

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
      Alert.alert('Error collection', `This collection already exists.`, [{ text: 'OK' }]);
    } else {
      dispatch(addcollection(data))
      navigation.navigate('Main')
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: palette.bg }}>
      <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center', opacity: 0.25 }} source={bg} />
      <View style={{
        position: "absolute", inset: 0, justifyContent: "center", alignItems: "center",
      }}>
        <View style={{
          width: "88%",
          paddingVertical: 28,
          backgroundColor: palette.card,
          borderRadius: 28,
          alignItems: 'center',
          borderWidth: 1,
          borderColor: palette.border,
          shadowColor: "#000",
          shadowOpacity: 0.35,
          shadowRadius: 18,
          shadowOffset: { width: 0, height: 12 },
          elevation: 8
        }}>
          <Text style={{ fontSize: 34, fontWeight: "700", color: palette.text, marginBottom: 8 }}>
            Add Collection
          </Text>
          <Text style={{ color: palette.sub, marginBottom: 18 }}>สร้างชุดคำศัพท์ใหม่ หรือนำเข้าไฟล์ .csv</Text>

          <View style={{ width: '100%', alignItems: 'center', gap: 16, paddingHorizontal: 20 }}>
            <CustomInput
              placeholder={"Collection name"}
              onChangeText={onChangeText}
              placeholderTextColor={palette.sub}
              styleOverride={{
                backgroundColor: palette.cardSoft,
                color: palette.text,
                borderColor: palette.border,
                borderWidth: 1,
                height: 52,
                borderRadius: 14,
                paddingHorizontal: 16,
              }}
            />
            <TouchableOpacity
              onPress={handelclick}
              style={{
                width: "100%",
                height: 52,
                backgroundColor: palette.primary,
                borderRadius: 14,
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "700" }}>ADD</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handlePick}
              style={{
                width: "100%",
                height: 52,
                backgroundColor: palette.cardSoft,
                borderRadius: 14,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: palette.border
              }}>
              <Text style={{ color: palette.text, fontSize: 16, fontWeight: "600" }}>Import file (.csv)</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
