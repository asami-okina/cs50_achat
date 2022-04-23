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
import { AuthErrorText } from './src/components/logIn/authErrorText';
import { ForgotPassword } from './src/components/logIn/forgotPasseword';
import { Chats } from './src/screens/chats';
import { AddGroup } from './src/screens/addGroup'
import { AddGroupSetting } from './src/screens/addGroupSetting'
import { AddFriend } from './src/screens/addFriend';
import {Profile} from "./src/screens/profile"
import {EditNickName} from "./src/components/profile/_profileInfo/editNickName"

// fonts
import { useFonts, AlfaSlabOne_400Regular } from '@expo-google-fonts/alfa-slab-one';
import { ABeeZee_400Regular, ABeeZee_400Regular_Italic } from '@expo-google-fonts/abeezee';
import {
	MPLUS1p_100Thin, MPLUS1p_300Light, MPLUS1p_400Regular, MPLUS1p_500Medium, MPLUS1p_700Bold, MPLUS1p_800ExtraBold, MPLUS1p_900Black,
} from '@expo-google-fonts/m-plus-1p';

const Stack = createNativeStackNavigator();

// mock service
import 'react-native-url-polyfill/auto';
const { native } = require('./src/mocks/native');
// bypass: デフォルトの設定だと、モックされていないAPIリクエストに対してコンソールに警告が表示される。
// 消したいときは、onUnhandledRequestの設定値をbypassに変更する
native.listen({ onUnhandledRequest: 'bypass' })


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
					<Stack.Screen name="AuthErrorText" component={AuthErrorText} options={{ headerShown: false }} />
					<Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
					<Stack.Screen name="Chats" component={Chats} options={{ headerShown: false }} />
					<Stack.Screen name="AddGroup" component={AddGroup} options={{ headerShown: false }} />
					<Stack.Screen name="AddGroupSetting" component={AddGroupSetting} options={{ headerShown: false }} />
					<Stack.Screen name="AddFriend" component={AddFriend} options={{ headerShown: false }} />
					<Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
					<Stack.Screen name="EditNickName" component={EditNickName} options={{ headerShown: false }} />
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

export default App;
