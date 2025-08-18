import { Controller, RegisterOptions } from "react-hook-form";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../constants/colors";
import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { localDate } from "../../constants/localDate";

type InputDateProps = {
    control: any;
    rules?: RegisterOptions;
    label: string;
    selectedDate: any;
    name: string;
    errorMessage?: string | null;
};
LocaleConfig.locales["id"] = { ...localDate };
LocaleConfig.defaultLocale = "id";

const today = dayjs(new Date()).format("YYYY-MM-DD");
export default function CustomDatePicker({ control, selectedDate, name, errorMessage, label, rules }: InputDateProps) {
    const [showDate, setShowDate] = useState(false);
    const formattedDate = useMemo(() => {
        return selectedDate ? dayjs(selectedDate).format("DD MMMM YYYY") : undefined;
    }, [selectedDate]);
    return (
        <>
            <Modal animationType="fade" transparent visible={showDate}>
                <View style={styles.calendarContainer}>
                    <Pressable style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0 }} onPress={() => setShowDate(false)} />
                    <View style={styles.overlay}>
                        <Controller
                            control={control}
                            name={name}
                            render={({ field: { onChange, value } }) => (
                                <Calendar
                                    onTouchStart={(e) => e.stopPropagation()}
                                    style={{ borderRadius: 8, padding: 4, minHeight: "52%" }}
                                    minDate={today}
                                    onDayPress={(day) => {
                                        setShowDate(false);
                                        onChange(day.dateString);
                                    }}
                                    markedDates={value ? { [value]: { selected: true, marked: true, selectedColor: colors.accent } } : {}}
                                />
                            )}
                        />
                    </View>
                </View>
            </Modal>
            <View style={styles.container}>
                <Text style={styles.label}>{label}</Text>
                <Controller
                    control={control}
                    name={name}
                    render={() => (
                        <View style={styles.inputContainer} onTouchEnd={() => setShowDate(true)}>
                            <Text style={[styles.input, { color: !selectedDate ? "#616161ff" : colors.dark }]}>{formattedDate ?? "Tekan untuk pilih tanggal"}</Text>
                            <Pressable android_ripple={{ color: colors.background }} style={styles.showButton}>
                                <MaterialIcons name="calendar-month" size={18} color={colors.accent} />
                            </Pressable>
                        </View>
                    )}
                    rules={rules}
                />

                {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    calendarContainer: {
        flex: 1,
        backgroundColor: "#000000c2",
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        padding: 12,
    },
    container: {
        marginBottom: 6,
    },
    inputContainer: {
        minHeight: 44,
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
    showButton: {
        justifyContent: "center",
        alignItems: "center",
        width: "15%",
    },
    label: {
        fontFamily: "poppins",
        color: colors.primary500,
    },
    errorMessage: {
        marginTop: 2,
        fontSize: 12,
        marginStart: 4,
        color: colors.error,
    },
});
