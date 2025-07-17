import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: 'transparent',
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: 'bold',
        },
        tabBarStyle: {
          height: 56,
          paddingBottom: Platform.OS === 'ios' ? 8 : 4,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
          name="calendar"
          options={{
            title: '달력',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" size={size} color={color} />
            ),
          }}
          />
      <Tabs.Screen
        name="record-detail"
        options={{
          title: '기록',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: '통계',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="pie-chart-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
} 

// <Tabs.Screen
// name="calendar"
// options={{
//   title: '달력',
//   tabBarIcon: ({ color, size }) => (
//     <Ionicons name="calendar-outline" size={size} color={color} />
//   ),
// }}
// />