import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, View } from 'react-native';

const LeaderboardCard = ({
  name,
  rank,
  score,
  avatar,
}: {
  name: string;
  rank: number;
  score: number;
  avatar: string;
}) => {
  return (
    <View
      className={`border-2  border-border_light bg-light_bg rounded-xl p-4`}
    >
      <View className='flex-row items-center gap-3'>
        <Text className='text-xl font-bold text-white'>{rank}</Text>
        <Image
          source={require('@/assets/images/icon.png')}
          className='rounded-full h-9 w-9'
        />
        <Text className='flex-1 text-xl font-bold text-white'>{name}</Text>
        {/* Score */}
        <View className='flex-row items-center gap-2 px-4 py-1 overflow-hidden border-2 border-white rounded-full'>
          <LinearGradient
            colors={['#CCB6FF', '#986BFF']}
            className='absolute top-0 bottom-0 left-0 right-0 '
          />
          <Text className='text-xl'>💎</Text>
          <Text className='text-xl font-semibold text-white'>{score}</Text>
        </View>
      </View>
    </View>
  );
};

export default LeaderboardCard;
