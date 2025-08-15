import { ActivityIndicator, Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "../UI/CustomButton";
import { colors } from "../../constants/colors";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../stores/useAuth";
import { absenQr } from "../../api/post";
import LottieView from "lottie-react-native";
import Error from '../../assets/Error.json';
import Success from '../../assets/Success.json';
import { useRouter } from "expo-router";

type DialogProps = {
    isScanned: boolean;
    qrData: {date: Date, qrCode: string, eventId: string}
};
export default function ScannedDialog({ isScanned, qrData }: DialogProps) {
    const {token} = useAuth();
    const {dismissAll} = useRouter();
    const {
        data: response,
        isLoading
    } = useQuery<any>({
        queryKey: [qrData.qrCode],
        queryFn: () => absenQr(token!, qrData),
        refetchOnMount: true,
        retry: false
    });
    if (isLoading) return (
        <View style={styles.modalContainer}>
            <ActivityIndicator size={32} />
        </View>
    )
    return (
        <Modal animationType="slide" visible={isScanned}>
            <View style={styles.modalContainer}>
                <Text style={styles.infoText}>{response.data.message}</Text>
                <LottieView source={response.status === 200 ? Success : Error} autoPlay loop={false} style={styles.lottie}/>
                <CustomButton type="accent" customStyle={styles.confirmButton} onPress={() => dismissAll()}>Tutup</CustomButton>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
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
    infoText: {
        color: colors.light,
        fontFamily: 'poppins-bold',
        fontSize: 20,
        textAlign: 'center',
        maxWidth: '90%'
    },
    lottie: { height: 200, width: 200 },
    confirmButton: {
        marginTop: 24,
        paddingVertical: 14,
        width: 250
    }
});
