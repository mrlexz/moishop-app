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
import { RegisterDocument } from "../__generated__/graphql";
import { Notifier, NotifierComponents } from "react-native-notifier";
import useToastMessage from "../hooks/useToastMessage";

type FormValues = {
  email: string;
  password: string;
  name: string;
  repeatPassword: string;
};

function SignUp() {
  const { ...methods } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { showToast } = useToastMessage();

  const [registerUser, { loading }] = useMutation(RegisterDocument);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    registerUser({
      variables: {
        input: {
          email: data.email,
          password: data.password,
          name: data.name,
        },
      },
      onCompleted: (data) => {
        if (data?.signUp?.message === "Email already exists") {
          showToast({
            title: "Email already exists",
            type: "error",
          });
        }
        if (data?.signUp?.success) {
          showToast({
            title: "Account created successfully",
            type: "success",
          });
          router.push("/sign-in");
        }
      },
      onError: (error) => {
        showToast({
          title: "Something went wrong",
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
              Create your account
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
                type="text"
                name="name"
                label="Name"
                placeholder="Enter your name"
                rules={{ required: "Name is required!" }}
                containerClass="mt-5"
              />
              <FormField
                containerClass="mt-5"
                type="password"
                name="password"
                label="Password"
                placeholder="Enter your password"
                rules={{ required: "Password is required!" }}
              />
              <FormField
                containerClass="mt-5"
                type="password"
                name="repeatPassword"
                label="Repeat Password"
                placeholder="Enter your password again"
                rules={{
                  required: "Password is required!",
                  validate: (value) =>
                    value === methods.getValues().password ||
                    "Passwords do not match",
                }}
              />
            </FormProvider>

            <View className="mt-10">
              <CustomButton
                title="Login"
                onPress={methods.handleSubmit(onSubmit, onError)}
              />
              <Text className="text-white text-center mt-4 font-pregular">
                Already have an account?{" "}
                <Text
                  className="text-primary font-pregular"
                  onPress={() => {
                    router.push("/sign-in");
                  }}
                >
                  Sign in
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default SignUp;
