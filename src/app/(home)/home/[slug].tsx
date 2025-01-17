import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import ProgramListView from '@/src/components/program-list-view'
import { PROGRAMS } from '@/assets/programList'
import { useProgramStore } from '@/src/lib/store'
import { useAuth } from '@/src/providers/authProvider'
import { getDateSpecficPrograms } from '@/src/api/api'
import useProgramSubscriptions from '@/src/api/subscriptions'



const ProgramDetails = () => {
  const router = useRouter()
  const {slug} = useLocalSearchParams<{slug: string}>()
  const {data,isLoading,error} = getDateSpecficPrograms(slug);
  useProgramSubscriptions(slug)  
   if(isLoading){
    return <ActivityIndicator/>
   }

   if(error){
    <Text>Error: {error?.message}</Text>
   }
  return (
    <View style={styles.container}>
    <Stack.Screen options={{headerShown:true,title: `${slug}`, headerLeft: ()=> <FontAwesome size={20} name='arrow-left' onPress={()=> router.back() } style={{marginLeft:20,padding:7,}} />}}/>
     
      <FlatList data={data} renderItem={({item})=> <ProgramListView id={item.id}  program_name={item.program_name} program_time={item.program_time} amount={item.amount} karta={item.karta} number={item.karta_number} type={item.type} advance={item.advance}/>}/>  

    <Link href={{pathname:'/addProgram/[slug]',params:{slug}}}  asChild> 
    <TouchableOpacity style={{backgroundColor:"white",padding:20,alignContent:'center',borderWidth:2,borderRadius:20,borderColor:'#CB793A',}}>
      <Text style={{fontSize:15,fontWeight:'bold',textAlign:'center',}}>Add Program +</Text>
     </TouchableOpacity>
    </Link>
      
    </View>
  )
}

export default ProgramDetails

const styles = StyleSheet.create({
    container: {
        flex:1,
        gap: 20,
        padding: 10
    }
})