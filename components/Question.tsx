import React from 'react';
import { Pressable, Text } from 'react-native';

interface QuestionProps {
  question: string;
  answer: string;
  onPress?: () => void;
  variant: 'fullWidth';
  extended: boolean;
}

const styles = {
  fullWidth: {
    width: 'w-full',
  },
};

const Question = ({
  question,
  answer,
  onPress,
  variant,
  extended,
}: QuestionProps) => {
  return (
    <Pressable
      onPress={onPress}
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

export default Question;
