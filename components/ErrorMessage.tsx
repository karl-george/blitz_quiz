import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <View className='items-center justify-center flex-1 p-4'>
      <LinearGradient
        colors={['#CCB6FF', '#986BFF']}
        className='absolute top-0 bottom-0 left-0 right-0'
      />
      <Text className='mb-4 text-xl text-center text-white'>{message}</Text>
      {onRetry && (
        <TouchableOpacity
          onPress={onRetry}
          className='px-4 py-2 border-2 border-border_light bg-light_bg rounded-xl'
        >
          <Text className='text-white'>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorMessage;
