import { create } from "zustand";
import useSecureStore from "../utils/useSecureStore";

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
    },
    logout: async () => {
        set({ isAuthenticated: false, user: null, token: null });
        await useSecureStore().deleteItem("token");
        await useSecureStore().deleteItem("user");
    },
    persistLogin: async () => {
        const storedUser = await useSecureStore().getValue("user");
        const storedToken = await useSecureStore().getValue("token");
        // check token dulu, refresh kalo ga valid
        if (storedUser && storedToken) {
            // ceritanya token baru / atau lama
            const token = "contoh-token";
            set({ isAuthenticated: true, user: storedToken, token: token });
            await useSecureStore().save("user", JSON.stringify(storedUser));
            await useSecureStore().save("token", token);
        }
    },
}));
