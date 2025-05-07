import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

const LoadingSpinner = ({
  size = 'large',
  color = '#fff',
}: LoadingSpinnerProps) => {
  return (
    <View className='items-center justify-center flex-1'>
      <LinearGradient
        colors={['#CCB6FF', '#986BFF']}
        className='absolute top-0 bottom-0 left-0 right-0'
      />
      <View>
        <ActivityIndicator size={size} color={color} />
      </View>
    </View>
  );
};

export default LoadingSpinner;
