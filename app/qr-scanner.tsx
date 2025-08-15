import { CameraView, useCameraPermissions } from "expo-camera";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import CustomButton from "../components/UI/CustomButton";
import { useRef, useState } from "react";
import ScannedDialog from "../components/qr/ScannedDialog";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../constants/colors";

function PermissionComponent({ requestPermission }: { requestPermission: () => void }) {
    return (
        <View style={styles.container}>
            <CustomButton type="accent" onPress={requestPermission}>
                Izinkan Kamera
            </CustomButton>
        </View>
    );
}
export default function QrScanner() {
    const [permission, requestPermission] = useCameraPermissions();
    const [isScanned, setIsScanned] = useState(false);
    const [flash, setFlash] = useState<boolean>(false);
    const { dismiss } = useRouter();
    const qrData = useRef("");

    async function onBarcodeScanned(qr: any) {
        if (!isScanned) {
            setIsScanned(true);
            qrData.current = qr.data;
        }
    }

    const toggleFlash = () => {
        setFlash((prev) => !prev);
    };

    if (!permission) {
        return <PermissionComponent requestPermission={requestPermission} />;
    }
    if (!permission.granted) {
        return <PermissionComponent requestPermission={requestPermission} />;
    }

    if (isScanned) {
        return <ScannedDialog isScanned={isScanned} qrData={JSON.parse(qrData.current)} />;
    }
    return (
        <View style={styles.cameraContainer}>
            <CameraView
                enableTorch={flash}
                style={styles.camera}
                mute
                facing="back"
                mode="picture"
                videoQuality="480p"
                onMountError={() => dismiss()}
                barcodeScannerSettings={{
                    barcodeTypes: ["qr"],
                }}
                onBarcodeScanned={onBarcodeScanned}
            />
            <Pressable android_ripple={{ color: colors.background, radius: 30 }} style={styles.flashlight} onPress={toggleFlash}>
                <MaterialIcons name="flashlight-on" size={40} color={colors.light} />
            </Pressable>
        </View>
    );
}
const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingBottom: "10%",
    },
    camera: {
        width: screenWidth,
        height: screenWidth,
    },
    flashlight: {
        marginBottom: 14,
        backgroundColor: colors.accent,
        borderRadius: "100%",
        padding: 8,
    },
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
});
