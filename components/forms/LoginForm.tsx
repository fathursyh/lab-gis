import { StyleSheet, View } from "react-native";
import BasicInput from "../UI/BasicInput";
import { useState } from "react";
import { useAuth } from "../../stores/useAuth";
import CustomButton from "../UI/CustomButton";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        email: '',
        password: '',
    })
    const { login } = useAuth();

    async function loginUser() {
        if (email === '' || password === '') {
            setError(prev => ({email: email === '' ? 'Email tidak boleh kosong.': prev.email, password: password === '' ? 'Password tidak boleh kosong.' : prev.password }));
            return;
        }
        const {error} = await login(email, password);
        setError(({email: error.email, password: error.password }));
    }

    return (
        <>
            <View style={styles.formContainer}>
                <BasicInput label="Email" placeholder="Masukan email" autoCorrect={false} id="email" inputMode="email" onChangeText={setEmail} errorMessage={error.email} onFocus={() => setError(prev => ({...prev, email: ''}))} />
                <BasicInput label="Password" password id="password" placeholder="Masukan password" inputMode="text" onChangeText={setPassword} errorMessage={error.password} onFocus={() => setError(prev => ({...prev, password: ''}))} />
            </View>
            <CustomButton type="primary" fullWidth onPress={loginUser}>
                Login
            </CustomButton>
        </>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        marginBottom: 18,
        width: "100%",
    },
});
