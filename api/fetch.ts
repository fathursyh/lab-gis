import axios from "axios";
import { host } from "../secrets";

const pc = host ?? "http://localhost:3000";

export async function fetchMembers(token: string, pageParam: any, search: string) {
    const res = await axios.get(`${pc}/api/user/all-users`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000,
        timeoutErrorMessage: "Gagal fetch member.",
        params: { page: pageParam, search: search },
    });
    if (res.status !== 200) throw new Error("Terjadi kesalahan, coba lagi.");
    return res.data;
}

export async function fetchAllBootcampsTagged(token: string, pageParam: any, search: string) {
    const res = await axios.get(`${pc}/api/event/event`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000,
        timeoutErrorMessage: "Gagal fetch bootcamp.",
        params: { page: pageParam, search: search },
    });
    if (res.status !== 200) throw new Error("Terjadi kesalahan, coba lagi.");
    const eventData = res.data.data.map((item: any) => ({...item, price: item.registrations.length > 0 ? item.registrations[0].status : item.price}));
    return {
        data: eventData,
        pagination: res.data.pagination,
        hasMore: res.data.hasMore
    }
}

export async function fetchMyBootcamp(token: string, pageParam: any, search: string) {
    const res = await axios.get(`${pc}/api/event/user-event`, {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 5000,
        timeoutErrorMessage: "Gagal fetch bootcamp.",
        params: { page: pageParam, search: search },
    });
    if (res.status !== 200) throw new Error("Terjadi kesalahan, coba lagi.");
    const eventData = res.data.data.map((item: any) => ({...item.event, price: item.status}));
    return {
        data: eventData,
        pagination: res.data.pagination,
        hasMore: res.data.hasMore
    }
}

export async function fetchBootcampDetail(token: string, id: string) {
    const res = await axios.get(`${pc}/api/event/detail/${id}`, { headers: { Authorization: `Bearer ${token}` }, timeout: 5000, timeoutErrorMessage: "Gagal fetch detail bootcamp." });
    if (res.status !== 200) throw new Error("Terjadi kesalahan, coba lagi.");
    return res.data;
}

export async function getRegistrationData(token: string, eventId: string) {
    const res = await axios.get(`${pc}/api/registration/getRegistration/${eventId}`, { headers: { Authorization: `Bearer ${token}` }, timeout: 5000, timeoutErrorMessage: "Gagal fetch registrasi." });
    if (res.status !== 200) throw new Error("Terjadi kesalahan, coba lagi.");
    return res.data;
}
