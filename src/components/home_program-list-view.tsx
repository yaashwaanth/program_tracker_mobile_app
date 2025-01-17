import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';


type Props={
    program_name: string;
    program_time: string;
    amount: string;
    date: string;
}

const HomeProgramListView = ({program_name,program_time,amount,date}:Props) => {
  return (
    <Link asChild href="/(home)">
    <View style={styles.container}>
        <View>
     <Text style={{fontSize:20,maxHeight:70,padding:0}}>{program_name}</Text>
     <Text style={{fontSize:15,fontWeight:"bold",maxHeight:70,padding:0}}>{date}</Text>

        </View>
     <View style={{}}>
     <Text style={{fontSize:20,fontWeight:'bold',maxHeight:70,padding:0}}>{program_time}</Text>
     <Text style={{fontSize:15,fontWeight:'bold',maxHeight:70,padding:0}}>₹{amount}/-</Text>

     </View>
    </View></Link>
  )
}

export default HomeProgramListView

const styles = StyleSheet.create({
    container:{

        flex:1,
        backgroundColor:"white",
        flexDirection: "row",
        justifyContent: 'space-around',
        borderRadius: 20,
        alignItems:'center',
        height:100,
        marginBottom:12

    }
})

