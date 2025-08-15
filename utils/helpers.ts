import { Alert } from "react-native";
import { colors } from "../constants/colors";

export const confirm = (title: string, message: string, confirm: string, style?: "default" | "cancel" | "destructive" | undefined): Promise<boolean> => {
    return new Promise((resolve) => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: "Batal",
                    onPress: () => resolve(false),
                    style: "cancel",
                },
                {
                    text: confirm,
                    style: style || "default",
                    onPress: () => resolve(true),
                },
            ],
            { cancelable: false }
        );
    });
};

type Resolver = (value: string | null) => void;

let resolver: Resolver | null = null;

export function waitForModalResult(): Promise<string | null> {
    return new Promise((res) => {
        resolver = res;
    });
}

export function resolveModalResult(value: any) {
    if (resolver) {
        resolver(value);
        resolver = null;
    }
}

export const isEmail = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

export const screenOptions = {
    headerShown: false,
    headerTitleAlign: "center",
    headerStyle: { backgroundColor: colors.accent },
    headerTintColor: colors.light,
    headerTitleStyle: { fontFamily: "poppins-semi", fontSize: 18 },
}
