import { View, Text, ScrollView,TouchableOpacity } from "react-native";
import styles from "./components/styles";
import { useSelector } from 'react-redux'
export default function Result({ route, navigation }) {
    const { index } = route.params;
     const incorrect = useSelector((state) => state.collection.collection[index].incorrect[0])
     console.log(incorrect)
    return (
        <View style={{flex: 1 }}>
            <Text style={{ fontSize: 35, textAlign: 'center', borderWidth: 1, borderColor: "#ff3636ff" }}>Incorrect</Text>
            <ScrollView style={{ flex: 1 }}
                contentContainerStyle={{
                    padding: 20,
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}

            >
                {incorrect.map((item,index) => {return(
                    <Text key={index} style={{ fontSize: 35, textAlign: 'center', borderWidth: 1,margin:5 }}>{item}</Text>
                )})}
                
                

                </ScrollView>
                <TouchableOpacity onPress={()=>navigation.navigate('Main')} style={[styles.buttonText, {alignSelf:"center",borderWidth:1}]}><Text>Exit</Text></TouchableOpacity>
        </View>
    )
}