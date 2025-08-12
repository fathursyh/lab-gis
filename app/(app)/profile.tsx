import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../stores/useAuth";
import CustomButton from "../../components/UI/CustomButton";
import { colors } from "../../constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ProfileData from "../../components/profile/ProfileData";

export default function ProfileTab() {
    const { user, logout } = useAuth();
    return (
        <View style={styles.rootContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.profile}>
                    <MaterialIcons name="person" size={50} color={colors.light} />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.profileText}>
                        { user?.fullName || 'Nama User' }
                    </Text>
                    <Text style={styles.profileDesc}>{user?.email || 'email@user.com'}</Text>
                </View>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.detailContent}>
                    <ProfileData />
                    <CustomButton onPress={logout} fullWidth type="danger" customStyle={{ paddingVertical: 14 }} size="lg">
                        Logout
                    </CustomButton>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    headerContainer: {
        height: 250,
        backgroundColor: colors.primary500,
        justifyContent: "center",
    },
    profile: {
        alignItems: "center",
        paddingHorizontal: 32,
    },
    profileText: {
        fontFamily: "poppins-semi",
        color: colors.light,
        fontSize: 18,
        textAlign: "center",
    },
    profileDesc: {
        fontFamily: "poppins",
        color: colors.background,
    },
    detailContainer: {
        flex: 1,
        padding: 14,
        backgroundColor: "#ccc",
    },
    detailContent: {
        width: "100%",
        height: "100%",
        borderRadius: 4,
        backgroundColor: colors.light,
        overflow: "hidden",
        elevation: 2,
        padding: 8,
    },
});
