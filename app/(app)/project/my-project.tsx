import { Text, View } from "react-native";
import GridFlat from "../../../components/UI/containers/GridFlat";

export default function MyProject() {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    return (
        <GridFlat items={array} flatKey={(item: any) => item} renderItem={(item: any) => (
            <Text>{item}</Text>
        )} />
    )
}