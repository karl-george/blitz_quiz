import Bookmark from '@/components/Bookmark';
import Header from '@/components/Header';
import { supabase } from '@/lib/supabase';
import { Bookmark as Bookmarks, Question, User } from '@/types';
import { useUser } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

const Page = () => {
  const [bookmarks, setBookmarks] = useState<Bookmarks[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userData, setUserData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useUser();

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
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        // Early return if user not found
        if (!user?.id) {
          setError('User not found');
          return;
        }

        setLoading(true);

        // Retrieve users bookmarks
        const { data: userBookmarks, error: bookmarksError } = await supabase
          .from('bookmarks')
          .select(`*`)
          .eq('clerk_id', user?.id);

        if (bookmarksError) {
          console.error(bookmarksError);
          return;
        }

        setBookmarks(userBookmarks ?? []);
        setError(''); // Clear error on success

        // Retrieve questions
        const { data: questionData, error: questionError } = await supabase
          .from('questions')
          .select('*')
          .in(
            'question_id',
            bookmarks.map((b) => b.question_id)
          )
          .order('created_at', { ascending: false });

        if (questionError) {
          console.error(questionError);
          return;
        }

        setQuestions(questionData ?? []);
        setError(''); // Clear error on success
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const handleDelete = async (questionId: number) => {
    await supabase.from('bookmarks').delete().eq('question_id', questionId);
  };

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
        <View className='flex-1'>
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
      )}
    </View>
  );
};

export default Page;
