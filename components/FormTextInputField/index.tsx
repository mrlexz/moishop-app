import { Eye, EyeOff } from "lucide-react-native";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import {
  useController,
  useFormContext,
  UseControllerProps,
} from "react-hook-form";

type FormFieldProps = {
  label: string;
  type: "text" | "password";
  placeholder?: string;
  containerClass?: string;
} & UseControllerProps;

const ControlledInput = (props: FormFieldProps) => {
  const formContext = useFormContext();
  const { formState } = formContext;
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    type,
    label,
    placeholder = "",
    name,
    containerClass = "",
    rules,
    defaultValue,
    ...inputProps
  } = props;

  const { field } = useController({ name, rules, defaultValue });

  const hasError = Boolean(formState?.errors[name]);

  return (
    <View className={`space-y-2 ${containerClass}`}>
      <Text className="text-gray-100 text-base font-pmedium">{label}</Text>

      <View className="w-full h-16 px-4 bg-[#1E1E2D] border-[#232533] border-2 rounded-2xl focus:border-[#FF9C01] items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          placeholder={placeholder}
          placeholderTextColor={"#4F4F4F"}
          secureTextEntry={type === "password" && !showPassword}
          onChangeText={field.onChange}
          value={field.value}
          onBlur={field.onBlur}
          autoCapitalize={"none"}
          {...inputProps}
        />
        {type === "password" && (
          <TouchableOpacity
            onPress={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? (
              <EyeOff color={"#4f4f4f"} />
            ) : (
              <Eye color={"#4f4f4f"} />
            )}
          </TouchableOpacity>
        )}
      </View>
      <View>
        {hasError && (
          <Text className="text-red-500">
            {(formState.errors[name]?.message as string) ?? ""}
          </Text>
        )}
      </View>
    </View>
  );
};

function FormTextInputField(props: FormFieldProps) {
  const formContext = useFormContext();

  if (!formContext || !props.name) {
    const msg = !formContext
      ? "TextInput must be wrapped by the FormProvider"
      : "Name must be defined";
    console.error(msg);
    return null;
  }

  return <ControlledInput {...props} />;
}

export default FormTextInputField;
