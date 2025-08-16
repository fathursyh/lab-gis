import { Stack } from "expo-router";

export default function BootcampsLayout() {
    return <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="bootcamps" />
    </Stack>
}