// app/_layout.tsx

import { Stack } from "expo-router";
import React from "react";
import "./globals.css"; // Make sure your global CSS is imported here

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
