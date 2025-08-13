import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../stores/useAuth";
import { fetchBootcampDetail } from "../../api/fetch";

export default function DetailBootcamp() {
    const { id } = useLocalSearchParams();
    const { token } = useAuth();
    const { setOptions } = useNavigation();

    const { data, error, isFetching } = useQuery({
        queryKey: [id],
        queryFn: () => fetchBootcampDetail(token!, id as string),
        refetchOnWindowFocus: true,
        staleTime: 1000 * 60 * 1,
    });

    useLayoutEffect(() => {
        if (data) {
            setOptions({
                headerTitleAlign: "left",
                headerTitleStyle: { fontFamily: "poppins-semi", fontSize: 14 },
                title: data?.title ?? 'Bootcamp Detail'
            })
        }
    }, [data]);

    if (isFetching) {
        return (
            <View style={styles.basicContainer}>
                <ActivityIndicator />
            </View>
        )
    }

    if (error) {
        return <View style={styles.basicContainer}>
            <Text style={styles.appText}>Data bootcamp tidak ditemukan</Text>
        </View>
    }

    return (
        <View>
            <Text>{data?.price}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    appText: {
        fontFamily: 'poppins',
    },
    basicContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' }
})