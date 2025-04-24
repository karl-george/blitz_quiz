import { supabase } from '@/lib/supabase';
import { Question } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

const Page = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

  const { cat } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    supabase
      .from('questions')
      .select(
        `
      *,
      categories (
        category_name
      )
    `
      )
      .eq('categories.category_name', cat)
      .then(({ data, error }) => {
        setQuestions(data ?? []);
      });
  }, []);

  const handlePress = (option: string) => {
    // Correct answer
    if (option == questions[questionIndex].correct_option) {
      setScore((prev) => prev + 50);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }

    setShowAnswer(true);
  };

  const handleGameOver = () => {
    // Add score to users total_score
    // Update users latest_score
    // Update users number of games played
    // Update users number of correct answers
    // update users number of wrong answers
    // Push user to game over screen
    //! router.push('/quiz/game-over');
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
        if (questionIndex < questions.length - 1) {
          setQuestionIndex((prev) => prev + 1);
        } else {
          handleGameOver();
        }
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [showAnswer]);

  return (
    <View className='flex-1 px-4'>
      <LinearGradient
        colors={['#CCB6FF', '#986BFF']}
        className='absolute top-0 bottom-0 left-0 right-0'
      />
      <Stack.Screen
        options={{
          title: (cat[0].toUpperCase() + cat.slice(1)) as string,
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#CCB6FF' },
          headerShadowVisible: false,
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}>
              <Ionicons name='bookmark-outline' size={24} color='#fff' />
            </TouchableOpacity>
          ),
        }}
      />

      {/* Questions left */}
      <View className='pt-2'>
        <Text className='text-base text-center text-white'>
          Question {questionIndex}/10
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
          className={`
            ${
              showAnswer
                ? questions[questionIndex]?.option_1 ==
                  questions[questionIndex]?.correct_option
                  ? 'bg-[#1EC751]'
                  : 'bg-wrong'
                : ''
            }
           items-center justify-center px-4 py-5 border-2 border-border_light bg-light_bg rounded-2xl`}
        >
          <Text className='text-xl text-center text-white'>
            {questions[questionIndex]?.option_1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          key={questions[questionIndex]?.option_2}
          onPress={() => handlePress(questions[questionIndex]?.option_2)}
          className={`
          ${
            showAnswer
              ? questions[questionIndex]?.option_2 ==
                questions[questionIndex]?.correct_option
                ? 'bg-[#1EC751]'
                : 'bg-wrong'
              : ''
          }
           items-center justify-center px-4 py-5 border-2 border-border_light bg-light_bg rounded-2xl`}
        >
          <Text className='text-xl text-center text-white'>
            {questions[questionIndex]?.option_2}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          key={questions[questionIndex]?.option_3}
          onPress={() => handlePress(questions[questionIndex]?.option_3)}
          className={`
          ${
            showAnswer
              ? questions[questionIndex]?.option_3 ==
                questions[questionIndex]?.correct_option
                ? 'bg-[#1EC751]'
                : 'bg-wrong'
              : ''
          }
           items-center justify-center px-4 py-5 border-2 border-border_light bg-light_bg rounded-2xl`}
        >
          <Text className='text-xl text-center text-white'>
            {questions[questionIndex]?.option_3}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          key={questions[questionIndex]?.option_4}
          onPress={() => handlePress(questions[questionIndex]?.option_4)}
          className={`
          ${
            showAnswer
              ? questions[questionIndex]?.option_4 ==
                questions[questionIndex]?.correct_option
                ? 'bg-[#1EC751]'
                : 'bg-wrong'
              : ''
          }
           items-center justify-center px-4 py-5 border-2 border-border_light bg-light_bg rounded-2xl`}
        >
          <Text className='text-xl text-center text-white'>
            {questions[questionIndex]?.option_4}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page;
