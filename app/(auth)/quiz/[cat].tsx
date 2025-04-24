import { supabase } from '@/lib/supabase';
import { Question } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

const Page = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [chosenAnswer, setChosenAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  const { cat } = useLocalSearchParams();

  useEffect(() => {
    supabase
      .from('questions')
      .select('*')
      .then(({ data, error }) => {
        setQuestions(data ?? []);
      });
  }, []);

  const handlePress = (option: string) => {
    setChosenAnswer(option);
    console.log(option);
    console.log(questions[questionIndex].correct_option);
    if (option == questions[questionIndex].correct_option) {
      revealAnswer();
      // Alert.alert('Correct');
      //Todo: Increase Score
      setScore(score + 50);

      if (questionIndex < questions.length) {
        //Todo: Set time back to 10
        //Todo: Increment questionIndex
        // setQuestionIndex(questions + 1);
      } else {
        //Todo: Quiz over send to game-over screen with stats
      }
    } else {
      revealAnswer();
      // Alert.alert('Wrong');
    }
  };

  const revealAnswer = () => {
    const timer = 3;
    setShowAnswer(true);

    const reveal = setInterval(() => {
      if (timer <= 0) {
        setShowAnswer(false);
        clearInterval(reveal);
        // todo: if not last question move on, otherwise game over
        return 0;
      }
      return timer - 1;
    }, 1000);

    return () => clearInterval(reveal);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          setShowAnswer(true);
          // todo: if not last question move on, otherwise game over
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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
        <Text className='text-base text-center text-white'>Question 1/10</Text>
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
                  questions[questionIndex].correct_option
                  ? 'bg-correct'
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
                questions[questionIndex].correct_option
                ? 'bg-correct'
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
                questions[questionIndex].correct_option
                ? 'bg-correct'
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
                questions[questionIndex].correct_option
                ? 'bg-correct'
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
