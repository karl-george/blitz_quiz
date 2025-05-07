import Header from '@/components/Header';
import LeaderboardCard from '@/components/LeaderboardCard';
import { supabase } from '@/lib/supabase';
import { User } from '@/types';
import { useUser } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';

const Page = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState<User>();
  const [players, setPlayers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
        setError(''); // Clear error on success

        // Retrieve players
        const { data: playerData, error: playerError } = await supabase
          .from('users')
          .select(`*`)
          .limit(20)
          .order('total_score', { ascending: false });

        if (playerError) {
          console.error(playerError);
          return;
        }

        setPlayers(playerData ?? []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Check if user is in the top 20
    // If not, remove last player and add user
    if (!players.find((player) => player?.username === userData?.username)) {
      setPlayers((prevPlayers) => {
        const newPlayers = [...prevPlayers];
        newPlayers.pop();
        newPlayers.push(userData!);
        return newPlayers;
      });
    }
  }, [userData]);

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
          {/* Top 3 */}
          <View className='pt-6 mb-12'>
            <View className='flex-row justify-center gap-4'>
              <View className='mt-8'>
                <View>
                  <Image
                    source={
                      user?.imageUrl
                        ? { uri: user.imageUrl }
                        : require('@/assets/images/icon.png')
                    }
                    className='w-32 h-32 rounded-xl'
                    width={100}
                    height={100}
                    resizeMode='cover'
                  />
                  <Text className='absolute bottom-0 text-3xl text-center text-white right-3'>
                    2
                  </Text>
                </View>
                <View className='p-2 mt-2 border-2 border-border_light bg-light_bg rounded-xl'>
                  <Text
                    className='font-bold text-center text-white'
                    numberOfLines={1}
                  >
                    {players[1]?.username}
                  </Text>
                  <Text
                    className='text-base text-center text-white'
                    numberOfLines={1}
                  >
                    💎 {players[1]?.total_score}
                  </Text>
                </View>
              </View>
              <View>
                <View>
                  <Image
                    source={
                      user?.imageUrl
                        ? { uri: user.imageUrl }
                        : require('@/assets/images/icon.png')
                    }
                    className='w-32 h-32 rounded-xl'
                    width={100}
                    height={100}
                    resizeMode='cover'
                  />
                  <Text className='absolute bottom-0 text-3xl text-center text-white right-3'>
                    1
                  </Text>
                </View>
                <View className='p-2 mt-2 border-2 border-border_light bg-light_bg rounded-xl'>
                  <Text
                    className='font-bold text-center text-white'
                    numberOfLines={1}
                  >
                    {players[0]?.username}
                  </Text>
                  <Text
                    className='text-base text-center text-white'
                    numberOfLines={1}
                  >
                    💎 {players[0]?.total_score}
                  </Text>
                </View>
              </View>
              <View className='mt-8'>
                <View>
                  <Image
                    source={
                      user?.imageUrl
                        ? { uri: user.imageUrl }
                        : require('@/assets/images/icon.png')
                    }
                    className='w-32 h-32 rounded-xl'
                    width={100}
                    height={100}
                    resizeMode='cover'
                  />
                  <Text className='absolute bottom-0 text-3xl text-center text-white right-3'>
                    3
                  </Text>
                </View>
                <View className='p-2 mt-2 border-2 border-border_light bg-light_bg rounded-xl'>
                  <Text
                    className='font-bold text-center text-white'
                    numberOfLines={1}
                  >
                    {players[2]?.username}
                  </Text>
                  <Text
                    className='text-base text-center text-white'
                    numberOfLines={1}
                  >
                    💎 {players[2]?.total_score}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Leaderboard list after top 3 */}
          <FlatList
            data={players.slice(3)}
            contentContainerClassName='gap-2 pb-4'
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <LeaderboardCard
                key={index}
                rank={index + 4}
                name={item?.username}
                score={item?.total_score}
                user={userData!}
              />
            )}
          />
        </View>
      )}
    </View>
  );
};

export default Page;
