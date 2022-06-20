
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
export function useNavigationAChat() {
    // useNavigationはApp.tsxの<NavigationContainer>の中で存在するComponentのcontextからnavigationを撮ってきて使用可能にするためのcustom hooks。
    const navigation = useNavigation<StackNavigationProp<RootStackParamListType>>()
    return navigation
}