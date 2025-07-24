import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import GridFlat from "../../../components/UI/containers/GridFlat";
import { useAuth } from "../../../stores/useAuth";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllProjects } from "../../../api/project";
import { useMemo } from "react";

export default function ProjectTab() {
    const { token } = useAuth();
    const { data, fetchNextPage, isFetchingNextPage, hasNextPage, status } = useInfiniteQuery({
        queryKey: ["all-projects"],
        queryFn: (params) => fetchAllProjects(token!, params.pageParam),
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

    const projects = useMemo(() => {
        return data?.pages.flatMap((page) => page.data) ?? [];
    }, [data?.pages]);

    if (status === "pending")
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={"large"} />
            </View>
        );

    return <GridFlat handleLoadMore={loadMore} items={projects} flatKey={(item: any) => item.id} renderItem={(item: any) => <Text>{item.title}</Text>} />;
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 0.8,
        justifyContent: "center",
    },
});
