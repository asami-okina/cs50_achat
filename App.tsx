// libs
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';

// components
import { SignUp } from './src/screens/signUp';
import { LogIn } from './src/screens/logIn';
import { Welcome } from './src/screens/welcome';
import { Home } from './src/screens/home';
import { Footer } from './src/components/common/footer';
import { Button } from './src/components/common/button'
import { ToSignUpOrLoginTextArea } from './src/components/common/toSignUpOrLoginTextArea'
import { TopAreaContainer } from './src/components/common/topAreaContainer'
import { AuthErrorText } from './src/components/logIn/authErrorText';
import { ForgotPassword } from './src/components/logIn/forgotPasseword';
import { Chats } from './src/screens/chats';

// fonts
import { useFonts, AlfaSlabOne_400Regular } from '@expo-google-fonts/alfa-slab-one';
import { ABeeZee_400Regular, ABeeZee_400Regular_Italic } from '@expo-google-fonts/abeezee';
import {
	MPLUS1p_100Thin, MPLUS1p_300Light, MPLUS1p_400Regular, MPLUS1p_500Medium, MPLUS1p_700Bold, MPLUS1p_800ExtraBold, MPLUS1p_900Black,
} from '@expo-google-fonts/m-plus-1p';

const Stack = createNativeStackNavigator();

function App() {
	// フォントがダウンロードできていなかったら、ローディング画面を出す
	let [fontsLoaded] = useFonts({
		AlfaSlabOne_400Regular,
		ABeeZee_400Regular,
		ABeeZee_400Regular_Italic,
		MPLUS1p_100Thin,
		MPLUS1p_300Light,
		MPLUS1p_400Regular,
		MPLUS1p_500Medium,
		MPLUS1p_700Bold,
		MPLUS1p_800ExtraBold,
		MPLUS1p_900Black,
	});
	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		// フォントがダウンロードできたら、画面を出力する
		return (
			<NavigationContainer>
				<Stack.Navigator>
					{/* あとで更新 */}
					{/* <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} /> */}
					{/* <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} /> */}
					{/* <Stack.Screen name="LogIn" component={LogIn} options={{ headerShown: false }} /> */}
					<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
					<Stack.Screen name="Footer" component={Footer} options={{ headerShown: false }} />
					<Stack.Screen name="Button" component={Button} options={{ headerShown: false }} />
					<Stack.Screen name="ToSignUpOrLoginTextArea" component={ToSignUpOrLoginTextArea} options={{ headerShown: false }} />
					<Stack.Screen name="TopAreaContainer" component={TopAreaContainer} options={{ headerShown: false }} />
					<Stack.Screen name="AuthErrorText" component={AuthErrorText} options={{ headerShown: false }} />
					<Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
					<Stack.Screen name="Chats" component={Chats} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

export default App;
