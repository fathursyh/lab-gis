import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomCarousel from "../../components/UI/CustomCarousel";
import { colors } from "../../constants/colors";
import GridContainer from "../../components/UI/containers/GridContainer";

const menuGrid = [
    {title: 'Project', link: '/profile', color: '#C85C5C'},
    {title: 'Forum', link: '/project', color: '#eac55eff'},
    {title: 'Menu', link: '/project', color: '#4A90A4'},
    {title: 'Bebas', link: '/project', color: '#7BAE7F'},
];
export default function HomeTab() {
    return (
       <ScrollView style={styles.rootContainer} bounces={false} alwaysBounceVertical={false}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Selamat Datang, Nama User!</Text>
            <View style={{ position: 'absolute', bottom: -60 }}>
            <CustomCarousel />
            </View>
        </View>
        <View style={{ flex: 1 }}>
        <GridContainer items={ menuGrid } itemKey="title" children={(value: any) => {
            return (
                <View style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>{ value.title }</Text>
                </View>
            )
        }} />
        </View>
       </ScrollView>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    headerContainer: {
        paddingTop: 20,
        height: 250,
        backgroundColor: colors.secondary500,
        marginBottom: 60,
    },
    headerText: {
        fontFamily: 'poppins-bold',
        textAlign: 'center',
        fontSize: 22,
        color: colors.light
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemTitle: {
        fontFamily: 'poppins-semi',
        fontSize: 18,
        color: colors.light
    }
})