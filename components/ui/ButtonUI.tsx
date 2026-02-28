import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type Props = {
  title: string;
  onPress: () => void;

  disabled?: boolean;
  loading?: boolean;

  style?: ViewStyle;
  textStyle?: TextStyle;
};

export default function ButtonUI({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.text, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor:'#3669C9' ,
    width: '100%', 
    paddingVertical: 15, 
    borderRadius: 15, 
    textAlign: 'center'
  },

  disabled: {
    backgroundColor: "#C4C5C4",
  },

  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    textAlign: 'center'
  },
});
