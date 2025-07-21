import { ActivityIndicator, StyleSheet, View } from "react-native";
import CustomButton from "../UI/CustomButton";
import { useState } from "react";
import BasicInput from "../UI/BasicInput";

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <View style={styles.formContainer}>
                <BasicInput label="Email" placeholder="Masukan email" autoCorrect={false} id="email" inputMode="email" />
                <BasicInput label="Nama Lengkap" placeholder="Masukan nama lengkap" autoCorrect={false} id="nama" inputMode="email" autoCapitalize="characters" />
                <BasicInput label="Password" password id="password" placeholder="Masukan password" inputMode="text" />
                <BasicInput label="Konfirmasi Password" password id="confirm-password" placeholder="Masukan ulang password" inputMode="text" submitBehavior="blurAndSubmit" />
            </View>
            {
                !isLoading ?
                    <CustomButton type="primary" fullWidth>
                        Daftar
                    </CustomButton>
                    :
                    <ActivityIndicator size={'large'} />
            }
        </>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        marginBottom: 18,
        width: "100%",
    },
});