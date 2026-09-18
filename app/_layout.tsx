import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../src/constants';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.surface,
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: Colors.background },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'AvistAves',
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen name="register" options={{ title: 'Nuevo avistamiento' }} />
      <Stack.Screen name="detail/[id]" options={{ title: '' }} />
      </Stack>
    </>
  );
}
