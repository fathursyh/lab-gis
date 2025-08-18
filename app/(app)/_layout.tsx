import { Link, Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../constants/colors";
import { Dimensions, Pressable, TouchableOpacity } from "react-native";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const screenHeight = Dimensions.get("window").height;

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                ...options,
                headerStyle: { backgroundColor: colors.accent, height: insets.bottom > 24 ? screenHeight * 0.1 : screenHeight * 0.12 },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="house" color={color} />,
                }}
            />
            <Tabs.Screen
                name="all-bootcamps"
                options={{
                    tabBarBadge: 3,
                    title: "Bootcamps",
                    headerShown: true,
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="event" color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="person" color={color} />,
                }}
            />
        </Tabs>
    );
}
const options: BottomTabNavigationOptions = {
    headerTitleAlign: "center",
    tabBarStyle: {
        backgroundColor: colors.accent,
    },
    headerTintColor: colors.light,
    headerTitleStyle: { fontFamily: "poppins-semi", fontSize: 18 },
    tabBarButton: (props: any) => <Pressable {...props} android_ripple={{ color: colors.background, borderless: true }} />,
    tabBarActiveTintColor: colors.light,
    tabBarInactiveTintColor: colors.background,
    sceneStyle: { backgroundColor: colors.light },
};
