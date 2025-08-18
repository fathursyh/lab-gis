import { PropsWithChildren, RefAttributes, useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native";
import { colors } from "../../constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Controller, type RegisterOptions } from "react-hook-form";

type InputProps = {
    control: any;
    name: string,
    rules?: RegisterOptions,
    label: string;
    password?: boolean;
    containerStyle?: ViewStyle;
    extraStyle?: TextStyle;
    errorMessage?: string | null;
    manual?: boolean;
    manualValue?: (value: any) => any;
    customOnChange?: (text: any) => any
};

export default function BasicInput({ control, name, rules, label, extraStyle, containerStyle, password = false, errorMessage, manual = false, manualValue, customOnChange, ...Attr }: PropsWithChildren<TextInputProps> & InputProps & RefAttributes<TextInput>) {
    const [showPassword, setShowPassword] = useState(false);

    const secureText = useMemo(() => {
        if (password && !showPassword) return true;
        return false;
    }, [password, showPassword]);

    const togglePassword = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, [password]);

    return (
        <Controller control={control} name={name} render={({field: {value, onChange, onBlur, ref}}) => (
            <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                <View style={[styles.inputContainer, errorMessage && { borderColor: colors.error }, containerStyle]}>
                    <TextInput ref={ref} style={[styles.input, extraStyle]} {...Attr} secureTextEntry={secureText} maxLength={100} autoCapitalize="none" value={!manual ? value : manualValue!(value).toString()} onChangeText={!manual? onChange : (text) => {
                        const raw = customOnChange!(text);
                        onChange(raw)
                    }} onBlur={onBlur} />
                    {password && (
                        <Pressable android_ripple={{ color: colors.background }} style={styles.eyeButton} onPress={togglePassword}>
                            <MaterialIcons name="remove-red-eye" size={18} color={colors.accent} />
                        </Pressable>
                    )}
                </View>
                {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
            </View>
        )}
        rules={rules}
        />
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
