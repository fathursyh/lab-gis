import { Stack } from "expo-router";
import { colors } from "../../../constants/colors";

export default function ProjectLayout() {
    return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.light } }} />
}