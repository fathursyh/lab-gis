import { ActivityIndicator, Keyboard, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { SubmitHandler, useForm } from "react-hook-form";
import BasicInput from "../UI/BasicInput";
import CustomButton from "../UI/CustomButton";
import CustomDatePicker from "../UI/CustomDatePicker";
import dayjs from "dayjs";
import CustomImagePicker from "../UI/CustomImagePicker";
import { useEventMutations } from "../../hooks/useEventMutations";
import { useCallback, useEffect } from "react";
import rupiahFormat from "../../utils/formatter";
import { BootcampType } from "../../types/BootcampType";
import { host } from "../../secrets";
import { useHandleDirtyForm } from "../../hooks/useSearch";
import { dismiss } from "expo-router/build/global-state/routing";

type EventInput = {
    title: string;
    description: string;
    mentor: string;
    quota: number | string;
    onlineLocation: string;
    location: string;
    registerDate: string;
    startDate: string;
    endDate: string;
    banner: any;
    price: number;
};

type ModalProps = { editData?: BootcampType };

export default function EventForm({ editData }: ModalProps) {
    const {
        control,
        watch,
        handleSubmit,
        setFocus,
        setError,
        formState: { errors, isSubmitting, isDirty, isValid, isSubmitSuccessful },
    } = useForm<EventInput>({
        mode: "onSubmit",
        reValidateMode: "onBlur",
        defaultValues: {
            title: editData?.title,
            description: editData?.description,
            mentor: editData?.mentor,
            onlineLocation: editData?.onlineLocation,
            location: editData?.location,
            quota: editData?.quota ? `${editData?.quota}` : undefined,
            price: editData?.price,
            registerDate: editData?.registerDate?.toLocaleString(),
            startDate: editData?.startDate?.toLocaleString(),
            endDate: editData?.endDate?.toLocaleString(),
            banner: editData?.banner ? { uri: `${host}${editData.banner}`, name: "", type: "image/jpeg" } : undefined,
        },
    });

    if (!editData) useHandleDirtyForm(isDirty, isValid, isSubmitSuccessful);
    
    useEffect(() => {
        if (isSubmitSuccessful) dismiss();
    }, [isSubmitSuccessful]);

    const { addMutation, updateMutation } = useEventMutations({});

    const title = editData ? "Update" : "Tambah";
    const registerDate = watch("registerDate");
    const startDate = watch("startDate");
    const endDate = watch("endDate");

    const unformatPrice = useCallback((value: any) => {
        return value.replace(/[^\d]/g, "");
    }, []);

    const onSubmit: SubmitHandler<EventInput> = async (data) => {
        Keyboard.dismiss();
        if (!data.location && !data.onlineLocation) {
            setError("onlineLocation", {
                type: "required",
                message: "Salah satu jenis lokasi wajib terisi.",
            });
            setError("location", {
                type: "required",
                message: "Salah satu jenis lokasi wajib terisi.",
            });
            return;
        }
        if (!data.location) data.location = "-";
        if (!data.onlineLocation) data.onlineLocation = "-";

        try {
            if (editData) {
                const deleteBanner = data.banner === "";
                await updateMutation.mutateAsync({ id: editData.id, data: { ...data, deleteBanner } });
            } else {
                await addMutation.mutateAsync(data);
            }
        } catch (err) {
            throw new Error();
        }
    };
    return (
        <View style={styles.formContainer}>
            <Text style={styles.formTitle}>{title} Event</Text>
            <BasicInput
                label="Judul"
                placeholder="Masukan judul"
                id="title"
                inputMode="text"
                control={control}
                name="title"
                errorMessage={errors.title?.message}
                onSubmitEditing={() => setFocus("description")}
                submitBehavior="submit"
                returnKeyType="next"
                rules={{
                    required: "Judul tidak boleh kosong.",
                }}
            />
            <BasicInput
                label="Deskripsi Bootcamp"
                placeholder="Masukan deskripsi singkat"
                id="description"
                inputMode="text"
                multiline
                containerStyle={{ minHeight: 80, alignItems: "flex-start" }}
                control={control}
                name="description"
                errorMessage={errors.description?.message}
                onSubmitEditing={() => setFocus("mentor")}
                submitBehavior="submit"
                returnKeyType="next"
                rules={{
                    required: "Deskripsi bootcamp tidak boleh kosong.",
                }}
            />
            <BasicInput
                label="Mentor"
                placeholder="Masukan nama mentor"
                id="mentor"
                inputMode="text"
                control={control}
                name="mentor"
                errorMessage={errors.mentor?.message}
                onSubmitEditing={() => setFocus("location")}
                submitBehavior="submit"
                returnKeyType="next"
                rules={{
                    required: "Mentor bootcamp tidak boleh kosong.",
                }}
            />
            <BasicInput
                opsional
                label="Lokasi Bootcamp Offline"
                placeholder="Masukan nama lokasi"
                id="location"
                inputMode="text"
                control={control}
                name="location"
                errorMessage={errors.location?.message}
                onSubmitEditing={() => setFocus("onlineLocation")}
                submitBehavior="submit"
                returnKeyType="next"
            />
            <BasicInput
                opsional
                label="Lokasi Bootcamp Online"
                placeholder="Masukan nama lokasi"
                id="onlineLocation"
                inputMode="text"
                control={control}
                name="onlineLocation"
                errorMessage={errors.onlineLocation?.message}
                onSubmitEditing={() => setFocus("quota")}
                submitBehavior="submit"
                returnKeyType="next"
            />
            <BasicInput
                label="Kuota Bootcamp"
                placeholder="Masukan batas kuota"
                id="quota"
                inputMode="numeric"
                control={control}
                name="quota"
                errorMessage={errors.quota?.message}
                onSubmitEditing={() => setFocus("price")}
                submitBehavior="submit"
                returnKeyType="next"
                rules={{
                    valueAsNumber: true,
                    required: "Kuota bootcamp tidak boleh kosong.",
                    min: { value: 1, message: "Kuota minimal satu orang." },
                }}
            />
            <BasicInput
                label="Harga Bootcamp"
                placeholder="Masukan harga daftar bootcamp"
                id="price"
                inputMode="numeric"
                control={control}
                name="price"
                errorMessage={errors.price?.message}
                submitBehavior="blurAndSubmit"
                returnKeyType="done"
                rules={{
                    valueAsNumber: true,
                    required: "Harga bootcamp tidak boleh kosong.",
                }}
                manual
                manualValue={(value) => {
                    return rupiahFormat(value ?? 0);
                }}
                customOnChange={(text) => {
                    return unformatPrice(text);
                }}
            />
            <CustomDatePicker
                control={control}
                selectedDate={registerDate}
                name="registerDate"
                label="Tanggal Pendaftaran"
                errorMessage={errors.registerDate?.message}
                rules={{
                    required: "Tanggal pendaftaran tidak boleh kosong.",
                }}
            />
            <CustomDatePicker
                control={control}
                selectedDate={startDate}
                name="startDate"
                label="Tanggal Mulai"
                errorMessage={errors.startDate?.message}
                rules={{
                    required: "Tanggal mulai tidak boleh kosong.",
                    validate: {
                        checkPendaftaran: (value) => {
                            return dayjs(value).diff(registerDate) > 0 || "Tanggal mulai minimal sehari di depan tanggal pendaftaran.";
                        },
                    },
                }}
            />
            <CustomDatePicker
                control={control}
                selectedDate={endDate}
                name="endDate"
                label="Tanggal Selesai"
                errorMessage={errors.endDate?.message}
                rules={{
                    required: "Tanggal selesai tidak boleh kosong.",
                    validate: {
                        checkMulai: (value) => {
                            return dayjs(value).diff(startDate) >= 0 || "Tanggal selesai tidak boleh di belakang tanggal mulai.";
                        },
                    },
                }}
            />
            <View>
                <Text style={[styles.label, { marginTop: 8 }]}>
                    Banner <Text style={{ fontSize: 10, color: colors.info }}>(opsional)</Text>
                </Text>
                <CustomImagePicker control={control} name="banner" />
            </View>
            <CustomButton disabled={isSubmitting} type="accent" customStyle={{ marginTop: 24, paddingVertical: 14 }} onTouchEnd={handleSubmit(onSubmit)}>
                {!isSubmitting ? `${title} Event` : <ActivityIndicator size={27} />}
            </CustomButton>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        minHeight: 1,
        padding: 20,
        marginBottom: 32,
        borderRadius: 8,
        elevation: 2,
        backgroundColor: colors.light,
    },
    formTitle: {
        fontFamily: "poppins-bold",
        fontSize: 20,
        textAlign: "center",
        color: colors.accent,
    },
    label: {
        fontFamily: "poppins",
        color: colors.primary500,
    },
});
