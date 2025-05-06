import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';

interface BookmarkProps {
  question: string;
  answer: string;
  handleDelete: () => void;
}

const Bookmark = ({ question, answer, handleDelete }: BookmarkProps) => {
  const [extended, setExtended] = useState(false);

  const handlePress = () => {
    setExtended((prevState) => !prevState);
  };

  return (
    <Pressable
      onPress={handlePress}
      className={`items-center w-full text-center border-2 border-border_light bg-light_bg rounded-xl justify-center py-6 px-4`}
    >
      <Text className={`text-xl font-semibold text-white`}>{question}</Text>
      {extended && (
        <TouchableOpacity
          className='absolute bottom-2 right-2'
          onPress={handleDelete}
        >
          <Ionicons
            name='trash'
            size={24}
            color={'#fff'}
            onPress={handleDelete}
          />
        </TouchableOpacity>
      )}
      {extended && (
        <Text className={`text-xl font-semibold  text-white pt-6`}>
          {answer}
        </Text>
      )}
    </Pressable>
  );
};

export default Bookmark;
