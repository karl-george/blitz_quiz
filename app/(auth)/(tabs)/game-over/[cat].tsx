import Button from '@/components/Button';
import Header from '@/components/Header';
import { supabase } from '@/lib/supabase';
import { User } from '@/types';
import { useUser } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';

const Page = () => {
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useUser();
  const { cat } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Early return if user not found
        if (!user?.id) {
          setError('User not found');
          return;
        }

        setLoading(true);

        // Retrieve user
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select(`*`)
          .eq('clerk_id', user?.id)
          .single();

        if (userError) {
          setError(
            userError.message || 'An error occurred while fetching user data'
          );
          return;
        }
        setUserData(userData ?? {});
        setError(''); // Clear error on success
      } catch (error) {
        setError('An error occurred while fetching user data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  return (
    <View className='flex-1 px-4'>
      <LinearGradient
        colors={['#CCB6FF', '#986BFF']}
        className='absolute top-0 bottom-0 left-0 right-0'
      />
      {loading ? (
        <View className='items-center justify-center flex-1'>
          <ActivityIndicator size='large' color='#fff' />
        </View>
      ) : (
        <View>
          <Stack.Screen
            options={{
              title: (cat[0].toUpperCase() + cat.slice(1)) as string,
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
              headerStyle: { backgroundColor: '#CCB6FF' },
              headerShadowVisible: false,
              headerShown: true,
              header: () => <Header userData={userData!} />,
            }}
          />

          <View className='pt-8'>
            <View className='mt-4 border-2 border-border_light bg-light_bg rounded-2xl'>
              <View className='items-center px-4 py-8'>
                <Image
                  src={user?.imageUrl}
                  className='w-32 h-32 border-2 rounded-xl border-border_light'
                />
                <Text className='mt-4 text-2xl font-bold text-white'>
                  {userData?.username}
                </Text>
                <Text className='mt-2 text-2xl font-bold text-white'>
                  Score: {userData?.latest_score}
                </Text>
              </View>
            </View>

            <View className='items-center gap-6 mt-8'>
              <Button
                title='Play Again'
                onPress={() => {
                  router.replace(`/(auth)/quiz/${cat}`);
                }}
                variant={'small'}
              />
              <Button
                title='Leaderboards'
                onPress={() => {
                  router.replace(`/(auth)/(tabs)/leaderboard`);
                }}
                variant={'small'}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Page;
