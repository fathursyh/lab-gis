import { Dimensions, Pressable, StyleSheet, View, ViewStyle } from "react-native"
import { colors } from "../../../constants/colors";
import { router } from "expo-router";

type GridContainerProps = {
    items: any[], itemKey: string, childStyle?: ViewStyle, children: Function, handlePress?: Function
}
const { width } = Dimensions.get('window');
export default function GridContainer({ items, itemKey, children, childStyle, handlePress}: GridContainerProps) {
    return (
            <View style={styles.rootContainer}>
                {
                    items.map(item => (
                        <View key={item[itemKey]} style={styles.grid}>
                            <Pressable android_ripple={{ color: 'white', radius: 125 }} style={[styles.gridItem, childStyle, {backgroundColor: item.color ?? colors.light}]} onPress={handlePress ? () => handlePress(item) :  () => router.navigate(item.link)}>
                                {children(item)}
                            </Pressable>
                        </View>
                    ))
                }
            </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    grid: {
        width: width / 2,
        aspectRatio: 1,
        padding: 8
    },
    gridItem: {
        boxShadow: `0px 2px 4px -1px ${colors.background}`,
        borderRadius: 4,
        flex: 1
    }
})