import { SubmitHandler, useForm } from "react-hook-form";
import { View } from "react-native";
import BasicInput from "../UI/BasicInput";

type ProfileInput = {
    fullName: string,
    password: string,
    confirmPassword: string
};
export default function ProfileForm() {
    const {
        control,
        setError,
        handleSubmit,
        setFocus,
        formState: { errors, isSubmitting },
    } = useForm<ProfileInput>({ mode: "onSubmit", reValidateMode: "onBlur" });
        const onSubmit: SubmitHandler<ProfileInput> = async (data) => {
            // if (error) {
            //     setError("email", {
            //         message: error,
            //     });
            //     setError("password", {
            //         message: error,
            //     });
            //     Toast.error(error);
            // }
        };
    return (
        <View>
            <BasicInput
                label="Nama Lengkap"
                placeholder="Nama"
                id="nama"
                inputMode="text"
                control={control}
                name="fullName"
                errorMessage={errors.fullName?.message}
            />
        </View>
    )
}
