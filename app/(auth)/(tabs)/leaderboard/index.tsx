import LeaderboardCard from '@/components/LeaderboardCard';
import { tempUsers } from '@/constants/data';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';

const Page = () => {
  const users = tempUsers;

  //Todo: Sort users by score, highest first

  return (
    <View className='flex-1 px-4'>
      <LinearGradient
        colors={['#CCB6FF', '#986BFF']}
        className='absolute top-0 bottom-0 left-0 right-0'
      />
      {/* Top 3 */}
      <View className='pt-6 mb-12'>
        <View className='flex-row justify-center gap-4'>
          <View className='mt-8'>
            <Image
              source={require('@/assets/images/icon.png')}
              className='rounded-xl w-28 h-28'
              width={100}
              height={100}
              resizeMode='cover'
            />
            <View className='p-2 mt-2 border-2 border-border_light bg-light_bg rounded-xl'>
              <Text className='text-center text-white' numberOfLines={1}>
                {users[0].user_name}
              </Text>
              <Text
                className='text-base text-center text-white'
                numberOfLines={1}
              >
                💎 {users[0].score}
              </Text>
            </View>
          </View>
          <View>
            <Image
              source={require('@/assets/images/icon.png')}
              className='w-32 h-32 rounded-xl'
              width={100}
              height={100}
              resizeMode='cover'
            />
            <View className='p-2 mt-2 border-2 border-border_light bg-light_bg rounded-xl'>
              <Text className='text-center text-white' numberOfLines={1}>
                {users[1].user_name}
              </Text>
              <Text
                className='text-base text-center text-white'
                numberOfLines={1}
              >
                💎 {users[1].score}
              </Text>
            </View>
          </View>
          <View className='mt-8'>
            <Image
              source={require('@/assets/images/icon.png')}
              className='rounded-xl w-28 h-28'
              width={100}
              height={100}
              resizeMode='cover'
            />
            <View className='p-2 mt-2 border-2 border-border_light bg-light_bg rounded-xl'>
              <Text className='text-center text-white' numberOfLines={1}>
                {users[2].user_name}
              </Text>
              <Text
                className='text-base text-center text-white'
                numberOfLines={1}
              >
                💎 {users[2].score}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Leaderboard list after top 3 */}
      <FlatList
        data={users.slice(3)}
        contentContainerClassName='gap-2 pb-4'
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <LeaderboardCard
            key={index}
            rank={index + 4}
            name={item?.user_name}
            score={item?.score}
            avatar={item?.avatar}
          />
        )}
      />
    </View>
  );
};

export default Page;
