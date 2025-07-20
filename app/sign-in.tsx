import { Image, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../stores/useAuth";
import { colors } from "../constants/colors";
import CustomButton from "../components/UI/CustomButton";

export default function SignInScreen() {
    const { login } = useAuth();
    async function loginUser() {
        login("email", "password");
    }
    return (
        <View style={styles.rootContainer}>
            <View style={styles.formContainer}>
                <Image style={styles.formImage} source={require("../assets/icon.png")} height={80} width={80} />
                <Text style={styles.formTitle}>iGIS</Text>
                <CustomButton type="primary" onPress={loginUser}>Login</CustomButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.light,
    },
    formContainer: {
        width: "100%",
        minHeight: 400,
        padding: 14,
        alignItems: 'center'
    },
    formImage: {
        height: 80,
        aspectRatio: 1,
        borderRadius: 100,
    },
    formTitle: {
        fontFamily: "poppins-bold",
        fontSize: 24,
        textAlign: "center",
        color: colors.primary500
    },
});
