import { PropsWithChildren } from "react"
import { Dimensions, Pressable, ScrollView, StyleSheet, View, ViewStyle } from "react-native"

type GridContainerProps = {
    items: any[], childStyle?: ViewStyle, bgColor?: string
}
const { width } = Dimensions.get('window');
export default function GridContainer({ items, children, childStyle, bgColor = 'white' }: PropsWithChildren & GridContainerProps) {
    return (
        <ScrollView style={{ flex: 1 }} >
            <View style={styles.rootContainer}>
                {
                    items.map(item => (
                        <View key={item} style={styles.grid}>
                            <Pressable android_ripple={{ color: bgColor !== 'white' ? 'white' : '#ccc', radius: 123 }} style={[styles.gridItem, childStyle]}>
                                {children}
                            </Pressable>
                        </View>
                    ))
                }
            </View>
        </ScrollView>
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
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        elevation: 4,
        borderRadius: 4,
        flex: 1
    }
})