import { StyleSheet, View } from "react-native";
import { colors } from "../../constants/colors";
import BootcampHeader from "../../components/partials/BootcampHeader";
import { useSearch } from "../../hooks/useSearch";
import BootcampList from "../../components/bootcamp/BootcampList";

export default function AllBootcamps() {
    const { search, changeSearch, clearInput } = useSearch();
    return (
        <View style={styles.rootContainer}>
            <BootcampHeader changeSearch={changeSearch} clearInput={clearInput} />
            <BootcampList search={search} queryKey="all-bootcamps" />
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: colors.light,
    },
});
