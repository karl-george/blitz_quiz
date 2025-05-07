import Bookmark from '@/components/Bookmark';
import ErrorMessage from '@/components/ErrorMessage';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useSupabaseQuery } from '@/lib/hooks/useSupabaseQuery';
import { supabase } from '@/lib/supabase';
import { Bookmark as BookmarkType, Question, User } from '@/types';
import { useUser } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

const Page = () => {
  const { user } = useUser();
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Question[]>(
    []
  );

  // Fetch user data
  const {
    data: userData,
    loading: userLoading,
    error: userError,
    fetchData: fetchUserData,
  } = useSupabaseQuery<User>({
    table: 'users',
    eq: { column: 'clerk_id', value: user?.id },
    single: true,
  });

  // Fetch bookmarks
  const {
    data: bookmarks,
    loading: bookmarksLoading,
    error: bookmarksError,
    fetchData: fetchBookmarks,
  } = useSupabaseQuery<BookmarkType[]>({
    table: 'bookmarks',
    eq: { column: 'clerk_id', value: user?.id },
  });

  useEffect(() => {
    if (user?.id) {
      fetchUserData();
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchBookmarks();
    }
  }, [user?.id]);

  // Fetch questions for bookmarks
  useEffect(() => {
    const fetchBookmarkedQuestions = async () => {
      if (!bookmarks?.length) {
        setBookmarkedQuestions([]);
        return;
      }

      try {
        const { data: questions, error } = await supabase
          .from('questions')
          .select('*')
          .in(
            'question_id',
            bookmarks.map((b) => b.question_id)
          )
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching bookmarked questions:', error);
          return;
        }

        setBookmarkedQuestions(questions || []);
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    };

    fetchBookmarkedQuestions();
  }, [bookmarks]);

  const handleDelete = async (questionId: number) => {
    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('question_id', questionId);

      if (error) {
        console.error('Error deleting bookmark:', error);
        return;
      }

      // Refresh bookmarks after deletion
      fetchBookmarks();
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const loading = userLoading || bookmarksLoading;
  const error = userError || bookmarksError;

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={fetchUserData} />;
  if (!userData) return <ErrorMessage message='User data not found' />;

  return (
    <View className='flex-1 px-4'>
      <LinearGradient
        colors={['#CCB6FF', '#986BFF']}
        className='absolute top-0 bottom-0 left-0 right-0'
      />
      <View className='flex-1'>
        <Stack.Screen
          options={{
            header: () => <Header userData={userData!} />,
          }}
        />
        {/* Show bookmarked questions */}
        <View className='pt-8'>
          <FlatList
            data={bookmarkedQuestions}
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
    </View>
  );
};

export default Page;
