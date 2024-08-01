import CustomButton from "@/components/CustomButton";
import { useQuery } from "@apollo/client";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { GetPaymentStatusDocument } from "../__generated__/graphql";
import { CheckCircle2Icon } from "lucide-react-native";
import PhoneCase from "@/components/Phone";

function ThankYou() {
  const { orderId } = useLocalSearchParams<{ orderId?: string }>();

  const { data, loading, stopPolling } = useQuery(GetPaymentStatusDocument, {
    variables: {
      orderId: orderId ?? "",
    },
    pollInterval: 1000,
  });

  useEffect(() => {
    if (data?.paymentStatus?.status !== undefined) {
      stopPolling();
    }
  }, [data]);

  if (!orderId) {
    return (
      <SafeAreaView className="bg-dark h-full">
        <ScrollView>
          <View className="px-6 my-8">
            <Text className="text-white text-2xl font-pbold">
              Order not found
            </Text>
          </View>
        </ScrollView>
        <View className="px-6 shadow">
          <CustomButton
            title="Go home"
            onPress={() => {
              router.replace("/home");
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView className="bg-dark h-full">
        <ScrollView>
          <View className="px-6 my-8 flex items-center">
            <ActivityIndicator size={"large"} color={"#ea580b"} />
            <Text className="text-white text-2xl font-pbold">
              Checking your order...
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-dark h-full">
      <ScrollView>
        <View>
          <CheckCircle2Icon
            className="mx-auto mt-8 text-green-500"
            width={60}
            height={60}
          />
        </View>
        <View className="px-6 my-8">
          <Text className="text-white text-2xl font-pbold">
            Thank you for your order!
          </Text>
          <Text className="text-white mt-2 font-pregular">
            Your case is on the way!{" "}
          </Text>
          <Text className="text-white mt-2 font-pregular">
            You will receive an email with your order details.
          </Text>
        </View>
        <View className="flex justify-center items-center p-4 border-dashed border border-primary rounded-xl bg-[#1E1E2D] mx-6 mb-16">
          <View className=" h-[500px] w-[245px]">
            <PhoneCase
              imageUrl={data?.paymentStatus?.order?.configuration?.imgUrl}
            />
          </View>
        </View>
      </ScrollView>
      <View className="px-6 shadow">
        <CustomButton
          title="Go home"
          onPress={() => {
            router.replace("/home");
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default ThankYou;
