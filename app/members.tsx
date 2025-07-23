import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../components/UI/CustomButton";
import { colors } from "../constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const customData = [
    { id: "aa", fullName: "Fathur Syah", role: "member" },
    { id: "ab", fullName: "Fathur Syah", role: "member" },
    { id: "22", fullName: "Fathur Syah", role: "member" },
    { id: "14", fullName: "Fathur Syah", role: "member" },
    { id: "a5", fullName: "Fathur Syah", role: "member" },
    { id: "ac", fullName: "Fathur Syah", role: "member" },
    { id: "ac2", fullName: "Fathur Syah", role: "member" },
    { id: "ac5", fullName: "Fathur Syah", role: "member" },
    { id: "24", fullName: "Fathur Syah", role: "member" },
    { id: "5a", fullName: "Fathur Syah", role: "member" },
];
export default function Members() {
    return (
        <View style={styles.rootContainer}>
            <View style={styles.headerContainer}>
                <TextInput style={styles.searchbar} placeholder="Cari member" inputMode="search" clearButtonMode="while-editing" autoCorrect verticalAlign="middle" />
                <CustomButton size="sm">Cari</CustomButton>
            </View>
            <FlatList
                contentContainerStyle={styles.memberContainer}
                data={customData}
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: colors.accent,
                            borderRadius: 4,
                            flexDirection: "row",
                            height: 80,
                            borderWidth: 0.4,
                            padding: 4,
                            elevation: 4,
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <MaterialIcons name="person" size={32} color={colors.light} />
                        </View>
                        <View
                            style={{
                                flex: 4,
                            }}
                        >
                            <Text
                                style={{
                                    fontFamily: "poppins-med",
                                    color: colors.light,
                                }}
                            >
                                {item.fullName}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "poppins",
                                    color: colors.background,
                                }}
                            >
                                {item.role}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: "poppins-light",
                                    fontSize: 12,
                                    color: colors.background,
                                }}
                            >
                                Bergabung 20 Jun 2025
                            </Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center', aspectRatio: 1 }}>
                            <Pressable android_ripple={{ color: colors.light, borderless: true }}>
                                <MaterialIcons name="info" size={32} color={colors.light} />
                            </Pressable>
                        </View>
                    </View>
                )}
            />
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
    },
    memberContainer: {
        paddingHorizontal: 14,
        paddingBottom: 14,
        gap: 4,
    },
});
