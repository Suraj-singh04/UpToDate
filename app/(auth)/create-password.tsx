import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

const getBarStyles = (score: number) => {
  let color = "#E5E7EB"; // gray-200 (Default)
  let widthPercent = "0%";

  if (score === 1) {
    color = "#EF4444"; // red-500
    widthPercent = "33%";
  } else if (score === 2) {
    color = "#F59E0B"; // yellow-500
    widthPercent = "66%";
  } else if (score >= 3) {
    color = "#22C55E"; // green-500 (Full strength)
    widthPercent = "100%";
  }

  return { color, widthPercent };
};

const PasswordStrengthBar = ({ score }: { score: number }) => {
  const { color, widthPercent } = getBarStyles(score);

  return (
    <View
      className="h-2 bg-gray-200 rounded-full w-full"
      style={{ overflow: "hidden" }}
    >
      <View
        className="h-2 rounded-full"
        style={{
          backgroundColor: color,
          width: widthPercent as any,
        }}
      />
    </View>
  );
};

// Password validation checks
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
  // User can continue only if all checks are passed
  const canContinue = strengthScore === checks.length;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View className="flex-1 px-6">
            {/* Header */}
            <View className="flex-row items-center pt-4 pb-8">
              <TouchableOpacity
                onPress={() => router.back()}
                className="p-2"
                style={{ marginLeft: -8 }}
              >
                <ArrowLeftIcon size={24} color="#333" />
              </TouchableOpacity>
              <Text className="text-2xl font-bold text-gray-800 ml-4">
                Create your password
              </Text>
            </View>
            {/* Step Indicators (3/3) */}
            <View className="flex-row justify-center mb-8">
              <View className="h-1 w-16 bg-violet-600 rounded-full mr-2" />
              <View className="h-1 w-16 bg-violet-600 rounded-full mr-2" />
              <View className="h-1 w-16 bg-violet-600 rounded-full" />
            </View>
            {/* Password Input */}
            <View className="mb-2">
              <Text className="text-base font-medium text-gray-700 mb-2">
                Password
              </Text>
              <View
                className="flex-row items-center rounded-lg pr-4"
                style={{ borderWidth: 1, borderColor: "#D1D5DB" }}
              >
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
            {/* Strength Bar */}
            <PasswordStrengthBar score={strengthScore} />
            {/* Requirements List */}
            <View className="mt-6">
              {checks.map((check, index) => (
                <View
                  key={index}
                  className="flex-row items-center"
                  style={{ marginBottom: index < checks.length - 1 ? 12 : 0 }}
                >
                  <CheckCircleIcon
                    size={20}
                    color={check.valid ? "#22C55E" : "#E5E7EB"}
                  />
                  <Text
                    className="ml-3 text-base"
                    style={{ color: check.valid ? "#1F2937" : "#9CA3AF" }}
                  >
                    {check.label}
                  </Text>
                </View>
              ))}
            </View>
            <View className="flex-1" />
            {/* Continue Button */}
            <TouchableOpacity
              onPress={() => router.push("/(auth)/signup-success")}
              disabled={!canContinue}
              className="rounded-lg p-4 my-6 shadow-sm"
              style={{ backgroundColor: canContinue ? "#7C3AED" : "#D1D5DB" }}
            >
              <Text className="text-center text-white font-bold text-lg">
                Continue
              </Text>
            </TouchableOpacity>
            {/* Footer */}
            <View className="mb-6">
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
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
