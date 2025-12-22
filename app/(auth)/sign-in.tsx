import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    Keyboard,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { ArrowLeftIcon, EnvelopeIcon, LockClosedIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

import { OAuthProvider } from "react-native-appwrite";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../context/AuthContext";
import { loginWithOAuth, signInWithEmail } from "../../lib/appwrite";

export default function SignInScreen() {
  const router = useRouter();
  const { checkSession } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Clear navigation stack on mount
  useEffect(() => {
    // router.dismissAll(); // This might be too aggressive if user wants to go back to home
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      await signInWithEmail(email, password);
      await checkSession();
      router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);
      // Alert/Toast handled by lib or context usually, but keeping it simple here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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

          <View className="mt-4 mb-8">
            <Text className="text-4xl font-bold text-gray-900 mb-2">
              Welcome Back!
            </Text>
            <Text className="text-lg text-gray-500">
              Sign in to continue monitoring progress.
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            <Input
              label="Email Address"
              placeholder="e.g. parent@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<EnvelopeIcon size={20} color="#6B7280" />}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              isPassword
              icon={<LockClosedIcon size={20} color="#6B7280" />}
            />

            <TouchableOpacity className="self-end" onPress={() => {}}>
              <Text className="text-violet-600 font-semibold text-sm">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>

          {/* Action Button */}
          <View className="mt-10">
            <Button
              title="Log In"
              onPress={handleLogin}
              isLoading={isLoading}
              variant="primary"
              className="w-full shadow-violet-200 shadow-lg"
            />
          </View>

          {/* Social Login */}
          <View className="mt-8">
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="mx-4 text-gray-400 text-sm">Or continue with</Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>

            <View className="flex-row justify-center space-x-4">
              <TouchableOpacity 
                onPress={() => loginWithOAuth(OAuthProvider.Google)}
                className="w-14 h-14 bg-white border border-gray-200 rounded-full justify-center items-center shadow-sm"
              >
                  {/* Google Icon placeholder - simpler to use Text for now if image not avail, but let's try to simulate G logo color */}
                  <Text className="text-xl font-bold text-red-500">G</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => loginWithOAuth(OAuthProvider.Apple)}
                className="w-14 h-14 bg-black border border-black rounded-full justify-center items-center shadow-sm"
              >
                  <Text className="text-xl font-bold text-white"></Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => loginWithOAuth(OAuthProvider.Facebook)}
                className="w-14 h-14 bg-[#1877F2] border border-[#1877F2] rounded-full justify-center items-center shadow-sm"
              >
                  <Text className="text-xl font-bold text-white">f</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <TouchableOpacity
            onPress={() => router.push("/(auth)/create-account-method")}
            className="mt-auto mb-8 flex-row justify-center py-4"
          >
            <Text className="text-gray-600 text-base">
              Don't have an account?{" "}
            </Text>
            <Text className="text-violet-600 font-bold text-base">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}
