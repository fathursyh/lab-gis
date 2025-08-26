import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { useMemo } from "react";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");

type CardProps = {
    title?: string,
    date?: string,
    index: number,
}
export default function ProfileDataCard({title, date, index} : CardProps) {
    const formattedDate = useMemo(() => {
        return dayjs(date).format('MM/YY')
    }, [date])
    return (
        <View style={styles.certificateCard}>
            <Text style={{ fontFamily: "poppins", maxWidth: "80%", color: colors.primary500 }} numberOfLines={1}>
                {index}.  {title}
            </Text>
            <Text style={{ color: colors.accent }}>{ formattedDate }</Text>
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