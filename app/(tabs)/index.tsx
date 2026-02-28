import Categories from '@/components/categories';
import HomeSliders from '@/components/HomeSliders';
import ItemsDisplay from '@/components/itemsDisplay';
import HomeHeader from '@/components/ui/HomeHeader';
import { IconSymbol } from '@/components/ui/icon-symbol';
import LatestNews from '@/components/ui/latestNews';
import { useAuth } from '@/contexts/AuthContext';
import { fetchItems, ItemProduct } from '@/services/ItemService';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';




  const images = [
    require("@/assets/images/homeSlider1.png"),
    require("@/assets/images/homeSlider2.png"),
  ];

  const slider2 = [
    require("@/assets/images/bannerdefault.png"),
  ]

  const slider3 = [
    require("@/assets/images/headp.png"),

  ]


export default function HomeScreen() {
  const LIMIT = 20

  const [products, setProducts] = useState<ItemProduct[]>([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const loadMoreItems = async () => {
    if (loading || !hasMore) return

    setLoading(true)

    const newItems = await fetchItems(offset, LIMIT)

    if (newItems.length < LIMIT) {
      setHasMore(false)
    }

    setProducts(prev => [...prev, ...newItems])
    setOffset(prev => prev + LIMIT)

    setLoading(false)
  }

  useEffect(() => {
    loadMoreItems()
  }, [])

    const [seeNewArrival, setSeeNewArrival] = useState(true)

    const {profile} = useAuth()




  return (
    <SafeAreaView style={{ flex: 1}}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff', alignItems: 'center',paddingBottom: 50 }} style={{}} showsVerticalScrollIndicator={false}>
        <HomeHeader />

        {profile? (
          <Text style={{fontSize: 18, width: '80%', fontFamily: 'Montserrat_500Medium'}}>Hi, <Text style={{fontSize: 18,fontWeight: 600, color: '#3669C9', fontFamily: 'Montserrat_500Medium'}}>{profile? profile.userName : 'user'}</Text></Text>
        ): (
          <Text style={{fontSize: 18, width: '80%', fontFamily: 'Montserrat_500Medium'}}>Please login or signup</Text>
        )}
        
        <View style={styles.search}>
          <TextInput
            placeholder="Search Products Name"
            style={{ marginLeft: 8, flex: 1, color: '#C4C5C4' }}
          />
          <IconSymbol lib='FontAwesome' name='search' size={20}/>
          </View>
        <HomeSliders images={images} />
        <Categories />
        <ItemsDisplay title='Featured Product' items={products} onEndReached={loadMoreItems} seeAll={seeNewArrival} setSeeAll={setSeeNewArrival} specialSales={false} />
        <HomeSliders images={slider2} />

        {/* <ItemsDisplay title='Best Sellers' items={items} seeAll={seeNewArrival} setSeeAll={setSeeNewArrival} specialSales={false} />

        <HomeSliders images={slider3} />

        <ItemsDisplay title='New arrivals' items={items} seeAll={seeNewArrival} setSeeAll={setSeeNewArrival} specialSales={false} />

        <ItemsDisplay title='Top Rated' items={topRatedItems} seeAll={seeNewArrival} setSeeAll={setSeeNewArrival} specialSales={false} />

        <ItemsDisplay title='Top Rated' items={items} seeAll={seeNewArrival} setSeeAll={setSeeNewArrival} specialSales={true} /> */}
        <LatestNews />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  search: {
    marginTop: 30,
    width: '70%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
});
