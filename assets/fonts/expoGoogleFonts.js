import { useFonts, AlfaSlabOne_400Regular } from '@expo-google-fonts/alfa-slab-one';
import { ABeeZee_400Regular_Italic } from '@expo-google-fonts/abeezee';

export const expoGoogleFonts = () => {
    // フォントファミリーを導入
    let [fontsLoaded] = useFonts({
        AlfaSlabOne_400Regular,
        ABeeZee_400Regular_Italic
    });
  
    return {
        fontsLoaded
    };
  };