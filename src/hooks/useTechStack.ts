import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface TechStackItem {
  id: string;
  icon: string;
  label: string;
  display_order: number;
  created_at: string;
}

export const useTechStack = () => {
  return useQuery({
    queryKey: ['tech_stack'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tech_stack')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as TechStackItem[];
    },
  });
};
