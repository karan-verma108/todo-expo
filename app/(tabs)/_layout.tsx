import useTheme from '@/hooks/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  const { colors } = useTheme();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingTop: 10,
          paddingBottom: 20,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'normal',
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Todos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='list' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='settings' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
