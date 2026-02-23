import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useNotificationStore } from "@/store/useNotificationStore";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Notifications() {
    const notifications = useNotificationStore((state) => state.notifications);
    const router = useRouter()
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: Colors.light.background}}>
            <ScrollView 
            style={{flex: 1, padding: 20}}
            contentContainerStyle={{ gap: 25}}
            showsVerticalScrollIndicator={false}
            >
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 15}}>
                    <TouchableOpacity onPress={() => router.back()}><IconSymbol lib="Ionicons" name="arrow-back" size={30} /></TouchableOpacity>
                    <Text style={{fontSize: 25, fontWeight: 700, }}>Notifications</Text>
                </View>
                
                <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20}}>
                    {notifications.length === 0 ? (
                        <Text style={{fontSize: 16, color: Colors.light.text}}>No notifications available.</Text>
                    ) : (
                        notifications.map((noti) => (
                            <View key={noti.id} style={{width: '100%',display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: noti.read ? Colors.light.background : '#e0e0e0', padding: 15, borderRadius: 10, shadowColor: '#000', shadowOffset: {width: 0, height: 2}, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3,}}>
                                <IconSymbol lib="Ionicons" name="mail-unread" size={50} color={Colors.light.tint} />
                                <View style={{ gap: 10, marginBottom: 5}}>
                                    <Text style={{fontSize: 16, fontWeight: 600}}>{noti.title}</Text>
                                    <Text style={styles.notiText}>{noti.message}</Text>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    notiText: {
        fontSize: 12,
    }
})