import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";

type CardProps = {
    title?: string,
    date?: string,
    index: number,
}
export default function ProfileDataCard({title, date, index} : CardProps) {
    return (
        <View style={styles.certificateCard}>
            <Text style={{ fontFamily: "poppins", maxWidth: "80%", color: colors.primary500 }} numberOfLines={1}>
                {index}.  Nama Bootcamp Sepanjang Ini Coba{" "}
            </Text>
            <Text style={{ color: colors.accent }}>11/25</Text>
        </View>
    );
}

const styles = StyleSheet.create({
        certificateCard: {
        width: '100%',
        height: 30,
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        flexDirection: 'row',
    }
})