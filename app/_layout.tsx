import { ThemeProvider } from '@/hooks/useTheme';
import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  const convex: ConvexReactClient = new ConvexReactClient(
    process.env.EXPO_PUBLIC_CONVEX_URL!,
    {
      unsavedChangesWarning: false,
    }
  );
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='(tabs)' />
        </Stack>
      </ThemeProvider>
    </ConvexProvider>
  );
}
