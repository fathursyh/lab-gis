import { Button, StyleSheet, Text, View } from "react-native";
import GridContainer from "../../components/UI/containers/GridContainer";
import { useAuth } from "../../stores/useAuth";
import CustomButton from "../../components/UI/CustomButton";

export default function ProfileTab() {
    const tes = [1, 2, 3, 4, 5, 6];
    const {logout} = useAuth();
    return (
        <View style={styles.rootContainer}>
            {/* <GridContainer items={tes}>
                <Text>Child</Text>
            </GridContainer> */}
            <CustomButton onPress={logout} type="danger">Logout</CustomButton>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        paddingBottom: 8,
        alignItems: 'center'
    }
})