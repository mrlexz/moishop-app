import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { CheckIcon, CircleChevronRight } from "lucide-react-native";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function ConfigurationScreen() {
  return (
    <>
      <SafeAreaView className="h-full bg-dark">
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          <View className="h-full w-full px-6 mt-4">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-white font-pextrabold text-[40px]">
                Your Image on Custom Phone Case
              </Text>
              <View className="ml-4">
                <TouchableOpacity
                  onPress={() => {
                    router.push("/configurations/design");
                  }}
                >
                  <CircleChevronRight color={"#f97316"} size={32} />
                </TouchableOpacity>
              </View>
            </View>
            <View className="mt-4">
              <View className="flex flex-row items-center">
                <CheckIcon color={"#f97316"}></CheckIcon>
                <Text className="text-white font-pregular text-[14px] ml-2">
                  High quality print, durable and long lasting
                </Text>
              </View>
              <View className="flex flex-row items-center">
                <CheckIcon color={"#f97316"}></CheckIcon>
                <Text className="text-white font-pregular text-[14px] ml-2">
                  5 different phone case types to choose from
                </Text>
              </View>
              <View className="flex flex-row items-center">
                <CheckIcon color={"#f97316"}></CheckIcon>
                <Text className="text-white font-pregular text-[14px] ml-2">
                  Fast delivery to your door
                </Text>
              </View>
              <View className="flex flex-row items-center">
                <CheckIcon color={"#f97316"}></CheckIcon>
                <Text className="text-white font-pregular text-[14px] ml-2">
                  Modern Iphone supported
                </Text>
              </View>
            </View>
            <View className="flex">
              <Image
                source={require("@/assets/images/case1.png")}
                resizeMode="contain"
                className="w-full h-[400px] mt-8"
              />
              <Image
                source={require("@/assets/images/case2.png")}
                resizeMode="contain"
                className="w-full h-[400px] mt-8"
              />
            </View>
            <CustomButton
              title="Create now!"
              onPress={() => {
                router.push("/configurations/design");
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#161622" />
    </>
  );
}

export default ConfigurationScreen;
