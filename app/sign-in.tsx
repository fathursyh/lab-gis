import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import LoginForm from "../components/forms/LoginForm";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";
import { Link } from "expo-router";

export default function SignInScreen() {
    return (
        <ScrollView contentContainerStyle={styles.rootContainer} keyboardShouldPersistTaps="always">
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.formContainer}>
                    <Animated.View entering={FadeIn.delay(400)}>
                        <Image style={styles.formImage} source={require("../assets/icon.png")} height={80} width={80} />
                    </Animated.View>
                    <Text style={styles.formTitle}>iLab GIS</Text>
                    <LoginForm />
                </View>
            </KeyboardAvoidingView>
            <View style={{ zIndex: 1, marginHorizontal: 'auto', marginTop: 8, flexDirection: 'row', gap: 4 }}>
                <Text style={{ fontFamily: 'poppins' }}>Belum memiliki akun?</Text>
                <Link replace href={'/sign-up'} style={{ color: colors.primary500, fontFamily: 'poppins-med', textDecorationLine: 'underline' }}>Daftar</Link>
            </View>
            <Animated.View entering={SlideInDown.duration(400)} style={styles.bg} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.primary500,
    },
    formContainer: {
        alignItems: "center",
        paddingHorizontal: "14%",
        zIndex: 1,
    },
    formImage: {
        height: 80,
        aspectRatio: 1,
        borderRadius: 100,
    },
    formTitle: {
        fontFamily: "poppins-bold",
        fontSize: 24,
        marginBottom: 12,
        textAlign: "center",
        color: colors.primary500,
    },
    submitButton: {
        marginTop: 4,
    },
    bg: {
        backgroundColor: colors.light,
        position: "absolute",
        height: "80%",
        width: "100%",
        bottom: 0,
        borderTopLeftRadius: 80,
        borderTopRightRadius: 80,
        boxShadow: "0px 0px 24px 0px #ccc",
    },
});
