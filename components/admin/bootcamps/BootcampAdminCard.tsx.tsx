import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BootcampType } from "../../../types/BootcampType";
import { colors } from "../../../constants/colors";
import { useMemo } from "react";
import rupiahFormat from "../../../utils/formatter";
import dayjs from "dayjs";
import "dayjs/locale/id";
import { confirm, defaultImage } from "../../../utils/helpers";
import { Link, useRouter } from "expo-router";
import { host } from "../../../secrets";
dayjs.locale("id");

type CardProps = {
    item: BootcampType;
    deleteFn?: any;
};
export default function BootcampAdminCard({ item, deleteFn }: CardProps) {
    const router = useRouter();
    const formattedPrice = useMemo(() => {
        return rupiahFormat(item.price!);
    }, [item.price]);

    const startDate = useMemo(() => {
        return dayjs(item.startDate).format("DD MMMM YY");
    }, [item.startDate]);
    const endDate = useMemo(() => {
        return dayjs(item.endDate).format("DD MMMM YY");
    }, [item.endDate]);

    async function deleteEvent(id: string, title: string) {
        const confirmation = await confirm("Hapus Bootcamp?", `Anda akan menghapus ${title}`, "Hapus", "destructive");
        if (!confirmation) return;
        deleteFn.mutate({ id: item.id, title: item.title });
    }

    return (
        <View style={styles.card}>
            {/* Title + Mentor */}
            <View style={styles.cardHeader}>
                <Link href={`/(bootcamp-detail)/${item.id}`}>
                    <View>
                        <Text style={styles.title} numberOfLines={1}>
                            {item.title}
                        </Text>
                        <Text style={styles.mentor} numberOfLines={1}>
                            {item.mentor}
                        </Text>
                    </View>
                </Link>
                <View>
                    <Image style={styles.headerImage} src={item.banner ? `${host}${item.banner}` : defaultImage} resizeMode="cover" />
                </View>
            </View>

            {/* Dates */}
            <View style={styles.row}>
                <Text style={styles.label}>Start:</Text>
                <Text style={styles.value}>{startDate}</Text>
                <Text style={styles.label}>End:</Text>
                <Text style={styles.value}>{endDate}</Text>
            </View>

            {/* Quota, Price, Location */}
            <View style={styles.row}>
                <Text style={styles.label}>Quota:</Text>
                <Text style={styles.value}>{item.quota}</Text>
                <Text style={styles.label}>Price:</Text>
                <Text style={styles.value}>{formattedPrice}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.label}>Location:</Text>
                <Text style={styles.value} numberOfLines={1}>
                    {item.location}
                </Text>
            </View>

            {/* Actions */}
            <View style={styles.actions}>
                <TouchableOpacity style={[styles.button, styles.editBtn]} onPress={() => router.push({ pathname: "/event-modal", params: { editData: JSON.stringify(item) } })}>
                    <Text style={styles.btnText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.deleteBtn]} onPress={() => deleteEvent(item.id!, item.title!)}>
                    <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.light,
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        borderWidth: 0.2,
        borderColor: colors.primary500,
        elevation: 2,
        shadowColor: colors.dark,
        shadowOpacity: 0.4,
        shadowOffset: { height: 0, width: 0 },
    },
    cardHeader: {
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    headerImage: {
        height: 30,
        overflow: "hidden",
        borderRadius: 4,
        width: "auto",
        aspectRatio: 16 / 9,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.accent,
    },
    mentor: {
        fontSize: 14,
        color: colors.info,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginBottom: 6,
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.dark,
        marginRight: 4,
    },
    value: {
        fontSize: 14,
        color: colors.dark,
        marginRight: 12,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 10,
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginLeft: 8,
    },
    editBtn: {
        backgroundColor: "#1e51c8ff",
    },
    deleteBtn: {
        backgroundColor: colors.error,
    },
    btnText: {
        color: "#fff",
        fontWeight: "600",
    },
});
