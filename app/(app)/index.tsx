import { ScrollView, StyleSheet, Text, View } from "react-native";
import CustomCarousel from "../../components/UI/CustomCarousel";
import { colors } from "../../constants/colors";
import GridContainer from "../../components/UI/containers/GridContainer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { GridItemType } from "../../types/Types";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../stores/useAuth";
import { fetchFiveBanners } from "../../api/fetch";
import Animated, { FadeInUp } from "react-native-reanimated";

const menuGrid: GridItemType[] = [
    { title: "All Bootcamps", link: "/all-bootcamps", icon: "event" },
    { title: "My Bootcamps", link: "/my-bootcamp", icon: "inbox" },
    { title: "Members", link: "/members", icon: "people" },
    { title: "Scan QR", link: "/qr-scanner", icon: "qr-code" },
];

export default function HomeTab() {
    const { token } = useAuth();
    const { data, isFetching } = useQuery({
        queryKey: ["home"],
        queryFn: () => fetchFiveBanners(token!),
        staleTime: 1000 * 60 * 10,
        gcTime: 1000 * 60 * 10,
    });
    return (
        <ScrollView style={styles.rootContainer} bounces={false} alwaysBounceVertical={false}>
            <View style={styles.headerContainer}>
                {!isFetching && (
                    <Animated.View entering={FadeInUp.duration(300)} style={{ position: "absolute", bottom: -40 }}>
                        <CustomCarousel data={data?.map((item: any) => item.banner)} autoplay />
                    </Animated.View>
                )}
            </View>
            <View style={{ flex: 1 }}>
                <GridContainer
                    items={menuGrid}
                    itemKey="title"
                    children={(value: GridItemType) => {
                        return (
                            <View style={styles.itemContainer}>
                                <MaterialIcons name={value.icon} size={32} color={colors.light} />
                                <Text style={styles.itemTitle}>{value.title}</Text>
                            </View>
                        );
                    }}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
    headerContainer: {
        height: 220,
        backgroundColor: colors.primary500,
        marginBottom: 36,
    },
    headerText: {
        fontFamily: "poppins-bold",
        textAlign: "center",
        fontSize: 20,
        color: colors.light,
    },
    itemContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    itemTitle: {
        fontFamily: "poppins-semi",
        fontSize: 18,
        color: colors.light,
    },
});
