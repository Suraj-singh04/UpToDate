import { Link } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CheckIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpSuccessScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        <View className="bg-violet-100 p-6 rounded-full mb-8">
          <View className="bg-violet-600 p-6 rounded-full">
            <CheckIcon size={60} color="white" />
          </View>
        </View>

        <Text className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Your account was successfully created!
        </Text>

        <Text className="text-base text-gray-600 mb-10 text-center">
          Only one click to explore online education.
        </Text>

        <Link href="/(auth)/sign-in" asChild className="w-full">
          <TouchableOpacity className="bg-violet-600 rounded-lg p-4 shadow-sm w-full">
            <Text className="text-center text-white font-semibold text-lg">
              Log in
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
