import { useRef } from "react";
import { Animated, Dimensions, Image, ImageSourcePropType, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");
const SLIDER_WIDTH = width * 0.9;
const IMAGE_RATIO = 16 / 9;
const IMAGE_HEIGHT = SLIDER_WIDTH / IMAGE_RATIO;

type sliderProps ={
  images: ImageSourcePropType[]
}

export default function HomeSliders({images = []}: sliderProps) {
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      {/* Slider */}
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {images.map((img, index) => (
          <Image key={index} source={img} style={styles.image} resizeMode="cover" />
        ))}
      </Animated.ScrollView>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {images.map((_, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              width * (index - 1),
              width * index,
              width * (index + 1),
            ],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return <Animated.View key={index} style={[styles.dot, { opacity }]} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: SLIDER_WIDTH,
        height: 200,
        alignSelf: "center",
        marginTop: 50
    },

    image: {
        width: SLIDER_WIDTH,
        height: IMAGE_HEIGHT,
        borderRadius: 10,
    },


  dotsContainer: {
    position: "absolute",
    bottom: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
});
