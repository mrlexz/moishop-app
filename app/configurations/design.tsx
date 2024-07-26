import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, Text } from "react-native";

function DesignScreen() {
  return (
    <>
      <SafeAreaView className="h-full bg-dark">
        <Text className="text-white">muahahah</Text>
      </SafeAreaView>
      <StatusBar style="light" backgroundColor="#161622" />
    </>
  );
}

export default DesignScreen;
