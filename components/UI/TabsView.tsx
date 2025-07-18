import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../constants/colors";

export default function TabsView({children} : PropsWithChildren) {
    return <View style={styles.container}>{ children }</View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: colors.background
    }
});