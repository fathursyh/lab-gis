import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomCarousel from "../../components/UI/CustomCarousel";
import { colors } from "../../constants/colors";
import GridContainer from "../../components/UI/containers/GridContainer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const menuGrid = [
    {title: 'My Project', link: '/project', color: '#C85C5C', icon: 'book'},
    {title: 'Forum', link: '/project', color: '#eac55eff', icon: 'people'},
    {title: 'Menu', link: '/project', color: '#4A90A4', icon: 'approval'},
    {title: 'Todo', link: '/project', color: '#7BAE7F', icon: 'checklist'},
];

const data = [
  'https://img.freepik.com/free-photo/black-cat-with-green-eyes-resting-grass_181624-30967.jpg?semt=ais_hybrid&w=740',
  'https://t3.ftcdn.net/jpg/02/36/99/22/360_F_236992283_sNOxCVQeFLd5pdqaKGh8DRGMZy7P4XKm.jpg',
  'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_16x9.jpg?w=1200'
];

export default function HomeTab() {
    return (
       <ScrollView style={styles.rootContainer} bounces={false} alwaysBounceVertical={false}>
        <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Selamat Datang, Nama User!</Text>
            <View style={{ position: 'absolute', bottom: -60 }}>
            <CustomCarousel data={data} autoplay />
            </View>
        </View>
        <View style={{ flex: 1 }}>
        <GridContainer items={ menuGrid } itemKey="title" children={(value: any) => {
            return (
                <View style={styles.itemContainer}>
                    <MaterialIcons name={value.icon} size={32} color={colors.light} />
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