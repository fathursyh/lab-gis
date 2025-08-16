import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from "../../constants/colors";
import { useCallback } from "react";
import BootcampItem from "./BootcampItem";
import GridFlat from "../UI/containers/GridFlat";
import { useRouter } from "expo-router";
import ListInfo from "../UI/ListInfo";
import { useInfiniteFetch } from "../../hooks/useInfiniteFetch";

type BootcampProps = {
    search: string,
    queryKey: string,
    fetchFn: (token: string, params: any, search: string) => any
}
export default function BootcampList({ queryKey, search, fetchFn }: BootcampProps) {
    const router = useRouter();
    const selectItem = useCallback((data: string) => {
        router.navigate({
            pathname: `/(bootcamp-detail)/${data}`,
        })
    }, []);

    const {
        data,
        dataCount,
        isRefetching,
        isFetchingNextPage,
        status,
        filteredData,
        refetch,
        loadMore
    } = useInfiniteFetch({ search, fetchFn: fetchFn, queryKey: 'bootcamps', stale: 1000 * 60 * 2 });

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
            <>
                <ListInfo refetch={refetch} dataCount={dataCount} />
                <View style={styles.errorContainer}>
                    <MaterialIcons name="broken-image" size={50} color={colors.accent} />
                    <Text style={{ fontFamily: "poppins" }}>Gagal mengambil data.</Text>
                </View>
            </>
        );

    return (
        <View style={styles.rootContainer}>
            <ListInfo refetch={refetch} dataCount={dataCount} />
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