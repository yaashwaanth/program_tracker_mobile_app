import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View,Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../providers/authProvider'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { ProgramTypeList } from '@/src/types';
import { supabase } from '@/src/lib/supabase';
import DateTimePicker from "@react-native-community/datetimepicker"
import { useProgramStore } from '@/src/lib/store';
enum ProgramType {
    With = "Samagri",
     Without = "Without Samagri"
}

const AddProgramPage = () => {

    const { slug } = useLocalSearchParams<{ slug: string }>();
    const {getDateSpecPrograms,programs} = useProgramStore()
    const [programName, setProgramName] = useState("")
    const [karta, setKarta] = useState("")
    const [kartaNumber, setKartaNumber] = useState("")
    const [amount, setAmount] = useState("")
    const [advance,setAdvance] = useState("")
    const [type,setType] = useState("")
    const [time, setTime] = useState(new Date()); 
    const [timeInputBox, setTimeInputBox] = useState(new Date); 
    const router = useRouter()
    const [showTimePicker,setShowTimePicker] = useState(false)
    const {user} = useAuth();



    const programHandler = async() => {
    
      try {        
      const { data, error } = await supabase
      .from('programs')
      .insert(
        { program_name:programName,
          program_date:slug,
          karta,
          karta_number: kartaNumber,
          amount,
          advance,
          type,
          program_time:timeInputBox ,
          profile: user?.id
        },
      )
      .select()

      console.log(error,"error.......");
      
      
     } catch (error) {
        console.log(error);
     }finally{
        router.back()
     }
        
    }

    const toggleTimer = () => {

      console.log("Pressed Akddddd");
      
      setShowTimePicker(prev => !prev)
    }

  

    const onChange = ({type},selectedTime) => {

      if(type == "set"){
        const formattedTime = selectedTime.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });

    
        console.log(formattedTime, "Formatted Time",typeof(formattedTime));

        setTimeInputBox(formattedTime); // Update state with the Date object
     }
        // setShowTimePicker(false);

        toggleTimer()

    }  
  
    
  return (
    <View style={styles.container}>
      <Stack.Screen  options={{title: `${slug}`}}/>
      <ScrollView>
      <Text style={styles.label}>Program</Text>
      <TextInput
        value={programName}
        onChangeText={setProgramName}
        placeholder="Marriage"
        style={styles.input}
      />

      <Text style={styles.label}>Name</Text>
      <TextInput
        value={karta}
        onChangeText={setKarta}
        placeholder="Name"
        style={styles.input}
      />
      <Text style={styles.label}>Mobile</Text>
      <TextInput
        value={kartaNumber}
        keyboardType='numeric'
        onChangeText={setKartaNumber}
        placeholder=""
        style={styles.input}
      />
      <Text style={styles.label}>Amount</Text>
      <TextInput
        value={amount}
        keyboardType='numeric'
        onChangeText={setAmount}
        placeholder="Amount"
        style={styles.input}
      />
      <Text style={styles.label}>Advance</Text>
      <TextInput
        value={advance}
        keyboardType='numeric'
        onChangeText={setAdvance}
        placeholder="Advance"
        style={styles.input}
      />
      {/* <Text style={styles.label}>Time</Text> */}

      
      {/* <DateTimePicker 
        mode='time'
        // display='spinner'
        value={time}
        onChange={onChange}
        style={{
        width: 100,
        }}
      /> */}

<Text style={styles.label}>Time</Text>
{showTimePicker && (
  <DateTimePicker
    mode="time"
    display={ 'default'} // Ensure proper display mode
    value={time}
    onChange={onChange}
  />
)}

{
  Platform.OS === 'android' ? (
  <>
  showTimePicker ? <></> : <>
  <Pressable onPress={toggleTimer}>
<TextInput
  value={timeInputBox} 
  style={styles.input}
  editable={false} // Disable manual editing
/>
</Pressable>
  </>
  </>
  ):(

  showTimePicker ? <></> : <>
  <TextInput
  onPress={toggleTimer}
  value={timeInputBox} 
  style={styles.input}
  editable={false} // Disable manual editing
/>
  </>
  )
}


      {/* <Pressable  onPress={()=>toggleTimer()}>
      <TextInput
        // onPress={()=> setShowTimePicker(true)}
        value={timeInputBox} 
        style={styles.input}
        editable={false}
      />
      </Pressable> */}
      <Text style={styles.label}>Program Type</Text>
    
      {
        ProgramTypeList.map((ptype)=>(
          <Pressable
                key={ptype}
                onPress={() => setType(ptype)}
                style={{
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 5,
                  marginVertical: 10,
                  backgroundColor:ptype === type ? 'green' : 'white',
    
                }}
              >
                <Text
                  style={{   
                  }}
                >
                  {ptype}
                </Text>
              </Pressable>

        ))
      }

     <TouchableOpacity style={{width:"full",backgroundColor:"#F26B0F",padding:10,marginBottom:10,borderRadius:10,marginTop:10}}
     onPress={()=>programHandler()}
     >
        <Text style={{textAlign:"center",color:"white",fontWeight:"bold"}}>Create</Text>
      </TouchableOpacity>


      {/* <TouchableOpacity style={{width:"full",backgroundColor:"red",padding:10,borderRadius:10}}>
        <Text style={{textAlign:"center",color:"white",fontWeight:"bold"}}>Cancel</Text>
      </TouchableOpacity> */}
      </ScrollView>


     
    </View>
  )
}

export default AddProgramPage

const styles = StyleSheet.create({
    container:{
        padding: 10,
        justifyContent: 'center',
        flex: 1,
      },
      label: {
        color: 'gray',
      },
      input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
        backgroundColor: 'white',
        borderRadius: 5,
      },
})