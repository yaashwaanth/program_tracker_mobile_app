import React from 'react'
import { Redirect, Stack } from 'expo-router'
import AuthProvider from '../providers/authProvider'
import QueryProvider from '../providers/query-client-provider'

export default function RootLayout(){
    
  return <AuthProvider>
   <QueryProvider>
   <Stack>
   <Stack.Screen name='(home)' options={{headerShown:false}}/>
   <Stack.Screen name="auth" options={{headerShown:false,title:"Auth"}}/>
   <Stack.Screen name="addProgram/[slug]" options={{presentation:"modal"}}/>
   </Stack>
   </QueryProvider>
    </AuthProvider>
  
}



