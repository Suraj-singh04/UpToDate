import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
} from "react-native-heroicons/outline";

// A simple progress bar component
const PasswordStrengthBar = ({ score }: { score: number }) => {
  const barColor =
    score === 1 ? "bg-red-500"
    : score === 2 ? "bg-yellow-500"
    : score === 3 ? "bg-green-500"
    : "bg-gray-200";
  const barWidth =
    score === 1 ? "w-1/3"
    : score === 2 ? "w-2/3"
    : score === 3 ? "w-full"
    : "w-0";

  return (
    <View className="h-2 bg-gray-200 rounded-full w-full overflow-hidden">
      <View
        className={`h-2 rounded-full transition-all duration-300 ${barColor} ${barWidth}`}
      />
    </View>
  );
};

// Simple check functions
const hasNumber = (val: string) => /\d/.test(val);
const hasSymbol = (val: string) => /[!@#$%^&*(),.?":{}|<>]/.test(val);
const hasMinLength = (val: string) => val.length >= 8;

export default function CreatePasswordScreen() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const checks = [
    { label: "8 characters minimum", valid: hasMinLength(password) },
    { label: "a number", valid: hasNumber(password) },
    { label: "a symbol", valid: hasSymbol(password) },
  ];

  const strengthScore = checks.filter((c) => c.valid).length;
  const canContinue = strengthScore === 3;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View className="flex-1 px-6">
            <View className="flex-row items-center pt-4 pb-8">
              <TouchableOpacity
                onPress={() => router.back()}
                className="p-2 -ml-2"
              >
                <ArrowLeftIcon size={24} color="#333" />
              </TouchableOpacity>
              <Text className="text-2xl font-bold text-gray-800 ml-4">
                Create your password
              </Text>
            </View>

            <View className="flex-row justify-center space-x-2 mb-8">
              <View className="h-1 w-16 bg-violet-600 rounded-full" />
              <View className="h-1 w-16 bg-violet-600 rounded-full" />
              <View className="h-1 w-16 bg-violet-600 rounded-full" />
            </View>

            <View className="mb-2">
              <Text className="text-base font-medium text-gray-700 mb-2">
                Password
              </Text>
              <View className="flex-row items-center border border-gray-300 rounded-lg pr-4">
                <TextInput
                  className="flex-1 p-4 text-base"
                  placeholder="Enter password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                >
                  {showPassword ?
                    <EyeIcon size={24} color="#9CA3AF" />
                  : <EyeSlashIcon size={24} color="#9CA3AF" />}
                </TouchableOpacity>
              </View>
            </View>

            <PasswordStrengthBar score={strengthScore} />

            <View className="space-y-3 mt-6">
              {checks.map((check) => (
                <View key={check.label} className="flex-row items-center">
                  <CheckCircleIcon
                    size={20}
                    color={check.valid ? "#22C55E" : "#E5E7EB"}
                  />
                  <Text
                    className={`ml-3 text-base ${
                      check.valid ? "text-gray-800" : "text-gray-400"
                    }`}
                  >
                    {check.label}
                  </Text>
                </View>
              ))}
            </View>

            <View className="flex-1" />

            <TouchableOpacity
              onPress={() => router.push("/(auth)/signup-success")}
              disabled={!canContinue}
              className={`rounded-lg p-4 my-6 shadow-sm ${
                canContinue ? "bg-violet-600" : "bg-gray-300"
              }`}
            >
              <Text className="text-center text-white font-semibold text-lg">
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
