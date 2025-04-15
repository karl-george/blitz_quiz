import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home ',
          tabBarIcon: () => <Ionicons name='home' size={24} />,
        }}
      />
      <Tabs.Screen
        name='leaderboard'
        options={{
          title: 'Leaderboard',
          tabBarIcon: () => <Ionicons name='home' size={24} />,
        }}
      />
      <Tabs.Screen
        name='bookmarks'
        options={{
          title: 'Bookmarks',
          tabBarIcon: () => <Ionicons name='home' size={24} />,
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: () => <Ionicons name='home' size={24} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
