import { useState } from "react";
import { View } from "react-native";
import DateTimePicker, { useDefaultStyles } from "react-native-ui-datepicker";
import { resolveModalResult } from "../../utils/helpers";
import { router } from "expo-router";
import CustomButton from "./CustomButton";

export default function CalendarPicker() {
    const defaultStyles = useDefaultStyles("light");
    const [selected, setSelected] = useState<any>();
    const submitDate = () => {
        resolveModalResult(new Date(selected).toLocaleDateString('id'));
        router.dismiss();
    };
    return (
        <View style={{ padding: 12}}>
            <DateTimePicker disableYearPicker locale="id" mode="single" 
                weekdaysFormat="short" date={selected} onChange={({ date }) => setSelected(date)} 
                styles={defaultStyles} minDate={new Date()}
            />
            <CustomButton onPress={submitDate}>Ok</CustomButton>
        </View>
    );
}
