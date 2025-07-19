import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors } from "../../constants/colors";
import { Pressable } from "react-native";
import { BottomTabBarProps, BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

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
                    title: "Projects",
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
    headerTitleAlign: "center",
    headerStyle: { backgroundColor: colors.accent },
    headerTintColor: "white",
    headerTitleStyle: { fontFamily: "poppins" },
    tabBarButton: (props : any) => (<Pressable {...props} android_ripple={{ color: colors.accent, borderless: true }}  />),
    tabBarActiveTintColor: colors.accent,
    sceneStyle: { backgroundColor: colors.background },
};
