import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel, {
} from "react-native-reanimated-carousel";
import { colors } from "../../constants/colors";

const width = Dimensions.get("window").width;

function CustomCarousel({data, autoplay = false} : {data: string[], autoplay?: boolean}) {
  return (
    <Carousel
      data={data}
      autoPlay={autoplay}
      autoPlayInterval={3000}
      scrollAnimationDuration={1400}
      width={width}
      height={250}
      snapEnabled={true}
      mode="parallax"
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
      renderItem={({ item }) => (
        <View
          style={styles.imageContainer}
        >
          <Image style={styles.image} src={item} resizeMode="cover" />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    overflow: 'hidden',
    borderRadius: 20,
    elevation: 6,
    shadowColor: colors.accent,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 0 },
  },
  image: {
    width: '100%',
    height: '100%'
  }
});

export default CustomCarousel;