import Button from '@/components/Button';
import Container from '@/components/Container';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  //TODO: Handle changing avatar
  //TODO: Handle editing username and email. Maybe email should not be changable
  //TODO: Find a better icon for pencil?

  return (
    <View className='flex-1 px-4'>
      <LinearGradient
        colors={['#CCB6FF', '#986BFF']}
        className='absolute top-0 bottom-0 left-0 right-0'
      />
      {/* Account Details Section */}
      <View className='pt-10'>
        <View className='pb-8 border-2 rounded-xl border-border_light bg-light_bg'>
          <Image
            src={user?.imageUrl}
            className='absolute self-center border-2 -top-8 rounded-xl w-28 h-28 border-border_light'
          />
          <TouchableOpacity className='mt-24'>
            <Text className='text-xl text-center text-white'>
              Change Avatar
            </Text>
          </TouchableOpacity>
          <View className='px-4 mt-10'>
            <View className='flex-row'>
              <Text className='text-xl text-white'>Name:</Text>
              <Text className='ml-2 text-xl text-white'>{user?.fullName}</Text>
              <TouchableOpacity className='ml-2'>
                <Ionicons name='pencil' size={18} color='white' />
              </TouchableOpacity>
            </View>
            <View className='flex-row mt-2'>
              <Text className='text-xl text-white'>Email:</Text>
              <Text className='ml-2 text-xl text-white'>
                {user?.emailAddresses[0].emailAddress}
              </Text>
              <TouchableOpacity className='ml-2'>
                <Ionicons name='pencil' size={18} color='white' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* User Game Info Section */}
      <View className='mt-8'>
        <View className='self-center'>
          <Container title='Rank' value='123' variant='small' />
        </View>
        <View className='flex-row justify-between mt-2'>
          <Container title='Correct Answers' value='80' variant='small' />
          <Container title='Wrong Answers' value='12' variant='small' />
          <Container title='Games Played' value='80' variant='small' />
        </View>
      </View>

      {/* Account Control Buttons */}
      <View className='gap-4 mt-8'>
        <Button title='Sign Out' variant='fullWidth' onPress={signOut} />
        <Button
          title='Delete Account'
          variant='fullWidth'
          type='destructive'
          onPress={() => user?.delete()}
        />
      </View>
    </View>
  );
};

export default Profile;
