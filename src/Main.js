import { Text, TouchableOpacity, View, Animated, ScrollView } from 'react-native';
import { useSelector } from 'react-redux'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { deletecollection } from "./store/collectionSlice";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, setDoc, collection as col, addDoc } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const palette = {
  bg: "#0b0f14",
  card: "#111827",
  cardSoft: "#1f2937",
  text: "#e5e7eb",
  sub: "#9ca3af",
  primary: "#3b82f6",
  danger: "#ef4444",
  border: "#2a3342",
};

export default function Main({ navigation }) {
  const collection = useSelector((state) => state.collection.collection)
  const [select, setselect] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    const setData = async () => {
      try {
        if (collection[0] !== null) {
          await AsyncStorage.setItem('collection', JSON.stringify(collection));
          if (auth.currentUser?.uid) {
            const user = auth.currentUser.uid
            setDoc(
              doc(db, 'users', user, 'collection', 'main'),
              { items: collection },
              { merge: true }
            );
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    setData();
  }, [collection]);

  const Allcollection = () => {
    return collection.map((item, i) => {
      const isSelected = i === select;
      return (
        <TouchableOpacity
          key={i}
          onPress={() => setselect(isSelected ? null : i)}
          activeOpacity={0.9}
          style={{
            borderWidth: 1,
            borderColor: palette.border,
            width: '45%',
            aspectRatio: 0.7,
            margin: 8,
            borderRadius: 22,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            backgroundColor: palette.card,
            shadowColor:"#000", shadowOpacity:0.25, shadowRadius:12, shadowOffset:{width:0,height:8}, elevation:5
          }}
        >
          {isSelected ? (
            <ScrollView
              style={{ flex: 1, alignSelf: 'stretch' }}
              contentContainerStyle={{ padding: 12, alignItems: 'center' }}
              showsVerticalScrollIndicator={false}
            >
              {[
                { name: 'Multiple Choice', screen: 'Multiple_choice' },
                { name: 'Remember', screen: 'Remember' },
                { name: 'Mistakes Review', screen: 'MistakesReview' },
                { name: 'Matching Game', screen: 'MatchingGame' },
                { name: 'Typing Mode', screen: 'TypingMode' },
                { name: 'Speed Mode', screen: 'SpeedMode' },
              ].map((btn, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => navigation.navigate(btn.screen, { index: i })}
                  activeOpacity={0.85}
                  style={{
                    width: '100%',
                    height: 52,
                    backgroundColor: palette.cardSoft,
                    borderRadius: 14,
                    borderWidth: 1,
                    borderColor: palette.border,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 6
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: '600', color: palette.text, textAlign: 'center' }}>
                    {btn.name}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                onPress={() => dispatch(deletecollection({ index: i }))}
                activeOpacity={0.85}
                style={{
                  width: '100%',
                  height: 52,
                  backgroundColor: palette.danger,
                  borderRadius: 14,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginVertical: 6
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: '700', color: '#fff' }}>Delete</Text>
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <View style={{ paddingHorizontal: 12, alignItems: "center" }}>
              <Text style={{ fontSize: 20, textAlign: 'center', color: palette.text }} numberOfLines={2}>
                {item?.name}
              </Text>
              <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 8, color: palette.sub }}>
                {item?.incorrect
                  ? <Text style={{ fontSize: 24, color: palette.text }}>
                      {((item.data?.length - item.incorrect?.length) / item.data?.length) * 100} %
                    </Text>
                  : <Text style={{ fontSize: 24, color: palette.text }}>0 %</Text>}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      );
    })
  }

  const Sign_out = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.multiRemove(["session_expires_at","userEmail","userPassword"]);
      console.log("Signed out successfully");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: palette.bg }}>
      <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
        {auth.currentUser ? <Text style={{ fontSize: 16, color: palette.sub }}>{auth.currentUser.email}</Text> : <Text />}
        {auth.currentUser ?
          <TouchableOpacity onPress={Sign_out}><Text style={{ fontSize: 16, color: palette.primary }}>Sign Out</Text></TouchableOpacity>
          :
          <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={{ fontSize: 16, color: palette.primary }}>Login</Text></TouchableOpacity>
        }
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
        scrollEnabled={select === null}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('Addcollection')}
          style={{
            borderWidth: 1, borderColor: palette.border, width: "45%", margin: 8, aspectRatio: 0.7,
            borderRadius: 22, justifyContent: "center", alignItems: 'center', backgroundColor: palette.cardSoft
          }}>
          <AntDesign name="plus" size={80} color={palette.text} />
          <Text style={{ color: palette.sub, marginTop: 6 }}>Add Collection</Text>
        </TouchableOpacity>
        {<Allcollection />}
      </ScrollView>
    </View>
  )
}
