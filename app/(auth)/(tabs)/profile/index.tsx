import Button from '@/components/Button';
import Container from '@/components/Container';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Profile = () => {
  const [editable, setEditable] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const { user } = useUser();
  const { signOut } = useClerk();

  const handleAvatarChange = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 4],
      quality: 1,
      base64: true,
    });

    if (!result.canceled && result.assets[0].base64) {
      const base64 = result.assets[0].base64;
      const mimeType = result.assets[0].mimeType;
      const image = `data:${mimeType};base64,${base64}`;

      user?.setProfileImage({ file: image });
    }
  };

  const handleNameChange = () => {
    // Set/Update username
    // Use validation to tell the user they can only use letters, numbers and '_' or '-'
    //! Maybe store a name in the database and change that one so I can have more control of whats allowed
    user?.update({ username: name });

    setEditable(false);
  };

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
          <TouchableOpacity className='mt-24' onPress={handleAvatarChange}>
            <Text className='text-xl text-center text-white'>
              Change Avatar
            </Text>
          </TouchableOpacity>
          <View className='px-4 mt-10'>
            <View className='flex-row items-center'>
              <Text className='text-xl text-white'>Name:</Text>
              {editable ? (
                <View className=''>
                  <TextInput
                    placeholder='Name...'
                    placeholderTextColor='#DBDBDB'
                    value={name}
                    onChangeText={setName}
                    className='w-[250px] ml-2 px-2 py-1 text-white border rounded-lg border-border_light bg-slate-500'
                  />
                </View>
              ) : (
                <Text className='ml-2 text-xl text-white'>
                  {user?.username ? user.username : user?.fullName}
                </Text>
              )}
              {!editable ? (
                <TouchableOpacity
                  className='ml-2'
                  onPress={() => setEditable((prevState) => !prevState)}
                >
                  <Ionicons name='pencil-outline' size={18} color='white' />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity className='ml-2' onPress={handleNameChange}>
                  <Ionicons name='checkmark' size={24} color='white' />
                </TouchableOpacity>
              )}
            </View>
            <View className='flex-row mt-2'>
              <Text className='text-xl text-white'>Email:</Text>
              <Text className='ml-2 text-xl text-white'>
                {user?.emailAddresses[0].emailAddress}
              </Text>
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
