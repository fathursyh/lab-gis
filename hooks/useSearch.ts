import { useState } from "react";

export function useSearch() {
    const [search, setSearch] = useState("");
    function changeSearch(value: string) {
        setSearch(value);
    }
    function clearInput() {
        setSearch("");
    }

    return {search, changeSearch, clearInput}
}
