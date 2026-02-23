import BackButton from "@/components/ui/backButton"
import { IconSymbol } from "@/components/ui/icon-symbol"
import { signIn } from "@/services/authService"
import { useLoadingStore } from "@/store/useLoadingStore"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"



export default function Login () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isVisible, setIsVisible] = useState(true)
    const { showLoading, hideLoading } = useLoadingStore();
    const router = useRouter()
    

    const isFormInvalid = email.trim() === "" || password.trim() === "";


const handleSubmit = async () => {
  try {
    showLoading()
    if (isFormInvalid) return;

    const { data, error } = await signIn(email.trim(), password.trim());

    if (error) {
      alert(error.message);
      return;
    }

    if (data.session) {
      console.log('starting line ---------------------------')
      
      router.replace("/");
    }
  } catch (err: any) {
    alert(err.message);
  } finally {
    hideLoading()
  }
};

    return (
        <SafeAreaView style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 30}}>
            <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                <BackButton />

                <View style={{width: '90%', marginTop: 20, gap: 25, alignItems: 'flex-start'}}>

                    <Text style={{width: '60%', fontSize: 28, fontWeight: 600, marginTop: 50}}>Welcome back to Mega Mall</Text>
                    <Text style={{color: '#838589', fontSize: 16}}>Please enter your data to login</Text>

                    <View style={{marginTop: 50}}>
                        <Text>Email/phone</Text>
                        <TextInput value={email} onChangeText={setEmail} placeholder="Enter your Email/phone number" placeholderTextColor={'#C4C5C4'} style={{width: '80%', borderWidth: 0, outline: 'none', paddingLeft: 10}} />
                    </View>


                    <View style={{marginTop: 50}}>
                        <Text>Password</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <TextInput secureTextEntry={isVisible} value={password} onChangeText={setPassword} placeholder="Enter your Password" placeholderTextColor={'#C4C5C4'} style={{width: '80%', borderWidth: 0, outline: 'none', paddingLeft: 10}} />
                        <TouchableOpacity onPress={()=>setIsVisible(!isVisible)}><IconSymbol lib="FontAwesome" name={isVisible ? "eye-slash" : "eye"} size={20} /></TouchableOpacity>
                        </View>
                        
                    </View>
                    <View style={{width: '100%', alignItems: 'center', paddingTop: 20,}}>
                        <TouchableOpacity disabled={isFormInvalid} style={{ width: '90%'}} onPress={handleSubmit}>
                        <Text style={{backgroundColor: isFormInvalid ? '#C4C5C4' : '#3669C9', width: '100%', paddingVertical: 15, borderRadius: 15, textAlign: 'center'}}>Sign In</Text>
                    </TouchableOpacity>
                    </View>
                    
                </View>
            </View>

            <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=>router.push('/resetPassword')}>
                    <Text style={{}}>Forgot Password</Text>
                </TouchableOpacity>  

                <TouchableOpacity onPress={()=>router.push('/signUp')}>
                    <Text style={{color: 'blue', }}>Sign Up</Text>
                </TouchableOpacity>    
            </View>
        </SafeAreaView>
        
    )
}