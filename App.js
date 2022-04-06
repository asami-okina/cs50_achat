import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/screens/signUp';
import LogIn from './src/screens/logIn';
import Welcome from './src/screens/welcome';
import Home from './src/screens/home';
import { expoGoogleFonts } from '../A-chat/assets/fonts/expoGoogleFonts'
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

function App() {
    // フォントがダウンロードできていなかったら、ローディング画面を出す
    if (!expoGoogleFonts()) {
      return <AppLoading />;
    } else {
    // フォントがダウンロードできたら、画面を出力する 
    return (
      <NavigationContainer>
        <Stack.Navigator>
        {/* あとで更新 */}
          <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
          <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;