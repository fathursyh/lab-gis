import { Stack } from "expo-router";
import { screenOptions } from "../../../utils/helpers";

export default function DetailStack() {
    return <Stack screenOptions={{ ...screenOptions as any, headerShown: true, headerTitleAlign: 'left' }} initialRouteName="[id]">
        <Stack.Screen name="[id]" options={{ title: 'Detail Bootcamp' }}  />
        <Stack.Screen name="checkout" options={{ presentation: 'modal', title: 'Generate Payments', animation: 'flip' }} />
    </Stack>
}