import { colors } from "../../../constants/colors";
import AddButton from "../../../components/UI/AddButton";
import { Tabs } from "expo-router";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function ProjectLayout() {
    return (
        <>
            <Tabs screenOptions={options} backBehavior="none">
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "All Projects",
                        animation: 'shift',
                        tabBarBadge: 3,
                    }}
                />
                <Tabs.Screen
                    name="my-project"
                    options={{
                        title: "My Projects",
                        animation: 'shift'
                    }}
                />
            </Tabs>
            <AddButton />
        </>
    )
}

const options: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarLabel: ({ children, focused }) => {
        return (
            <LinearGradient dither={false} colors={['transparent', focused ? '#dddafcff' : 'transparent']} end={{ x: 0.5, y: 2 }} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', borderBottomWidth: focused ? 0.2:0, borderStyle: 'dashed', borderColor: colors.accent}}>
                <Text style={{ color: colors.secondary500, fontFamily: 'poppins-semi' }}>{children}</Text>
            </LinearGradient>
        )
    },
    sceneStyle: { backgroundColor: colors.light },
    tabBarPosition: 'top',
    tabBarIconStyle: { position: 'absolute', right: '22%', zIndex: 1 },
    tabBarStyle: {
        height: '10%',
        paddingTop: 0,
    },
    tabBarIcon: () => (<></>) ,
    tabBarButton: (props: any) => (<Pressable {...props} style={[props.style, {padding: 0}]} android_ripple={{ color: colors.background, borderless: false }} />),
    tabBarLabelPosition: 'beside-icon',
    tabBarActiveTintColor: colors.light,
    tabBarInactiveTintColor: colors.light,

}