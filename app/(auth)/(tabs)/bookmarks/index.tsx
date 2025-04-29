import Bookmark from '@/components/Bookmark';
import Header from '@/components/Header';
import { supabase } from '@/lib/supabase';
import { Bookmark as Bookmarks, Question, User } from '@/types';
import { useUser } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

const Page = () => {
  const [bookmarks, setBookmarks] = useState<Bookmarks[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userData, setUserData] = useState<User>();
  const { user } = useUser();

  useEffect(() => {
    supabase
      .from('users')
      .select(`*`)
      .eq('clerk_id', user?.id)
      .single()
      .then(({ data, error }) => {
        if (error) console.error(error);
        setUserData(data ?? {});
      });
  }, []);

  useEffect(() => {
    supabase
      .from('bookmarks')
      .select(`*`)
      .eq('clerk_id', user?.id)
      .then(({ data, error }) => {
        if (error) console.error(error);
        setBookmarks(data ?? []);
      });

    supabase
      .from('questions')
      .select('*')
      .in(
        'question_id',
        bookmarks.map((b) => b.question_id)
      )
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error);
        setQuestions(data ?? []);
      });
  }, [bookmarks]);

  const handleDelete = async (questionId: number) => {
    await supabase.from('bookmarks').delete().eq('question_id', questionId);
  };

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
          data={questions}
          contentContainerClassName='gap-4'
          renderItem={({ item }) => (
            <Bookmark
              question={item.question_text}
              answer={item.correct_option}
              handleDelete={() => handleDelete(item.question_id)}
            />
          )}
          keyExtractor={(item) => item.question_id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Page;
