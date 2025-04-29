import Button from '@/components/Button';
import Header from '@/components/Header';
import { categories } from '@/constants/data';
import { supabase } from '@/lib/supabase';
import { User } from '@/types';
import { useUser } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const [userData, setUserData] = useState<User>();

  useEffect(() => {
    supabase
      .from('users')
      .select(`*`)
      .eq('clerk_id', user?.id)
      .single()
      .then(({ data, error }) => {
        setUserData(data ?? {});
      });
  }, []);

  return (
    <View className='flex-1 px-4 pt-6'>
      <LinearGradient
        colors={['#CCB6FF', '#986BFF']}
        className='absolute top-0 bottom-0 left-0 right-0'
      />
      <Stack.Screen
        options={{
          header: () => <Header userData={userData!} />,
        }}
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
              onPress={() => router.push(`/(auth)/quiz/${category.slug}`)}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default Page;
