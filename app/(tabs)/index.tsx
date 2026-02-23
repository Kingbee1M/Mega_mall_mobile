import Categories from '@/components/categories';
import HomeSliders from '@/components/HomeSliders';
import ItemsDisplay from '@/components/itemsDisplay';
import HomeHeader from '@/components/ui/HomeHeader';
import { IconSymbol } from '@/components/ui/icon-symbol';
import LatestNews from '@/components/ui/latestNews';
import { useContentStore } from '@/store/useContentStore';
import { useState } from 'react';
import { ImageSourcePropType, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type Review = {
  rating: number;
  comment: string;
  profilePic?: ImageSourcePropType
};


export type Product = {
  id: string;
  media: ImageSourcePropType[];
  title: string;
  price: number;
  reviews: Record<string, Review>;
  discount?: number;
  stock: number;
  likes: number;
};

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
    const [seeNewArrival, setSeeNewArrival] = useState(true)

    const items: Product[] = useContentStore((state) => state.items)

    const getAverageRating = (reviews: Product["reviews"]) => {
    const values = Object.values(reviews);
      if (!values.length) return 0;

      const total = values.reduce((sum, r) => sum + r.rating, 0);
      return total / values.length;
    };

    const getTopRatedItems = (products: Product[]) => {
      return products.filter(
        (product) => getAverageRating(product.reviews) >= 4
      );
    };

    const topRatedItems = getTopRatedItems(items);

    
  return (
    <SafeAreaView style={{ flex: 1}}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: '#fff', alignItems: 'center',paddingBottom: 50 }} style={{}} showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <View style={styles.search}>
          <TextInput
            placeholder="Search Products Name"
            style={{ marginLeft: 8, flex: 1, color: '#C4C5C4' }}
          />
          <IconSymbol lib='FontAwesome' name='search' size={20}/>
          </View>
        <HomeSliders images={images} />
        <Categories />
        <ItemsDisplay title='Featured Product' items={items} seeAll={seeNewArrival} setSeeAll={setSeeNewArrival} specialSales={false} />
        <HomeSliders images={slider2} />

        <ItemsDisplay title='Best Sellers' items={items} seeAll={seeNewArrival} setSeeAll={setSeeNewArrival} specialSales={false} />

        <HomeSliders images={slider3} />

        <ItemsDisplay title='New arrivals' items={items} seeAll={seeNewArrival} setSeeAll={setSeeNewArrival} specialSales={false} />

        <ItemsDisplay title='Top Rated' items={topRatedItems} seeAll={seeNewArrival} setSeeAll={setSeeNewArrival} specialSales={false} />

        <ItemsDisplay title='Top Rated' items={items} seeAll={seeNewArrival} setSeeAll={setSeeNewArrival} specialSales={true} />
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
