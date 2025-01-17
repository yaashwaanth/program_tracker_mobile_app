import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../../providers/authProvider'
import { Link, Redirect, Stack } from 'expo-router'
import { supabase } from '@/src/lib/supabase'

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const loginController = async() => {
    setLoading(true)
    
    const {error}  = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) Alert.alert(error.message);
    setLoading(false);

    setEmail("")
    setPassword("")


  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Sign in' }} />
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="jon@gmail.com"
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

       <TouchableOpacity style={styles.textButton} onPress={loginController}>
        <Text style={styles.ButtonText}>{loading ? "Loading ....": "Login"}</Text>
       </TouchableOpacity>
       <Link href='/auth/signup' style={styles.link}>
        Sign Up
      </Link>
    </View>
  )
}

export default SignIn;

const styles = StyleSheet.create({
  container:{
    padding: 20,
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