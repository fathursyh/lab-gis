import { ActivityIndicator, StyleSheet, View } from "react-native";
import CustomButton from "../UI/CustomButton";
import { useState } from "react";
import BasicInput from "../UI/BasicInput";
import { useAuth } from "../../stores/useAuth";
import { Toast } from "toastify-react-native";

const isEmail = (email:string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export default function RegisterForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [inputRegister, setInputRegister] = useState({
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState({
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
    });

    const { register } = useAuth();
    async function regiserUser() {
        try {
            setIsLoading(true);
            const [invalidEmail, invalidFullName, invalidPass, invalidConfirmPassword] = [inputRegister.email === '', inputRegister.fullName === '', inputRegister.password === '', inputRegister.confirmPassword === ''];
            if (invalidEmail || invalidPass || invalidFullName || invalidConfirmPassword) {
                setError(prev => ({
                    email: invalidEmail ? 'Email tidak boleh kosong' : prev.email,
                    fullName: invalidFullName ? 'Nama lengkap tidak boleh kosong' : prev.fullName,
                    password: invalidPass ? 'Password tidak boleh kosong' : prev.password,
                    confirmPassword: invalidConfirmPassword ? 'Konfirmasi password tidak boleh kosong' : prev.confirmPassword
                }));
                throw new Error();
            }
            if (inputRegister.password !== inputRegister.confirmPassword) {
                const message = 'Password dan konfirmasi password tidak sama'
                setError(prev => ({...prev, password: message, confirmPassword: message}));
                throw new Error();
            }
            if (!isEmail(inputRegister.email)) {
                setError(prev => ({...prev, email: 'Masukan email yang valid'}));
                throw new Error();
            } 
            // start logic
            const { error } = await register(inputRegister.email, inputRegister.fullName, inputRegister.password);
            if (error) {
                Toast.error(error);
                throw new Error();
            }
        } catch (e) {
            setIsLoading(false);
            return;
        }
    }

    const changeValue = (field: string, value: string) => {
        setInputRegister(prev => ({ ...prev, [field]: value }))
    }
    const resetError = (field: string) => {
        setError((prev) => ({ ...prev, [field]: '' }));
    }
    return (
        <>
            <View style={styles.formContainer}>
                <BasicInput label="Email" placeholder="Masukan email" autoCorrect={false} id="email" inputMode="email" onChangeText={(value) => changeValue('email', value)} onChange={() => resetError('email')} errorMessage={error.email}/>
                <BasicInput label="Nama Lengkap" placeholder="Masukan nama lengkap" autoCorrect={false} id="nama" inputMode="text" autoCapitalize="characters" onChangeText={(value) => changeValue('fullName', value)} onChange={() => resetError('fullName')} errorMessage={error.fullName}/>
                <BasicInput label="Password" password id="password" placeholder="Masukan password" inputMode="text" onChangeText={(value) => changeValue('password', value)} onChange={() => resetError('password')} errorMessage={error.password}/>
                <BasicInput label="Konfirmasi Password" password id="confirm-password" placeholder="Masukan ulang password" inputMode="text" submitBehavior="blurAndSubmit" returnKeyType="go" onChangeText={(value) => changeValue('confirmPassword', value)} onChange={() => resetError('confirmPassword')} errorMessage={error.confirmPassword}/>
            </View>
            {
                !isLoading ?
                    <CustomButton type="primary" fullWidth onPress={regiserUser}>
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