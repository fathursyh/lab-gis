import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Keyboard } from "react-native";

export function useSearch() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState("");
    function changeSearch(value: string) {
        Keyboard.dismiss();
        setSearch(value);
    }
    function clearInput() {
        setSearch("");
    }

    return {search, changeSearch, clearInput}
}
