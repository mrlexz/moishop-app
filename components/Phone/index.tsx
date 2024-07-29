import React from "react";
import { Image, View } from "react-native";

function PhoneCase({ imageUrl }: { imageUrl?: string }) {
  return (
    <View className="relative z-50 overflow-hidden h-full bg-white">
      <Image
        className="z-50 flex-1"
        resizeMode="cover"
        source={require("@/assets/images/phone-template-white-edges.png")}
        style={{
          width: undefined,
          height: undefined,
        }}
      />
      <View className="absolute -z-10">
        <Image
          className="flex-1 -z-10 min-h-full min-w-full"
          resizeMode="cover"
          source={{
            uri: imageUrl,
          }}
          style={{
            width: undefined,
            height: undefined,
          }}
        />
      </View>
    </View>
  );
}

export default PhoneCase;
