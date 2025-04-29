import { User } from '@/types';
import { useUser } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, View } from 'react-native';

const Header = ({ userData }: { userData: User }) => {
  const { user } = useUser();

  return (
    <View className='p-4 bg-grad_start'>
      <View className='flex-row items-center'>
        <Image src={user?.imageUrl} className='rounded-full h-14 w-14' />
        <Text className='flex-1 ml-4 text-2xl font-semibold text-white'>
          {userData?.username}
        </Text>
        <View className='flex-row items-center gap-2 px-4 py-2 overflow-hidden border-2 border-white rounded-full'>
          <LinearGradient
            colors={['#CCB6FF', '#986BFF']}
            className='absolute top-0 bottom-0 left-0 right-0 '
          />
          <Text className='text-xl'>💎</Text>
          <Text className='text-xl font-semibold text-white'>
            {userData?.total_score}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
