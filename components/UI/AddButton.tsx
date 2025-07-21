import { Pressable, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link } from "expo-router";

export default function AddButton() {
    return (
        <Link href={'/project/create'} asChild style={[styles.buttonContainer]}>
        <Pressable android_ripple={{ color: colors.light }} >
            <MaterialIcons name="add" color={colors.light} size={32} />
        </Pressable>
        </Link>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        zIndex: 10,
        bottom: '4%',
        right: '10%',
        height: 60,
        width: 60,
        borderRadius: 100,
        backgroundColor: colors.primary500,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.45,
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 4
    },
});