import { Button, Text, View } from "react-native";
import { useAuth } from "../stores/useAuth";

export default function SignInScreen() {
    const {login} = useAuth()
    async function tes() {
        login('email', 'password')
    }
    return (
        <View>
            <Button title="login" onPress={tes} />
        </View>
    )
}