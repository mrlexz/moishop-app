import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";

const PAGE_WIDTH = Dimensions.get("window").width - 48;

interface ItemProps {
  index: number;
  animationValue: Animated.SharedValue<number>;
  item: any;
}

const items = [
  {
    id: 1,
    title: "Title 1",
    description: "Description 1",
    image: require("@/assets/images/banner.jpg"),
  },
  {
    id: 2,
    title: "Title 2",
    description: "Description 2",
    image: require("@/assets/images/banner2.jpg"),
  },
];
const CustomItem: React.FC<ItemProps> = ({ index, animationValue, item }) => {
  const maskStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      animationValue.value,
      [-1, 0, 1],
      ["#000000dd", "transparent", "#000000dd"]
    );

    return {
      backgroundColor,
    };
  }, [animationValue]);

  const source = item?.image;

  const enablePretty = false;
  const [isPretty, setIsPretty] = React.useState(enablePretty);

  return (
    <View style={{ flex: 1 }}>
      <LongPressGestureHandler
        onActivated={() => {
          setIsPretty(!isPretty);
        }}
      >
        <Animated.View testID={"testID"} style={{ flex: 1 }}>
          {source ? (
            <>
              <Image
                key={index}
                className="absolute w-full h-full rounded-lg"
                source={source}
              />
              <View className="absolute left-1/2 top-4">
                <Text className="text-white font-psemibold text-xl">
                  {item?.title}
                </Text>
                <Text className="text-white font-pregular text-base">
                  {item?.description}
                </Text>
              </View>
            </>
          ) : (
            <View className="flex-1 justify-center items-center bg-white">
              <Text className="text-black">{index}</Text>
            </View>
          )}
        </Animated.View>
      </LongPressGestureHandler>
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
          maskStyle,
        ]}
      />
    </View>
  );
};
function CarouselSlide() {
  const [isAutoPlay, setIsAutoPlay] = React.useState(true);

  const animationStyle = React.useCallback((value: number) => {
    "worklet";

    const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
    const translateX = interpolate(
      value,
      [-2, 0, 1],
      [-PAGE_WIDTH, 0, PAGE_WIDTH]
    );

    return {
      transform: [{ translateX }],
      zIndex,
    };
  }, []);
  return (
    <Carousel
      loop={true}
      autoPlay={isAutoPlay}
      style={{ width: PAGE_WIDTH, height: 150 }}
      width={PAGE_WIDTH}
      data={items}
      renderItem={({ index, animationValue, item }) => {
        return (
          <CustomItem
            key={index}
            index={index}
            animationValue={animationValue}
            item={item}
          />
        );
      }}
      customAnimation={animationStyle}
      scrollAnimationDuration={2000}
    />
  );
}

export default CarouselSlide;
