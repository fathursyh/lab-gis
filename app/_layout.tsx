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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { screenOptions } from "../utils/helpers";

export { ErrorBoundary } from "expo-router";
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
    initialRouteName: "(app)",
};

const queryClient = new QueryClient();

const windowHeight = Dimensions.get("window").height;
export default function RootLayout() {
    const { persistLogin } = useAuth();
    const [loaded] = useFonts({
        "poppins-light": require("../assets/fonts/Poppins-Light.ttf"),
        poppins: require("../assets/fonts/Poppins-Regular.ttf"),
        "poppins-med": require("../assets/fonts/Poppins-Medium.ttf"),
        "poppins-semi": require("../assets/fonts/Poppins-SemiBold.ttf"),
        "poppins-bold": require("../assets/fonts/Poppins-Bold.ttf"),
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
    return (
        <QueryClientProvider client={queryClient}>
            <StackLayout />
        </QueryClientProvider>
    );
}
function StackLayout() {
    const { isAuthenticated, isAdmin } = useAuth();
    const insets = useSafeAreaInsets();
    return (
        <>
            <StatusBar style="light" />
            <Stack screenOptions={screenOptions as any}>
                <Stack.Protected guard={isAuthenticated}>
                    <Stack.Protected guard={isAuthenticated && isAdmin}>
                        <Stack.Screen name="(admin)" />
                    </Stack.Protected>
                    <Stack.Screen name="(app)" />
                    <Stack.Screen name="members" options={{ title: "All Members", headerShown: true }} />
                    <Stack.Screen name="my-bootcamp" options={{ title: "My Bootcamps", headerShown: true }} />
                    <Stack.Screen name="qr-scanner" options={{ title: "Scan QR", headerShown: true }} />
                    <Stack.Screen name="(bootcamp-detail)/[id]" options={{ headerShown: false, presentation: "modal" }} />
                </Stack.Protected>
                <Stack.Protected guard={!isAuthenticated}>
                    <Stack.Screen name="sign-in" options={{ title: "Login", animation: "fade" }} />
                    <Stack.Screen name="sign-up" options={{ title: "Register", animation: "fade" }} />
                </Stack.Protected>
            </Stack>
            <ToastManager config={toastConfig} bottomOffset={insets.bottom > 24 ? windowHeight / 7.5 : windowHeight / 10} {...toastOptions} />
        </>
    );
}
