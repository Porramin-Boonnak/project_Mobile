import { ImageBackground, View, Image, Text, TouchableOpacity,Alert } from "react-native";
import CustomInput from "../src/components/CustomInput";
import styles from "../src/components/styles";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
const bg = { uri: 'https://i.ibb.co/C1L3wSC/13186366-5125962.jpg' };
const logo = { uri: 'https://i.ibb.co/yyzQ43h/KU-Logo-PNG.png' };

export default function Registration({ navigation }) {
    const [Firstname, setFirstname] = useState();
    const [Lastname, setLastname] = useState();
    const [StudentID, setStudentID] = useState();
    const [Username, setUsername] = useState();
    const [Password, setPassword] = useState();

    const AddProfile = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, Username, Password);
            const user = userCredential.user;
            console.log(user)
            await setDoc(doc(db, "users", user.uid), {
                username: Username,
                firstname: Firstname,
                lastname: Lastname,
                studentID: StudentID
            });
            navigation.replace("Main");
        } catch (error) {
            Alert.alert("เกิดข้อผิดพลาด", error.message);
        }
    }
    return (
        <ImageBackground source={bg} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <View style={{ backgroundColor: '#fff', width: "100%", height: "65%", borderTopLeftRadius: 60, borderBottomRightRadius: 60 }}>
                <View style={{ flexDirection: 'row', alignItems: "center", marginBottom: 20, marginTop: 20 }}>
                    <Image source={logo} style={{ width: 120, height: 120, resizeMode: 'contain', marginRight: 10 }} />
                    <Text style={{ fontSize: 30 }}>Registration</Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <CustomInput placeholder={"Firstname"} value={Firstname} onChangeText={setFirstname} />
                    <CustomInput placeholder={"Lastname"} value={Lastname} onChangeText={setLastname} />
                    <CustomInput placeholder={"StudentID"} value={StudentID} onChangeText={setStudentID} />
                    <CustomInput placeholder={"Username"} value={Username} onChangeText={setUsername} />
                    <CustomInput placeholder={"Password"} value={Password} onChangeText={setPassword} />
                    <TouchableOpacity style={styles.buttonText} onPress={AddProfile}><Text style={{ fontSize: 20 }}>Register</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonText} onPress={() => navigation.goBack()}><Text style={{ fontSize: 20 }}>Cancel</Text></TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}