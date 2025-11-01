import { Text, TouchableOpacity, View, Animated } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Card from './Card';
import { useSelector } from 'react-redux'
import { useState, useRef, useEffect, useMemo } from 'react';
export default function Multiple_choice({ route, navigation }) {
    const { index } = route.params;
    const [current, setcurrent] = useState(0)
    const [withtime, setwithtime] = useState(false)
    const [backgroundColor, setbackgroundColor] = useState(false)
    const collection = useSelector((state) => state.collection.collection[index].data)
    const cardRef = useRef(null);
    const shuffle = (array) => {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
    const shufflecollection = useMemo(() => shuffle(collection), [collection]);
    const choice = (ans) => {
        let allchoice = []
        collection.map(item => { if (item.back !== ans) { allchoice.push(item.back) } })
        while (allchoice.length < 5) {
            collection.map(item => { if (item.back !== ans) { allchoice.push(item.back) } })
        }
        allchoice = shuffle(allchoice)
        let sixchoice = [ans]
        for (let i = 0; i < 5; i++) {
            sixchoice.push(allchoice[i])
        }
        sixchoice = shuffle(sixchoice)
        return sixchoice
    }
    const choices = useMemo(() => {
        const q = shufflecollection?.[current];   
        if (!q) return [];                        
        return choice(q.back);
    }, [current, shufflecollection]);
    useEffect(() => {
        if (!shufflecollection?.[current]) {
            navigation.navigate('Main');
        }
    }, [shufflecollection, current, navigation]);
    return (
        <View style={{ flex: 1 }}>
            {< Card front={shufflecollection[current]?.front} back={shufflecollection[current]?.back} ref={cardRef} />}
            <View style={{ flexDirection: "row", flexWrap: 'wrap', flex: 1, padding: 20, gap: 40, justifyContent: "center" }}>
                {(choices?.map((item, index) => {
                    const handelclick = () => {
                        if (!withtime) {
                            setbackgroundColor(true)
                            setwithtime(true)
                            setTimeout(() => {
                                setwithtime(false)
                                setcurrent(prev => prev + 1);
                                setbackgroundColor(false);
                            }, 2000);
                        }
                    }
                    return (
                        <TouchableOpacity onPress={handelclick} key={index} style={{ backgroundColor: backgroundColor ? shufflecollection[current].back == item ? "#9fff2aff" : "#ff0909ff" : "#fff", borderWidth: 1, borderColor: '#000', width: "28%", height: "40%", borderRadius: 30, justifyContent: "center", alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>{item}</Text>
                        </TouchableOpacity>
                    )
                })
                )}

            </View>
        </View>
    )
}