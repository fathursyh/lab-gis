import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent, postEvent, updateEvent } from "../api/admin";
import { useAuth } from "../stores/useAuth";
import { BootcampType } from "../types/BootcampType";
import { Toast } from "toastify-react-native";
import { useRouter } from "expo-router";

type EventMutationProps = {
    search?: string;
};
export const useEventMutations = ({ search }: EventMutationProps) => {
    const queryClient = useQueryClient();
    const { dismiss } = useRouter();
    const { token } = useAuth();

    const addMutation = useMutation({
        mutationFn: (data: any) => postEvent(token!, data),
        onSuccess: () => {
            Toast.success("Data berhasil ditambah!");
            dismiss(1);
        },
        onError: (_err, _id, _) => {
            Toast.error("Terjadi kesalahan!");
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["bootcamps"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });

        },
    });

    const updateMutation = useMutation({
        mutationFn: ({data, id}: any) => updateEvent(token!, data, id),
        onSuccess: () => {
            Toast.success("Data berhasil diupdate!");
            dismiss(1);
        },
        onError: (_err: any, _id, _) => {
            Toast.error("Terjadi kesalahan!");
            console.log(_err?.response.message)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["bootcamps"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: ({ id }: any) => deleteEvent(token!, id),
        onMutate: async ({ id, _ }: any) => {
            await queryClient.cancelQueries({ queryKey: ["bootcamps", search] });

            const previousData = queryClient.getQueryData<InfiniteData<any>>(["bootcamps", search]);

            queryClient.setQueryData<InfiniteData<any>>(["bootcamps", search], (oldData) => {
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
                queryClient.setQueryData(["bootcamps", search], context.previousData);
            }
            Toast.error("Terjadi kesalahan!");
        },
        onSettled: () => {
            search !== "" && queryClient.invalidateQueries({ queryKey: ["bootcamps"] });
            queryClient.invalidateQueries({ queryKey: ["dashboard"] });
        },
    });

    return {
        addMutation,
        updateMutation,
        deleteMutation,
    };
};
