import { Button, StyleSheet, Text, View } from "react-native";
import CustomCarousel from "../../components/UI/CustomCarousel";
import { Toast } from "toastify-react-native";

export default function HomeTab() {
    return (
       <View style={styles.rootContainer}>
            <CustomCarousel />
            <Button title="Show" onPress={() => Toast.success('Hati-hati memori.')} />
       </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    }
})