import { ScrollView, StyleSheet } from "react-native";
import DashboardBody from "../../components/admin/dashboard/DashboardBody";
import { useAuth } from "../../stores/useAuth";
import DashboardActiveBootcamp from "../../components/admin/dashboard/DashboardActiveBootcamp";


export default function AdminDashboard() {
    const { token } = useAuth();
    return (
        <ScrollView>
            <DashboardBody token={token!} />
            <DashboardActiveBootcamp token={token!} />
        </ScrollView>
    );
}
const styles = StyleSheet.create({
});
