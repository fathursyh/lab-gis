import { StyleSheet, View } from "react-native";
import BootcampAllList from "../../../components/admin/bootcamps/BootcampAllList";
import BootcampHeader from "../../../components/partials/BootcampHeader";
import { useSearch } from "../../../hooks/useSearch";

export default function Bootcamps() {
    const { search, changeSearch, clearInput } = useSearch();
    return (
        <View style={styles.rootContainer}>
            <BootcampHeader changeSearch={changeSearch} clearInput={clearInput} />
            <View style={{ flex: 1 }}>
                <BootcampAllList search={search} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
    },
})


