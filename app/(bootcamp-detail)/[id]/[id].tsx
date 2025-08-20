import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useMemo } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../../stores/useAuth";
import { fetchBootcampDetail } from "../../../api/fetch";
import BootcampDetailCard from "../../../components/bootcamp/BootcampDetailCard";
import { BootcampType } from "../../../types/BootcampType";
import dayjs from "dayjs";
import "dayjs/locale/id";
import rupiahFormat from "../../../utils/formatter";
import CustomButton from "../../../components/UI/CustomButton";
import { host } from "../../../secrets";
import { defaultImage } from "../../../utils/helpers";
dayjs.locale("id");


export default function DetailBootcamp() {
    const { id } = useLocalSearchParams();
    const { token, isAdmin } = useAuth();
    const { setOptions } = useNavigation();

    const { data, error, isFetching } = useQuery<BootcampType>({
        queryKey: [id],
        queryFn: () => fetchBootcampDetail(token!, id as string),
        refetchOnWindowFocus: true,
    });

    const formattedDate = useMemo(() => {
        return dayjs(data?.startDate).format("DD MMMM YYYY");
    }, [data]);

    const price = useMemo(() => {
        return rupiahFormat(data?.price ?? 0);
    }, [data]);

    useLayoutEffect(() => {
        if (data) {
            setOptions({
                headerTitleAlign: "left",
                headerTitleStyle: { fontFamily: "poppins-semi", fontSize: 14 },
                title: data?.title ?? "Bootcamp Detail",
            });
        }
    }, [data]);

    if (isFetching) {
        return (
            <View style={styles.basicContainer}>
                <ActivityIndicator />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.basicContainer}>
                <Text style={styles.appText}>Data bootcamp tidak ditemukan</Text>
            </View>
        );
    }
    return (
        <View style={styles.rootContainer}>
            <View style={styles.header}>
                <Image src={data?.banner ? `${host}${data?.banner}`: defaultImage} style={styles.banner} resizeMode="cover" />
            </View>
            <View style={styles.body}>
                {
                    !isAdmin ?
                <CustomButton customStyle={{ paddingVertical: 16, marginBottom: 6, }} type="accent" size="lg" onPress={() => router.navigate({pathname: `/(bootcamp-detail)/${id}/checkout`, params: {data: JSON.stringify(data)}})}>
                    {
                        data?.registrations.length > 0 ? 
                        'Lihat Pembayaran' : 'Daftar Bootcamp'
                    }
                </CustomButton> : undefined
                }
                <ScrollView contentContainerStyle={{ gap: 4 }}>
                    <BootcampDetailCard title="Harga Bootcamp" body={price} />
                    <BootcampDetailCard title="Tentang Bootcamp" body={data?.description} />
                    <BootcampDetailCard title="Mentor" body={data?.mentor} />
                    <View style={styles.bodyGrid}>
                        <BootcampDetailCard title="Tanggal Event" body={formattedDate} extraStyle={{ flex: 3 }} />
                        <BootcampDetailCard title="Quota" body={data?.quota} extraStyle={{ flex: 2 }} />
                    </View>
                    <BootcampDetailCard title="Lokasi" body={data?.location} />
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appText: {
        fontFamily: "poppins",
    },
    basicContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
    rootContainer: {
        flex: 1,
    },
    header: {
        flex: 2,
        backgroundColor: "gray",
    },
    banner: {
        height: '100%',
        width: '100%'
    },
    body: {
        flex: 3,
        padding: 12,
        paddingBottom: '12%',
    },
    bodyGrid: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 4,
    },
});
