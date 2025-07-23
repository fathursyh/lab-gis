import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../stores/useAuth";
import { fetchMembers } from "../../api/member";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import MemberItem from "./MemberItem";
import { colors } from "../../constants/colors";
import { PropsWithChildren, useCallback, useMemo } from "react";
import { MemberType } from "../../types/MemberType";

export default function MemberList({ search }: PropsWithChildren & any) {
    const { token } = useAuth();
    const { data, isLoading, error } = useQuery({
        queryKey: ["members"],
        queryFn: () => fetchMembers(token!),
        staleTime: 1000 * 60 * 1, // cache 1 menit
        refetchOnWindowFocus: true,
    });
    const renderItem = useCallback(({item}: any) => {
        return (
            <MemberItem {...item} />
        )
    }, [])
    const filteredData = useMemo(() => {
        return data?.filter((item: MemberType) => item.fullName.toLowerCase().includes(search.toLowerCase()));
    }, [search, isLoading]);

    if (isLoading)
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={"large"} />
            </View>
        );
    if (error)
        return (
            <View style={styles.errorContainer}>
                <MaterialIcons name="broken-image" size={50} color={colors.accent} />
                <Text style={{ fontFamily: "poppins" }}>Gagal mengambil data.</Text>
            </View>
        );

    return (
        <>
        <Text style={styles.topInfo}>- {filteredData.length} <Text style={{ fontFamily: 'poppins-light' }}>anggota</Text> -</Text>
        <FlatList initialNumToRender={10} maxToRenderPerBatch={10} contentContainerStyle={styles.memberContainer} data={filteredData} renderItem={renderItem} />
        </>
    );
}

const styles = StyleSheet.create({
    memberContainer: {
        paddingHorizontal: 14,
        paddingBottom: 14,
        gap: 4,
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
        fontFamily: 'poppins-med',
        fontSize: 12,
        textAlign: 'center',
        color: colors.primary500,
    }
});
