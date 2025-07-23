import { ActivityIndicator, StyleSheet, View } from "react-native";
import CustomButton from "../UI/CustomButton";
import BasicInput from "../UI/BasicInput";
import { useAuth } from "../../stores/useAuth";
import { Toast } from "toastify-react-native";
import {  SubmitHandler, useForm } from "react-hook-form";
import { isEmail } from "../../utils/helpers";

type RegisterInput = {
    email: string, fullName: string, password: string, confirmPassword: string
}

export default function RegisterForm() {
    const { register } = useAuth();
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<RegisterInput>({mode: 'onSubmit', reValidateMode: 'onSubmit'});

    const password = watch('password');
    const onSubmit: SubmitHandler<RegisterInput> = async(data) => {
        const {error} = await register(data.email, data.fullName, data.password);
        if (error) {
            Toast.error(error);
        }
    }

    return (
        <>
            <View style={styles.formContainer}>
                <BasicInput label="Email" placeholder="Masukan email" autoCorrect={false} id="email" inputMode="email" control={control} name="email" errorMessage={errors.email?.message}
                    rules={{
                        required: "Email tidak boleh kosong.",
                        validate: {
                            checkEmail: (value) => {
                                return (
                                    isEmail(value) || 'Alamat email harus valid.'
                                )
                            }
                        }

                    }}
                />
                <BasicInput label="Nama Lengkap" placeholder="Masukan nama lengkap" autoCorrect={false} id="nama" inputMode="text" autoCapitalize="characters" control={control} name="fullName" errorMessage={errors.fullName?.message}
                    rules={{ required: "Nama lengkap tidak boleh kosong." }}
                />
                <BasicInput label="Password" password id="password" placeholder="Masukan password" inputMode="text" control={control} name="password" errorMessage={errors.password?.message}
                    rules={{ required: 'Password tidak boleh kosong.',
                        minLength: {value: 8, message: 'Password tidak boleh kurang dari 8 karakter.'}
                     }}
                />
                <BasicInput label="Konfirmasi Password" password id="confirm-password" placeholder="Masukan ulang password" inputMode="text" submitBehavior="blurAndSubmit" returnKeyType="go" control={control} name="confirmPassword" errorMessage={errors.confirmPassword?.message}
                    rules={{
                        required: 'Konfirmasi password tidak boleh kosong.',
                        validate: {
                            CheckPass: (value) => {
                                return (
                                    value === password || "Konfirmasi password tidak sama dengan password."
                                )
                            }
                        }
                    }}
                />
            </View>
            {
                !isSubmitting ?
                    <CustomButton type="primary" fullWidth onPress={handleSubmit(onSubmit)}>
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