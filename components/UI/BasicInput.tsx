import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";
import { colors } from "../../constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type InputProps = {
    label: string;
    password?: boolean;
    containerStyle?: ViewStyle;
    extraStyle?: TextStyle;
    errorMessage?: string | null;
};

export default function BasicInput({ label, extraStyle, containerStyle, password = false, errorMessage, ...Attr }: PropsWithChildren<TextInputProps> & InputProps) {
    const [showPassword, setShowPassword] = useState(false);

    const secureText = useMemo(() => {
        if (password && !showPassword) return true;
        return false;
    }, [password, showPassword]);

    const togglePassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, [password]);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputContainer, errorMessage && { borderColor: colors.error }, containerStyle]}>
                <TextInput style={[styles.input, extraStyle]} {...Attr} secureTextEntry={secureText} maxLength={100} autoCapitalize="none" />
                { password && (
                    <Pressable android_ripple={{ color: colors.background }} style={styles.eyeButton} onPress={togglePassword}>
                        <MaterialIcons name="remove-red-eye" size={18} color={colors.accent} />
                    </Pressable>
                )}
            </View>
            {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 6,
    },
    label: {
        fontFamily: "poppins",
        color: colors.primary500,
    },
    inputContainer: {
        borderRadius: 6,
        borderWidth: 1,
        overflow: "hidden",
        borderColor: colors.primary500,
        flexDirection: "row",
        alignItems: "stretch",
        backgroundColor: "white",
    },
    input: {
        flex: 1,
        fontFamily: "poppins",
        fontSize: 16,
        paddingHorizontal: 10,
        paddingBottom: 4,
        paddingTop: 10,
    },
    eyeButton: {
        justifyContent: "center",
        alignItems: "center",
        width: "15%",
    },
    errorMessage: {
        marginTop: 2,
        fontSize: 12,
        marginStart: 4,
        color: colors.error,
    },
});
