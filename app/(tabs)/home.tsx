import FormTextInputField from "@/components/FormTextInputField";
import { useGlobalContext } from "@/context/GlobalProvider";
import { SearchIcon } from "lucide-react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SafeAreaView, ScrollView, Text, View } from "react-native";

function Home() {
  const { user } = useGlobalContext();
  const { ...methods } = useForm({
    defaultValues: {
      searchKeys: "",
    },
  });
  return (
    <SafeAreaView className="bg-dark h-full">
      <View className="px-6 mt-10">
        <Text className="text-[#CDCDE0] text-base font-pbold">
          Welcome Back,
        </Text>
        <Text className="text-white text-2xl font-pbold mt-1">
          {user?.name}
        </Text>
        <FormProvider {...methods}>
          <FormTextInputField
            type="text"
            name="searchKeys"
            placeholder="Search anything..."
            containerClass="mt-6"
            iconInput={<SearchIcon size={20} color="#4F4F4F" />}
          />
        </FormProvider>
      </View>
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
}

export default Home;
