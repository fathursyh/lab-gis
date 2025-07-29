import axios from "axios";
import { host } from "../secrets";

const pc = host ?? "http://localhost:3000";

export async function fetchMembers(token: string, pageParam: any) {
    const res = await axios.get(`${pc}/api/user/all-users`, {headers: {Authorization: `Bearer ${token}`}, timeout: 10000, timeoutErrorMessage: 'Gagal fetch project.', params: {page: pageParam}});
    if (res.status !== 200) throw new Error('Terjadi kesalahan, coba lagi.');
    return res.data;
}