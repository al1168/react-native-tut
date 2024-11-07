import { View, Text, SafeAreaView, Image, ImageBackground, Pressable,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { GalleryPreviewData } from '@/constants/models/AffirmationCategory';
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery';
import AppGradient from '@/components/AppGradient';
import { AntDesign } from '@expo/vector-icons';


const AffirmationPractice = () => {
    const { itemId } = useLocalSearchParams();
    const [affirmation, setAffirmation] = useState<GalleryPreviewData>()
    const [sentences, setSetences] = useState<string[]>([])
    useEffect(()=>{
        for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++){
            const affirmationData = AFFIRMATION_GALLERY[idx].data;
            const affirmationToStart = affirmationData.find((a)=> a.id === Number(itemId));
            if (affirmationToStart){
                setAffirmation(affirmationToStart);
                const affirmationArray = affirmationToStart.text.split(".")
                if (affirmationArray[affirmationArray.length-1] == ""){
                  affirmationArray.pop()
                }
                setSetences(affirmationArray)
                return;
            }
        }
    },[])

  return (
    <View className='flex-1'>
      <ImageBackground
        source={affirmation?.image}
        resizeMode='cover'
        className='flex-1'
      >
        <AppGradient
          colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.9)"]}
        >
          <Pressable className=""onPress={()=>router.back()}>
          <AntDesign name="leftcircle" size={25} color="white" />
          </Pressable>

      <ScrollView>
        <View className='h-full justify-center'>
          <View className='h-4/5 justify-center'>
            {sentences.map((sentence, idx) => (
              <Text
                className='text-white text-3xl mb-12 text-center font-bold'
                key={idx}
              >
                  {sentence}.
              </Text>
            ))}
          </View>
        </View>
      </ScrollView>
        </AppGradient>
      </ImageBackground>
    </View>
  )


}
export default AffirmationPractice