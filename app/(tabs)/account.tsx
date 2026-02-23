import { useAuth } from '@/contexts/AuthContext';
import { useLoadingStore } from '@/store/useLoadingStore';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Account() {
    const { showLoading, hideLoading } = useLoadingStore();

    
    const router = useRouter()
    const { logout } = useAuth();


    const handleSignOut = async () =>  {
        try {
        showLoading()
        await logout();     
    router.replace('/'); 
    } finally {
        hideLoading()
    }   
    }
    return (
        <View style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Text>Account Screen</Text>

            <TouchableOpacity onPress={handleSignOut}>
                <Text>Sign out</Text>
            </TouchableOpacity>
</View>
    )
}