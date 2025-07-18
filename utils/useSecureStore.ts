import * as SecureStore from "expo-secure-store";

export default function useSecureStore() {
    const save = async (key: string, value: string): Promise<void> => {
        await SecureStore.setItemAsync(key, value);
    };
    const getValue = async (key: string): Promise<any> => {
        return await SecureStore.getItemAsync(key) ?? null;
    };
    const deleteItem = async(key: string) => {
        await SecureStore.deleteItemAsync(key);
    }

    return {getValue, save, deleteItem}
}
