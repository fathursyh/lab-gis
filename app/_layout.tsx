import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const [loaded] = useFonts({
        poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    });

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
    const loggedIn = true;
    return (
        <Stack>
            <Stack.Protected guard={loggedIn}>
                <Stack.Screen name="(app)" options={{ headerShown: false }} />
            </Stack.Protected>
            <Stack.Protected guard={!loggedIn}>
                <Stack.Screen name="sign-in" options={{ title: "Login" }} />
                <Stack.Screen name="sign-up" options={{ title: "Register" }} />
            </Stack.Protected>
        </Stack>
    );
}
