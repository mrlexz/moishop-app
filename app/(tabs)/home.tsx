import CarouselSlide from "@/components/CarouselSlide";
import FormTextInputField from "@/components/FormTextInputField";
import { useGlobalContext } from "@/context/GlobalProvider";
import { ArrowRight, BellRingIcon, SearchIcon } from "lucide-react-native";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { FlashList } from "@shopify/flash-list";

const DATA = [
  {
    key: "1",
    title: "Case Custom 1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    reviewAmount: 10,
    star: 4,
    image: require("@/assets/images/case1.png"),
  },
  {
    key: "2",
    title: "Case Custom 2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    reviewAmount: 10,
    star: 4,
    image: require("@/assets/images/case2.png"),
  },
  {
    key: "3",
    title: "Case Custom 3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    reviewAmount: 10,
    star: 4,
    image: require("@/assets/images/case1.png"),
  },
  {
    key: "4",
    title: "Case Custom 4",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    reviewAmount: 10,
    star: 4,
    image: require("@/assets/images/case2.png"),
  },
  {
    key: "5",
    title: "Case Custom 5",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    reviewAmount: 10,
    star: 4,
    image: require("@/assets/images/case1.png"),
  },
  {
    key: "6",
    title: "Case Custom 6",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    reviewAmount: 10,
    star: 4,
    image: require("@/assets/images/case2.png"),
  },
];

const data = [...new Array(6).keys()];
const width = Dimensions.get("window").width;

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
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text className="text-[#CDCDE0] text-base font-pbold">
              Welcome back,
            </Text>
            <Text className="text-white text-2xl font-pbold mt-1">
              {user?.name}
            </Text>
          </View>
          <View>
            <BellRingIcon size={24} color="#ea580b" />
          </View>
        </View>
        <FormProvider {...methods}>
          <FormTextInputField
            type="text"
            name="searchKeys"
            placeholder="Search anything..."
            containerClass="mt-6"
            iconInput={<SearchIcon size={20} color="#4F4F4F" />}
          />
        </FormProvider>
        <View className="mt-4 h-[150px]">
          <CarouselSlide />
        </View>

        <View className="mt-6 h-[500px] pb-[190px]">
          <Text className="text-white text-xl font-pextrabold mb-4">
            Top Case Custom
          </Text>
          <FlashList
            data={DATA}
            renderItem={({ item }) => (
              <View
                key={item.key}
                className="px-3 py-4 bg-[#1E1E2D] border border-gray-300/30 rounded-lg my-1 flex flex-row items-center"
              >
                <View>
                  <Image
                    source={item.image}
                    style={{ width: 70, height: 100 }}
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-lg font-pbold">
                    {item.title}
                  </Text>
                  <Text className="text-[#CDCDE0] text-sm font-pregular mt-2">
                    {item.desc}
                  </Text>
                  <View className="flex flex-row items-center mt-2 space-x-2">
                    <View className="flex flex-row items-center bg-primary/50 px-2 rounded-md justify-center space-x-1">
                      <Text className="text-primary text-sm font-pbold">★</Text>
                      <Text className="text-primary text-sm font-pbold">
                        {item.star}
                      </Text>
                    </View>
                    <Text className="text-white text-sm font-pregular">
                      ({item.reviewAmount} reviews)
                    </Text>
                  </View>
                </View>
                <View>
                  <ArrowRight color={"#CDCDE0"} />
                </View>
              </View>
            )}
            estimatedItemSize={10}
          />
        </View>
      </View>
      <ScrollView></ScrollView>
    </SafeAreaView>
  );
}

export default Home;
