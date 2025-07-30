import { create } from "zustand";
import useSecureStore from "../utils/useSecureStore";
import { Toast } from "toastify-react-native";
import { confirm } from "../utils/helpers";
import axios from "axios";
import { host } from '../secrets';

const pc = host ?? "http://localhost:3000";

type AuthState = {
    isAuthenticated: boolean;
    token: null | string;
    user: null | { id: string; fullName: string, email: string, role: string };
    register: (email: string, fullName: string, password: string) => Promise<{error: string | null}>;
    login: (email: string, password: string) => Promise<{error: string | null}>;
    logout: () => Promise<void>;
    persistLogin: () => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
    isAuthenticated: false,
    token: null,
    user: null,
    register: async (email, fullName, password) => {
        try {
            const res = (await axios.post(`${pc}/api/auth/register`, { email: email, fullName: fullName, password: password }, { timeout: 10000, timeoutErrorMessage: 'Ada gangguan pada jaringan, coba lagi nanti.' })).data;
            set({ isAuthenticated: true, user: res.user, token: res.token });
            await useSecureStore().save("user", JSON.stringify(res.user));
            await useSecureStore().save("token", res.token);
            Toast.success("Registrasi telah berhasil!");
            return {error: null}
        } catch (e: any) {
            console.log(e);
            if (e.status === 500) return { error: "Ada kesalahan pada server. Coba lagi nanti." };
            return { error: "Terjadi kesalahan, coba lagi nanti." };
        }
    },
    login: async (email: string, password: string) => {
        try {
            const res = (await axios.post(`${pc}/api/auth/login`, { email: email, password: password }, { timeout: 10000, timeoutErrorMessage: 'Ada gangguan pada jaringan, coba lagi nanti.'})).data;
            set({ isAuthenticated: true, user: res.user, token: res.token });
            await useSecureStore().save("user", JSON.stringify(res.user));
            await useSecureStore().save("token", res.token);
            Toast.success("Login telah berhasil!");
            return {error: null}
        } catch (e: any) {
            if (e.status === 500) return { error: "Ada kesalahan pada server. Coba lagi nanti." };
            if (e.message === 'Network Error') return {error: "Ada kesalahan jaringan, coba lagi nanti."}
            return { error: "Email atau password salah." };
        }
    },
    logout: async () => {
        const confirmation = await confirm("Logout dari iGIS?", "Anda akan keluar dari akun.", "Keluar", "destructive");
        if (!confirmation) return;
        set({ isAuthenticated: false, user: null, token: null });
        await useSecureStore().deleteItem("token");
        await useSecureStore().deleteItem("user");
        Toast.info("Berhasil logout dari akun");
    },
    persistLogin: async () => {
        const storedUser = await useSecureStore()
            .getValue("user")
            .then((data) => JSON.parse(data));
        const storedToken = await useSecureStore().getValue("token");
        const res = await axios.get(`${pc}/api/user/token-check`, { headers: { Authorization: `Bearer ${storedToken}` } });
        if (res.status !== 200) {
            set({ isAuthenticated: false, user: null, token: null });
            await useSecureStore().deleteItem("user");
            await useSecureStore().deleteItem("token");
            return;
        }
        set({ isAuthenticated: true, user: storedUser, token: storedToken });
        await useSecureStore().save("user", storedUser);
        await useSecureStore().save("token", storedToken);
    },
}));
