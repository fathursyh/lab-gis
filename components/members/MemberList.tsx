import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import MemberItem from "./MemberItem";
import { colors } from "../../constants/colors";
import { PropsWithChildren, useCallback } from "react";
import { fetchMembers } from "../../api/fetch";
import { useInfiniteFetch } from "../../hooks/useInfiniteFetch";

export default function MemberList({ search }: PropsWithChildren & any) {
    const {
        data,
        dataCount,
        isRefetching,
        status,
        filteredData,
        loadMore
    } = useInfiniteFetch({ search, fetchFn: fetchMembers, queryKey: 'bootcamps', stale: 1000 * 60 * 5 });

    const renderItem = useCallback(({ item }: any) => {
        return <MemberItem {...item} />;
    }, [data?.pages]);


    if (status === 'pending' || isRefetching)
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={"large"} />
            </View>
        );
    if (status === 'error')
        return (
            <View style={styles.errorContainer}>
                <MaterialIcons name="broken-image" size={50} color={colors.accent} />
                <Text style={{ fontFamily: "poppins" }}>Gagal mengambil data.</Text>
            </View>
        );

    return (
        <>
            <Text style={styles.topInfo}>
                - {dataCount} <Text style={{ fontFamily: "poppins-light" }}>anggota</Text> -
            </Text>
            {filteredData.length > 0 && (
                <FlatList
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    contentContainerStyle={styles.memberContainer}
                    data={filteredData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    onEndReached={loadMore}
                    onEndReachedThreshold={0.5}

                />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    memberContainer: {
        paddingHorizontal: 14,
        paddingBottom: 14,
        gap: 6,
    },
    loadingContainer: {
        height: "60%",
        justifyContent: "center",
    },
    errorContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: "60%",
    },
    topInfo: {
        fontFamily: "poppins-med",
        fontSize: 12,
        textAlign: "center",
        color: colors.primary500,
    },
});
