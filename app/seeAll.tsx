import { Product } from "@/store/useContentStore";
import { SafeAreaView } from "react-native-safe-area-context";

type props = {
    title: string;
    items: Product[]
}

export default function Seeall ({title, items}: props) {
    return (
        <SafeAreaView>
            {/* <ScrollView>
                <Text>{title}</Text>
                {items.map ((item) => (
                    <View>
                        
                    </View>
                ))}
            </ScrollView> */}
        </SafeAreaView>
    )
}