import { Pressable, StyleSheet } from "react-native";
import { colors } from "../../constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function AddButton() {
    return (
        <Pressable style={[styles.buttonContainer]}>
            <MaterialIcons name="add" color={colors.light} size={32} />
        </Pressable>
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