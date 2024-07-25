import React from "react";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";

import { Camera, Home, User } from "lucide-react-native";

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
    <View className="flex items-center">
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
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#ea580b",
          tabBarStyle: {
            backgroundColor: "#161622",
            borderTopColor: "#232533",
            borderTopWidth: 1,
            height: 84,
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
    </>
  );
}

export default TabLayout;
