import { useFonts } from "expo-font";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useAuth } from "../stores/useAuth";
import ToastManager from "toastify-react-native";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { toastConfig, toastOptions } from "../utils/toast-helper";

export { ErrorBoundary } from "expo-router";
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
    initialRouteName: "(app)",
};

const windowHeight = Dimensions.get("window").height;
export default function RootLayout() {
    const { persistLogin } = useAuth();
    const [loaded] = useFonts({
        'poppins-light': require("../assets/fonts/Poppins-Light.ttf"),
        'poppins': require("../assets/fonts/Poppins-Regular.ttf"),
        'poppins-med': require("../assets/fonts/Poppins-Medium.ttf"),
        'poppins-semi': require("../assets/fonts/Poppins-SemiBold.ttf"),
        'poppins-bold': require("../assets/fonts/Poppins-Bold.ttf"),
        ...MaterialIcons.font,
    });

    useEffect(() => {
        persistLogin();
    }, []);

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <StackLayout />;
}
function StackLayout() {
    const { isAuthenticated } = useAuth();
    const insets = useSafeAreaInsets();
    return (
        <>
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Protected guard={isAuthenticated}>
                    <Stack.Screen name="(app)" />
                </Stack.Protected>
                <Stack.Protected guard={!isAuthenticated}>
                    <Stack.Screen name="sign-in" options={{ title: "Login", animation: 'fade' }} />
                    <Stack.Screen name="sign-up" options={{ title: "Register", animation: 'fade' }} />
                </Stack.Protected>
            </Stack>
            <ToastManager config={toastConfig} bottomOffset={insets.bottom > 24 ? windowHeight / 7.5 : windowHeight / 10} {...toastOptions} />
        </>
    );
}