import { tempQuestions } from '@/constants/data';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const Page = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  const { cat } = useLocalSearchParams();

  const questionsList = tempQuestions;
  const questions = questionsList[0][cat][questionIndex];

  const handlePress = (option: string) => {
    if (option == questions.answer) {
      Alert.alert('Correct');
      //Todo: Increase Score

      if (questionIndex < Object.keys(questionsList[0][cat]).length) {
        //Todo: Set time back to 10
        //Todo: Increment questionIndex
        setQuestionIndex(questions + 1);
      } else {
        //Todo: Quiz over send to game-over screen with stats
      }
    } else {
      Alert.alert('Wrong');
    }
  };

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
            {questions?.question}
          </Text>
        </View>
      </View>

      {/* Timer */}
      <View className='flex-row items-center justify-center mt-4'>
        <Ionicons name='time-outline' size={20} color='#fff' />
        <View className='flex-1 p-1 mx-4 border-2 border-border_light rounded-2xl' />
        <Text className='text-xl text-center text-white'>{timeLeft}</Text>
      </View>

      {/* Answers */}
      <View className='gap-6 mt-16'>
        {questions['options'].map((option: string) => (
          <TouchableOpacity
            key={option}
            onPress={() => handlePress(option)}
            className='items-center justify-center px-4 py-5 border-2 border-border_light bg-light_bg rounded-2xl'
          >
            <Text className='text-xl text-center text-white'>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Page;
