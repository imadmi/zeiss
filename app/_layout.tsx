import { AppProvider } from "@/context";
import { Stack } from "expo-router/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import "@/i18n";


export default function Layout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  

  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="Home" options={{ headerShown: false }} />
        <Stack.Screen name="Signin" options={{ headerShown: false }} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="chat" options={{ headerShown: false }} />
        <Stack.Screen name="Forgotpass" options={{ headerShown: false }} />
        <Stack.Screen name="User" options={{ headerShown: false }} />
      </Stack>
    </AppProvider>
  );
}
