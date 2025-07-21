import { Pressable, StyleSheet, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { colors } from "../constants/colors";
import Animated, { SlideInDown } from "react-native-reanimated";
import { ReactNode, useMemo } from "react";
import CalendarPicker from "../components/UI/CalendarPicker";

export default function Modal() {
    const { type } = useLocalSearchParams();
    const renderContent = useMemo<ReactNode | null>(() => {
        if (type === "calendar") return <CalendarPicker />;
    }, [type]);
    return (
        <View style={styles.modalContainer}>
            <Pressable style={styles.overlay} onPress={() => router.dismiss()} />
            <Animated.View entering={SlideInDown} style={styles.modalBody}>
                {renderContent}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: "#26252586",
        alignItems: "center",
        justifyContent: "center",
    },
    overlay: {
        position: "absolute",
        top: 0,
        bottom: 0,
        height: "100%",
        width: "100%",
    },
    modalBody: {
        backgroundColor: colors.light,
        borderRadius: 8,
        minWidth: '90%',
        zIndex: 10,
    },
});
