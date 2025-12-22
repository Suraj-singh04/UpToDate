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

  const RoleCard = ({
    title,
    subtitle,
    icon: Icon,
    onPress,
    color = "#8B5CF6",
  }: any) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-white border border-gray-100 rounded-3xl p-6 flex-row items-center shadow-sm mb-5"
      style={{
        shadowColor: color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 4,
      }}
    >
      <View className={`p-4 rounded-2xl bg-${color === "#8B5CF6" ? "violet" : "indigo"}-50`}>
        <Icon size={32} color={color} />
      </View>
      <View className="flex-1 ml-5">
        <Text className="text-xl font-bold text-gray-900">{title}</Text>
        <Text className="text-sm text-gray-500 mt-1 leading-5">
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="flex-row items-center pt-4 pb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 -ml-2 rounded-full active:bg-gray-100"
          >
            <ArrowLeftIcon size={24} color="#1F2937" />
          </TouchableOpacity>
        </View>

        <View className="mt-2 mb-10">
          <Text className="text-4xl font-bold text-gray-900 mb-3">
            Who are you?
          </Text>
          <Text className="text-lg text-gray-500">
            Choose your role to get started with your personalized experience.
          </Text>
        </View>

        <View>
          <RoleCard
            title="Parent"
            subtitle="Track your child's progress, attendance, and stay connected."
            icon={UserIcon}
            onPress={() => router.push("/(auth)/(signup)/parent-form")}
            color="#7C3AED" // violet-600
          />

          <RoleCard
            title="Teacher"
            subtitle="Manage classes, mark attendance, and organize activities."
            icon={AcademicCapIcon}
            onPress={() => router.push("/(auth)/(signup)/teacher-form")}
            color="#4F46E5" // indigo-600
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
