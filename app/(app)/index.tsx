import { Text } from "react-native";
import GridContainer from "../../components/UI/containers/GridContainer";

export default function HomeTab() {
    const tes = [1, 2, 3, 4, 5, 6];
    return (
       <GridContainer items={tes}>
            <Text>Child</Text>
       </GridContainer>
    )
}

