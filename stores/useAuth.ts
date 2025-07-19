import { create } from "zustand";
import useSecureStore from "../utils/useSecureStore";
import { Toast } from "toastify-react-native";
import { confirm } from "../utils/helpers";

type AuthState = {
    isAuthenticated: boolean;
    token: null | string;
    user: null | { id: string; name: string };
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    persistLogin: () => Promise<void>;
};

export const useAuth = create<AuthState>((set) => ({
    isAuthenticated: false,
    token: null,
    user: null,
    login: async (email, password) => {
        const user = { id: "siapa", name: "nama" };
        const token = "contoh-token";
        // try {
        //     // logic login disini
        // } catch (error) {
        //     return;
        // }

        // mutating
        set({ isAuthenticated: true, user: user, token: token });
        await useSecureStore().save("user", JSON.stringify(user));
        await useSecureStore().save("token", token);
        Toast.success('Login telah berhasil!')
    },
    logout: async () => {
        const confirmation = await confirm('Yakin ingin keluar akun?', 'Anda akan keluar dari akun user.', 'Keluar', 'destructive');
        if (!confirmation) return;
        set({ isAuthenticated: false, user: null, token: null });
        await useSecureStore().deleteItem("token");
        await useSecureStore().deleteItem("user");
        Toast.info('Berhasil logout dari akun')
    },
    persistLogin: async () => {
        const storedUser = await useSecureStore().getValue("user").then(data => JSON.parse(data));
        const storedToken = await useSecureStore().getValue("token");
        // check token dulu, refresh kalo ga valid
        if (storedUser && storedToken) {
            // ceritanya token baru / atau lama
            const token = "contoh-token";
            set({ isAuthenticated: true, user: storedToken, token: token });
            await useSecureStore().save("user", storedUser);
            await useSecureStore().save("token", token);
        } 
    },
}));
