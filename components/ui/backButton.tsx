import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./icon-symbol";


export default function BackButton () {
    const router=useRouter()

    const btn = () => {
        router.back();
    }
    return (
        <View style={{width: '90%', marginTop: 20}}>
            <TouchableOpacity onPress={btn}>
            <    IconSymbol lib="Ionicons" name="arrow-back" size={35} />
            </TouchableOpacity>
        </View>
        
    )
}