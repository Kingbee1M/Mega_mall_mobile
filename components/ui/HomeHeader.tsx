import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { CartItem, getCartById } from '@/services/cartService';
import { getNotificationByUser, Notification } from '@/services/notificationServices';
import { usePopupStore } from '@/store/usePopUpStore';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HomeHeader() {


  const router = useRouter();
  const showLoginPopup = usePopupStore((state) => state.showLoginPopup);

  const [fetchedNotifications, setFetchedNotifications] = useState<Notification[]>([]);
  const [cart, setCart] = useState<CartItem[]>([])
  const { profile, isLoggedIn } = useAuth();
  
  const cartValue = cart.filter(item => item.status === true).length;

  const unreadNotifications = fetchedNotifications.filter(n => !n.read).length;


  useEffect (()=> {
      if (!profile) return;

       const fetchNotifications = async () => {
      const data = await getNotificationByUser(profile.user_id);
      setFetchedNotifications(data);
    };

      fetchNotifications();
    }, [profile])

    useEffect (()=> {
    if (!profile) return;

      const fetchCart = async () => {
    const data = await getCartById(profile.user_id);
    setCart(data)
  };

    fetchCart();
  }, [profile])


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
                  <Text style={{ color: Colors.light.tint, width: '60%', textAlign: 'right', fontSize: 20, fontFamily: 'Montserrat_500Medium', fontWeight: 900}}>Mega Mall</Text>
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
                      <Text style={{position: 'absolute', top: -5, right: -10, backgroundColor: 'red', color: 'white',height: 20, width: 20 , borderRadius: 50, paddingHorizontal: 5, fontSize: 12, textAlign: 'center', display: cartValue > 0 ? 'flex' : 'none'}}>{cartValue}</Text>
                      ) : null}
                      </TouchableOpacity>
                  </View>
                </View>
    )
}