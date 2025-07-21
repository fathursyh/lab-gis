import { ActivityIndicator, StyleSheet, View } from "react-native";
import BasicInput from "../UI/BasicInput";
import { useCallback, useRef, useState } from "react";
import { useAuth } from "../../stores/useAuth";
import CustomButton from "../UI/CustomButton";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        email: '',
        password: '',
    });
    const passRef = useRef<any>(null);
    const { login } = useAuth();

    const loginUser = useCallback(async () => {
        try {
            setIsLoading(true);
            if (email === '' || password === '') {
                setError(prev => ({ email: email === '' ? 'Email tidak boleh kosong.' : prev.email, password: password === '' ? 'Password tidak boleh kosong.' : prev.password }));
                throw new Error();
            }
            const { error } = await login(email, password);
            if (error) {
                setError(({ email: error.email, password: error.password }));
                throw new Error();
            }
        } catch (e) {
            setIsLoading(false);
            return;
        }
    }, [error]);

    const resetError = (field: string) => {
        if (field === 'email') {
            setError(prev => ({ ...prev, email: '' }))
        } else {
            setError(prev => ({ ...prev, password: '' }))
        }
    }
    return (
        <>
            <View style={styles.formContainer}>
                <BasicInput label="Email" placeholder="Masukan email" autoCorrect={false} id="email" inputMode="email" onChangeText={setEmail} errorMessage={error.email} onChange={() => resetError('email')} returnKeyType="next" submitBehavior="submit" onSubmitEditing={() => {passRef.current?.focus()}} />
                <BasicInput ref={passRef} label="Password" password id="password" placeholder="Masukan password" inputMode="text" onChangeText={setPassword} errorMessage={error.password} onChange={() => resetError('password')} submitBehavior="blurAndSubmit" onSubmitEditing={loginUser} returnKeyType="go" />
            </View>
            {
                !isLoading ?
                    <CustomButton type="primary" fullWidth onPress={loginUser}>
                        Login
                    </CustomButton>
                    :
                    <ActivityIndicator size={'large'} />
            }
        </>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        marginBottom: 18,
        width: "100%",
    },
});
