import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

export default function TeacherSignUpForm() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 px-6">
            <View className="flex-row items-center pt-4 pb-8">
              <TouchableOpacity
                onPress={() => router.back()}
                className="p-2 -ml-2"
              >
                <ArrowLeftIcon size={24} color="#333" />
              </TouchableOpacity>
              <Text className="text-2xl font-bold text-gray-800 ml-4">
                Teacher Details (1/3)
              </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="mb-4">
                <Text className="text-base font-medium text-gray-700 mb-2">
                  Full Name
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-4 text-base"
                  placeholder="Enter your full name"
                />
              </View>
              <View className="mb-4">
                <Text className="text-base font-medium text-gray-700 mb-2">
                  Official School Email
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-4 text-base"
                  placeholder="name@school.com"
                  keyboardType="email-address"
                />
              </View>
              <View className="mb-4">
                <Text className="text-base font-medium text-gray-700 mb-2">
                  Registered Mobile Number
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-4 text-base"
                  placeholder="Enter 10-digit mobile number"
                  keyboardType="phone-pad"
                />
              </View>
              <View className="mb-4">
                <Text className="text-base font-medium text-gray-700 mb-2">
                  Employee ID
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-4 text-base"
                  placeholder="Enter your school employee ID"
                />
              </View>

              <TouchableOpacity
                onPress={() => router.push("/(auth)/verify-otp")}
                className="bg-violet-600 rounded-lg p-4 my-6 shadow-sm"
              >
                <Text className="text-center text-white font-semibold text-lg">
                  Continue
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
