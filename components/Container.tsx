import { View, Text } from 'react-native';
import React from 'react';

interface ContainerProps {
  title: string;
  value?: string;
  variant: 'large' | 'small';
}

const Container = ({ title, value, variant }: ContainerProps) => {
  return (
    <View
      className={`items-center text-center border-2 border-border_light bg-light_bg rounded-xl justify-center`}
    >
      <Text>Container</Text>
    </View>
  );
};

export default Container;
