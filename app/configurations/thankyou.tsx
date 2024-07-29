import CustomButton from "@/components/CustomButton";
import { useQuery } from "@apollo/client";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { GetPaymentStatusDocument } from "../__generated__/graphql";

function ThankYou() {
  const { orderId } = useLocalSearchParams<{ orderId?: string }>();
  console.log("🚀 ~ ThankYou ~ configId:", orderId);

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

  const { data, loading, stopPolling } = useQuery(GetPaymentStatusDocument, {
    variables: {
      orderId,
    },
    pollInterval: 1000,
  });

  console.log("🚀 ~ ThankYou ~ data:", data);
  return (
    <SafeAreaView className="bg-dark h-full">
      <ScrollView>
        <View className="px-6 my-8">
          <Text className="text-white text-2xl font-pbold">
            Thank you for your order!
          </Text>
          <Text className="text-white mt-2 font-pregular">
            Your order has been placed and will be shipped soon.{" "}
            {data?.paymentStatus?.order?.id}
          </Text>
          <Text className="text-white mt-2 font-pregular">
            You will receive an email with your order details.
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

export default ThankYou;
