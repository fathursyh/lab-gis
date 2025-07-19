import { Colors } from "toastify-react-native/config/theme";
import CustomToast from "../components/UI/CustomToast";
import { ToastManagerProps } from "toastify-react-native/utils/interfaces";

export const toastConfig = {
    default: (props : any) => (
        <CustomToast {...props} />
    ),
    success: (props : any) => (
        <CustomToast {...props} />
    ),
    warn: (props : any) => (
        <CustomToast {...props} iconColor={Colors.warn} />
    ),
    info: (props : any) => (
        <CustomToast {...props} iconColor={Colors.info} />
    ),
    error: (props : any) => (
        <CustomToast {...props} iconColor={Colors.error} />
    ),
}

export const toastOptions: ToastManagerProps = {
    position: "bottom",
    showProgressBar: false,
    useModal: false,
    showCloseIcon: true,
};
