import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useQuery } from "@tanstack/react-query";
import { fetchActiveBootcamps } from "../../../api/admin";
import dayjs from "dayjs";
import { Link } from "expo-router";
dayjs.locale("id");

function ActiveItem({ title, startDate, endDate, id }: any) {
    return (
        <View style={styles.activeItem}>
            <View>
                <Text style={styles.itemTitle}>{title}</Text>
                <Text style={styles.itemDate}>
                    {dayjs(startDate).format("DD MMMM")} - {dayjs(endDate).format("DD MMMM")}
                </Text>
            </View>
            <Link href={`/(bootcamp-detail)/${id}`}>
                <MaterialIcons name="open-in-new" size={20} color={colors.accent} />
            </Link>
        </View>
    );
}

export default function DashboardActiveBootcamp({ token }: any) {
    const { data, isError } = useQuery({
        queryKey: ["active-events"],
        queryFn: () => fetchActiveBootcamps(token!),
        retry: false,
        staleTime: 1000 * 10,
        gcTime: 1000 * 10,
        refetchOnWindowFocus: true,
    });
    if (isError)
        return (
            <View style={styles.container}>
                <Text>Fetching data bootcamp active gagal.</Text>
            </View>
        );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Active Bootcamp</Text>
            <View style={{ padding: 6 }}>{data?.events.length > 0 ? data?.events.map((event: any) => <ActiveItem {...event} key={event.id} />) : <Text style={styles.itemDate}>Tidak ada bootcamp aktif.</Text>}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    title: {
        fontFamily: "poppins-semi",
        fontSize: 16,
        color: colors.success,
        marginHorizontal: 4,
    },
    activeItem: {
        padding: 8,
        backgroundColor: colors.light,
        flexDirection: "row",
        justifyContent: "space-between",
        borderRadius: 8,
        elevation: 2,
        shadowColor: colors.dark,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 0 },
        marginBottom: 8,
    },
    itemTitle: {
        fontFamily: "poppins",
        color: colors.accent,
    },
    itemDate: {
        fontFamily: "poppins-light",
        fontSize: 12,
    },
});
