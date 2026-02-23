import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useCartStore } from '@/store/useCartStore';
import { useNotificationStore } from '@/store/useNotificationStore';
import { usePopupStore } from '@/store/usePopUpStore';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HomeHeader() {
  const isLoggedIn = useAuth().isLoggedIn;
    const cart = useCartStore((state) => state.cart);
    const notifications = useNotificationStore((state) => state.notifications);
    let cartLength = cart.length;
    let unreadNotifications = notifications.filter(n => !n.read).length;
  const router = useRouter();
  const showLoginPopup = usePopupStore((state) => state.showLoginPopup);

  const handleNotificationPress = () => {
    console.log('isLoggedIn: ', isLoggedIn)
    if (isLoggedIn) {
      router.push('/notifications');
    } else {
      showLoginPopup(); 
    }
  }

  const handleCartPress = () => {
    if (isLoggedIn) {
      router.push('/cart');
    } else {
      showLoginPopup(); 
    }
  }
    return (
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 25, backgroundColor: Colors.light.background}}>
                  <Text style={{ color: Colors.light.tint, width: '60%', textAlign: 'right', fontSize: 20}}>Mega Mall</Text>
                  <View style={{width: '40%',display: 'flex', flexDirection: 'row', gap: 15, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity onPress={handleNotificationPress} style={{position: 'relative',}}>
                      <IconSymbol lib="FontAwesome" name="bell-o" size={20} color={Colors.light.tint} />
                      { isLoggedIn ? (
                        <Text style={{position: 'absolute', top: -5, right: -10, backgroundColor: 'red', color: 'white', height: 20, width: 20, borderRadius: 50, paddingHorizontal: 5, fontSize: 12, textAlign: 'center', display: unreadNotifications > 0 ? 'flex' : 'none'}}>{unreadNotifications}</Text>
                      ) : null}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleCartPress} style={{position: 'relative',}}>
                      <IconSymbol lib="FontAwesome" name="shopping-cart" size={20} color={Colors.light.tint} />
                      {isLoggedIn ? (
                      <Text style={{position: 'absolute', top: -5, right: -10, backgroundColor: 'red', color: 'white',height: 20, width: 20 , borderRadius: 50, paddingHorizontal: 5, fontSize: 12, textAlign: 'center', display: cartLength > 0 ? 'flex' : 'none'}}>{cartLength}</Text>
                      ) : null}
                      </TouchableOpacity>
                  </View>
                </View>
    )
}