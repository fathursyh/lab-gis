import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import DashboardBody from "../../components/admin/dashboard/DashboardBody";

export default function AdminDashboard() {
    return (
        <ScrollView contentContainerStyle={styles.rootContainer}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Text>informasi person dan tanggal</Text>
                </View>
            </View>
           <DashboardBody />
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    header: {
        flex: 1,
        padding: 8,
    },
    headerContent: {
        flex: 1,
        backgroundColor: colors.light,
        borderRadius: 8,
        elevation: 4,
        shadowColor: colors.dark,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 0 },
    },

});
