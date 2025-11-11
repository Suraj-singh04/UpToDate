import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
  AcademicCapIcon,
  ArrowLeftIcon,
  UserIcon,
} from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignUpRoleScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 px-6">
        <View className="flex-row items-center pt-4 pb-8">
          <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
            <ArrowLeftIcon size={24} color="#333" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800 ml-4">
            Create account
          </Text>
        </View>

        <Text className="text-3xl font-bold text-gray-800 mb-3">
          Are you a...
        </Text>
        <Text className="text-base text-gray-600 mb-10">
          Choose your role to get started. This will help us tailor the
          experience for you.
        </Text>

        <View className="space-y-4">
          {/* Parent Card */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/(signup)/parent-form")}
            className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex-row items-center shadow-sm active:border-violet-300"
          >
            <View className="bg-violet-100 p-4 rounded-full">
              <UserIcon size={32} color="#8B5CF6" />
            </View>
            <View className="flex-1 ml-5">
              <Text className="text-xl font-bold text-gray-800">Parent</Text>
              <Text className="text-sm text-gray-600 mt-1">
                Track your child's progress and stay connected
              </Text>
            </View>
          </TouchableOpacity>

          {/* Teacher Card */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/(signup)/teacher-form")}
            className="bg-white border-2 border-gray-200 rounded-2xl p-6 flex-row items-center shadow-sm mt-4 active:border-violet-300"
          >
            <View className="bg-violet-100 p-4 rounded-full">
              <AcademicCapIcon size={32} color="#8B5CF6" />
            </View>
            <View className="flex-1 ml-5">
              <Text className="text-xl font-bold text-gray-800">Teacher</Text>
              <Text className="text-sm text-gray-600 mt-1">
                Manage your classes and student activities
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
