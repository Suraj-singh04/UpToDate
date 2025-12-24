import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    ArrowLeftIcon,
    CalendarDaysIcon,
    EnvelopeIcon,
    IdentificationIcon,
    PhoneIcon,
    UserIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import { useAuth } from "../../../context/AuthContext";

export default function ParentFormScreen() {
  const router = useRouter();
  const { setSignUpData } = useAuth();

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [studentId, setStudentId] = useState("");
  const [dob, setDob] = useState("");
  const [registeredMobile, setRegisteredMobile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!name || !email || !mobile || !studentId || !dob || !registeredMobile) {
      Alert.alert("Missing Information", "Please fill in all the details to proceed.");
      return;
    }

    setIsLoading(true);

    // Simple normalization
    const fullMobile = mobile.startsWith("+91") ? mobile : `+91${mobile}`;
    const fullRegMobile = registeredMobile.startsWith("+91") ? registeredMobile : `+91${registeredMobile}`;

    // Convert DD/MM/YYYY to YYYY-MM-DD
    const dateParts = dob.split("/");
    if (dateParts.length !== 3) {
        Alert.alert("Invalid Date", "Please enter Date of Birth in DD/MM/YYYY format.");
        setIsLoading(false);
        return;
    }
    
    // basic validation
    const day = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);
    
    if (isNaN(day) || isNaN(month) || isNaN(year) || day > 31 || month > 12) {
         Alert.alert("Invalid Date", "Please enter a valid Date of Birth.");
         setIsLoading(false);
         return;
    }

    // specific 2018 check or similar could go here, but keeping it simple for now
    // Format: YYYY-MM-DD
    const formattedDob = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    setSignUpData({
      role: "parent",
      name,
      email,
      mobile: fullMobile,
      studentId,
      dob: formattedDob, // Send formatted date
      registeredMobile: fullRegMobile,
    });

    try {
      router.push("/(auth)/verify-otp");
    } catch (error) {
      console.log(error);
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
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="flex-row items-center pt-4 pb-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="p-2 -ml-2 rounded-full active:bg-gray-100"
            >
              <ArrowLeftIcon size={24} color="#1F2937" />
            </TouchableOpacity>
          </View>

          <View className="mb-6">
            <Text className="text-3xl font-bold text-gray-900 mb-2">
              Parent Details
            </Text>
            <Text className="text-base text-gray-500">
              Step 2 of 4 • We need a few details to verify your identity.
            </Text>
          </View>

          {/* Form Sections */}
          <View className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Kavita Sharma"
              value={name}
              onChangeText={setName}
              icon={<UserIcon size={20} color="#6B7280" />}
            />

            <Input
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<EnvelopeIcon size={20} color="#6B7280" />}
            />

            <Input
              label="Mobile Number (For Login)"
              placeholder="9876543210"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
              maxLength={10}
              icon={<PhoneIcon size={20} color="#6B7280" />}
            />

            <View className="h-[1px] bg-gray-200 my-4" />
            <Text className="text-lg font-bold text-gray-800 mb-2">
              Child's School Info
            </Text>

            <Input
              label="Student Admission Number"
              placeholder="e.g. S-2024-001"
              value={studentId}
              onChangeText={setStudentId}
              icon={<IdentificationIcon size={20} color="#6B7280" />}
            />

            <Input
              label="Student Date of Birth"
              placeholder="DD/MM/YYYY"
              value={dob}
              onChangeText={setDob}
              icon={<CalendarDaysIcon size={20} color="#6B7280" />}
            />

            <Input
              label="Registered Mobile (With School)"
              placeholder="Number registered in school records"
              value={registeredMobile}
              onChangeText={setRegisteredMobile}
              keyboardType="phone-pad"
              maxLength={10}
              icon={<PhoneIcon size={20} color="#6B7280" />}
            />
          </View>

          <View className="mt-8">
            <Button
              title="Continue"
              onPress={handleContinue}
              isLoading={isLoading}
              variant="primary"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
