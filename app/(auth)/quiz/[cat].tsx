import { supabase } from '@/lib/supabase';
import { Bookmark, Question, User } from '@/types';
import { useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

const Page = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(1);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [bookmarked, setBookmarked] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { cat } = useLocalSearchParams();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!user?.id) {
          return;
        }

        setLoading(true);
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select(`*`)
          .eq('clerk_id', user?.id)
          .single();

        if (userError) {
          console.error('Error fetching user data:', userError);
          return;
        }

        setUserDetails(userData ?? {});
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user?.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch questions
        const { data: questionsData, error: questionsError } = await supabase
          .from('questions')
          .select('*, categories (category_name)')
          .eq('category_name', cat);

        if (questionsError) {
          console.error('Error fetching questions:', questionsError);
          return;
        }

        setQuestions(questionsData ?? []);
        setQuestionIndex(
          Math.floor(Math.random() * (questionsData?.length || 1))
        );
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cat]);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);

        const { data: bookmarkData, error: bookmarkError } = await supabase
          .from('bookmarks')
          .select(`*`)
          .eq('clerk_id', user?.id);
        setBookmarked(bookmarkData ?? []);
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  const handlePress = (option: string) => {
    const currentQuestion = questions[questionIndex];
    if (!currentQuestion) return;

    if (option === currentQuestion.correct_option) {
      setScore((prev) => prev + 50);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }
    setShowAnswer(true);
  };

  const handleGameOver = async () => {
    if (!userDetails || !user?.id) {
      setError('User data not found');
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from('users')
        .update({
          total_score: userDetails.total_score + score,
          latest_score: score,
          games_played: userDetails.games_played + 1,
          correct_answers: userDetails.correct_answers + correctAnswers,
          wrong_answers: userDetails.wrong_answers + wrongAnswers,
          updated_at: new Date(),
        })
        .eq('clerk_id', user.id);

      if (updateError) {
        setError('Failed to update user data');
        console.error('Error updating user:', updateError);
        return;
      }

      // Reset game state
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setQuestionsAsked(0);
      setScore(0);
      router.replace(`/(auth)/(tabs)/game-over/${cat}`);
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Unexpected error:', err);
    }
  };

  useEffect(() => {
    setTimeLeft(10);
    setShowAnswer(false);

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setShowAnswer(true);
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [questionIndex]);

  useEffect(() => {
    if (showAnswer) {
      const timeout = setTimeout(() => {
        // If there are more questions else game over
        if (questionsAsked < 2) {
          // Remove question from array
          const newQuestions = [...questions];
          newQuestions.splice(questionIndex, 1);
          setQuestions(newQuestions);
          // Get new question
          setQuestionIndex(Math.floor(Math.random() * newQuestions.length));
          // Increase questions asked
          setQuestionsAsked((prev) => prev + 1);
        } else {
          handleGameOver();
        }
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [showAnswer]);

  const addQuestionToBookmark = async () => {
    if (!user?.id || !questions[questionIndex]?.question_id) {
      setError('Cannot bookmark: Missing user or question data');
      return;
    }

    try {
      const { error: bookmarkError } = await supabase.from('bookmarks').insert({
        question_id: questions[questionIndex].question_id,
        clerk_id: user.id,
        created_at: new Date(),
      });

      if (bookmarkError) {
        setError('Failed to bookmark question');
        console.error('Error bookmarking:', bookmarkError);
      }
    } catch (err) {
      setError('An unexpected error occurred');
      console.error('Unexpected error:', err);
    }
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
        <View>
          <Stack.Screen
            options={{
              title: (cat[0].toUpperCase() + cat.slice(1)) as string,
              headerTitleAlign: 'center',
              headerTintColor: '#fff',
              headerStyle: { backgroundColor: '#CCB6FF' },
              headerShadowVisible: false,
              headerRight: () => (
                <TouchableOpacity onPress={addQuestionToBookmark}>
                  <Ionicons
                    name={
                      bookmarked.some(
                        (question) =>
                          question.question_id ===
                          questions[questionIndex]?.question_id
                      )
                        ? 'bookmark'
                        : 'bookmark-outline'
                    }
                    size={24}
                    color='#fff'
                  />
                </TouchableOpacity>
              ),
            }}
          />

          {/* Questions left */}
          <View className='pt-2'>
            <Text className='text-base text-center text-white'>
              Question {questionsAsked}/10
            </Text>
          </View>

          {/* Question Box */}
          <View className='mt-4 border-2 border-border_light bg-light_bg rounded-2xl'>
            <View className='items-center justify-center p-4 h-72'>
              <Text className='text-2xl text-center text-white'>
                {questions[questionIndex]?.question_text}
              </Text>
            </View>
          </View>

          {/* Timer */}
          <View className='flex-row items-center justify-center gap-4 mt-4'>
            <Ionicons name='time-outline' size={20} color='#fff' />
            <ProgressBar
              progress={timeLeft / 10}
              color='#C0B5F8'
              borderwidth={1}
              borderColor='#D7D2F2'
              width={280}
              height={10}
              borderRadius={20}
            />
            <Text className='text-xl text-center text-white'>{timeLeft}</Text>
          </View>

          {/* Answers */}
          <View className='gap-6 mt-16'>
            <TouchableOpacity
              key={questions[questionIndex]?.option_1}
              onPress={() => handlePress(questions[questionIndex]?.option_1)}
              className={`items-center justify-center px-4 py-5 border-2 border-border_light rounded-2xl ${
                showAnswer
                  ? questions[questionIndex]?.option_1 ===
                    questions[questionIndex]?.correct_option
                    ? 'bg-correct'
                    : 'bg-wrong'
                  : 'bg-light_bg'
              }`}
            >
              <Text className='text-xl text-center text-white'>
                {questions[questionIndex]?.option_1}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              key={questions[questionIndex]?.option_2}
              onPress={() => handlePress(questions[questionIndex]?.option_2)}
              className={`items-center justify-center px-4 py-5 border-2 border-border_light rounded-2xl ${
                showAnswer
                  ? questions[questionIndex]?.option_2 ===
                    questions[questionIndex]?.correct_option
                    ? 'bg-correct'
                    : 'bg-wrong'
                  : 'bg-light_bg'
              }`}
            >
              <Text className='text-xl text-center text-white'>
                {questions[questionIndex]?.option_2}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              key={questions[questionIndex]?.option_3}
              onPress={() => handlePress(questions[questionIndex]?.option_3)}
              className={`items-center justify-center px-4 py-5 border-2 border-border_light rounded-2xl ${
                showAnswer
                  ? questions[questionIndex]?.option_3 ===
                    questions[questionIndex]?.correct_option
                    ? 'bg-correct'
                    : 'bg-wrong'
                  : 'bg-light_bg'
              }`}
            >
              <Text className='text-xl text-center text-white'>
                {questions[questionIndex]?.option_3}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              key={questions[questionIndex]?.option_4}
              onPress={() => handlePress(questions[questionIndex]?.option_4)}
              className={`items-center justify-center px-4 py-5 border-2 border-border_light rounded-2xl ${
                showAnswer
                  ? questions[questionIndex]?.option_4 ===
                    questions[questionIndex]?.correct_option
                    ? 'bg-correct'
                    : 'bg-wrong'
                  : 'bg-light_bg'
              }`}
            >
              <Text className='text-xl text-center text-white'>
                {questions[questionIndex]?.option_4}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Page;
