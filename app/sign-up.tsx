import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";
import LoginForm from "../components/forms/LoginForm";
import Animated, { FadeIn, SlideInUp } from "react-native-reanimated";
import { Link } from "expo-router";
import RegisterForm from "../components/forms/RegisterForm";

export default function SignUpScreen() {
    return (
        <ScrollView contentContainerStyle={styles.rootContainer} keyboardShouldPersistTaps="always">
            <KeyboardAvoidingView behavior="padding">
                <View style={styles.formContainer}>
                    <Animated.View entering={FadeIn.delay(200)}>
                        <Image style={styles.formImage} source={require("../assets/icon.png")} height={80} width={80} />
                    </Animated.View>
                    <Text style={styles.formTitle}>iGIS Lab</Text>
                    <RegisterForm />
                </View>
            </KeyboardAvoidingView>
            <View style={{ zIndex: 1, marginHorizontal: 'auto', marginTop: 8, flexDirection: 'row', gap: 4 }}>
                <Text style={{ fontFamily: 'poppins' }}>Sudah memiliki akun?</Text>
                <Link replace href={'/sign-in'} style={{ color: colors.primary500, fontFamily: 'poppins-med', textDecorationLine: 'underline' }}>Masuk</Link>
            </View>
            <Animated.View entering={SlideInUp.duration(200)} style={styles.bg} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: colors.light,
    },
    formContainer: {
        alignItems: "center",
        paddingHorizontal: "14%",
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
        position: 'absolute',
        top: 0,
        height: '10%',
        width: '100%',
        backgroundColor: colors.primary500,
    }
});
