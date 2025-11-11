// app/index.tsx

import { images } from "@/constants";
import { Link } from "expo-router";
import React from "react";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  AcademicCapIcon,
  BellAlertIcon,
  CalendarDaysIcon,
} from "react-native-heroicons/solid";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
        <View className="flex-1 justify-between">
          <View className="items-center px-4">
            <ImageBackground
              source={images.homeGraphic}
              className="w-full h-[400px] mt-4"
              resizeMode="contain"
            />
            <Text className="text-center font-bold text-4xl mt-2 text-gray-800">
              Welcome!
            </Text>

            <Text className="text-center text-lg font-medium text-gray-600 mb-4">
              Track your child&apos;s
              <Text className="font-extrabold text-violet-600"> progress </Text>
              easily!
            </Text>
          </View>

          <View className="flex-row justify-around w-full px-8 mb-10">
            <View className="items-center space-y-2">
              <AcademicCapIcon size={40} color="#8B5CF6" />
              <Text className="text-center font-semibold text-gray-600">
                Progress
              </Text>
            </View>
            <View className="items-center space-y-2">
              <CalendarDaysIcon size={40} color="#8B5CF6" />
              <Text className="text-center font-semibold text-gray-600">
                Events
              </Text>
            </View>
            <View className="items-center space-y-2">
              <BellAlertIcon size={40} color="#8B5CF6" />
              <Text className="text-center font-semibold text-gray-600">
                Alerts
              </Text>
            </View>
          </View>

          <View className="items-center px-8">
            <Link
              href="/(auth)/create-account-method"
              asChild
              className="w-full"
            >
              <TouchableOpacity className="bg-violet-600 w-full rounded-full p-4 mb-4 shadow-md">
                <Text className="text-center text-white font-bold text-lg">
                  Create Account
                </Text>
              </TouchableOpacity>
            </Link>

            <View className="flex-row items-center justify-center pt-2 pb-4">
              <Text className="text-gray-500 text-base">
                Already Have an Account?{" "}
              </Text>
              <Link href="/(auth)/sign-in" asChild>
                <TouchableOpacity>
                  <Text className="text-violet-600 text-base font-extrabold">
                    Log in
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
