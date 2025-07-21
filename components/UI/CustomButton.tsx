import { Platform, Pressable, PressableProps, StyleSheet, Text, ViewStyle } from "react-native";
import { colors } from "../../constants/colors";
import { PropsWithChildren, useMemo } from "react";

type ButtonProps = {
    type?: 'primary' | 'secondary' | 'accent' | 'danger'
    size?: 'sm' | 'md' | 'lg',
    fullWidth?: boolean,
    customStyle?: ViewStyle
}
export default function CustomButton({type = 'primary', size = 'md', fullWidth = false, children, customStyle, ...Attr} : PropsWithChildren<PressableProps> & ButtonProps) {
    const getSize = useMemo(() => {
        return size === 'lg' ? {minWidth: 140, fontSize: 18} : size === 'sm' ? {minWidth: 80, fontSize: 14} : {minWidth: 100, fontSize: 16}; 
    }, [size]);
    const getType = useMemo(() => {
        return type === 'primary' ? {backgroundColor: colors.secondary500} : type === 'secondary' ? {backgroundColor: colors.primary500} : type === 'accent' ? {backgroundColor: colors.accent} : {backgroundColor: colors.error}
    }, [type]);

    return (
        <Pressable android_ripple={{ color: colors.background }} style={({pressed}) => ([pressed && {opacity: Platform.select({ios: 0.7 })}, styles.buttonContainer, getType, {width: fullWidth? '100%': undefined}, customStyle])} {...Attr}>
            <Text style={[styles.buttonText, getSize]}>{ children }</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: {width: 0, height: 0}
    },
    buttonText: {
        fontFamily: 'poppins-med',
        color: 'white',
        textAlign: 'center',
    }
})