import { Linking, StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Animated, { FadeIn } from "react-native-reanimated";
import { setStringAsync } from "expo-clipboard";

type PaymentLinkProps = {
    link: string,
    isPaid: boolean
}

export default function PaymentLink({link, isPaid}: PaymentLinkProps) {
     async function copyClipboard() {
            await setStringAsync(link);
        }
    
        function openLink() {
            Linking.openURL(link);
        }
    return (
        <>
            <Text style={{ color: colors.success, fontFamily: "poppins-semi", textAlign: "center", marginBottom: 4 }}>
                {isPaid ? "Link sudah dibayar." : "Buka link di bawah untuk melanjutkan pembayaran"}
            </Text>
            <Animated.View entering={FadeIn.duration(700)} style={styles.linkContainer}>
                <TouchableOpacity onPress={openLink}>
                    <Text style={{ fontFamily: "poppins", maxWidth: "90%", color: "blue", textDecorationLine: "underline" }} numberOfLines={2}>
                        {link}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={copyClipboard} style={styles.copyButton}>
                    <MaterialIcons name="content-copy" size={20} />
                </TouchableOpacity>
            </Animated.View>
        </>
    );
}

const styles = StyleSheet.create({
        linkContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 6,
        padding: 12,
        paddingHorizontal: 14,
        width: "100%",
        backgroundColor: colors.light,
        marginBottom: 8,
    },
    copyButton: { borderRadius: "100%", backgroundColor: "white", padding: 8, borderWidth: 0.4 },

})