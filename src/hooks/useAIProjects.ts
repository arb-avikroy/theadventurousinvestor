import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AIProject {
  id: string;
  category: string;
  name_en: string;
  name_hi: string;
  description_en: string;
  description_hi: string;
  link: string | null;
  type: string | null;
  status: string | null;
  tech: string[];
  read_time: string | null;
  publish_date: string | null;
  display_order: number;
  created_at: string;
}

export const useAIProjects = (category?: string) => {
  return useQuery({
    queryKey: ['ai_projects', category],
    queryFn: async () => {
      let query = supabase
        .from('ai_projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as AIProject[];
    },
  });
};

export const useAIProjectsByCategories = () => {
  return useQuery({
    queryKey: ['ai_projects_all'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_projects')
        .select('*')
        .order('display_order', { ascending: true });

      if (error) throw error;

      const allProjects = data as AIProject[];
      const community = allProjects.filter(p => p.category === 'community') || [];
      const projects = allProjects.filter(p => p.category === 'projects') || [];
      const articles = allProjects.filter(p => p.category === 'articles') || [];

      return { community, projects, articles };
    },
  });
};
