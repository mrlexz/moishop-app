import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { LogOut } from "lucide-react-native";
import React, { useContext } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

function About() {
  const { user, logout } = useGlobalContext();
  return (
    <SafeAreaView className="h-full bg-dark">
      <ScrollView>
        <View className="px-6 py-8">
          <View className="flex items-end w-full">
            <TouchableOpacity
              onPress={() => {
                logout();
                router.replace("/");
              }}
            >
              <LogOut color={"#ea580b"} />
            </TouchableOpacity>
          </View>
          <View className="flex items-center mt-4">
            <View className="w-[80px] h-[80px]">
              <Image
                source={require("@/assets/images/default-avatar.png")}
                resizeMode="cover"
                className="w-full h-full rounded-full"
              />
            </View>
            <Text className="text-white text-2xl mt-4 font-psemibold">
              {user?.name}
            </Text>
          </View>
          <View className="w-full flex justify-center items-center my-4">
            <View className="h-[1px] bg-slate-300 w-2/3"></View>
          </View>
          <View>
            <View>
              <Text className="text-white text-xl mt-4 font-psemibold">
                Profile Details
              </Text>
              <Text className="text-white text-base mt-2 font-pregular">
                Email: {user?.email}
              </Text>
            </View>
            <View>
              <Text className="text-white text-xl mt-4 font-psemibold">
                About this app
              </Text>
              <Text className="text-white text-base mt-2 font-pregular">
                Version: 1.0.0
              </Text>
              <Text className="text-white text-base mt-2 font-pregular">
                This is a simple app that uses React Native and Tailwind CSS to
                create a mobile app. It uses TypeScript and Lucide icons. It
                also uses the Context API for state management.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default About;
