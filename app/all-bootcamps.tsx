import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRef, useState } from "react";
import { colors } from "../constants/colors";
import CustomButton from "../components/UI/CustomButton";

export default function AllBootcamps() {
    const inputRef = useRef<TextInput>(null);
    const inputText = useRef("");
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
                        placeholder="Cari judul atau mentor"
                        inputMode="search"
                        clearButtonMode="while-editing"
                        autoCorrect
                        verticalAlign="middle"
                        submitBehavior="blurAndSubmit"
                        returnKeyType="search"
                        onChangeText={(value) => (inputText.current = value)}
                        onSubmitEditing={changeSearch}
                        placeholderTextColor={colors.placeholder}
                    />
                    <TouchableOpacity
                        style={styles.clearButton}
                        onPress={() => {
                            inputRef.current?.clear();
                            setSearch("");
                        }}
                    >
                        <MaterialIcons name="close" size={18} color={colors.placeholder} />
                    </TouchableOpacity>
                </View>
                <CustomButton size="sm" onPress={changeSearch}>
                    Cari
                </CustomButton>
            </View>
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
        paddingEnd: 32,
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
