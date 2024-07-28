import { Loader, Loader2 } from "lucide-react-native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function CustomButton({
  title,
  onPress,
  containerClass = "",
  textClass = "",
  loading = false,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  containerClass?: string;
  textClass?: string;
  loading?: boolean;
  disabled?: boolean;
}) {
  return (
    <TouchableOpacity
      className={`bg-primary p-4 rounded-lg ${containerClass} ${
        loading ? "opacity-50" : ""
      } ${disabled ? "opacity-50" : ""}`}
      onPress={onPress}
      disabled={loading || disabled}
    >
      <Text
        className={`text-white font-psemibold text-center text-base ${textClass}`}
      >
        {loading ? "Loading..." : title}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
