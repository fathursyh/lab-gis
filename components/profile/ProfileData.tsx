import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import ProfileDataCard from "./ProfileDataCard";

export default function ProfileData() {
    return (
        <View style={styles.container}>
            <Text style={styles.profileTitle}>Sertifikat Terbaru</Text>
            <View style={styles.profile}>
                {Array.from({ length: 5 }, (_, i) => i + 1).map((item, i) => (
                    <ProfileDataCard key={i} index={i + 1} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
