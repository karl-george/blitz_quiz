import Header from '@/components/Header';
import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ header: () => <Header /> }} />
    </Stack>
  );
};

export default Layout;
