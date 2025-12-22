import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { AcademicCapIcon, UserGroupIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingRoleSelection() {
  const router = useRouter();

  const RoleCard = ({ 
    title, 
    description, 
    icon: Icon, 
    color, 
    onPress 
  }: { 
    title: string; 
    description: string; 
    icon: any; 
    color: string; 
    onPress: () => void; 
  }) => (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-white p-6 rounded-2xl mb-6 shadow-sm border border-gray-100 items-center w-full"
    >
      <View className={`w-16 h-16 rounded-full ${color} justify-center items-center mb-4`}>
        <Icon size={32} color="white" />
      </View>
      <Text className="text-xl font-bold text-gray-900 mb-2">{title}</Text>
      <Text className="text-gray-500 text-center leading-5">{description}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-6">
      <View className="items-center mb-10 mt-10">
        <Text className="text-3xl font-bold text-gray-900 mb-2">Who are you?</Text>
        <Text className="text-gray-500 text-center">
          Help us personalize your experience by telling us your role.
        </Text>
      </View>

      <View className="flex-1 justify-center">
        <RoleCard
          title="I am a Parent"
          description="Track your child's progress, attendance, and communicate with teachers."
          icon={UserGroupIcon}
          color="bg-violet-600"
          onPress={() => router.push('/onboarding/parent-form')}
        />

        <RoleCard
          title="I am a Teacher"
          description="Manage classes, mark attendance, and upload assignments."
          icon={AcademicCapIcon}
          color="bg-orange-500"
          onPress={() => router.push('/onboarding/teacher-form')}
        />
      </View>
    </SafeAreaView>
  );
}
