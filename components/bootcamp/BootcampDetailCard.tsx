import { Linking, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { colors } from "../../constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useMemo } from "react";

type CardProps = {
    title?: string,
    body?: any,
    extraStyle?: ViewStyle
}

export default function BootcampDetailCard({ title, body, extraStyle }: CardProps) {
    const isHarga = title === 'Harga Bootcamp';
    const isLink = useMemo(() => {
        return title === 'Link Online'
    }, [title]);

    return (
        <View style={[styles.cardContainer, extraStyle]}>
            <View >
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={[styles.cardText, { color: isHarga ? 'green' : colors.primary500 }]} numberOfLines={3}>{body}</Text>
            </View>
            {
                isLink &&
                <TouchableOpacity style={{ padding: 2}} onPressIn={() => Linking.openURL(body)}>
                    <MaterialIcons name="link" size={20} />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.light,
        elevation: 2,
        shadowColor: 'black',
        shadowOpacity: 0.6,
        shadowOffset: { width: 0, height: 0 },
        borderWidth: 0.4,
        borderColor: colors.accent,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 4,
        padding: 12,
    },
    cardTitle: {
        fontFamily: 'poppins-bold',
        color: colors.accent
    },
    cardText: {
        fontFamily: 'poppins',
        lineHeight: 18,
    }
})