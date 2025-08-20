import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../stores/useAuth";
import { router, useLocalSearchParams } from "expo-router";
import { BootcampType } from "../types/BootcampType";
import { colors } from "../constants/colors";
import { checkPembayaranRegistrasi, daftarBootcamp } from "../api/post";
import { Toast } from "toastify-react-native";
import { confirm } from "../utils/helpers";
import { getRegistrationData } from "../api/fetch";
import { useQuery } from "@tanstack/react-query";

export function useCheckout() {
    const { token } = useAuth();
    const { data } = useLocalSearchParams();
    const event: BootcampType = JSON.parse(data as string);
    const [showLink, setShowLink] = useState({
        container: false,
        link: "",
    });
    const [buttonColor, setButtonColor] = useState(colors.error);

    const { data: registration } = useQuery<any>({
           queryKey: [showLink.link, event.id],
           queryFn: () => getRegistrationData(token!, event.id!),
           refetchOnWindowFocus: true,
       });
       useEffect(() => {
           if (registration) {
               setShowLink({
                   container: true,
                   link: registration?.payment.paymentLink,
               });
           }
       }, [registration]);
   
       const isPaid = useMemo(() => {
           return registration?.payment?.payments === "PAID";
       }, [registration]);
   
       async function generateLink() {
           const confirmation = await confirm("Konfirmasi Pendaftaran", `Daftar ${event.title} dan lanjutkan ke pembayaran?`, "Daftar", "default");
           if (!confirmation) return;
           const response = await daftarBootcamp(token!, event.id!);
           if (!response) return;
           setShowLink({
               container: true,
               link: response.paymentLink,
           });
           Toast.success("Link pembayaran berhasil dibuat");
       }
   
       async function checkStatusPembayaran() {
           const check = await checkPembayaranRegistrasi(token!, registration.id);
           if (!check) return;
           setButtonColor(colors.success);
           const timeout = setTimeout(() => {
               clearTimeout(timeout);
               router.navigate("/");
           }, 3000);
       }
       return {
        event,
        buttonColor,
        isPaid,
        showLink,
        checkStatusPembayaran,
        generateLink,
       }
}
