import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Video {
  id: string;
  youtube_id: string;
  title_en: string;
  title_hi: string;
  description_en: string;
  description_hi: string;
  duration: string | null;
  views: string | null;
  publish_date: string | null;
  display_order: number;
  created_at: string;
}

export const useVideos = () => {
  return useQuery({
    queryKey: ['videos'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_videos')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Video[];
    },
  });
};
