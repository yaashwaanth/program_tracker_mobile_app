import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Redirect, Stack, Tabs } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from '@/src/providers/authProvider';


const HomeLayout = () => {
  const {session,mounting} = useAuth()

    if(mounting){
      return <ActivityIndicator/>
    }
    if(!session){
      return <Redirect href="/auth"/>  
    }


  return (

    <Tabs screenOptions={{
        tabBarActiveTintColor: "#CB793A",
        
    }}>

        <Tabs.Screen name='index' options={{href:null}}/>
        <Tabs.Screen name='home/[slug]' options={{href:null}} />
        <Tabs.Screen name='home' options={{title:"Home",headerShown:false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,

        }}/>
        <Tabs.Screen name='profile/profile' options={{title:"Profile",headerShown:false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,

        }}/>
    </Tabs>
  )
}

export default HomeLayout

