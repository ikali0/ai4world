import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

export function useCountries() {
  return useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('countries')
        .select('*')

      if (error) throw error
      return data
    }
  })
}
