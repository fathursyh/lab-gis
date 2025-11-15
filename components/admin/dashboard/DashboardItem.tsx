import { Dimensions, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type DashboardItemProps = {
    title?: string,
    value?: number,
    icon?: React.ComponentProps<typeof MaterialIcons>['name']
}
export default function DashboardItem({ title, value, icon }: DashboardItemProps) {
    return (
        <View style={styles.grid}>
            <View style={styles.gridItem}>
                <View>
                    <MaterialIcons name={icon} size={18} color={colors.accent} />
                    <Text style={styles.title}>{title}</Text>
                </View>
                <Text style={styles.data}>{value}</Text>
            </View>
        </View>
    );
}

const screenWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    grid: {
        width: (screenWidth - 6) / 2,
        marginHorizontal: 'auto',
        aspectRatio: 1,
        padding: 8,
    },
    gridItem: {
        padding: 18,
        backgroundColor: colors.light,
        overflow: "hidden",
        elevation: 4,
        shadowColor: colors.dark,
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 0 },
        borderRadius: 8,
        flex: 1,
    },

    title: {
        fontFamily: 'poppins',
        fontSize: 14,
        color: colors.accent
    },
    data: {
        fontFamily: 'poppins-bold',
        fontSize: 42,
        color: colors.primary500
    }
})