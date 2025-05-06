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
        }}
      />
    </Stack>
  );
};

export default Layout;
