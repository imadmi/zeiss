import { AppProvider } from "@/context";
import { Stack } from "expo-router/stack";

export default function Layout() {
  return (
    <AppProvider>
      <Stack>
        <Stack.Screen name="Home" options={{ headerShown: false }} />
        <Stack.Screen name="Signin" options={{ headerShown: false }} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="chat" options={{ headerShown: false }} />
      </Stack>
    </AppProvider>
  );
}
