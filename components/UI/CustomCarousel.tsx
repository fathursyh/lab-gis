import { Dimensions, Image, StyleSheet, View } from "react-native";
import Carousel, {
} from "react-native-reanimated-carousel";
import { colors } from "../../constants/colors";

const data = [
  'https://img.freepik.com/free-photo/black-cat-with-green-eyes-resting-grass_181624-30967.jpg?semt=ais_hybrid&w=740',
  'https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg',
  'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200'
];
const width = Dimensions.get("window").width;

function CustomCarousel() {
  return (
    <Carousel
      data={data}
      autoPlay={true}
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