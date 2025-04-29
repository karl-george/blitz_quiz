import Bookmark from '@/components/Bookmark';
import Header from '@/components/Header';
import { tempBookmarks } from '@/constants/data';
import { supabase } from '@/lib/supabase';
import { User } from '@/types';
import { useUser } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

const Page = () => {
  const bookmarks = tempBookmarks;

  const [userData, setUserData] = useState<User>();
  const { user } = useUser();

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
    <View className='flex-1 px-4'>
      <LinearGradient
        colors={['#CCB6FF', '#986BFF']}
        className='absolute top-0 bottom-0 left-0 right-0'
      />
      <Stack.Screen
        options={{
          header: () => <Header userData={userData!} />,
        }}
      />
      {/* Show bookmarked questions */}
      <View className='pt-8'>
        <FlatList
          data={bookmarks}
          contentContainerClassName='gap-4'
          renderItem={({ item }) => (
            <Bookmark
              question={item.question}
              answer={item.answer}
              variant='fullWidth'
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Page;
