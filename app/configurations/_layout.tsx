import { StripeProvider } from "@stripe/stripe-react-native";
import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

function ConfigurationLayout() {
  return (
    <>
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
      >
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
          <Stack.Screen
            name="review"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="thankyou"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
        <StatusBar backgroundColor="#161622" style="light" />
      </StripeProvider>
    </>
  );
}

export default ConfigurationLayout;
