import { View, Text } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import Header from '@/components/Header';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ header: () => <Header /> }} />
    </Stack>
  );
};

export default Layout;
