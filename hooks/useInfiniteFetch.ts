import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuth } from "../stores/useAuth";
import { useMemo } from "react";

type Props = {
    search: string,
    queryKey: string
    fetchFn: (token: string, pageParams: any, search: string) => any,
    stale?: number
}
export function useInfiniteFetch({ search, queryKey, fetchFn, stale }: Props) {
    const { token } = useAuth();
    const { data, fetchNextPage, isFetchingNextPage, hasNextPage, status, refetch, isRefetching } = useInfiniteQuery({
        queryKey: [queryKey, search],
        queryFn: (params) => fetchFn(token!, params.pageParam, search),
        initialPageParam: 1,
        staleTime: stale ?? undefined,
        gcTime: search !== '' ? 0 : 5 * 60 * 1000,
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

    return {
        token,
        data,
        filteredData,
        dataCount,
        status,
        isFetchingNextPage,
        refetch,
        isRefetching,
        loadMore,
    }
}