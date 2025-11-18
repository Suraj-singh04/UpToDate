import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import {
  CalendarDaysIcon,
  ChatBubbleBottomCenterTextIcon,
  EllipsisHorizontalIcon,
  HomeIcon,
  UserCircleIcon,
} from "react-native-heroicons/solid";

const TabIcon = ({ icon: Icon, color, focused }: any) => {
  return <Icon size={focused ? 30 : 26} color={color} />;
};

export default function TabsLayout() {
  const activeColor = "#7C3AED"; // violet-600
  const inactiveColor = "#A1A1AA"; // zinc-400

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          height: Platform.OS === "ios" ? 90 : 70,
          position: "absolute",
          bottom: 0,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={HomeIcon} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={CalendarDaysIcon} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={ChatBubbleBottomCenterTextIcon}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon={UserCircleIcon} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={EllipsisHorizontalIcon}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
