import { CameraView, useCameraPermissions } from "expo-camera";
import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/UI/CustomButton";
import { useRef, useState } from "react";
import { colors } from "../constants/colors";
import { useAuth } from "../stores/useAuth";
import { absenQr } from "../api/post";

export default function QrScanner() {
    const { token } = useAuth();
    const [permission, requestPermission] = useCameraPermissions();

    const [isScanned, setIsScanned] = useState(false);
 
    async function onBarcodeScanned(qr: any) {
        if (!isScanned) {
            setIsScanned(true);
            await absenQr(token!, JSON.parse(qr.data));
        }
    }

    if (!permission) {
        return <View />;
    }
    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <CustomButton type="accent" onPress={requestPermission}>
                    Izinkan Kamera
                </CustomButton>
            </View>
        );
    }

    if (isScanned) {
        return (
            <Modal animationType="slide" visible={isScanned}>
                <View style={styles.modalContainer}>
                   <CustomButton onPress={() => setIsScanned(false)}>Tutup</CustomButton>
                </View>
            </Modal>
        );
    }
    return <CameraView facing="back" onBarcodeScanned={onBarcodeScanned} style={styles.camera} />;
}

const styles = StyleSheet.create({
    camera: {
        flex: 1,
        paddingBottom: "10%",
    },
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "#000000e9",
        justifyContent: "center",
        alignItems: "center",
    },
    modalText: {
        fontFamily: "poppins",
        fontSize: 24,
        color: colors.light,
        marginTop: 20,
    },
});
