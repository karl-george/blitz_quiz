import React from 'react';
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
} from 'react-native';

interface ButtonProps {
  title: string;
  icon?: ImageSourcePropType;
  onPress?: () => void;
  variant: 'large' | 'small' | 'fullWidth';
  type?: 'destructive' | null;
}

const styles = {
  large: {
    width: 'w-[180px]',
    height: 'h-[130px]',
  },
  small: {
    width: 'px-10',
    height: 'py-6',
  },
  fullWidth: {
    width: 'w-full',
    height: 'h-[50px]',
  },
};

const textType = {
  destructive: {
    color: 'text-wrong',
  },
};

const Button = ({ title, icon, onPress, variant, type }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`items-center ${styles[variant].width} ${styles[variant].height} text-center border-2 border-border_light bg-light_bg rounded-xl justify-center`}
    >
      {icon && <Image source={icon} className='mb-1' />}
      <Text
        className={`text-xl font-semibold ${
          type ? textType[type].color : 'text-white'
        } `}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
