import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { supabase } from '@/src/lib/supabase'

const Profile = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=> supabase.auth.signOut() }>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    // backgroundColor:"red",
    alignItems:"center"
  },
  logout:{
    fontWeight:"bold",
    fontSize:20
  }
})