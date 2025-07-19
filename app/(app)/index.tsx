import { Button, StyleSheet, Text, View } from "react-native";
import CustomCarousel from "../../components/UI/CustomCarousel";
import { Toast } from "toastify-react-native";

export default function HomeTab() {
    return (
       <View style={styles.rootContainer}>
            <CustomCarousel />
            <Button title="Success" onPress={() => Toast.success('Sesuatu berhasil ditambahkan!')} />
            <Button title="Warning" onPress={() => Toast.warn('Kuota sudah penuh!')} />
            <Button title="Error" onPress={() => Toast.error('Gagal mengupdate tugas!')} />
       </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1
    }
})