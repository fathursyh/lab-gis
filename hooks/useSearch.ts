import { useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Alert, Keyboard } from "react-native";

export function useSearch() {
    const [search, setSearch] = useState("");
    function changeSearch(value: string) {
        Keyboard.dismiss();
        setSearch(value);
    }
    function clearInput() {
        setSearch("");
    }

    return { search, changeSearch, clearInput };
}

export function useHandleDirtyForm(isDirty: boolean, isValid: boolean, isSuccess: boolean) {
    const navigation = useNavigation();
    const unsubscribe = useCallback(
        (e: any) => {
            if (!isDirty || (isValid && isSuccess)) {
                return;
            }
            e.preventDefault();
            Alert.alert("Hapus perubahan?", "Anda punya perubahan tidak tersimpan. Yakin ingin meninggalkan form?", [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Discard",
                    style: "destructive",
                    onPress: () => navigation.dispatch(e.data.action),
                },
            ]);
        },
        [navigation, isDirty, isValid, isSuccess]
    );
    useEffect(() => {
        navigation.addListener("beforeRemove", unsubscribe);
        return () => {
            navigation.removeListener("beforeRemove", unsubscribe);
        };
    }, [navigation, isDirty, isValid, isSuccess]);
}
