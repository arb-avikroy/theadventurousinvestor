import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ContentCategory {
  id: string;
  icon: string;
  title_en: string;
  title_hi: string;
  description_en: string;
  description_hi: string;
  display_order: number;
  created_at: string;
}

export const useContentCategories = () => {
  return useQuery({
    queryKey: ['content_categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_categories')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as ContentCategory[];
    },
  });
};
