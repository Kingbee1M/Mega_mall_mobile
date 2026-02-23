import { usePopupStore } from '@/store/usePopUpStore';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Portal } from 'react-native-portalize';
import { IconSymbol } from './ui/icon-symbol';


export default function LoginPopUp() {
  const visible = usePopupStore((state) => state.loginPopupVisible);
  const hideLoginPopup = usePopupStore((state) => state.hideLoginPopup);
  const router = useRouter();

  const handlerout = () => {
    hideLoginPopup()
    router.push('/loginPage')
  }

  if (!visible) return null;

  return (
    <Portal>
      <View style={styles.overlay}>
        <View style={styles.box}>
          
          <View style={styles.title}>
            <Text style={{fontSize: 18}}>Login Account</Text>
            <TouchableOpacity onPress={hideLoginPopup}><IconSymbol lib='FontAwesome' name='close' size={20} /></TouchableOpacity>
          </View>
          
          <Image source={require('../assets/images/waving.png')} style={{width: 100, height: 100}} />

          <Text style={{fontSize: 18, fontWeight: 700,}}>you need to log in first</Text>

          <Text style={{textAlign: 'center', fontSize: 17}}>Please login/register first to make a transaction</Text>
        
            <TouchableOpacity onPress={handlerout} style={{backgroundColor: '#3669C9', paddingHorizontal: 80, paddingVertical: 10, borderRadius: 10}}>
                <Text style={{ color: '#fff'}}>Login</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  box: {
    width: '90%',
    padding: 25,
    backgroundColor: 'white',
    borderRadius: 12,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
  },
  title: {
    width: '80%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

});
