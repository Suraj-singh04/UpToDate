import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import {
  ArrowLeftIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/outline";
// 1. Import our new function and context
import { signInWithEmail } from "../../lib/appwrite";
import { useAuth } from "../../context/AuthContext";

export default function SignInScreen() {
  const router = useRouter();
  const { checkSession } = useAuth(); // 2. Get checkSession
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      // 3. Call our clean, abstracted function
      await signInWithEmail(email, password);
      // 4. Update the global state
      await checkSession();
      // 5. Navigate to the app
      router.replace("/(tabs)");
    } catch (error) {
      // Error already handled by the function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1">
          {/* ... (UI is identical to before) ... */}
          <View className="flex-row items-center pt-4 pb-8">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 -ml-2"
            >
              <ArrowLeftIcon size={24} color="#333" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-800 ml-4">
              Log into account
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-base font-medium text-gray-700 mb-2">
              Email
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-4 text-base"
              placeholder="example@example.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="mb-6">
            <Text className="text-base font-medium text-gray-700 mb-2">
              Password
            </Text>
            <View className="flex-row items-center border border-gray-300 rounded-lg pr-4">
              <TextInput
                className="flex-1 p-4 text-base"
                placeholder="Enter password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ?
                  <EyeIcon size={24} color="#9CA3AF" />
                : <EyeSlashIcon size={24} color="#9CA3AF" />}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoading}
            className={`rounded-lg p-4 mb-4 shadow-sm ${
              isLoading ? "bg-gray-400" : "bg-violet-600"
            }`}
          >
            <Text className="text-center text-white font-semibold text-lg">
              {isLoading ? "Logging in..." : "Log in"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center mb-10">
            <Text className="text-violet-600 font-semibold text-base">
              Forgot password?
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
