import { StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import DashboardItem from "./DashboardItem";

export default function DashboardBody() {
    // const { data, isFetching, isError } = useQuery({
    //     queryKey: ['insight'],
    //     queryFn: () => {},
    //     refetchOnWindowFocus: true,
    //     staleTime: 1000 * 60 * 5,
    //     initialData: null
    // })
    return (
        <View style={styles.dashboardContainer}>
            <DashboardItem title="Bootcamp Aktif" />
            <DashboardItem title="Total User" />
            <DashboardItem title="Total Transaksi" />
            <DashboardItem title="Total Bootcamp" />
        </View>
    );
}

const styles = StyleSheet.create({
    dashboardContainer: {
        flex: 3,
        flexWrap: "wrap",
        flexDirection: "row",
    },

});
