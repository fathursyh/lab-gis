import { Image, Text, View } from "react-native";
import { colors } from "../../constants/colors";
const logoSize = 40;

export default function DrawerHeader() {
    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginLeft: 4, marginBottom: 24 }}>
            <View style={{ width: logoSize, height: logoSize, overflow: "hidden", borderRadius: "100%" }}>
                <Image source={require("../../assets/gis-logo.jpeg")} width={logoSize} height={logoSize} style={{ height: "100%", width: "100%" }} />
            </View>
            <Text style={{ fontFamily: "poppins-bold", fontSize: 20, color: colors.accent, lineHeight: 24}}>iLAB GIS</Text>
        </View>
    );
}
