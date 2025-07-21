import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../../stores/useAuth";
import CustomButton from "../../components/UI/CustomButton";
import { colors } from "../../constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function ProfileTab() {
    const tes = [1, 2, 3, 4, 5, 6];
    const { logout } = useAuth();
    return (
        <View style={styles.rootContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.profile}>
                    <MaterialIcons name="person" size={50} color={colors.light} />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.profileText}>Nama Pengguna Panjang</Text>
                    <Text style={styles.profileDesc}>Informasi tambahan</Text>
                </View>
            </View>
            <View style={styles.detailContainer}>
                <View style={styles.detailContent}>
                    <View style={{ flex: 1 }}></View>
                    <CustomButton onPress={logout} fullWidth type="danger" customStyle={{ borderRadius: 0, paddingVertical: 14 }} size="lg" >Logout</CustomButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    headerContainer: {
        height: 180,
        backgroundColor: colors.secondary500,
        justifyContent: 'center'
    },
    profile: {
        alignItems: 'center',
        paddingHorizontal: 32
    },
    profileText: {
        fontFamily: 'poppins-semi',
        color: colors.light,
        fontSize: 18,
        textAlign: 'center',
    },
    profileDesc: {
        fontFamily: 'poppins',
        color: colors.background
        
    },
    detailContainer: {
        flex: 1,
        padding: 14,
        backgroundColor: '#ccc',
    },
    detailContent: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
        backgroundColor: colors.light,
        overflow: 'hidden',
        elevation: 2
    },
    detailText: {

    },
})