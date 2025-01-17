import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@/src/providers/authProvider'

const AuthLayout = () => {
    const {user,session} = useAuth()
  if(session){
    return <Redirect href="/(home)"/>
  }
  return <Stack/>
}

export default AuthLayout