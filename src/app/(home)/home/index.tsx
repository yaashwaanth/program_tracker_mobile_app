import { ActivityIndicator, Button, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Calendar, LocaleConfig} from 'react-native-calendars';
import { Link, Redirect, Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PROGRAMS } from '@/assets/programList';
import ProgramListView from '@/src/components/program-list-view';
import { useProgramStore } from '@/src/lib/store';
import useProgramSubscriptions from '@/src/api/subscriptions';
import { useAuth } from '@/src/providers/authProvider';
import HomeProgramListView from '@/src/components/home_program-list-view';
import { getCurrentMonthPrograms } from '@/src/api/api';

function convertDateFormat(date:string) {
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
}



const Home = () => {
  const {data,isLoading,error} = getCurrentMonthPrograms();
  const [selected, setSelected] = useState('');
  const router = useRouter()
  const {user} = useAuth()
  const date = new Date()
   
  console.log(isLoading,"loading , home");
  
  if(isLoading){
    return <ActivityIndicator/>
  }
  
  
  return (
    <SafeAreaView style={{width:"100%",height:"100%",padding:12,flex:1,justifyContent:'space-around'}}>
      <Stack.Screen options={{headerShown:false}}/>
      <View>
      <View style={styles.nameDateContainer}>
        <Text style={styles.username}>{user?.full_name}</Text>
        <Text style={styles.currentDate}>{date.getDate()}{" "}/{" " + (date.getMonth() + 1) }{" "}/{" " + date.getFullYear()}</Text>
      </View>

     <Calendar
      onDayPress={(day:any) => {
        let formatDate = convertDateFormat(day.dateString)
        setSelected(convertDateFormat(day.dateString));
        console.log(day["day"],"abar");
        console.log(day["dateString"],"hel gys");

        
        router.push(`/home/${formatDate}`)
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
    />

    {/* current month programs list */}
    <View style={{height: 300, borderColor:"#CB793A",borderWidth:2, borderRadius:10,padding: 10,paddingTop:2,marginTop:23 }}>
      <FlatList data={data} renderItem={({item})=> <HomeProgramListView program_name={item.program_name} program_time={item.program_time} amount={item.amount} date={item.program_date}/>}/>
    </View>
    </View>
      </SafeAreaView>


  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex:1,
    padding: 10,
    paddingTop: 10,
    gap: 30,
    width:"100%",
    height:"100%",
    justifyContent: 'space-around'
  },
  nameDateContainer:{
    // backgroundColor:"black"
  },
  username:{
    fontSize: 29
  },
  currentDate:{
    fontSize: 25
  }
})