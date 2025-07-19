import { StyleSheet, Text, View } from "react-native";
import CustomCarousel from "../../components/UI/CustomCarousel";

export default function HomeTab() {
    return (
       <View style={styles.rootContainer}>
            <CustomCarousel />
       </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    }
})