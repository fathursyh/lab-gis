import { useCallback, useMemo, useState } from "react";
import { fetchAllBootcamp } from "../../../api/admin";
import { useInfiniteFetch } from "../../../hooks/useInfiniteFetch";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BootcampAdminCard from "./BootcampAdminCard.tsx";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../constants/colors";
import ListInfo from "../../UI/ListInfo";
import { useEventMutations } from "../../../hooks/useEventMutations";
import { BootcampType } from "../../../types/BootcampType";

type ActiveTab = 'ongoing' | 'completed';
const staleTime = 1000 * 60 * 10;

export default function BootcampAllList({ search }: { search: string }) {
    const [activeTab, setActiveTab] = useState<ActiveTab>('ongoing');

    const { data, dataCount, isRefetching, isFetchingNextPage, status, filteredData, refetch, loadMore } = useInfiniteFetch({
        search,
        fetchFn: fetchAllBootcamp,
        queryKey: "admin-bootcamps",
        stale: staleTime,
    });

    const bootcampData = useMemo(() => {
        const today = new Date();
        return filteredData.filter((bootcamp: BootcampType) => {
            const endDate = new Date(bootcamp.endDate!);
            if (activeTab === "ongoing") {
                return today <= endDate;
            }

            if (activeTab === "completed") {
                return today > endDate;
            }
        })
    }, [activeTab, filteredData]);

    const { deleteMutation } = useEventMutations({ search });

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
            {bootcampData.length > 0 ? (
                <>
                    <BootcampTab activeTab={activeTab} onChange={setActiveTab} />
                    <ListInfo refetch={refetch} dataCount={`${bootcampData.length} / ${dataCount}`} />
                    <FlatList
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        data={bootcampData}
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
                    <ListInfo refetch={refetch} dataCount={0} />
                    <View style={styles.basicContainer}>
                        <Text style={{ fontFamily: "poppins" }}>Bootcamp Kosong</Text>
                    </View>
                </>
            )}
        </>
    );
}

function BootcampTab({ activeTab, onChange }: { activeTab: ActiveTab, onChange: React.ComponentState }) {
    return (
        <View style={tab.container}>
            {/* Ongoing Tab */}
            <TouchableOpacity
                style={[
                    tab.tab,
                    activeTab === "ongoing" && tab.activeTab
                ]}
                onPress={() => onChange("ongoing")}
            >
                <Text
                    style={[
                        tab.tabText,
                        activeTab === "ongoing" && tab.activeText
                    ]}
                >
                    Ongoing
                </Text>
            </TouchableOpacity>

            {/* Completed Tab */}
            <TouchableOpacity
                style={[
                    tab.tab,
                    activeTab === "completed" && tab.activeTab
                ]}
                onPress={() => onChange("completed")}
            >
                <Text
                    style={[
                        tab.tabText,
                        activeTab === "completed" && tab.activeText
                    ]}
                >
                    Completed
                </Text>
            </TouchableOpacity>
        </View>
    )
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

const tab = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "#eee",
        borderRadius: 10,
        marginHorizontal: 14,
        marginTop: 8,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 8,
    },
    activeTab: {
        backgroundColor: "#fff",
        elevation: 2,
    },
    tabText: {
        fontSize: 14,
        color: "#666",
        fontFamily: "poppins"
    },
    activeText: {
        color: "#000",
        fontFamily: "poppins-semi"
    },
})