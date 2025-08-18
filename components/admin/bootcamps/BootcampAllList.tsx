import { useCallback } from "react";
import { fetchAllBootcamp } from "../../../api/admin";
import { useInfiniteFetch } from "../../../hooks/useInfiniteFetch";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BootcampAdminCard from "./BootcampAdminCard.tsx";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../constants/colors";
import ListInfo from "../../UI/ListInfo";
import { useEventMutations } from "../../../hooks/useEventMutations";

const staleTime = 1000 * 60 * 10;
export default function BootcampAllList({ search }: { search: string }) {
    const { data, dataCount, isRefetching, isFetchingNextPage, status, filteredData, refetch, loadMore } = useInfiniteFetch({
        search,
        fetchFn: fetchAllBootcamp,
        queryKey: "bootcamps",
        stale: staleTime,
    });

    const { deleteMutation } = useEventMutations({search});

    const renderItem = useCallback(
        ({ item }: any) => {
            return <BootcampAdminCard item={item} deleteFn={deleteMutation} />;
        },
        [data?.pages]
    );

    if (status === "pending" || isRefetching)
        return (
            <View style={styles.basicContainer}>
                <ActivityIndicator size={"large"} />
            </View>
        );

    if (status === "error")
        return (
            <>
                <ListInfo refetch={refetch} dataCount={dataCount} />
                <View style={styles.basicContainer}>
                    <MaterialIcons name="broken-image" size={50} color={colors.accent} />
                    <Text style={{ fontFamily: "poppins" }}>Gagal mengambil data.</Text>
                </View>
            </>
        );
    return (
        <>
            {filteredData.length > 0 ? (
                <>
                    <ListInfo refetch={refetch} dataCount={dataCount} />
                    <FlatList
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        data={filteredData}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.5}
                        contentContainerStyle={styles.flatContainer}
                    />
                    {isFetchingNextPage && <ActivityIndicator style={{ paddingVertical: 4 }} />}
                </>
            ) : (
                <>
                    <ListInfo refetch={refetch} dataCount={dataCount} />
                    <View style={styles.basicContainer}>
                        <Text style={{ fontFamily: "poppins" }}>Bootcamp Kosong</Text>
                    </View>
                </>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    basicContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    flatContainer: {
        paddingHorizontal: 14,
        paddingBottom: 8,
    },
});
