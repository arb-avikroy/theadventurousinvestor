import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Skill {
  id: string;
  category: string;
  items: string[];
  display_order: number;
  created_at: string;
}

export const useSkills = () => {
  return useQuery({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Skill[];
    },
  });
};
