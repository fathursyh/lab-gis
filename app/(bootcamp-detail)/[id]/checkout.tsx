import { useLocalSearchParams } from "expo-router/build/hooks";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BootcampType } from "../../../types/BootcampType";
import rupiahFormat from "../../../utils/formatter";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import dayjs from "dayjs";
import "dayjs/locale/id";
import CustomButton from "../../../components/UI/CustomButton";
import { colors } from "../../../constants/colors";
import Animated, { FadeIn } from "react-native-reanimated";
import { useEffect, useRef, useState } from "react";
import { Toast } from "toastify-react-native";
import { confirm } from "../../../utils/helpers";
import { checkPembayaranRegistrasi, daftarBootcamp } from "../../../api/post";
import { useAuth } from "../../../stores/useAuth";
import { getRegistrationData } from "../../../api/fetch";
import { router } from "expo-router";
dayjs.locale("id");

export default function CheckOutModal() {
    const { token } = useAuth()
    const [showLink, setShowLink] = useState({
        container: false,
        link: '',
    });
    const [buttonColor, setButtonColor] = useState(colors.error);
    const isPaid = useRef(false);

    const { data } = useLocalSearchParams();
    const event: BootcampType = JSON.parse(data as string);
    const registrationId = useRef('')
    async function checkRegistrasi() {
        const registration = await getRegistrationData(token!, event.id!);
        if (registration) {
            setShowLink({
                container: true,
                link: registration.paymentLink
            })
            registrationId.current = registration.id;
            isPaid.current = registration.payments === "PAID" ? true : false
            if(isPaid.current) setButtonColor(colors.success);
        }
    }

    useEffect(() => {
        checkRegistrasi();
    }, [showLink.link]);

    async function generateLink() {
        const confirmation = await confirm("Konfirmasi Pendaftaran", `Daftar ${event.title} dan lanjutkan ke pembayaran?`, "Daftar", "default");
        if (!confirmation) return;
        const response = await daftarBootcamp(token!, event.id!);
        if (!response) return;
        setShowLink({
            container: true,
            link: response.paymentLink
        });
        Toast.success('Link pembayaran berhasil dibuat')
    }
    function copyClipboard() {
        Toast.success("Link berhasil disalin!");
    }

    function openLink() {
        Linking.openURL(showLink.link);
    }

    async function checkStatusPembayaran() {
        const check = await checkPembayaranRegistrasi(token!, registrationId.current)
        if (!check) return;
        setButtonColor(colors.success);
        router.navigate('/');
    }

    return (
        <View style={styles.container}>
            {
                showLink.container &&
                <>
                    <Text style={{ color: colors.success, fontFamily: 'poppins-semi', textAlign: 'center', marginBottom: 4 }}>
                        {
                            isPaid.current ? 'Link sudah dibayar.' :
                            'Buka link di bawah untuk melanjutkan pembayaran'
                        }
                    </Text>
                    <Animated.View
                        entering={FadeIn.duration(700)}
                        style={styles.linkContainer}
                    >
                        <TouchableOpacity onPress={openLink}>
                            <Text style={{ fontFamily: 'poppins', maxWidth: '90%', color: 'blue', textDecorationLine: 'underline' }} numberOfLines={2}>
                                {showLink.link}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={copyClipboard} style={styles.copyButton}>
                            <MaterialIcons name="content-copy" size={20} />
                        </TouchableOpacity>
                    </Animated.View>
                </>
            }
            <View style={styles.card}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={[styles.price, {color: isPaid.current ? 'gray' : colors.primary500}]}>{rupiahFormat(event.price!)}</Text>
                <Text style={styles.date}>{dayjs(event.startDate).format("DD MMMM YY")}</Text>
            </View>
            {
                showLink.link === '' ?
                    <CustomButton customStyle={{ width: '100%', paddingVertical: 14 }} size="lg" onPress={generateLink}>Buat Link Pembayaran</CustomButton>
                    :
                    <CustomButton disabled={isPaid.current} customStyle={{ width: '100%', paddingVertical: 14, backgroundColor: isPaid.current? 'gray' : buttonColor }} size="lg" onPress={checkStatusPembayaran}
                    >
                        {
                            !isPaid.current ? 'Cek Status Pembayaran' : 'Pembayaran Selesai'
                        }
                    </CustomButton>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary500,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    linkContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 6,
        padding: 12,
        paddingHorizontal: 14,
        width: '100%',
        backgroundColor: colors.light,
        marginBottom: 8,
    },
    copyButton: { borderRadius: '100%', backgroundColor: 'white', padding: 8, borderWidth: 0.4 },
    card: {
        backgroundColor: colors.light,
        borderRadius: 12,
        padding: 20,
        width: '100%',
        shadowColor: colors.dark,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: colors.accent,
        marginBottom: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.accent,
        marginBottom: 8,
    },
    price: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    date: {
        fontSize: 14,
        color: 'gray',
    },
});