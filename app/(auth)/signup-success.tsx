// app/(auth)/signup-success.tsx
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CheckIcon } from "react-native-heroicons/solid";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";

export default function SignUpSuccessScreen() {
  const router = useRouter();
  const { setSignUpData } = useAuth();

  useEffect(() => {
    // Clear navigation stack so the user cannot go back into signup flow
    router.dismissAll();

    // Reset signUpData here (only after success)
    setSignUpData({
      role: null,
      name: "",
      email: "",
      mobile: "",
    });
  }, []);

  const goToLogin = () => {
    // Use replace to prevent going back to success
    router.replace("/(auth)/sign-in");
  };

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

        <TouchableOpacity
          onPress={goToLogin}
          className="bg-violet-600 rounded-lg p-4 shadow-sm w-full"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Log in
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
