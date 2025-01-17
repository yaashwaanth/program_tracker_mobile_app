import {create} from "zustand"
import { supabase } from "./supabase"
import { useAuth } from "../providers/authProvider";


export const useProgramStore = create((set)=>({
          programs:[],
          currentMontPrograms: [],
          // addProgram: async(program_name: string,karta:string,karta_number:number,amount:number,advance:number,type:string
          //   ,program_time:string,profile: string
          // ) => {
          //   const { data, error } = await supabase.from('programs').insert({ program_name,karta,karta_number,amount,advance,type,program_time,profile}).select()
          //   return {data,error}
          // },
          getAllPrograms: async() => {
           
            let { data: programs, error } = await supabase.from('programs').select('*');

            return {programs,error}
          
          },
          fetchProgramsForCurrentMonth: async () => {
            function getCurrentMonth() {
              const now = new Date();
              const month = now.getMonth() + 1; // Months are zero-indexed
              const year = now.getFullYear();
              return `${month.toString().padStart(2, '0')}-${year}`; // Format to `mm-yyyy`
            }
            const currentMonth = getCurrentMonth();
            
            try {
              const { data, error } = await supabase
                .from('programs')
                .select('*')
                .filter('program_date', 'like', `%${currentMonth}%`) // Match current month in the program_date
                .order('program_date', { ascending: true });
              if (error) {
                console.error('Error fetching programs:', error);
                return;
              }
        
              set({ currentMontPrograms: data || [] });
            } catch (error) {
              console.error('Unexpected error:', error);
            }
          },
        
          getDateSpecPrograms: async(slug:string,profile:string) => {
            const {user} = useAuth()
            const { data, error } = await supabase
            .from('programs')
            .select('*')
            .eq('profile', user?.id) // Match the profile ID
            .eq('program_date',slug)
            if(data){
                  set(()=> ({programs :  data}))
            }
            console.log(data,"zenstud");
            
            return {data,error}
        }
}))