import { Image, StyleSheet, Text, View } from "react-native";
import { BootcampType } from "../../types/BootcampType";
import { host } from "../../secrets";
import rupiahFormat from "../../utils/formatter";
import { colors } from "../../constants/colors";
import dayjs from "dayjs";
import "dayjs/locale/id";
dayjs.locale("id");
import { useMemo } from "react";

const defaultImage = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export default function BootcampItem({ title, startDate, mentor, banner, price }: BootcampType) {
    const formattedDate = useMemo(() => {
        return dayjs(startDate).format("DD MMM YY");
    }, [startDate]);
    const formattedPrice = useMemo(() => {
        if (typeof(price) === 'number') {
            return rupiahFormat(price!);
        } else {
            return price;
        }
    }, [price])
    return (
        <View style={styles.cardContainer}>
            <View style={styles.banner}>
                   <Image style={styles.image} src={banner ? `${host}${banner}` : defaultImage} resizeMode="cover" />
            </View>
            <View style={styles.cardContent}>
                <Text style={[styles.contentText]} numberOfLines={2}>{title}</Text>
                <Text style={[styles.contentText, { color: colors.accent }]} numberOfLines={1}>{mentor}</Text>
                <View style={styles.contentInfo}>
                    <Text style={[styles.contentText, { color: 'gray', fontSize: 10 }]}>{ formattedDate }</Text>
                    <Text style={[styles.contentText, { fontFamily: 'poppins-semi', color: colors.accent, textTransform: 'capitalize' }]}>{formattedPrice}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        borderRadius: 8,
        overflow: 'hidden'
    },
    banner: {
        overflow: 'hidden',
        height: '45%',
        backgroundColor: 'gray',
    },
    image: {
        height: '100%',
        width: '100%'
    },
    cardContent: {
        padding: 6,
        flex: 1
    },
    contentText: {
        fontFamily: 'poppins',
        fontSize: 12,
    },
    contentInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    }
})