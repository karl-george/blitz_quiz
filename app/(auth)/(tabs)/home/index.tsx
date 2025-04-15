import { View, Text, Image } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '@clerk/clerk-expo';
import Button from '@/components/Button';
import { categories } from '@/constants/data';

const Page = () => {
  const { user } = useUser();

  return (
    <View className='flex-1 px-4 pt-6'>
      <LinearGradient
        colors={['#CCB6FF', '#986BFF']}
        className='absolute top-0 bottom-0 left-0 right-0'
      />
      {/* Hero */}
      <View className='flex-row w-full p-4 border-2 border-border_light bg-light_bg rounded-2xl'>
        <View>
          <Text className='text-base text-white'>
            Welcome back, {user?.firstName}
          </Text>
          <Text className='text-3xl text-white'>Let's play!</Text>
        </View>
        <Image src='' />
      </View>
      {/* End Hero */}
      {/* Quiz Categories */}
      <View className='mt-6'>
        <Text className='text-xl font-bold text-white'>Categories</Text>
        <View className='flex-row flex-wrap justify-center gap-4 mt-4'>
          {categories.map((category) => (
            <Button
              key={category.title}
              title={category.title}
              icon={category.icon}
              variant={'large'}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Page;
