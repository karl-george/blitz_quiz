import '@/global.css';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Index() {
  return (
    <View className='items-center justify-center flex-1'>
      <LinearGradient
        colors={['#CCB6FF', '#986BFF']}
        className='absolute top-0 bottom-0 left-0 right-0'
      />
      <Text className='text-4xl text-red-500'>Hello World!</Text>
    </View>
  );
}
