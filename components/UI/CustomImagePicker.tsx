import * as ImagePicker from "expo-image-picker";
import { useCallback } from "react";
import { Controller } from "react-hook-form";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../constants/colors";

type ImagePickerProps = {
    control: any;
    name: string;
};

export default function CustomImagePicker({ control, name }: ImagePickerProps) {
    const pickImage = useCallback(async (onChange: any) => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
            alert("Butuh izin untuk upload file!");
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
        });

        if (!result.canceled) {
            onChange({
                name: result.assets[0].fileName,
                uri: result.assets[0].uri,
                type: result.assets[0].mimeType
            });
        }
    }, []);

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => (
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                    <TouchableOpacity style={styles.pickButton} onPressIn={() => pickImage(onChange)}>
                        <Text style={styles.pickButtonText}>Pilih Gambar</Text>
                    </TouchableOpacity>
                    {(value) && (
                        <View style={{ minHeight: 1, width: "100%" }}>
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPressIn={() => onChange('')}
                            >
                                <MaterialIcons name="delete" size={24} color={colors.error} />
                            </TouchableOpacity>
                            <Image source={{ uri: value.uri }} style={styles.image} />
                        </View>
                    )}
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    pickButton: { backgroundColor: colors.info, padding: 12, borderRadius: 2 },
    pickButtonText: { color: colors.light, fontSize: 12 },
    image: { width: "100%", height: 200, marginVertical: 20, borderRadius: 4 },
    deleteButton: { position: "absolute", top: "14%", right: 12, zIndex: 1, padding: 2, backgroundColor: "#ffffff92", borderRadius: "100%" }
})