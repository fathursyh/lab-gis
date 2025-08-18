import { Pressable, StyleSheet, Text, View } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { colors } from "../../constants/colors";

export default function ListInfo({ dataCount, refetch }: { dataCount: number, refetch: ({ }) => void }) {
    return (
        <View style={styles.listInfo}>
            <Text style={styles.listInfoText}><Text style={{ fontFamily: 'poppins-semi', color: colors.primary500 }}>{dataCount}</Text> Bootcamp</Text>
            <Pressable android_ripple={{ color: 'white' }} style={styles.refreshButton} onPress={() => refetch({ throwOnError: true })}>
                <MaterialIcons name="refresh" size={24} />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    listInfo: {
        padding: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 16
    },
    listInfoText: {
        fontFamily: 'poppins',
        fontSize: 12,
        color: 'gray'
    },
    refreshButton: {
        padding: 4,
        backgroundColor: colors.background,
        borderRadius: '100%',
    },
})