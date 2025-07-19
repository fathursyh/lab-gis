import { Alert } from "react-native";

export const confirm = (title: string, message: string, confirm: string, style?: 'default' | 'cancel' | 'destructive' | undefined) : Promise< boolean > => {
  return new Promise((resolve) => {
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Batal',
          onPress: () => resolve(false),
          style: 'cancel',
        },
        {
          text: confirm,
          style: style || 'default',
          onPress: () => resolve(true),
        },
      ],
      { cancelable: false, }
    );
  });
};