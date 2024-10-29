import { View, Text, ImageBackground } from 'react-native';
import React from 'react';

import beachImage from "@/assets/meditation-images/beach.webp";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '@/components/CustomButton';

const App = () => {
  return (
    <View className='flex-1 bg-white'>
      <ImageBackground
          source={beachImage}
          resizeMode="cover"
          className='flex-1'>
        <LinearGradient
          className='flex-1'
          colors={["rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
          >
            <SafeAreaView className='flex-1 justify-between mx-5 my-12'>
              <View>
                <Text className="text-center text-white font-bold text-4xl"> Simple Meditation </Text>
                <Text className='flex-center text-white text-center text text-2xl mt-3'>
                  Simplifying Medidation for everyone
                </Text>
              </View>
              <View>
                <CustomButton title='Get started' onPress={()=> console.log('tap')} />
              </View>
            <StatusBar style= "light"/>
            </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

export default App