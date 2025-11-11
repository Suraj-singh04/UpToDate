// app/(auth)/create-account-method.tsx

import { Link, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateAccountMethodScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <View className="flex-row items-center pt-4 pb-8">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <ArrowLeftIcon size={24} color="#333" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-gray-800 ml-4">
          Create new account
        </Text>
      </View>

      <Text className="text-center text-gray-600 mb-10 px-2">
        Begin with creating new free account. This helps you keep your learning
        way easier.
      </Text>

      <Link href="/(auth)/(signup)" asChild>
        <TouchableOpacity className="bg-violet-600 rounded-xl p-4 mb-6 shadow-sm">
          <Text className="text-center text-white font-semibold text-lg">
            Continue with email
          </Text>
        </TouchableOpacity>
      </Link>

      <Text className="text-center text-gray-500 font-medium text-base mb-6">
        or
      </Text>

      <View className="flex gap-4">
        <TouchableOpacity className="flex-row items-center justify-center border border-gray-300 rounded-lg p-4">
          <Image
            source={{
              uri: "https://img.icons8.com/ios-filled/50/000000/mac-os.png",
            }}
            className="w-6 h-6 mr-3"
          />
          <Text className="text-gray-800 font-semibold text-lg">
            Continue with Apple
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-center border border-gray-300 rounded-lg p-4 ">
          <Image
            source={{
              uri: "https://img.icons8.com/color/48/000000/facebook-new.png",
            }}
            className="w-6 h-6 mr-3"
          />
          <Text className="text-gray-800 font-semibold text-lg">
            Continue with Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center justify-center border border-gray-300 rounded-lg p-4">
          <Image
            source={{
              uri: "https://img.icons8.com/color/48/000000/google-logo.png",
            }}
            className="w-6 h-6 mr-3"
          />
          <Text className="text-gray-800 font-semibold text-lg">
            Continue with Google
          </Text>
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-8 left-0 right-0 items-center px-6">
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
    </SafeAreaView>
  );
}
