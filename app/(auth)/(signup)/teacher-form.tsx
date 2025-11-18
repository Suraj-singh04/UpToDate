import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../../context/AuthContext";

export default function TeacherSignUpForm() {
  const router = useRouter();
  const { setSignUpData } = useAuth(); // 3. Get the setter

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!name || !email || !mobile || !employeeId) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    const fullMobile = `+91${mobile}`;

    // 4. Save data to context
    setSignUpData({
      role: "teacher",
      name,
      email,
      mobile: fullMobile,
      employeeId,
    });

    try {
      // 6. Navigate to OTP screen
      router.push("/(auth)/verify-otp");
    } catch (error) {
      // Error handled by lib function
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {/* ... (UI is identical to before) ... */}
          <View className="flex-row items-center pt-4 pb-8">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 -ml-2"
            >
              <ArrowLeftIcon size={24} color="#333" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-800 ml-4">
              Teacher Details (2/4)
            </Text>
          </View>

          <Text className="text-base text-gray-600 mb-6">
            Please provide your official school details to get started.
          </Text>

          <Text className="text-base font-medium text-gray-700 mb-2">
            Full Name
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base mb-4"
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />
          <Text className="text-base font-medium text-gray-700 mb-2">
            Official School Email
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base mb-4"
            placeholder="name@school.com"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <Text className="text-base font-medium text-gray-700 mb-2">
            Your Mobile (for OTP)
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base mb-4"
            placeholder="98XXXXXX00"
            keyboardType="phone-pad"
            value={mobile}
            onChangeText={setMobile}
            maxLength={10}
          />
          <Text className="text-base font-medium text-gray-700 mb-2">
            Employee ID
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base mb-4"
            placeholder="Enter your school employee ID"
            value={employeeId}
            onChangeText={setEmployeeId}
          />

          <View className="flex-1" />

          <TouchableOpacity
            onPress={handleContinue}
            disabled={isLoading}
            className={`rounded-lg p-4 my-6 shadow-sm ${
              isLoading ? "bg-gray-400" : "bg-violet-600"
            }`}
          >
            <Text className="text-center text-white font-semibold text-lg">
              {isLoading ? "Sending OTP..." : "Continue"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
