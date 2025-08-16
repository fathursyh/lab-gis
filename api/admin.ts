import axios from "axios";
import { host } from "../secrets";

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

export async function deleteEvent(token: string, id: string, title: string) {
    return axios.delete(`${pc}/api/event/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000,
        timeoutErrorMessage: "Gagal menghapus event.",
    });

}