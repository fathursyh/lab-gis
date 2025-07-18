import { Button, Text, View } from "react-native";
import { cts } from "../../assets/styles/styles";
import { useAuth } from "../../stores/useAuth";
import useSecureStore from "../../utils/useSecureStore";

export default function HomeTab() {
    const {logout} = useAuth()
    async function coba() {
        const data = await useSecureStore().getValue('token');
        console.log(data);
    }
    return (
        <View>
            <Text style={cts.text}>Home</Text>
            <Button title="cobain" onPress={coba} />
            <Button title="logout" onPress={logout} />
        </View>
    )
}