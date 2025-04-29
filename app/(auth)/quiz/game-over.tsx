import { View, Text } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

const Page = () => {
  return (
    <View className='items-center justify-center flex-1'>
      <Text>GAME OVER</Text>
      <Link href='/(auth)/(tabs)/home'>Home</Link>
    </View>
  );
};

export default Page;
