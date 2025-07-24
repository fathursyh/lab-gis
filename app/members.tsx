import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import CustomButton from "../components/UI/CustomButton";
import { colors } from "../constants/colors";
import MemberList from "../components/members/MemberList";
import { useRef, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Members() {
    const inputRef = useRef<TextInput>(null);
    const inputText = useRef('');
    const [search, setSearch] = useState("");
    function changeSearch() {
        setSearch(inputText.current);
    }
    return (
        <View style={styles.rootContainer}>
            <View style={styles.headerContainer}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                    <TextInput
                    ref={inputRef}
                        style={styles.searchbar}
                        placeholder="Cari member"
                        inputMode="search"
                        clearButtonMode="while-editing"
                        autoCorrect
                        verticalAlign="middle"
                        submitBehavior="blurAndSubmit"
                        returnKeyType="search"
                        onChangeText={(value) => inputText.current = value}
                        onSubmitEditing={changeSearch}
                        placeholderTextColor={colors.placeholder}
                    />
                    <TouchableOpacity style={styles.clearButton} onPress={() => {
                        inputRef.current?.clear(); setSearch('');
                    }}>
                        <MaterialIcons name="close" size={18} color={colors.placeholder} />
                    </TouchableOpacity>
                </View>
                <CustomButton size="sm" onPress={changeSearch}>
                    Cari
                </CustomButton>
            </View>
            <MemberList search={search} />
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: colors.light,
    },
    headerContainer: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 8,
        paddingVertical: 14,
        gap: 4,
        marginBottom: 8,
        elevation: 4,
    },
    searchbar: {
        borderWidth: 0.5,
        borderColor: colors.primary500,
        borderRadius: 8,
        flex: 1,
        paddingHorizontal: 12,
        fontFamily: "poppins",
        color: colors.primary500,
        paddingEnd: 32
    },
    clearButton: {
        position: "absolute",
        right: -4,
        height: "100%",
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
});
