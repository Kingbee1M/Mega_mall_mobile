import BackButton from "@/components/ui/backButton"
import { useRouter } from "expo-router"
import { useRef, useState } from "react"
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export default function VerificationPage () {
    const [verify1, setVerify1] = useState('')
    const [verify2, setVerify2] = useState('')
    const [verify3, setVerify3] = useState('')
    const [verify4, setVerify4] = useState('')

    
    const input1Ref = useRef<TextInput>(null);
    const input2Ref = useRef<TextInput>(null);
    const input3Ref = useRef<TextInput>(null);
    const input4Ref = useRef<TextInput>(null);

    const router = useRouter()
    const verificationCode = String(verify1 + verify2 +  verify3+ verify4 )
    return (
                <SafeAreaView style={{flex: 1, display: 'flex', alignItems: 'center',  paddingBottom: 30}}>
                    <BackButton />
                    <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  style={{ flex: 1 }}
                  >
                    <View style={{ width: '70%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: 20}}>
                        

                        <Text style={{width: '60%', fontSize: 28, fontWeight: 600, marginTop: 50}}>Verification</Text>

                        <Text style={{color: '#838589', fontSize: 16}}>We have sent a verification code to </Text>

                        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', gap: 15, marginTop: 40}}>
                            <TextInput
                                ref={input1Ref}
                                style={styles.input}
                                value={verify1}
                                onChangeText={(text) => {
                                setVerify1(text);
                                if (text) input2Ref.current?.focus();
                                }}
                                maxLength={1}
                                keyboardType="numeric"
                            />

                            <TextInput
                                ref={input2Ref}
                                style={styles.input}
                                value={verify2}
                                onChangeText={(text) => {
                                setVerify2(text);
                                if (text) input3Ref.current?.focus();
                            }}
                            maxLength={1}
                            keyboardType="numeric"
                            />

                            <TextInput
                                ref={input3Ref}
                                style={styles.input}
                                value={verify3}
                                onChangeText={(text) => {
                                setVerify3(text);
                                if (text) input4Ref.current?.focus();
                            }}
                                maxLength={1}
                                keyboardType="numeric"
                            />

                            <TextInput
                                ref={input4Ref}
                                style={styles.input}
                                value={verify4}
                                onChangeText={(text) => {
                                setVerify4(text);
                            }}
                                maxLength={1}
                                keyboardType="numeric"
                            />

                        </View>
                            

                    </View>

                    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5}}>
                        <Text>Remember your password ? </Text>
                    </View>

            </KeyboardAvoidingView>
                </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#000',
        paddingLeft: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    checkboxView: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        borderRadius: 5,
    },
    checkboxHolders: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
        width: '70%'
    },
    checkbox: {
        borderWidth: 0,
    },
    checkText: {
        fontSize: 12,
    }
})