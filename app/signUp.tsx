import { IconSymbol } from "@/components/ui/icon-symbol";
import { signUpWithProfile } from "@/services/authService";
import { useLoadingStore } from "@/store/useLoadingStore";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const HEADER_HEIGHT = 250;

export default function SignUp () {
    const [firstName, setFirst] = useState('')
    const [lastName, SetLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('')
    const [role, setRole] = useState("buyer");
    const [show, setShow] = useState(false)
    const { showLoading, hideLoading } = useLoadingStore();



    const scrollY = useRef(new Animated.Value(0)).current;

    const headerTranslate = scrollY.interpolate({
        inputRange: [0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT / 3],
        extrapolate: "clamp",
    });

    const handleUpload = async () => {
  try {
    
    if (!email || !password || !userName) {
      alert("Please fill in required fields");
      return;
    }
  showLoading()
    const { error } = await signUpWithProfile(
      firstName,
      lastName,
      userName,
      email,
      password,
      role,
      phone
    );

    if (error) {
      alert(error.message);
      console.log('error',error.name, error.message)
      return;
    }

    alert("Account created successfully!");


  } catch (err: any) {
    alert(err.message);
    
  } finally {
    hideLoading()
    router.push('/')
  }
};

    return (
        <SafeAreaView style={{flex: 1, display: 'flex', alignItems: 'center', paddingBottom: 30, gap: 40, backgroundColor: 'white'}}>
            <Animated.Image source={require('../assets/images/abstract.jpg')} style={[
          styles.headerImage,
          {
            transform: [{ translateY: headerTranslate }],
          },
        ]} />

        <Animated.ScrollView
        contentContainerStyle={{paddingTop: HEADER_HEIGHT, paddingBottom: 50, width: '100%',}}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        >
            <View style={{width: '90%', display: 'flex', alignItems: 'center', gap: 30}}>
                <Text style={{fontWeight: '600', fontSize: 24, fontFamily: 'Montserrat_700Bold'}}>Create an Account with us</Text>
                <Text style={{fontSize: 18, lineHeight: 30, fontFamily: 'Montserrat_400Regular', textAlign: 'center'}}>Create an account for free and experience the wonders of shopping with us</Text>
                
                <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 50, width: '100%',}}>
                    <View style={styles.inputdiv}>
                        <Text style={styles.texts}>First Name</Text>
                        <TextInput value={firstName} onChangeText={setFirst} placeholder="Enter your Email/phone number" placeholderTextColor={'#C4C5C4'} style={styles.input} />
                    </View>

                    <View style={styles.inputdiv}>
                        <Text style={styles.texts}>Last Name</Text>
                        <TextInput value={lastName} onChangeText={SetLastName} placeholder="Enter your Email/phone number" placeholderTextColor={'#C4C5C4'} style={styles.input} />
                    </View>

                    <View style={styles.inputdiv}>
                        <Text style={styles.texts}>User Name</Text>
                        <TextInput value={userName} onChangeText={setUserName} placeholder="Enter your Email/phone number" placeholderTextColor={'#C4C5C4'} style={styles.input} />
                    </View>

                    <View style={styles.inputdiv}>
                        <Text style={styles.texts}>Email</Text>
                        <TextInput value={email} onChangeText={setEmail} placeholder="Enter your Email/phone number" placeholderTextColor={'#C4C5C4'} style={styles.input} />
                    </View>

                    <View style={styles.inputdiv}>
                      <Text style={styles.texts}>Password</Text>
                      <View style={{width: '80%', borderWidth: 0, outline: 'none', paddingLeft: 10, backgroundColor: '#F2F5FA', borderRadius: 20, height: 50, flexDirection: 'row', alignItems: 'center'}}>
                            <TextInput secureTextEntry={show} value={password} onChangeText={setPassword} placeholder="Enter your Password" placeholderTextColor={'#C4C5C4'} style={styles.input} />
                            <TouchableOpacity onPress={()=>setShow(!show)}><IconSymbol lib="FontAwesome" name={show ? "eye-slash" : "eye"} size={20} /></TouchableOpacity>
                      </View>
                    </View>

                    <View style={styles.inputdiv}>
                        <Text style={styles.texts}>Phone</Text>
                        <TextInput value={phone} onChangeText={setPhone} placeholder="Enter your Email/phone number" placeholderTextColor={'#C4C5C4'} style={styles.input} />
                    </View>

                    <RadioButton.Group onValueChange={setRole} value={role}>
                    <RadioButton.Item label="Buyer" value="buyer" />
                    <RadioButton.Item label="Seller" value="seller" />
                    </RadioButton.Group>
                </View>

               <TouchableOpacity style={{ backgroundColor:'#3669C9' ,
    width: 290, 
    paddingVertical: 15, 
    borderRadius: 15, 

    // Shadow (your favorite 😉)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,}} onPress={handleUpload}>
                <Text style={{
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
    textAlign: 'center'}}>Submit</Text>
               </TouchableOpacity>
                
            </View>
        </Animated.ScrollView>  
        </SafeAreaView>
    )
}

const styles = StyleSheet.create ({
    inputdiv: {
        gap: 10,
        width: '100%',
    },

    input: {
        width: '80%',
        borderWidth: 0,
        outline: 'none',
        paddingLeft: 10,
        backgroundColor: '#F2F5FA',
        borderRadius: 20,
        height: 50,
    },

    headerImage: {
        position: "absolute",
        width: width,
        height: HEADER_HEIGHT,
        zIndex: 10,
  },

  texts: {
    fontSize: 18,
    fontFamily: 'Montserrat_400Regular',
    
  }
})