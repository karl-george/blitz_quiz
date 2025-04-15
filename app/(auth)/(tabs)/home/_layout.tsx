import Header from '@/components/Header';
import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerStyle: { backgroundColor: '#CCB6FF' },
          headerShadowVisible: false,
          header: () => <Header />,
        }}
      />
    </Stack>
  );
};

export default Layout;
