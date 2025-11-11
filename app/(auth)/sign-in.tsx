// app/(auth)/sign-in.tsx

import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/outline";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="flex-row items-center pt-4 pb-8">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <ArrowLeftIcon size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-800 ml-4">
          Log into account
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-base font-medium text-gray-700 mb-2">Email</Text>
        <TextInput
          className="border border-gray-300 rounded-xl p-4 text-base"
          placeholder="example@example.com"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View className="mb-6">
        <Text className="text-base font-medium text-gray-700 mb-2">
          Password
        </Text>
        <View className="flex-row items-center border border-gray-300 rounded-xl pr-4">
          <TextInput
            className="flex-1 p-4 text-base"
            placeholder="Enter password"
            placeholderTextColor="#9CA3AF"
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ?
              <EyeIcon size={24} color="#9CA3AF" />
            : <EyeSlashIcon size={24} color="#9CA3AF" />}
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity className="bg-violet-500 rounded-lg p-4 mb-4 shadow-sm">
        <Text className="text-center text-white font-semibold text-lg">
          Log in
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="items-center mb-10">
        <Text className="text-violet-600 font-semibold text-base">
          Forgot password?
        </Text>
      </TouchableOpacity>

      <View className="absolute bottom-8 left-0 right-0 items-center px-6">
        <Text className="text-gray-500 text-sm text-center">
          By using Classroom, you agree to the{" "}
          <Link href="/terms" className="text-violet-600 font-bold">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-violet-600 font-bold">
            Privacy Policy.
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}
