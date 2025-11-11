import React from "react";
import { Stack } from "expo-router";

export default function SignUpFlowLayout() {
  // This layout manages the navigation *inside* the signup flow
  // All screens will have their custom headers, so we hide the default.
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="parent-form" options={{ headerShown: false }} />
      <Stack.Screen name="teacher-form" options={{ headerShown: false }} />
    </Stack>
  );
}
