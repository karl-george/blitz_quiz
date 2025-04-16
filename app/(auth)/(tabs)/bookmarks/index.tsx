import Button from '@/components/Button';
import Question from '@/components/Question';
import { tempBookmarks } from '@/constants/data';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';

const Page = () => {
  const [extended, setExtended] = useState(false);

  const bookmarks = tempBookmarks;

  const handlePress = (e) => {
    console.log(e);
    setExtended((prevState) => !prevState);
  };

  return (
    <View className='flex-1 px-4'>
      <LinearGradient
        colors={['#CCB6FF', '#986BFF']}
        className='absolute top-0 bottom-0 left-0 right-0'
      />
      {/* Show bookmarked questions */}
      <View className='pt-8'>
        <FlatList
          data={bookmarks}
          contentContainerClassName='gap-4'
          renderItem={({ item }) => (
            <Question
              question={item.question}
              answer={item.answer}
              variant='fullWidth'
              onPress={(e) => handlePress(e)}
              extended={extended}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Page;
