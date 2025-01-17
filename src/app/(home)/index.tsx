import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'
import useProgramSubscriptions from '@/src/api/subscriptions'

const HomIndex = () => {

  return (
    <Redirect href={'/(home)/home'}/>
  )
}

export default HomIndex

const styles = StyleSheet.create({})



// import { View, Text } from 'react-native'
// import React from 'react'
// import useProgramSubscriptions from '@/src/api/subscriptions'
// import { Stack } from 'expo-router'

// const HomeLayout = () => {
//   return <Stack>
//     <Stack.Screen name='index' options={{headerShown:false}}/>
//   </Stack>
// }

// export default HomeLayout