import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import AppGradient from '@/components/AppGradient'
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery'
import GuidedAffirmationsGallery from '@/components/GuidedAffirmationsGallery'

const Affirmations = () => {
  return (
    <ScrollView className='flex-1'>
        <AppGradient colors={["#2e1f58","#54426b","#a790af"]}>
          <ScrollView>
              <Text className='text-5xl text-blue-100'>Change your beliefs with affirmations </Text>
          </ScrollView>
          <View>
            {AFFIRMATION_GALLERY.map((g)=> (
              <GuidedAffirmationsGallery key={g.title} title={g.title} previews={g.data} />
            ))}
          </View>
        </AppGradient>
    </ScrollView>
  )
}

export default Affirmations