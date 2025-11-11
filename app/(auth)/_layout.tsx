import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      {/* This now points to our new signup *flow* */}
      <Stack.Screen name="(signup)" options={{ headerShown: false }} />

      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen
        name="create-account-method"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="verify-otp" options={{ headerShown: false }} />
      <Stack.Screen name="create-password" options={{ headerShown: false }} />
      <Stack.Screen name="signup-success" options={{ headerShown: false }} />
    </Stack>
  );
}
