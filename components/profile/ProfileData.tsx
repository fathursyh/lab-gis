import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import ProfileDataCard from "./ProfileDataCard";
import { useQuery } from "@tanstack/react-query";
import { getUserCertificates } from "../../api/fetch";

export default function ProfileData({token}: any) {
      const {data, isFetching, isError} = useQuery({
        queryKey: [token, 'profile-certificates'],
        queryFn: () => getUserCertificates(token!),
        staleTime: 1000 * 30,
        gcTime: 1000 * 30

    })
    if (isFetching) return (
        <View style={styles.basicContainer}>
            <ActivityIndicator />
        </View>
    )
    if (isError) return (
        <View style={styles.basicContainer}>
            <Text style={{ fontFamily: 'poppins' }}>Terjadi kesalahan.</Text>
        </View>
    )
    return (
        <View style={styles.container}>
            <Text style={styles.profileTitle}>Sertifikat Terbaru</Text>
            <View style={styles.profile}>
                {
                    data?.data.length > 0 ?
                    data?.data.map((item: any, index: number) => (
                    <ProfileDataCard key={item.id} certificateNumber={item.certificateNumber} title={item.registration.event.title} date={item.createdAt} index={index + 1} />
                )) :
                    <Text style={{ fontFamily: 'poppins' }}>Belum ada sertifikat.</Text>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    basicContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile: {
        flex: 1,
        padding: 8,
    },
    profileTitle: {
        marginTop: 8,
        fontSize: 16,
        textAlign: "center",
        fontFamily: "poppins-semi",
        color: colors.accent,
        marginBottom: 8,
        borderBottomWidth: 0.5,
    },
});
