import { Image, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";

export default function Index() {
  return (
    <SafeAreaView className="h-full bg-dark">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-1 justify-center items-center w-full h-full px-4">
          <Text className="text-white text-2xl font-pbold">
            case<Text className="text-primary">moishop</Text>
          </Text>
          <Image
            source={require("@/assets/images/onboarding-img.png")}
            resizeMode="center"
            className="w-full max-w-[380px] h-[300px] my-4"
          />
          <Text className="text-white text-3xl font-pbold text-center">
            Your Image on{" "}
            <Text className=" text-primary text-3xl font-bold text-center">
              Custom{" "}
            </Text>
            Phone Case
          </Text>
          <Text className="text-white text-center mt-2 font-pregular">
            Capture your memories with your loved{" "}
            <Text className="text-white text-center mt-2 font-pbold">
              one-of-one
            </Text>{" "}
            on a phone case.{" "}
            <Text className="text-primary text-center mt-2 font-pregular">
              MoiShop
            </Text>{" "}
            allows you to create your own custom phone case with your favorite
            image.
          </Text>
          <View className="w-full mt-8">
            <CustomButton
              title="Continue"
              onPress={() => {
                router.push("/sign-in");
              }}
            />
          </View>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
