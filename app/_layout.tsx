import LoadingOverlay from '@/components/loadingOverlay';
import LoginPortal from '@/components/loginPopUp';
import { AuthProvider } from '@/contexts/AuthContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Montserrat_400Regular, Montserrat_400Regular_Italic, Montserrat_700Bold, Montserrat_800ExtraBold_Italic, useFonts } from "@expo-google-fonts/montserrat";
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Host } from 'react-native-portalize';
import 'react-native-reanimated';
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_400Regular_Italic,
    Montserrat_700Bold,
    Montserrat_800ExtraBold_Italic,
  });

    if (!fontsLoaded) {
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
       <Host>
      <Stack
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
      <LoginPortal />
      </Host >
      <LoadingOverlay/>
      </AuthProvider>
    </ThemeProvider>
  );
}
