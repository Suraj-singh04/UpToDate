import React from "react";
import {
  ActivityIndicator,
  View,
} from "react-native";
import { ParentDashboard } from "../../components/ParentDashboard";
import { TeacherDashboard } from "../../components/TeacherDashboard";
import { useAuth } from "../../context/AuthContext";

export default function DashboardIndex() {
  const { profile, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  // If profile is missing (e.g. during logout), show spinner or nothing.
  // The _layout.tsx will handle the redirect to "/" safely.
  if (!profile) {
    return (
       <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  if (profile?.role === "teacher") {
    return <TeacherDashboard />;
  }

  return <ParentDashboard />;
}
