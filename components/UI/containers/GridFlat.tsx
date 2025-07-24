import { Dimensions, FlatList, ListRenderItem, Pressable, StyleSheet, View, ViewStyle } from "react-native"
import { colors } from "../../../constants/colors";

const { width } = Dimensions.get('window');

type GridFlatProps = { items: any[], flatKey: (item: any) => string, childStyle?: ViewStyle, bgColor?: string, handleLoadMore?: VoidFunction, renderItem: ListRenderItem<any> }

export default function GridFlat({ items, flatKey, handleLoadMore, renderItem, childStyle, bgColor = 'white' }: GridFlatProps) {
    return (
        <FlatList data={items} style={{ flex: 1 }} keyExtractor={flatKey} renderItem={({ item }) => (
            <View style={styles.grid}>
                <Pressable android_ripple={{ color: bgColor !== 'white' ? 'white' : '#ccc', radius: 123 }} style={[styles.gridItem, { backgroundColor: bgColor }, childStyle]}>
                    {renderItem(item)}
                </Pressable>
            </View>
        )} numColumns={2} onEndReachedThreshold={0.5} onEndReached={handleLoadMore} />

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
        padding: 8,
    },
    gridItem: {
        boxShadow: `0px 2px 4px -1px ${colors.background}`,
        borderRadius: 4,
        flex: 1,
    }
})