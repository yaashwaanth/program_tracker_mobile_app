import React, { useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useQueryClient } from '@tanstack/react-query'


const useProgramSubscriptions = (slug:string) => {
  console.log("Subscribtion running");
  
    const queryClient = useQueryClient();

  useEffect(() => {
    console.log("subscription mounted");
    
    // const subscriptionResponse = supabase.channel('custom-insert-channel')
    // .on('postgres_changes',
    // { event: 'INSERT', schema: 'public', table: 'programs' },
    // (payload) => {
    //      queryClient.invalidateQueries({
    //       queryKey: ['programs',slug]
    //      })
    // }
    // )
    // .subscribe()


const subscriptionResponse = supabase.channel('custom-all-channel')
.on(
  'postgres_changes',
  { event: '*', schema: 'public', table: 'programs' },
  (payload) => {
    console.log('Change received!', payload)
    queryClient.invalidateQueries({
            queryKey: ['programs',slug]
           })
  }
)
.subscribe()


    return ()=> {
        console.log("Unsubscribed");
        
        subscriptionResponse.unsubscribe()
    }
   
  }, [])
  
}

export default useProgramSubscriptions


