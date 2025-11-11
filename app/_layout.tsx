// app/_layout.tsx

import { Stack } from "expo-router";
import React from "react";
import "./globals.css"; // Make sure your global CSS is imported here

export default function RootLayout() {
  return (
    <Stack>
      {/* Each "screen" here is a top-level entry point.
        We hide the header for index and auth screens 
        because they have their own custom design.
      */}

      {/* The main welcome screen */}
      <Stack.Screen name="index" options={{ headerShown: false }} />

      {/* The (auth) group of screens */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />

      {/* LATER, you will add your main app screens here, 
        for example, a (tabs) layout:
      */}
      {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
    </Stack>
  );
}
