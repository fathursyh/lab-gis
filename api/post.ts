import axios from "axios";
import { host } from "../secrets";
import { Toast } from "toastify-react-native";

const pc = host ?? "http://localhost:3000";

export async function daftarBootcamp(token: string, id: string) {
    try {
        const res = await axios(`${pc}/api/event/${id}/register`, {
            headers: { Authorization: `Bearer ${token}` },
            method: 'post',
            timeout: 5000,
            timeoutErrorMessage: "Pendaftaran Gagal.",
        });
        return res.data;
    } catch (err: any) {
        Toast.error('Terjadi Kesalahan');
        return false;
    }
}

export async function checkPembayaranRegistrasi(token: string, registrationId: string) {
    try {
        await axios(`${pc}/api/payments/check-payment`, {
            headers: { Authorization: `Bearer ${token}` },
            method: 'post',
            data: { registrationId },
            timeout: 5000,
            timeoutErrorMessage: "Gagal terhubung.",
        });
        Toast.success('Pembayaran sudah selesai');
        return true;
    } catch (err: any) {
        Toast.error(err.response.data.message);
        return false;
    }
}

export async function absenQr(token: string, qrData: any) {
       try {
        const res = await axios(`${pc}/api/event/mark-attendance`, {
            headers: { Authorization: `Bearer ${token}` },
            method: 'post',
            data: { eventId: qrData.eventId, date: qrData.date, qrCode: qrData.qrCode },
            timeout: 5000,
            timeoutErrorMessage: "Gagal absensi.",
        });
        return res;
    } catch (err: any) {
        return err.response
    }
}