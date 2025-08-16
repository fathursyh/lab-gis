import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MemberType } from "../../types/MemberType";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { useMemo } from "react";
dayjs.locale("id");

export default function MemberItem(item : MemberType) {
    const capitalizeRole = useMemo(() => {
        return `${item.role.charAt(0).toUpperCase()}${item.role.slice(1)}`;
    }, [item.role]);
    const roleColor = useMemo(() => {
        return item.role === "member" ? colors.primary500 : "#88ca5cff";
    }, [item.role]);
    const formattedDate = useMemo(() => {
        return dayjs(item.createdAt).format("D MMMM YYYY");
    }, [item.createdAt]);
    return (
        <>
            <View style={styles.cardContainer}>
                <View style={styles.avatar}>
                    <MaterialIcons name="person" size={32} color={colors.primary500} />
                </View>
                <View style={styles.body}>
                    <Text lineBreakMode="tail" numberOfLines={1} style={styles.name}>
                        {item.fullName}
                    </Text>
                    <Text style={[styles.role, { backgroundColor: roleColor }]}>{capitalizeRole}</Text>
                    <Text style={styles.bergabung}>Bergabung {formattedDate}</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: colors.light,
        borderRadius: 4,
        flexDirection: "row",
        height: 80,
        borderWidth: 0.4,
        borderColor: colors.primary500,
        padding: 4,
        elevation: 4,
    },
    avatar: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    body: {
        flex: 4,
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 2,
    },
    name: {
        fontFamily: "poppins-med",
        color: colors.primary500,
        lineHeight: 18,
    },
    role: {
        paddingVertical: 1,
        paddingHorizontal: 8,
        borderRadius: 50,
        fontFamily: "poppins",
        fontSize: 10,
        color: colors.light,
        lineHeight: 18,
    },
    bergabung: {
        fontFamily: "poppins-light",
        fontSize: 12,
        color: colors.primary500,
        lineHeight: 18,
    },
});
