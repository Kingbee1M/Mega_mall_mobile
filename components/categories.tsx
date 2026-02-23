import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { IconSymbol } from './ui/icon-symbol';
const CategoriesData = [
    { id: '1', name: 'Food',      iconName: 'carrot',        library: 'FontAwesome5', color: '#E4F3EA', iconColor: '#3A9B7A' },
    { id: '2', name: 'Gift',      iconName: 'gift',          library: 'FontAwesome5', color: '#FFECE8', iconColor: '#FE6E4C' },
    { id: '3', name: 'Fashion',   iconName: 'shirt',         library: 'Ionicons', color: '#FFF6E4', iconColor: '#FFC120' },
    { id: '4', name: 'Gadget',    iconName: 'mobile-phone',  library: 'FontAwesome', color: '#F1EDFC', iconColor: '#9B81E5' },
    { id: '5', name: 'Computer',  iconName: 'computer',      library: 'MaterialIcons', color: '#E4F3EA', iconColor: '#3A9B7A' },
    { id: '6', name: 'Souvenir',  iconName: 'camera',        library: 'FontAwesome', color: '#FFECE8', iconColor: '#FE6E4C' },
];

export default function Categories() {
    const [showCate, setShowCate] = useState<'See All' | 'See Less'>('See Less')
      const visibleData =
    showCate === 'See Less' ? CategoriesData.slice(0, 4) : CategoriesData;
    return (
        <View style={{width: '90%', marginTop: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', width: '100%', marginBottom: 20
            }}>
                <Text>Categories</Text>
                <TouchableOpacity>
                    {showCate === 'See Less' ? (
                    <Text onPress={() => setShowCate('See All')} style={{color: '#3669C9'}}>See All</Text>
                    ) : (
                    <Text onPress={() => setShowCate('See Less')} style={{color: '#3669C9'}}>See Less</Text>
                    )}
                </TouchableOpacity>
            </View>
                {showCate === 'See Less' ? (
                    <FlatList
                        data={visibleData}
                        horizontal
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginTop: 12, gap: 15 }}
                        renderItem={({ item }) => (
                        <TouchableOpacity
                            style={{
                            alignItems: 'center',
                            gap: 8,
                            padding: 12,
                            backgroundColor: item.color,
                            borderRadius: 10,
                            width: 90,
                            }}
                        >
                            <IconSymbol
                            lib={item.library as any}
                            name={item.iconName}
                            size={24}
                            color={item.iconColor}
                            />
                            <Text style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</Text>
                        </TouchableOpacity>
                        )}
                    />
                ) :
                (
                   <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 15, width: '100%', justifyContent: 'center', marginTop: 20 }}>
                        {CategoriesData.map ((cate) => (
                            <View key={cate.id}>
                                <TouchableOpacity
                                style={{
                                alignItems: 'center',
                                gap: 8,
                                padding: 12,
                                backgroundColor: cate.color,
                                borderRadius: 10,
                                width: 90,
                                }}
                                >
                                    <IconSymbol
                                    lib={cate.library as any}
                                    name={cate.iconName}
                                    size={24}
                                    color={cate.iconColor}
                                    />
                                    <Text style={{width: '100%', textAlign: 'center', fontWeight: 600}}>{cate.name}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                   </View> 
                )}
        </View>   
    )
}