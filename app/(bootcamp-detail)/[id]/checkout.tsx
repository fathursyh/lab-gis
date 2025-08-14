import { StyleSheet, Text, View } from "react-native";
import rupiahFormat from "../../../utils/formatter";
import dayjs from "dayjs";
import "dayjs/locale/id";
import CustomButton from "../../../components/UI/CustomButton";
import { colors } from "../../../constants/colors";
import PaymentLink from "../../../components/payments/PaymentLink";
import { useCheckout } from "../../../hooks/useCheckout";
dayjs.locale("id");

export default function CheckOutModal() {
    const {
        isPaid,
        event,
        showLink,
        buttonColor,
        checkStatusPembayaran,
        generateLink
    } = useCheckout();

    return (
        <View style={styles.container}>
            {showLink.container && <PaymentLink isPaid={isPaid} link={showLink.link} />}
            <View style={styles.card}>
                <Text style={styles.title} numberOfLines={2}>{event.title}</Text>
                <Text style={[styles.price, { color: isPaid ? "gray" : colors.primary500 }]}>{rupiahFormat(event.price!)}</Text>
                <Text style={styles.date}>{dayjs(event.startDate).format("DD MMMM YY")}</Text>
            </View>
            {showLink.link === "" ? (
                <CustomButton customStyle={{ width: "100%", paddingVertical: 14 }} size="lg" onPress={generateLink}>
                    Buat Link Pembayaran
                </CustomButton>
            ) : (
                <CustomButton disabled={isPaid} customStyle={{ width: "100%", paddingVertical: 14, backgroundColor: isPaid ? "gray" : buttonColor }} size="lg" onPress={checkStatusPembayaran}>
                    {!isPaid ? "Cek Status Pembayaran" : "Pembayaran Selesai"}
                </CustomButton>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary500,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    card: {
        backgroundColor: colors.light,
        borderRadius: 12,
        padding: 20,
        width: "100%",
        shadowColor: colors.dark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.accent,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.accent,
        marginBottom: 8,
    },
    price: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 4,
    },
    date: {
        fontSize: 14,
        color: "gray",
    },
});
