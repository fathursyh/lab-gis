import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../constants/colors";
import { Pressable } from "react-native";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

export default function TabLayout() {
    return (
        <Tabs screenOptions={options}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="house" color={color} />,
                }}
            />
            <Tabs.Screen
                name="project"
                options={{
                    tabBarBadge: 3,
                    title: "Projects",
                    headerShown: true,
                    tabBarIcon: ({ color }) => <MaterialIcons size={28} name="book" color={color} />,
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
    headerTitleAlign: "left",
    headerStyle: { backgroundColor: colors.accent },
    tabBarStyle: {
        backgroundColor: colors.accent
    },
    headerTintColor: colors.light,
    headerTitleStyle: { fontFamily: "poppins" },
    tabBarButton: (props: any) => (<Pressable {...props} android_ripple={{ color: colors.background, borderless: true }} />),
    tabBarActiveTintColor: colors.light,
    tabBarInactiveTintColor: colors.background,
    sceneStyle: { backgroundColor: colors.light },
};
