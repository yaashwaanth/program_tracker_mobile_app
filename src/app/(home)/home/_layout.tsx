import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import useProgramSubscriptions from '@/src/api/subscriptions'

const homeLayout = () => {

  return <Stack>
    <Stack.Screen name='index' options={{headerShown:false}}/>
    <Stack.Screen name='[slug]' options={{headerShown:false}}/>
  </Stack>
}

export default homeLayout