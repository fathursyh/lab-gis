import { ActivityIndicator, Button, StyleSheet, Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardItem from "./DashboardItem";
import { fetchDashboardData } from "../../../api/admin";

export default function DashboardBody({ token }: { token: string }) {
    const { data, isFetching, isError, refetch, isRefetching } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () => fetchDashboardData(token),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 5,
        retry: false,
        refetchOnWindowFocus: true,
    });

    if (isError)
        return (
            <View style={styles.basicContainer}>
                <Text style={styles.errorMessage}>Fetching data error</Text>
                <Button title="Reload" onPress={() => refetch({throwOnError: true})} />
            </View>
        );

    if (isFetching || isRefetching)
        return (
            <View style={styles.basicContainer}>
                <ActivityIndicator size={"large"} />
            </View>
        );
    return (
        <View style={styles.dashboardContainer}>
            <DashboardItem title="Bootcamp Aktif" value={data.activeEvents} />
            <DashboardItem title="Total User" value={data.totalUsers} />
            <DashboardItem title="Total Transaksi" value={data.totalPayments} />
            <DashboardItem title="Total Bootcamp" value={data.totalEvents} />
        </View>
    );
}

const styles = StyleSheet.create({
    dashboardContainer: {
        flex: 3,
        flexWrap: "wrap",
        flexDirection: "row",
    },
    basicContainer: {
        flex: 3,
        justifyContent: "center",
        alignItems: "center",
    },
    errorMessage: {
        fontFamily: "poppins",
        fontSize: 16,
    },
});
