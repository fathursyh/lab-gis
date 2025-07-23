import { Pressable, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { MemberType } from "../../types/MemberType";
import dayjs from 'dayjs';
import 'dayjs/locale/id';
dayjs.locale('id')

export default function MemberItem(item : MemberType) {
    return (
        <>
            <View
                style={{
                    backgroundColor: colors.accent,
                    borderRadius: 4,
                    flexDirection: "row",
                    height: 80,
                    borderWidth: 0.4,
                    padding: 4,
                    elevation: 4,
                }}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <MaterialIcons name="person" size={32} color={colors.light} />
                </View>
                <View
                    style={{
                        flex: 4,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: "poppins-med",
                            color: colors.light,
                        }}
                    >
                        {item.fullName}
                    </Text>
                    <Text
                        style={{
                            fontFamily: "poppins",
                            color: colors.background,
                        }}
                    >
                        {item.email}
                    </Text>
                    <Text
                        style={{
                            fontFamily: "poppins-light",
                            fontSize: 12,
                            color: colors.background,
                        }}
                    >
                        Bergabung {dayjs(item.createdAt).format('D MMMM YYYY')}
                    </Text>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", aspectRatio: 1 }}>
                    <Pressable android_ripple={{ color: colors.light, borderless: true }}>
                        <MaterialIcons name="info" size={32} color={colors.light} />
                    </Pressable>
                </View>
            </View>
        </>
    );
}
