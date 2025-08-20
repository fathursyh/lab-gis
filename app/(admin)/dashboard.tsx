import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import DashboardBody from "../../components/admin/dashboard/DashboardBody";
import { useAuth } from "../../stores/useAuth";

function ItemInfo({ title, value }: any) {
    return (
        <>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemValue}>{value}</Text>
        </>
    );
}

export default function AdminDashboard() {
    const { user, token } = useAuth();
    return (
        <ScrollView contentContainerStyle={styles.rootContainer}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <ItemInfo title="Email User" value={user?.email} />
                    <ItemInfo title="Nama User" value={user?.fullName} />
                    <ItemInfo title="Role" value={user?.role} />
                </View>
            </View>
            <DashboardBody token={token!} />
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    header: {
        flex: 1,
        padding: 12,
    },
    headerContent: {
        flex: 1,
        backgroundColor: colors.accent,
        justifyContent: 'center',
        borderRadius: 8,
        padding: 14,
        elevation: 4,
        shadowColor: colors.dark,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 0 },
    },
    itemTitle: {
        fontFamily: "poppins",
        color: colors.light,
        fontSize: 12,
        lineHeight: 18,
    },
    itemValue: {
        fontFamily: "poppins-semi",
        color: colors.light,
        lineHeight: 18,
        marginBottom: 4,
    },
});
