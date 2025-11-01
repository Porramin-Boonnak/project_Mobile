import { View } from 'react-native';
import Card from './src/Card';
import Main from './src/Main';
import Addcollection from './src/Addcollection';
import Addword from './src/Addword';
import Multiple_choice from './src/Multiple_choice';
import Remember from './src/Remember';
import Splash_Screen from './src/Splash_Screen';
import { Provider } from 'react-redux'
import { store } from './src/store/store';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash_Screen" >
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Splash_Screen" component={Splash_Screen} options={{ headerShown: false }} />
          <Stack.Screen name="Addcollection" component={Addcollection} />
          <Stack.Screen name="Addword" component={Addword}  />
          <Stack.Screen name="Multiple_choice" component={Multiple_choice} options={{ headerShown: false }} />
          <Stack.Screen name="Remember" component={Remember} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

