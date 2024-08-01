import React from "react";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { Camera, Home, PlusCircle, User } from "lucide-react-native";
import { StatusBar } from "expo-status-bar";

const TabIcon = ({
  focused,
  color,
  name,
  icon,
}: {
  focused: boolean;
  color: string;
  name: string;
  icon: React.ReactNode;
}) => {
  return (
    <View className="flex items-center justify-center">
      {icon}
      <Text
        className={`${focused ? "font-pbold" : "font-pregular"} text-xs`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ea580b",
          tabBarStyle: {
            backgroundColor: "#232533",
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            borderRadius: 15,
            elevation: 0,
            borderColor: "transparent",
            paddingBottom: 0,
            height: 60,
            borderTopWidth: 0,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: "Home",
            tabBarIcon: ({ focused, color }) => {
              return (
                <TabIcon
                  focused={focused}
                  color={color}
                  name={"Home"}
                  icon={<Home size={24} color={color} />}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="configuration"
          options={{
            headerShown: false,
            title: "",
            tabBarIcon: ({ focused, color }) => {
              return (
                <View className="-top-8 bg-[#232533] p-4 rounded-full">
                  <PlusCircle size={44} color={color} />
                </View>
              );
            },
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            headerShown: false,
            title: "About",
            tabBarIcon: ({ focused, color }) => {
              return (
                <TabIcon
                  focused={focused}
                  color={color}
                  name={"About"}
                  icon={<User size={24} color={color} />}
                />
              );
            },
          }}
        />
      </Tabs>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
}

export default TabLayout;
