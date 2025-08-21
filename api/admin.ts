import axios from "axios";
import { host } from "../secrets";
import { BootcampType } from "../types/BootcampType";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
const pc = host ?? "http://localhost:3000";

export async function fetchAllBootcamp(token: string, pageParam: any, search: string) {
    const res = await axios.get(`${pc}/api/event/`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000,
        timeoutErrorMessage: "Gagal fetch bootcamp.",
        params: { page: pageParam, search: search },
    });
    if (res.status !== 200) throw new Error("Terjadi kesalahan, coba lagi.");
    return res.data;
}

export async function postEvent(token: string, data: BootcampType) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return await axios.post(`${pc}/api/event/store`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
        timeout: 5000,
    });
}
export async function updateEvent(token: string, data: BootcampType, id: string) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return await axios.put(`${pc}/api/event/${id}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
        timeout: 5000,
    });
}

export async function deleteEvent(token: string, id: string) {
    return axios.delete(`${pc}/api/event/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000,
        timeoutErrorMessage: "Gagal menghapus event.",
    });
}

export async function fetchDashboardData(token: string) {
    const res = await axios.get(`${pc}/api/admin-only/dashboard`, { headers: { Authorization: `Bearer ${token}` }, timeout: 5000, timeoutErrorMessage: "Gagal fetch dashboard." });
    return res.data;
}

export async function generateTodayQR(token: string, eventId: string) {
    try {
        const res = await axios.get(`${pc}/api/event/${eventId}/generate-qr`, { headers: { Authorization: `Bearer ${token}` }, timeout: 5000 });
        const { qrCode } = res.data;
        const base64 = qrCode.split(",")[1];
        const fileUri = FileSystem.cacheDirectory + "qr.png";

        await FileSystem.writeAsStringAsync(fileUri, base64, { encoding: FileSystem.EncodingType.Base64 });

        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(fileUri);
        } else {
            alert("Sharing tidak tersedia.");
        }
    } catch (err: any) {
        console.log(err);
        return err.response.message;
    }
}
