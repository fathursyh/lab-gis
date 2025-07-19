import { Dimensions, FlatList, ListRenderItem, Pressable, StyleSheet, View, ViewStyle } from "react-native"

const { width } = Dimensions.get('window');

type GridFlatProps = { items: any[], flatKey: (item: any) => string, childStyle?: ViewStyle, bgColor?: string, renderItem: ListRenderItem<any> }

export default function GridFlat({ items, flatKey, renderItem, childStyle, bgColor = 'white' }: GridFlatProps) {
    return (
        <FlatList data={items} style={{ flex: 1 }} keyExtractor={flatKey} renderItem={({ item }) => (
            <View style={styles.grid}>
                <Pressable android_ripple={{ color: bgColor !== 'white' ? 'white' : '#ccc', radius: 123 }} style={[styles.gridItem, { backgroundColor: bgColor }, childStyle]}>
                    {renderItem(item)}
                </Pressable>
            </View>
        )} numColumns={2} />

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
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 0 },
        elevation: 4,
        borderRadius: 4,
        flex: 1,
    }
})