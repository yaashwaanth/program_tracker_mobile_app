import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router';
import { supabase } from '../lib/supabase';
import useProgramSubscriptions from '../api/subscriptions';
import { useAuth } from '../providers/authProvider';


type Props={
    id:string;
    program_name: string;
    program_time: string;
    amount: string;
    karta: string;
    number: string;
    type:string;
    advance: string;
}

const ProgramListView = ({id,program_name,program_time,amount,karta,number,advance,type}:Props) => {
  const [drop,setDrop] = useState(false)
  const {user} = useAuth()
  const deleteProgram = async(id:string) =>{
    console.log("insi",id);
    
    try {
      const { error,data } = await supabase
    .from('programs')
    .delete()
    .eq('id',id)
    .eq('profile',user?.id);

    console.log(data,"delete");
    
    if(error){
     return <Text>Error: {error?.message}</Text>
    }
    } catch (error) {
        console.log("error from program-list-view",error);
        
    }
            
  }

  return (
   <Pressable onPress={()=> setDrop(prev => !prev)}>
     <Link asChild href="/(home)">
    <>
    <View style={styles.container}>
     <View style={{width:"100%",flex:1,flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
     <Text style={{fontSize:20,maxHeight:70,padding:0}}>{program_name}</Text>
      <View style={{}}>
      <Text style={{fontSize:20,fontWeight:'bold',maxHeight:70,padding:0}}>{program_time}</Text>
      <Text style={{fontSize:15,fontWeight:'bold',maxHeight:70,padding:0}}>₹{amount}/-</Text>
      </View>
     </View>
     
     
    </View>
    {
      drop && (
        <>
        <View style={{width:"100%",height:200,flex:1,flexDirection:"row",padding:20,borderRadius:20,borderStyle:"dotted",borderColor:"black",backgroundColor:"#FFF6E9"}}>
          <View style={{flex:1,justifyContent:"space-around"}}>
          <View>
           <Text style={styles.heading}>Name</Text>
           <Text style={styles.details}>{karta}</Text>
           </View>
           
           <View>
            <Text style={styles.heading}>Advance</Text>
            <Text  style={styles.details}>{advance}</Text>
            </View>
           
           
          </View>

          <View style={{flex:1,justifyContent:"space-around"}}>

          <View>
            <Text style={styles.heading}>Number</Text>
            <Text  style={styles.details}>{number}</Text>
            </View>
           
           <View style={{}}>
           <Text style={styles.heading}>Type</Text>
           <Text  style={styles.details}>{type}</Text>
           </View>
           </View>
        </View>
         <TouchableOpacity style={{width:"full",backgroundColor:"#F26B0F",padding:10,marginBottom:20,borderRadius:10,marginTop:10}}
         onPress={()=>deleteProgram(id)}
          >
          <Text style={{textAlign:"center",color:"white",fontWeight:"bold"}}>Delete</Text>
        </TouchableOpacity>  
        </> 
      )
     }
    </>
    </Link>
   </Pressable>
  )
}

export default ProgramListView

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white",
        flexDirection: "column",
        // justifyContent: 'space-around',
        borderRadius: 20,
        alignItems:'center',
        height:100,
        marginBottom:12

    },
    heading: {
        fontWeight:"bold",
        fontSize:20
    },
    details:{
      fontSize:20,
      flexWrap:"wrap",


    }
})
