import { useCallback, useMemo, useState } from "react";
import { fetchAllBootcamp } from "../../../api/admin";
import { useInfiniteFetch } from "../../../hooks/useInfiniteFetch";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BootcampAdminCard from "./BootcampAdminCard.tsx";
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../constants/colors";
import ListInfo from "../../UI/ListInfo";
import { useEventMutations } from "../../../hooks/useEventMutations";

type ActiveTab = 'ongoing' | 'completed' | 'upcoming';
const staleTime = 1000 * 60 * 10;

export default function BootcampAllList({ search }: { search: string }) {
    const [activeTab, setActiveTab] = useState<ActiveTab>('ongoing');

    const { data, dataCount, isRefetching, isFetchingNextPage, status, filteredData, refetch, loadMore } = useInfiniteFetch({
        search,
        extraKey: activeTab,
        fetchFn: fetchAllBootcamp,
        queryKey: "admin-bootcamps",
        stale: staleTime,
    });

    const { deleteMutation } = useEventMutations({ search, extraKey: activeTab });

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
            <BootcampTab activeTab={activeTab} onChange={setActiveTab} />
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
                    <ListInfo refetch={refetch} dataCount={0} />
                    <View style={styles.basicContainer}>
                        <Text style={{ fontFamily: "poppins" }}>Bootcamp Kosong</Text>
                    </View>
                </>
            )}
        </>
    );
}

function BootcampTab({ activeTab, onChange }: { activeTab: ActiveTab, onChange: (tab: ActiveTab) => void }) {

    // Define tabs configuration
    const tabs: { key: ActiveTab; label: string }[] = [
        { key: "upcoming", label: "Upcoming" },
        { key: "ongoing", label: "Ongoing" },
        { key: "completed", label: "Completed" },
    ];

    return (
        <View style={tab.container}>
            {tabs.map((item) => (
                <TouchableOpacity
                    key={item.key}
                    style={[
                        tab.tab,
                        activeTab === item.key && tab.activeTab
                    ]}
                    onPress={() => onChange(item.key)}
                >
                    <Text
                        style={[
                            tab.tabText,
                            activeTab === item.key && tab.activeText
                        ]}
                    >
                        {item.label}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
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