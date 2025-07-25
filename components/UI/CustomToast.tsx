import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { BaseToast } from "toastify-react-native";

export default function CustomToast(props: any) {
    return (
        <Animated.View
            style={{ width: '100%', height: '100%', alignItems: 'center' }}
            entering={SlideInDown.duration(250)}
            exiting={SlideOutDown.duration(250)}
        >
            <BaseToast {...props} />
        </Animated.View>
    )
}