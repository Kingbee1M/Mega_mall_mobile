import { useAuth } from "@/contexts/AuthContext";
import { ItemProduct } from "@/services/ItemService";
import { usePopupStore } from "@/store/usePopUpStore";
import { useRouter } from "expo-router";
import { FlatList, Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IconSymbol } from "./ui/icon-symbol";


export type Review = {
  rating: number;
  comment: string;
  profilePic?: ImageSourcePropType
};

type props = {
    title: string;
    items: ItemProduct[];
    filter?: (item: ItemProduct) => boolean;
    specialSales?: boolean;
    seeAll: boolean;
    setSeeAll: (value: boolean) => void;
    onEndReached?: () => void;
}

export default function ItemsDisplay ({ title, items, seeAll, setSeeAll, specialSales, filter, onEndReached }: props) {
    const isLoggedIn = useAuth().isLoggedIn;
    const router = useRouter();
    const showLoginPopup = usePopupStore((state) => state.showLoginPopup);
    const handleItemPress = () => {
        if (isLoggedIn) {
        router.push('/notifications');
        } else {
        showLoginPopup(); 
        }
    }
    
    const displayedItems = filter
  ? items.filter(filter)
  : items;
    
  console.log(displayedItems)

    const discountPrice = ({discount, price}: {discount: number, price: number}) => {
        return price - ((price*discount)/100)
    }

    const getTotalReview = (product: ItemProduct) => {
        return product.reviews?.length ?? 0;
    };

    const getAverageRating = (product: ItemProduct) => {
        if (!product.reviews?.length) return 0;

        const total = product.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
        );

        return total / product.reviews.length;
    };

    return(

        <View style={{alignItems: 'center', width: '90%', marginVertical: 15, marginTop: 50, gap: 10}}>
            <View style = {{width: '100%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                <Text style={{fontSize: 24, fontWeight: 500, fontFamily: 'Montserrat_500Medium'}}>{title}</Text> 
                <TouchableOpacity onPress={() => setSeeAll(!seeAll)}>
                    <Text>See All</Text>
                </TouchableOpacity>
            </View>    
            <FlatList
                horizontal
                data={displayedItems}
                style={{width: '100%', height: 390, marginVertical: 10, paddingHorizontal: 10}}
                contentContainerStyle={{alignItems: 'center', gap: 20}}
                showsHorizontalScrollIndicator={false}
                onEndReached={onEndReached}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={handleItemPress}>
                        <View style={styles.card}>
                            <View style={{width: '100%', position: 'relative', backgroundColor: 'white'}}>
                                <Image source={{ uri: String(item.media[0]) }} style={{width: '100%', height: 250}} />
                                {specialSales? <Text style={{backgroundColor: 'red', color: 'white', textAlign: 'center', padding: 8, borderRadius: 10, position: 'absolute', bottom: 0, left: 0}}>SALE</Text> : null}
                            </View>
                            <Text style={{fontFamily: 'Montserrat_500Medium'}}>{item.title}</Text>

                            {specialSales && item.discount !== undefined ?  (
                                <View>
                                    <Text style={{fontSize: 18, fontWeight: 500, fontFamily: 'Montserrat_500Medium'}}><IconSymbol lib="Font6" name="naira-sign" size={13} />{discountPrice({price: item.price, discount: item.discount})}</Text>
                                    <Text style={{color: 'grey', fontFamily: 'Montserrat_500Medium', textDecorationLine: 'line-through'}}><IconSymbol lib="Font6" name="naira-sign" size={13} />{item.price}</Text>
                                </View>
                            ) : (
                                <Text><IconSymbol lib="Font6" name="naira-sign" size={15} />{item.price}</Text>
                            )}

                            <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
                                <Text><IconSymbol lib="FontAwesome" name="star" color={'#FFC120'} size={15}/> {getAverageRating(item).toFixed(1)}</Text>
                                <Text>{item.reviews?.length || 'No'} Reviews</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
         
        </View>
    )
}

const styles = StyleSheet.create({
  card: {
    width: 230,
    height: 370,
    padding: 10,
    gap: 5,
    backgroundColor: "#fff",

    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android Shadow
    elevation: 6,

    borderRadius: 12,
  },
});