import BackButton from "@/components/ui/backButton"
import ButtonUI from "@/components/ui/ButtonUI"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Login () {
    const [veri, setVeri] = useState("")
    const router = useRouter()
    
    const validateInput = (input: string) => {
  const trimmed = input.trim();
  
  // Check if it's all numbers AND at least 11 chars
  const isAllNumbers = /^\d+$/.test(trimmed) && trimmed.length >= 11;
  
  // Check if it contains an @ symbol
  const isEmailFormat = trimmed.includes('@');

  // Return true if either condition is met
  return isAllNumbers || isEmailFormat;
};


    return (
        <SafeAreaView style={{flex: 1, display: 'flex', alignItems: 'center',  paddingBottom: 30}}>
            <BackButton />
            
            <View style={{width: '90%', marginTop: 20, gap: 25, alignItems: 'flex-start', marginBottom: 100}}>

                    <Text style={{width: '60%', fontSize: 30, fontWeight: 600, marginTop: 50}}>Reset Password</Text>
                    <Text style={{color: '#838589', fontSize: 16}}>Enter your account email/phone number to reset your password.</Text>

                    <View style={{marginTop: 50}}>
                        <Text>Email/phone</Text>
                        <TextInput value={veri} onChangeText={setVeri} placeholder="Email/Phone no" placeholderTextColor={'#C4C5C4'} style={{width: '80%', borderWidth: 0, outline: 'none', paddingLeft: 10}} />
                    </View>
                    
            </View>
            
            <ButtonUI title="Reset" onPress={()=>router.push('/verificationPage')} disabled={!validateInput(veri)} />
        </SafeAreaView>
    )
}