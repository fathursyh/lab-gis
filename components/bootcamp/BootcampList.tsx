import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from "../../constants/colors";
import { useCallback, useMemo } from "react";
import BootcampItem from "./BootcampItem";
import { useAuth } from "../../stores/useAuth";
import { useInfiniteQuery } from "@tanstack/react-query";
import GridFlat from "../UI/containers/GridFlat";
import { useRouter } from "expo-router";

type BootcampProps = {
    search: string,
    queryKey: string,
    fetchFn: (token: string, params: any, search: string) => any
}

export default function BootcampList({ queryKey, search, fetchFn }: BootcampProps) {
    const { token } = useAuth();
    const router = useRouter();
    const selectItem = useCallback((data: string) => {
        router.navigate({
            pathname: `/(bootcamp-detail)/${data}`,
        })
        
    }, [])
    const { data, fetchNextPage, isFetchingNextPage, hasNextPage, status, refetch } = useInfiniteQuery({
        queryKey: [queryKey, search],
        queryFn: (params) => fetchFn(token!, params.pageParam, search),
        initialPageParam: 1,
        staleTime: 1000 * 60 * 10,
        getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.pagination.page + 1 : undefined),
    });

    const loadMore = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    const filteredData = useMemo(() => {
        return data?.pages.flatMap((page) => page.data) ?? [];
    }, [data?.pages, search])
    const dataCount = useMemo(() => {
        return data?.pages[0].pagination.total ?? [];
    }, [data?.pages]);

    const renderItem = useCallback((item: any) => {
        return <BootcampItem {...item} />;
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
        <View style={styles.rootContainer}>
            <View style={styles.listInfo}>
                <Text style={styles.listInfoText}><Text style={{ fontFamily: 'poppins-semi', color: colors.primary500 }}>{dataCount}</Text> Bootcamp</Text>
                <Pressable android_ripple={{ color: 'white' }} style={styles.refreshButton} onPress={() => refetch({ throwOnError: true })}>
                    <MaterialIcons name="refresh" size={24} />
                </Pressable>
            </View>
            {filteredData.length > 0 ? (
                <>
                    <GridFlat
                        items={filteredData}
                        handleLoadMore={loadMore}
                        flatKey={(filteredData) => filteredData.id}
                        renderItem={renderItem}
                        pressItem={selectItem}
                    />
                    {isFetchingNextPage &&
                        <ActivityIndicator style={{ paddingVertical: 4 }} />
                    }
                </>
            ) :
                <View style={styles.errorContainer}>
                    <Text style={{ fontFamily: 'poppins' }}>Bootcamp Kosong</Text>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    listInfo: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 16
    },
    listInfoText: {
        fontFamily: 'poppins',
        fontSize: 12,
        color: 'gray'
    },
    refreshButton: {
        padding: 4,
        backgroundColor: colors.background,
        borderRadius: '100%',
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
})