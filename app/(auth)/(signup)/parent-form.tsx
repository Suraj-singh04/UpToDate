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

export default function ParentFormScreen() {
  const router = useRouter();
  const { setSignUpData } = useAuth();

  // Form state (remains the same)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [studentId, setStudentId] = useState("");
  const [dob, setDob] = useState("");
  const [registeredMobile, setRegisteredMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!name || !email || !mobile || !studentId || !dob || !registeredMobile) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    const fullMobile = `+91${mobile}`;

    // 2. Save data to context
    setSignUpData({
      role: "parent",
      name,
      email,
      mobile: fullMobile,
      studentId,
      dob,
      registeredMobile: `+91${registeredMobile}`,
    });

    try {
      router.push("/(auth)/verify-otp");
    } catch (error) {
      // Error is already handled by the function, but we stop loading
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
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
              Parent Details (2/4)
            </Text>
          </View>
          <Text className="text-base text-gray-600 mb-6">
            Please provide your details and your child's school information.
          </Text>
          <Text className="text-base font-medium text-gray-700 mb-2">
            Your Full Name
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base mb-4"
            placeholder="e.g., Kavita Sharma"
            value={name}
            onChangeText={setName}
          />
          <Text className="text-base font-medium text-gray-700 mb-2">
            Your Email
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base mb-4"
            placeholder="you@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Text className="text-base font-medium text-gray-700 mb-2">
            Your Mobile (for OTP)
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base mb-4"
            placeholder="98XXXXXX00"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
            maxLength={10}
          />
          <Text className="text-lg font-bold text-gray-800 mt-4 mb-4">
            Child's Details
          </Text>
          <Text className="text-base font-medium text-gray-700 mb-2">
            Student Admission Number
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base mb-4"
            placeholder="e.g., S12345"
            value={studentId}
            onChangeText={setStudentId}
          />
          <Text className="text-base font-medium text-gray-700 mb-2">
            Student Date of Birth
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base mb-4"
            placeholder="DD/MM/YYYY"
            value={dob}
            onChangeText={setDob}
          />
          <Text className="text-base font-medium text-gray-700 mb-2">
            Registered Mobile (School)
          </Text>
          <TextInput
            className="border border-gray-300 rounded-lg p-4 text-base mb-4"
            placeholder="Mobile number given to the school"
            value={registeredMobile}
            onChangeText={setRegisteredMobile}
            keyboardType="phone-pad"
            maxLength={10}
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
