import { View, Text } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const Page = () => {
  return (
    <View className='items-center justify-center flex-1'>
      <LinearGradient
        colors={['#CCB6FF', '#986BFF']}
        className='absolute top-0 bottom-0 left-0 right-0'
      />
      <Text className='text-4xl text-red-500'>Hello World!</Text>
    </View>
  );
};

export default Page;
