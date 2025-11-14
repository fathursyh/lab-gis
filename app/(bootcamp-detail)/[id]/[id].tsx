import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useMemo } from "react";
import { ActivityIndicator, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useAuth } from "../../../stores/useAuth";
import { fetchBootcampDetail, getCertificate } from "../../../api/fetch";
import BootcampDetailCard from "../../../components/bootcamp/BootcampDetailCard";
import { BootcampType } from "../../../types/BootcampType";
import dayjs from "dayjs";
import "dayjs/locale/id";
import rupiahFormat from "../../../utils/formatter";
import CustomButton from "../../../components/UI/CustomButton";
import { host } from "../../../host";
import { confirm, defaultImage } from "../../../utils/helpers";
import { generateTodayQR } from "../../../api/admin";
import LottieView from "lottie-react-native";
import Success from "../../../assets/Success.json";

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

    async function generateQR() {
        if (!isAdmin) return;
        const confirmation = await confirm("Generate QR", `Buat dan share kode QR untuk hari ini?`, "OK", "default");
        if (!confirmation) return;
        await generateTodayQR(token!, data?.id!);
    }

    const isPassed = useMemo(() => {
        const [registration] = data?.registrations ?? [];
        if (registration?.status === 'passed') return true;
        return false
    }, [data?.registrations]);

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
                <Image src={data?.banner ? `${host}${data?.banner}` : defaultImage} style={styles.banner} resizeMode="cover" />
            </View>
            <View style={styles.body}>
                {!isAdmin ? (
                    <CustomButton
                        disabled={data?.endRegisterDate}
                        isDisabled={data?.endRegisterDate}
                        customStyle={{ paddingVertical: 16, marginBottom: 6 }}
                        type="accent"
                        size="lg"
                        onPress={() => router.navigate({ pathname: `/(bootcamp-detail)/${id}/checkout`, params: { data: JSON.stringify(data) } })}
                    >
                        {data?.registrations.length > 0 ? "Lihat Pembayaran" : "Daftar Bootcamp"}
                    </CustomButton>
                ) : (
                    <CustomButton
                        disabled={!data?.endRegisterDate}
                        isDisabled={!data?.endRegisterDate}
                        customStyle={{ paddingVertical: 16, marginBottom: 6 }}
                        type="accent"
                        size="lg"
                        onPress={generateQR}
                    >
                        Generate QR
                    </CustomButton>
                )}
                {
                    !isPassed ?
                        <DetailBody data={data} />
                        :
                        <PassedView token={token} id={data?.registrations[0].id} />
                }
            </View>
        </View>
    );
}

function DetailBody({ data }: { data: BootcampType | undefined }) {
    const startDate = useMemo(() => {
        return dayjs(data?.startDate).format("DD MMMM YYYY");
    }, [data]);
    const endDate = useMemo(() => {
        return dayjs(data?.endDate).format("DD MMMM YYYY");
    }, [data]);
    const registerDate = useMemo(() => {
        return dayjs(data?.registerDate).format("DD MMMM YYYY");
    }, [data]);

    const price = useMemo(() => {
        return rupiahFormat(data?.price ?? 0);
    }, [data]);

    const status = useMemo(() => {
        return data?.endRegisterDate ? 'Tutup'
            : `${registerDate} ( ${dayjs(data?.startDate).diff(data?.registerDate, "day")} hari )`;
    }, [data]);

    return (
        <ScrollView contentContainerStyle={{ gap: 4 }}>
            <BootcampDetailCard title="Harga Bootcamp" body={price} />
            <BootcampDetailCard title="Tentang Bootcamp" body={data?.description} />
            <BootcampDetailCard title="Mentor" body={data?.mentor} />
            <BootcampDetailCard title="Pembukaan Registrasi" body={status} />
            <View style={styles.bodyGrid}>
                <BootcampDetailCard title="Tanggal Mulai" body={startDate} extraStyle={{ flex: 1 }} />
                <BootcampDetailCard title="Tanggal Selesai" body={endDate} extraStyle={{ flex: 1 }} />
            </View>
            <View style={styles.bodyGrid}>
                <BootcampDetailCard title="Lokasi Offline" body={data?.location} extraStyle={{ flex: 3 }} />
                <BootcampDetailCard title="Quota" body={data?.quota} extraStyle={{ flex: 2 }} />
            </View>
            <BootcampDetailCard title="Link Online" body={data?.onlineLocation} />
        </ScrollView>
    )
}

function PassedView({ token, id }: any) {
    const { data: certificate } = useQuery({
        queryKey: ['get-certificate', id],
        queryFn: () => getCertificate(token!, id),
        staleTime: 0,
        gcTime: 0,
    })
    function openCertificate() {
        Linking.openURL(`${host}/certificate/${certificate.certificateNumber}`);
    }
    return (
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.8 }}>
            <LottieView source={Success} autoPlay loop={false} style={styles.lottie} />
            <Text style={{ fontFamily: 'poppins-bold', fontSize: 18 }}>Anda Sudah Lulus!</Text>
            <TouchableOpacity style={styles.sertifikat} onPressIn={openCertificate}>
                <Text style={{ fontFamily: 'poppins', fontSize: 16, color: 'blue' }}>Lihat Sertifikat</Text>
                <MaterialIcons name="open-in-new" size={20} color={'blue'} />
            </TouchableOpacity>
        </View>
    )
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
        height: "100%",
        width: "100%",
    },
    body: {
        flex: 4,
        padding: 12,
        paddingBottom: "12%",
    },
    bodyGrid: {
        flexDirection: "row",
        justifyContent: "space-between",
        gap: 4,
    },
    lottie: { height: 100, width: 100 },
    sertifikat: {
        flexDirection: 'row',
        gap: 4
    }

});
