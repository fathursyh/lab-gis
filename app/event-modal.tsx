import { ScrollView, StyleSheet } from "react-native";
import EventForm from "../components/forms/EventForm";
import { useLocalSearchParams } from "expo-router";

export default function EventModal() {
     const {editData} = useLocalSearchParams();
     const data = editData ? JSON.parse(editData as string) : undefined;
    return (
        <ScrollView contentContainerStyle={styles.modalContainer} keyboardShouldPersistTaps="handled">
                <EventForm editData={data} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        minHeight: '120%',
        justifyContent: 'flex-start',
        padding: "4%",
    },
});
