import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Project {
  id: string;
  slug: string;
  title_en: string;
  title_hi: string;
  description_en: string;
  description_hi: string;
  long_description_en: string | null;
  long_description_hi: string | null;
  tags: string[];
  features_en: string[];
  features_hi: string[];
  tech_stack: string[];
  status: string | null;
  github_url: string | null;
  live_url: string | null;
  is_featured: boolean;
  display_order: number;
  created_at: string;
}

export const useProjects = (featured?: boolean) => {
  return useQuery({
    queryKey: ['projects', featured],
    queryFn: async () => {
      let query = supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (featured !== undefined) {
        query = query.eq('is_featured', featured);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Project[];
    },
  });
};

export const useProject = (slug: string) => {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data as Project | null;
    },
    enabled: !!slug,
  });
};
