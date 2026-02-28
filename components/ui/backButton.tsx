import { Audio } from "expo-av";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./icon-symbol";


export default function BackButton () {
    const router=useRouter()
    const playSound = useCallback(async () => {
        try {
        const { sound } = await Audio.Sound.createAsync(
            require("../../assets/sounds/bobble_pop_uptimized.mp3")
        );
        await sound.playAsync();

        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) {
            sound.unloadAsync();
            }
        });
        } catch (error) {
        console.warn("Error playing sound:", error);
        }
    }, []);

    const btn = () => {
        router.back();
        playSound();
    }
    return (
        <View style={{width: '90%', marginTop: 20}}>
            <TouchableOpacity onPress={btn}>
            <    IconSymbol lib="Ionicons" name="arrow-back" size={35} />
            </TouchableOpacity>
        </View>
        
    )
}