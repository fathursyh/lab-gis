import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "../../stores/useAuth";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import MemberItem from "./MemberItem";
import { colors } from "../../constants/colors";
import { PropsWithChildren, useCallback, useMemo } from "react";
import { fetchMembers } from "../../api/fetch";

export default function MemberList({ search }: PropsWithChildren & any) {
    const { token, isAdmin } = useAuth();
    const { data, fetchNextPage, isFetchingNextPage, hasNextPage, status } = useInfiniteQuery({
        queryKey: ["members", search],
        queryFn: (params) => fetchMembers(token!, params.pageParam, search),
        initialPageParam: 1,
        staleTime: 1000 * 60 * 1,
        refetchOnWindowFocus: true,
        getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.pagination.page + 1 : undefined),
    });

    const loadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    const renderItem = useCallback(({ item }: any) => {
        return <MemberItem item={item} isAdmin={isAdmin} />;
    }, [data?.pages]);

    const filteredData = useMemo(() => {
        return data?.pages.flatMap((page) => page.data) ?? [];
    }, [data?.pages, search])
    const dataCount = useMemo(() => {
        return data?.pages[0].pagination.total ?? [];
    }, [data?.pages]);


    if (status === 'pending')
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
