import FormField from "@/components/FormTextInputField";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  useForm,
  FormProvider,
  SubmitHandler,
  SubmitErrorHandler,
} from "react-hook-form";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { useMutation } from "@apollo/client";
import { LoginDocument } from "../__generated__/graphql";
import useToastMessage from "../hooks/useToastMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKeys } from "@/constants/StorageKeys";

type FormValues = {
  email: string;
  password: string;
};

function SignIn() {
  const { ...methods } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { showToast } = useToastMessage();

  const [login, { loading }] = useMutation(LoginDocument);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    login({
      variables: {
        input: {
          email: data.email,
          password: data.password,
        },
      },
      onCompleted: async (data) => {
        if (data.signIn?.access_token) {
          try {
            await AsyncStorage.setItem(
              StorageKeys.TOKEN,
              data.signIn.access_token
            );
          } catch (e) {}
          showToast({
            title: "Login successful",
            type: "success",
          });
          router.push("/home");
        }
      },
      onError: (error) => {
        showToast({
          title: "Invalid credentials",
          type: "error",
        });
      },
      fetchPolicy: "network-only",
    });
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {};

  return (
    <SafeAreaView className="bg-dark h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 mb-10"
      >
        <ScrollView>
          <View className="w-full justify-center px-4 my-6 min-h-[85vh]">
            <Text className="text-white text-2xl font-pbold">
              case<Text className="text-primary">moishop</Text>
            </Text>
            <Text className="text-white text-2xl font-pbold mt-8">
              Login to your account
            </Text>
            <FormProvider {...methods}>
              <FormField
                type="text"
                name="email"
                label="Email"
                placeholder="Enter your email"
                rules={{ required: "Email is required!" }}
                containerClass="mt-8"
              />
              <FormField
                containerClass="mt-6"
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                rules={{ required: "Password is required!" }}
              />
            </FormProvider>

            <View className="mt-10">
              <CustomButton
                title="Login"
                loading={loading}
                onPress={methods.handleSubmit(onSubmit, onError)}
              />
              <Text className="text-white text-center mt-4 font-pregular">
                Don't have an account?{" "}
                <Text
                  className="text-primary font-pregular"
                  onPress={() => {
                    router.push("/sign-up");
                  }}
                >
                  Sign up
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default SignIn;
