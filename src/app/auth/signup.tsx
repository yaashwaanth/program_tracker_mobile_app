import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link, Stack } from 'expo-router'
import { supabase } from '@/src/lib/supabase';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);


    const signUpController = async() => {
        setLoading(true)
        const {data,error} = await supabase.auth.signUp({
            email,
            password
        })
        
        if(data){
          console.log(data.user,"user");
          
        }
        if(error){
          console.log(error,"error");
          
        }
        
        setLoading(false)
    }
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign Up' }} />
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="gys@gmail.com"
        style={styles.input}
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder=""
        style={styles.input}
        secureTextEntry
      />

       <TouchableOpacity style={styles.textButton} onPress={signUpController}>
        <Text style={styles.ButtonText}>{loading ? "Registering ....": "Register"}</Text>
        {
            loading ? <ActivityIndicator/> : <></>
        }
       </TouchableOpacity>
       <Link href='/auth/signin' style={styles.link}>
        Sign in
      </Link>
    </View>
  ) 
}

export default SignUp

const styles = StyleSheet.create({
    container:{
      padding: 20,
      justifyContent: 'center',
      // backgroundColor:'red',
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
    textButton: {
      backgroundColor: "#F26B0F",
      // width: 100,
      // height: 20,
      alignSelf: 'center',
      marginVertical: 10,
      textAlign:'center',
      padding: 20,
      borderRadius: 10,
    },
    ButtonText:{
      fontSize: 15,
      fontWeight: 'bold',
    },
    link:{
        alignSelf:'center',
        fontWeight:'bold',
        marginTop:20,
        fontSize:15,
        color:'blue'
      }
  })