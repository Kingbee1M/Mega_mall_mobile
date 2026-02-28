import BackButton from "@/components/ui/backButton"
import { IconSymbol } from "@/components/ui/icon-symbol"
import { signIn } from "@/services/authService"
import { useLoadingStore } from "@/store/useLoadingStore"
import { useRouter } from "expo-router"
import { useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
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
      
      router.replace("/");
    }
  } catch (err: any) {
    alert(err.message);
  } finally {
    hideLoading()
  }
};

    return (
        <SafeAreaView style={{flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 30, backgroundColor: 'white'}}>
            <View style={{width: '100%', display: 'flex', alignItems: 'center'}}>
                <BackButton />

                <View style={{width: '90%', marginTop: 20, gap: 20, alignItems: 'flex-start'}}>

                    <Text style={{width: '100%',fontWeight: '800', fontSize: 24, fontFamily: 'Montserrat_500Medium', marginTop: 50, textAlign: 'center'}}>Welcome back to Mega Mall</Text>
                    <Text style={{fontSize: 18, lineHeight: 30, fontFamily: 'Montserrat_500Medium', textAlign: 'center', width: '100%'}}>Please enter your data to login</Text>

                    <View style={{width: '100%',flexDirection: "column", gap: 10}}>
                        <View style={styles.inputdiv}>
                            <Text>Email/phone</Text>
                            <TextInput value={email} onChangeText={setEmail} placeholder="Enter your Email/phone number" placeholderTextColor={'#C4C5C4'} style={styles.input} />
                        </View>


                        <View style={styles.inputdiv}>
                            <Text>Password</Text>
                            <View style={{width: '100%', borderWidth: 0, outline: 'none', paddingLeft: 16, backgroundColor: '#F2F5FA', borderRadius: 20, height: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 16,}}>
                                <TextInput secureTextEntry={isVisible} value={password} onChangeText={setPassword} placeholder="Enter your Password" placeholderTextColor={'#C4C5C4'} style={{        width: '80%', borderWidth: 0, outline: 'none', paddingLeft: 16, backgroundColor: '#F2F5FA', borderRadius: 20, height: 50,}} />
                            <TouchableOpacity onPress={()=>setIsVisible(!isVisible)}><IconSymbol lib="FontAwesome" name={isVisible ? "eye-slash" : "eye"} size={20} /></TouchableOpacity>
                            </View>
                        </View>
                        
                         <TouchableOpacity onPress={()=>router.push('/resetPassword')} style={{marginTop: 10}}>
                            <Text style={{color: '#3669C9'}}>Forgot Password</Text>
                        </TouchableOpacity>  

                    </View>

                    <View style={{width: '100%', alignItems: 'center', paddingTop: 20, gap: 24}}>
                        <TouchableOpacity disabled={isFormInvalid} style={{ width: '100%'}} onPress={handleSubmit}>
                        <Text style={{backgroundColor: isFormInvalid ? '#C4C5C4' : '#3669C9', width: '100%', paddingVertical: 15, borderRadius: 15, textAlign: 'center', color: 'white'}}>Log In</Text>
                    </TouchableOpacity>

                        <TouchableOpacity style={{ width: '100%'}} onPress={()=>router.push('/signUp')}>
                            <Text style={{borderColor: '#3669C9', borderWidth: 1, width: '100%', paddingVertical: 15, borderRadius: 15, textAlign: 'center', color: '#3669C9'}}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>

            <View style={{width: '90%', flexDirection: 'row', justifyContent: 'space-between'}}>
               
                 
            </View>
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create ({
    inputdiv: {
        gap: 8,
        width: '100%',
        marginTop: 50,
    },

    input: {
        width: '100%',
        borderWidth: 0,
        outline: 'none',
        paddingLeft: 16,
        backgroundColor: '#F2F5FA',
        borderRadius: 20,
        height: 50,
    }
})