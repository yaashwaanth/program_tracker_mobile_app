import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase';


type User =  {
    id: string;
    updated_at: string |null;
    email: string;
    mobile_number: number;
    created_at: string;
    full_name: string;
}

type AuthData = {
    session: Session|null;
    mounting: boolean;
    user: User | null;
}

const AuthContext = createContext<AuthData>({
    session: null,
    mounting: true,
    user: null
})

const AuthProvider = ({children}: PropsWithChildren) => {
    const [session, setSession] = useState<Session|null>(null)
    const [user, setUser] = useState<User|null>(null)
    const [mounting, setMounting] = useState<boolean>(true)

    useEffect(() => {

        const fetchSessionAndUser= async() => {
           try {
            console.log("AUthprovidder mundted");
            
            const {data:{session: fetchedSession},error:sessionError}  = await supabase.auth.getSession();
            console.log("sesssion",fetchedSession);
            
            if(sessionError) throw sessionError;

            setSession(fetchedSession)

            // getting user form session

            if(fetchedSession){
                const {data:userData,error:userError} = await supabase.from("profiles").select("*").eq("id",fetchedSession.user.id).single();
                if (userError) throw userError;
                setUser(userData)
            }
           } catch (error) {
             console.error("Error fetching session or user:", error);
           }finally{
            setMounting(false)
           }
        }
        
        fetchSessionAndUser();

        supabase.auth.onAuthStateChange(async(_event, session) => {
            console.log("run",session);
            
            setSession(session)
          })
      
    
    
    }, [])
    

  return (
   <AuthContext.Provider value={{session,mounting,user}}>
    {children}
   </AuthContext.Provider>
  )
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext);