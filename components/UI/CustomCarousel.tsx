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
          <Image style={styles.image} src={item ?? "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} resizeMode="cover" />
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