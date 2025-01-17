import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../providers/authProvider"
import { supabase } from "../lib/supabase"



export const getDateSpecficPrograms = (slug?:string) => {
    const {user} = useAuth()
    return useQuery({
        queryKey: ['programs',slug],
        queryFn: async () => {
            if (!slug || !user?.id) {
                throw new Error("Slug or user ID is missing");
              }
        
            const {data,error} = await supabase
            .from('programs')
            .select('*')
            .eq('profile', user?.id) 
            .eq('program_date',slug)
            if (error) {
                throw new Error(error.message);
              }
            return data;
            
        }
    })
}

export const getCurrentMonthPrograms = () => {
  const {user} = useAuth()
    return useQuery({
        queryKey:["currentMonth"],
        queryFn: async() => {
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
                  .order('program_date', { ascending: true })
                  .eq('profile', user?.id) 

                if (error) {
                  console.error('Error fetching programs:', error);
                  return;
                }
                
                return data;
    
              } catch (error) {
                console.error('Unexpected error:', error);
              }

        }
    })
    
      
      
}



