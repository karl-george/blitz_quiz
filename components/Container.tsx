import { View, Text } from 'react-native';
import React from 'react';

interface ContainerProps {
  title: string;
  value?: number;
  variant: 'large' | 'small';
}

const styles = {
  large: {
    width: 'w-[180px]',
    height: 'h-[130px]',
  },
  small: {
    width: 'w-[122px]',
    height: 'h-[105px]',
  },
};

const Container = ({ title, value, variant }: ContainerProps) => {
  return (
    <View
      className={`items-center text-center border-2 ${styles[variant].width} ${styles[variant].height} border-border_light bg-light_bg rounded-xl justify-center p-4`}
    >
      <Text className='text-3xl text-center text-white'>{value}</Text>
      <Text className='text-base text-center text-white'>{title}</Text>
    </View>
  );
};

export default Container;
