import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: 80,
          position: 'absolute',
          overflow: 'hidden',
        },
      }}
    >
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Ionicons
                name='home'
                size={32}
                color={focused ? '#CCB6FF' : '#929292'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='leaderboard'
        options={{
          title: 'Leaderboard',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Ionicons
                name='trophy'
                size={32}
                color={focused ? '#CCB6FF' : '#929292'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='bookmarks'
        options={{
          title: 'Bookmarks',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Ionicons
                name='bookmark'
                size={32}
                color={focused ? '#CCB6FF' : '#929292'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Ionicons
                name='person'
                size={32}
                color={focused ? '#CCB6FF' : '#929292'}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name='game-over/[cat]'
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
