import { useState } from "react";
import { Keyboard } from "react-native";

export function useSearch() {
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
