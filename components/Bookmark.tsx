import React, { useState } from 'react';
import { Pressable, Text } from 'react-native';

interface BookmarkProps {
  question: string;
  answer: string;
  variant: 'fullWidth';
}

const styles = {
  fullWidth: {
    width: 'w-full',
  },
};

const Bookmark = ({ question, answer, variant }: BookmarkProps) => {
  const [extended, setExtended] = useState(false);

  const handlePress = () => {
    setExtended((prevState) => !prevState);
  };

  return (
    <Pressable
      onPress={handlePress}
      className={`items-center ${styles[variant].width} text-center border-2 border-border_light bg-light_bg rounded-xl justify-center py-6`}
    >
      <Text className={`text-xl font-semibold  text-white`}>{question}</Text>
      {extended && (
        <Text className={`text-xl font-semibold  text-white pt-6`}>
          {answer}
        </Text>
      )}
    </Pressable>
  );
};

export default Bookmark;
