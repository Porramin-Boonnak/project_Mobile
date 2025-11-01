import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { addcollection } from "./store/collectionSlice";
export default function Splash_Screen({ navigation }) {
    const dispatch = useDispatch()
    useEffect(() => {
        const loadData = async () => {
            //await AsyncStorage.clear();
            const value = await AsyncStorage.getItem('collection');
            console.log(JSON.parse(value))
            if (JSON.parse(value) !== null) {
                for(let i=0;i<JSON.parse(value).length;i++)
                {
                    dispatch(addcollection(JSON.parse(value)[i]))
                }
            }
        };
        loadData();
    }, []);
    const goNext = () => navigation.replace('Main');
    return (
        <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} onPress={goNext}>
            <Text style={{ fontSize: 30 }}>Splash Screen</Text>
        </TouchableOpacity>
    )
}