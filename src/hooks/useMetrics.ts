import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Metric {
  id: string;
  value: string;
  label: string;
  display_order: number;
  created_at: string;
}

export const useMetrics = () => {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Metric[];
    },
  });
};
