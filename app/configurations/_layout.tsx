import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

function ConfigurationLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          title: "Configuration",
        }}
      >
        <Stack.Screen
          name="design"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="upload"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}

export default ConfigurationLayout;
