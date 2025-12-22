import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import "./globals.css";

function RootLayoutNav() {
  const { isLoggedIn, isNewUser, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inOnboarding = segments[0] === "onboarding";
    
    // Check if user is logged in
    if (isLoggedIn) {
      if (isNewUser) {
        // Redirect to onboarding if new user (no profile) and not already there
        if (!inOnboarding) {
          router.replace("/onboarding");
        }
      } else {
        // Redirect to tabs if logged in and trying to access auth screens
        if (inAuthGroup || inOnboarding) {
          router.replace("/(tabs)");
        }
      }
    } else {
      // Not logged in
      // If trying to access protected routes, could redirect to sign-in here.
      // For now we let them access index (onboarding/welcome) and auth group.
      
      // Strict check: If not logged in, and we are NOT in the auth group or onboarding, GO HOME.
      // But! If we are already at home (segments length is 0), do NOT redirect, or we loop infinitely.
      if (!inAuthGroup && !inOnboarding && segments.length > 0) {
         router.replace("/(auth)/sign-in");
      }
    }
  }, [isLoggedIn, isNewUser, segments, isLoading]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false, gestureEnabled: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
