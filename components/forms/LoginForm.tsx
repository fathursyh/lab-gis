import { ActivityIndicator, StyleSheet, View } from "react-native";
import BasicInput from "../UI/BasicInput";
import CustomButton from "../UI/CustomButton";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAuth } from "../../stores/useAuth";
import { Toast } from "toastify-react-native";
import { isEmail } from "../../utils/helpers";

type LoginInput = {
    email: string;
    password: string;
};
export default function LoginForm() {
    const { login } = useAuth();
    const {
        control,
        setError,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginInput>({ mode: "onSubmit", reValidateMode: "onBlur" });
    const onSubmit: SubmitHandler<LoginInput> = async (data) => {
        const { error } = await login(data.email, data.password);
        if (error) {
            setError("email", {
                message: error,
            });
            setError("password", {
                message: error,
            });
            Toast.error(error);
        }
    };
    return (
        <>
            <View style={styles.formContainer}>
                <BasicInput
                    label="Email"
                    placeholder="Masukan email"
                    autoCorrect={false}
                    id="email"
                    inputMode="email"
                    control={control}
                    name="email"
                    errorMessage={errors.email?.message}
                    rules={{
                        required: "Email tidak boleh kosong.",
                        validate: {
                            checkEmail: (value) => {
                                return isEmail(value) || "Alamat email harus valid.";
                            },
                        },
                    }}
                />
                <BasicInput
                    label="Password"
                    password
                    id="password"
                    placeholder="Masukan password"
                    inputMode="text"
                    control={control}
                    name="password"
                    errorMessage={errors.password?.message}
                    rules={{
                        required: "Password tidak boleh kosong",
                    }}
                />
            </View>
            {!isSubmitting ? (
                <CustomButton type="primary" fullWidth onPress={handleSubmit(onSubmit)}>
                    Login
                </CustomButton>
            ) : (
                <ActivityIndicator size={"large"} />
            )}
        </>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        marginBottom: 18,
        width: "100%",
    },
});
