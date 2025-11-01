import { Text, TouchableOpacity, View, Animated, ScrollView } from 'react-native';
import { useSelector } from 'react-redux'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { deletecollection } from "./store/collectionSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Main({ navigation }) {
    const collection = useSelector((state) => state.collection.collection)
    const [select, setselect] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        const setData = async () => {
            console.log(collection)
            try {
                if (collection[0] !== null) {
                    await AsyncStorage.setItem('collection', JSON.stringify(collection));
                    console.log("from Main")
                }
            } catch (e) {
                console.log(e);
            }
        };
        setData();
    }, [collection]);
    const Allcollection = () => {
        return collection.map((item, i) => (
            <TouchableOpacity onPress={() => setselect(i === select ? null : i)} key={i} style={{ borderWidth: 1, borderColor: '#000', width: "45%", aspectRatio: 0.7, margin: 8, borderRadius: 30, justifyContent: "center", alignItems: 'center' }}>
                {i === select ?
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Multiple_choice', { index: i })} style={{ flex: 1, borderWidth: 1, justifyContent: 'center', margin: 20, borderRadius: 20, borderColor: "#000" }}>
                            <Text style={{ fontSize: 32, textAlign: 'center' }}>Multiple choice</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Remember', { index: i })} style={{ flex: 1, borderWidth: 1, justifyContent: 'center', margin: 20, borderRadius: 20, borderColor: "#000" }}>
                            <Text style={{ fontSize: 35, textAlign: 'center' }}>Remember</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dispatch(deletecollection({ index: i }))} style={{ flex: 1, borderWidth: 1, justifyContent: 'center', margin: 20, borderRadius: 20, borderColor: "#000" }}>
                            <Text style={{ fontSize: 35, textAlign: 'center' }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                    : <Text style={{ fontSize: 35, textAlign: 'center' }}>{item.name}</Text>}
            </TouchableOpacity>
        ))
    }
    return (
        <ScrollView style={{ flex: 1 }}
            contentContainerStyle={{
                padding: 20,
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
            }}

        >
            <TouchableOpacity onPress={() => navigation.navigate('Addcollection')} style={{ borderWidth: 1, borderColor: '#000', width: "45%", margin: 8, aspectRatio: 0.7, borderRadius: 30, justifyContent: "center", alignItems: 'center' }}>
                <AntDesign name="plus" size={100} color="black" />
            </TouchableOpacity>
            {<Allcollection />}
        </ScrollView>)
}