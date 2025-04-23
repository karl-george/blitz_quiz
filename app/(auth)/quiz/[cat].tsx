import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const Page = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  const { cat } = useLocalSearchParams();

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
            Who is the Dragon Reborn in the Wheel of Time?
          </Text>
        </View>
      </View>

      {/* Timer */}

      {/* Answers */}
    </View>
  );
};

export default Page;
