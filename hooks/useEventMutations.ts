import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent, postEvent, updateEvent } from "../api/admin";
import { useAuth } from "../stores/useAuth";
import { BootcampType } from "../types/BootcampType";
import { Toast } from "toastify-react-native";

type EventMutationProps = {
    search?: string;
    extraKey?: any
};
export const useEventMutations = ({ search, extraKey }: EventMutationProps) => {
    const queryClient = useQueryClient();
    const { token } = useAuth();

    const addMutation = useMutation({
        mutationFn: (data: any) => postEvent(token!, data),
        onSuccess: () => {
            Toast.success("Data berhasil ditambah!");
            queryClient.invalidateQueries({ queryKey: ["admin-bootcamps", extraKey] });
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        },
        onError: (_err, _id, _) => {
            Toast.error("Terjadi kesalahan!");
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ data, id }: any) => updateEvent(token!, data, id),
        onSuccess: () => {
            Toast.success("Data berhasil diupdate!");
            queryClient.invalidateQueries({ queryKey: ["admin-bootcamps", extraKey] });
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        },
        onError: (_err: any, _id, _) => {
            Toast.error("Terjadi kesalahan!");
        },
    });

    const deleteMutation = useMutation({
        mutationFn: ({ id }: any) => deleteEvent(token!, id),
        onMutate: async ({ id, _ }: any) => {
            await queryClient.cancelQueries({ queryKey: ["admin-bootcamps", search, extraKey] });

            const previousData = queryClient.getQueryData<InfiniteData<any>>(["admin-bootcamps", search, extraKey]);

            queryClient.setQueryData<InfiniteData<any>>(["admin-bootcamps", search, extraKey], (oldData) => {
                if (!oldData) return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.flatMap((page) => ({
                        ...page,
                        pagination: {
                            ...page.pagination,
                            total: page.pagination.total - 1,
                        },
                        data: page.data.filter((item: BootcampType) => item.id !== id),
                    })),
                };
            });
            return { previousData };
        },
        onSuccess: () => {
            Toast.success("Data berhasil dihapus!");
        },
        onError: (_err, _id, context) => {
            if (context?.previousData) {
                queryClient.setQueryData(["admin-bootcamps", search, extraKey], context.previousData);
            }
            Toast.error("Terjadi kesalahan!");
        },
        onSettled: () => {
            search !== "" && queryClient.invalidateQueries({ queryKey: ["admin-bootcamps", extraKey] });
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        },
    });

    return {
        addMutation,
        updateMutation,
        deleteMutation,
    };
};
