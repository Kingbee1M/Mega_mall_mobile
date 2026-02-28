import BackButton from "@/components/ui/backButton";
import { useAuth } from "@/contexts/AuthContext";
import { CartItem, getCartById } from "@/services/cartService";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CartScreen() {
  const [cart, setCart] = useState<CartItem[]>([])
  const {profile} = useAuth()
  console.log('cart review: ', cart[0]?.reviews.length)

  useEffect (()=> {
    if (!profile) return;

    const fetchCart = async () => {
      const data = await getCartById(profile.user_id);
    setCart(data)
    };
  
    fetchCart();
  }, [profile])


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white', gap: 10}} >
    <View style={{width: '90%', alignItems: 'center', marginTop: 4, gap: 10}}>
      <BackButton/>
      <Text style={styles.heading}>Cart</Text>
    </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={cart}
          style={{width: '100%', height: 390, marginVertical: 10, paddingHorizontal: 10}}
          contentContainerStyle={{alignItems: 'center', gap: 20}}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.wrapper}>
              <Image source={{ uri: item.item.media[0] }} style={styles.media} />
              <View>
                <Text style={{fontFamily: "Montserrat_500Medium"}}>{item.item.title}</Text>
                <Text style={{fontFamily: "Montserrat_500Medium"}}>{item.item.price}</Text>
                
              </View>
            </View>
          )}
                  keyExtractor={(item, index) => index.toString()}
          />
          </View>
        </SafeAreaView>
  );
}

const styles = StyleSheet.create ({
  wrapper: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  media: {
    width: 100,
    height: 100,
  },
  heading: {
    fontFamily: 'Montserrat_500Medium',
    fontWeight: '700',
    
  }
})