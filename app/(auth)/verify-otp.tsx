import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { ArrowLeftIcon } from "react-native-heroicons/outline";

export default function VerifyOtpScreen() {
  const router = useRouter();
  const [code, setCode] = useState(new Array(5).fill(""));
  const inputsRef = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    if (isNaN(Number(text))) return;
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 4) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e: React.BaseSyntheticEvent, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const mockedMobile = "*******789"; // You would pass this from the previous screen

  return (
    <SafeAreaView className="flex-1 bg-white">
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
              Verify your mobile
            </Text>
          </View>

          <View className="flex-row justify-center space-x-2 mb-8">
            <View className="h-1 w-16 bg-violet-600 rounded-full" />
            <View className="h-1 w-16 bg-violet-600 rounded-full" />
            <View className="h-1 w-16 bg-gray-200 rounded-full" />
          </View>

          <Text className="text-base text-gray-600 mb-6 text-center px-4">
            We just sent a 5-digit code to
            <Text className="font-bold text-gray-800"> +91 {mockedMobile}</Text>
            , enter it below:
          </Text>

          <Text className="text-base font-medium text-gray-700 mb-2">Code</Text>
          <View className="flex-row justify-between mb-8">
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                className="border border-gray-300 rounded-lg w-16 h-16 text-center text-2xl font-semibold"
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleBackspace(e, index)}
                value={digit}
              />
            ))}
          </View>

          <Link href="/(auth)/signup-success" asChild>
            <TouchableOpacity className="bg-violet-600 rounded-lg p-4 mb-4 shadow-sm">
              <Text className="text-center text-white font-semibold text-lg">
                Verify
              </Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity className="items-center">
            <Text className="text-violet-600 font-semibold text-base">
              Wrong number? Send to different number
            </Text>
          </TouchableOpacity>

          <View className="absolute bottom-6 left-0 right-0 items-center px-6">
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
    </SafeAreaView>
  );
}
