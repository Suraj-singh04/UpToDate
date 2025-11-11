import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ArrowLeftIcon,
  EnvelopeIcon,
  IdentificationIcon,
  PhoneIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TeacherSignUpForm() {
  const router = useRouter();
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          onScrollBeginDrag={Keyboard.dismiss}
        >
          {/* Header */}
          <View className="flex-row items-center px-6 pt-4 pb-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 -ml-2"
            >
              <ArrowLeftIcon size={24} color="#4B5563" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-gray-800 ml-4">
              Teacher Details
            </Text>
          </View>

          {/* Progress Indicator */}
          <View className="flex-row justify-center mb-8 px-6">
            <View className="h-1 w-16 bg-violet-600 rounded-full mr-2" />
            <View className="h-1 w-16 bg-gray-300 rounded-full mr-2" />
            <View className="h-1 w-16 bg-gray-300 rounded-full" />
          </View>

          <View className="px-6">
            {/* Teacher Details Section */}
            <Text className="text-lg font-semibold text-gray-800 mb-3">
              Your Details
            </Text>
            <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
              {/* Full Name */}
              <View className="mb-5">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </Text>
                <View className="flex-row items-center">
                  <View className="absolute left-4 z-10">
                    <UserIcon
                      size={20}
                      color={focusedInput === "name" ? "#7c3aed" : "#9CA3AF"}
                    />
                  </View>
                  <TextInput
                    className={`flex-1 border rounded-xl p-4 pl-12 text-base bg-white ${
                      focusedInput === "name" ? "border-violet-600" : (
                        "border-gray-300"
                      )
                    }`}
                    placeholder="Enter your full name"
                    onFocus={() => setFocusedInput("name")}
                    onBlur={() => setFocusedInput(null)}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Official School Email */}
              <View className="mb-5">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Official School Email
                </Text>
                <View className="flex-row items-center">
                  <View className="absolute left-4 z-10">
                    <EnvelopeIcon
                      size={20}
                      color={focusedInput === "email" ? "#7c3aed" : "#9CA3AF"}
                    />
                  </View>
                  <TextInput
                    className={`flex-1 border rounded-xl p-4 pl-12 text-base bg-white ${
                      focusedInput === "email" ? "border-violet-600" : (
                        "border-gray-300"
                      )
                    }`}
                    placeholder="name@school.com"
                    keyboardType="email-address"
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              {/* Registered Mobile Number */}
              <View className="mb-5">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Registered Mobile Number
                </Text>
                <View className="flex-row items-center">
                  <View className="absolute left-4 z-10">
                    <PhoneIcon
                      size={20}
                      color={focusedInput === "mobile" ? "#7c3aed" : "#9CA3AF"}
                    />
                  </View>
                  <TextInput
                    className={`flex-1 border rounded-xl p-4 pl-12 text-base bg-white ${
                      focusedInput === "mobile" ? "border-violet-600" : (
                        "border-gray-300"
                      )
                    }`}
                    placeholder="Enter 10-digit mobile number"
                    keyboardType="phone-pad"
                    onFocus={() => setFocusedInput("mobile")}
                    onBlur={() => setFocusedInput(null)}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>

              {/* Employee ID */}
              <View className="mb-5">
                <Text className="text-sm font-medium text-gray-700 mb-2">
                  Employee ID
                </Text>
                <View className="flex-row items-center">
                  <View className="absolute left-4 z-10">
                    <IdentificationIcon
                      size={20}
                      color={
                        focusedInput === "employeeId" ? "#7c3aed" : "#9CA3AF"
                      }
                    />
                  </View>
                  <TextInput
                    className={`flex-1 border rounded-xl p-4 pl-12 text-base bg-white ${
                      focusedInput === "employeeId" ? "border-violet-600" : (
                        "border-gray-300"
                      )
                    }`}
                    placeholder="Enter your school employee ID"
                    onFocus={() => setFocusedInput("employeeId")}
                    onBlur={() => setFocusedInput(null)}
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
            </View>

            {/* Continue Button */}
            <View className="mt-6">
              <TouchableOpacity
                onPress={() => router.push("/(auth)/verify-otp")}
                className="bg-violet-600 rounded-xl py-4 shadow-md"
              >
                <Text className="text-center text-white font-semibold text-lg">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
