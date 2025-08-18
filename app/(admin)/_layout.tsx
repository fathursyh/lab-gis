import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView, Pressable } from "react-native-gesture-handler";
import { useAuth } from "../../stores/useAuth";
import { colors } from "../../constants/colors";
import { Text } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import { CustomDrawerList } from "../../components/UI/CustomDrawerList";
import { StatusBar } from "expo-status-bar";
import DrawerHeader from "../../components/partials/DrawerHeader";
import { Link } from "expo-router";

function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: "20%" }}>
            <DrawerHeader />
            <CustomDrawerList {...props} />
        </DrawerContentScrollView>
    );
}

function AddButton() {
    return (
        <Link href={`/event-modal`} asChild>
            <Pressable android_ripple={{ color: colors.background, radius: 32, borderless: true }} style={{ padding: 4, borderRadius: 30 }}>
                <MaterialIcons name="add" size={32} />
            </Pressable>
        </Link>
    );
}

export default function AdminLayout() {
    const { logout } = useAuth();
    return (
        <>
            <StatusBar style="dark" />
            <GestureHandlerRootView style={{ flex: 1 }}>
                <Drawer
                    drawerContent={(props) => <CustomDrawerContent {...props} />}
                    backBehavior="initialRoute"
                    screenOptions={{
                        drawerLabelStyle: { fontFamily: "poppins-semi" },
                        drawerActiveBackgroundColor: colors.accent,
                        drawerActiveTintColor: colors.light,
                        headerTitleStyle: { fontFamily: "poppins-bold", lineHeight: 24, color: colors.accent },
                        headerRight: () => <AddButton />,
                        headerRightContainerStyle: { paddingRight: 24 },
                    }}
                >
                    <Drawer.Screen name="dashboard" options={{ title: "Dashboard", drawerIcon: ({ size, color }) => <MaterialIcons name="home" size={size} color={color} /> }} />
                    <Drawer.Screen
                        name="(bootcamps)"
                        options={{
                            title: "Bootcamps",
                            drawerIcon: ({ size, color }) => <MaterialIcons name="event" size={size} color={color} />,
                        }}
                    />
                    <Drawer.Screen
                        name="logout"
                        listeners={{
                            drawerItemPress: (e) => {
                                e.preventDefault();
                                logout();
                            },
                        }}
                        options={{
                            drawerLabel: () => <Text style={{ color: colors.error, fontFamily: "poppins-semi" }}>Logout</Text>,
                            drawerIcon: ({ size }) => <MaterialIcons name="logout" size={size} color={colors.error} />,
                        }}
                    />
                </Drawer>
            </GestureHandlerRootView>
        </>
    );
}
