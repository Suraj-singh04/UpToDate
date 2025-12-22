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
    BriefcaseIcon,
    EnvelopeIcon,
    PhoneIcon,
    UserIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { useAuth } from "../../context/AuthContext";
import { createProfile } from "../../lib/appwrite";

export default function TeacherOnboardingForm() {
  const router = useRouter();
  const { user, checkSession } = useAuth();

  // Form state
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [mobile, setMobile] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCompleteProfile = async () => {
    if (!name || !email || !mobile || !employeeId) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }

    if (!user?.$id) {
        Alert.alert("Error", "User session not found. Please log in again.");
        return;
    }

    setIsLoading(true);
    const fullMobile = mobile.startsWith("+91") ? mobile : `+91${mobile}`;

    try {
        await createProfile(user.$id, {
            name,
            email,
            mobile: fullMobile,
            role: "teacher",
            employeeId
        });
        
        await checkSession();
        router.replace("/(tabs)");
        
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to save profile.");
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
              Teacher Profile
            </Text>
            <Text className="text-base text-gray-500">
              Verify your credentials to finish setting up your account.
            </Text>
          </View>

          <View className="space-y-4">
            <Input
              label="Full Name"
              placeholder="e.g. Rahul Verma"
              value={name}
              onChangeText={setName}
              icon={<UserIcon size={20} color="#6B7280" />}
            />

            <Input
              label="Official School Email"
              placeholder="name@school.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<EnvelopeIcon size={20} color="#6B7280" />}
            />

            <Input
              label="Mobile Number"
              placeholder="9876543210"
              value={mobile}
              onChangeText={setMobile}
              keyboardType="phone-pad"
              maxLength={10}
              icon={<PhoneIcon size={20} color="#6B7280" />}
            />

            <Input
              label="Employee ID / Teacher Code"
              placeholder="e.g. EMP-9988"
              value={employeeId}
              onChangeText={setEmployeeId}
              icon={<BriefcaseIcon size={20} color="#6B7280" />}
            />
          </View>

          <View className="mt-10">
            <Button
              title="Complete Setup"
              onPress={handleCompleteProfile}
              isLoading={isLoading}
              variant="primary"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
