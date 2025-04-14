import { Stack, usePathname, useRouter, useSegments } from 'expo-router';
import React from 'react';

const InitialLayout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const segments = useSegments();

  return (
    <>
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='(auth)' options={{ headerShown: false }} />
      </Stack>
    </>
  );
};

const RootLayout = () => {
  return <InitialLayout />;
};

export default RootLayout;
