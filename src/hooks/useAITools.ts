import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface AIToolFromDB {
  id: string;
  name: string;
  description: string;
  category: string;
  model_type: string[];
  url: string;
  logo: string | null;
  pricing: string;
  tags: string[];
  display_order: number;
  is_active: boolean;
  created_at: string;
}

export interface UserCuratedAITool {
  id: string;
  name: string;
  description: string;
  category: string;
  model_type: string[];
  url: string;
  logo: string | null;
  pricing: string;
  tags: string[];
  submitted_by: string | null;
  submitted_by_email: string | null;
  ip_address: string | null;
  is_approved: boolean;
  is_active: boolean;
  created_at: string;
}

export interface NewUserCuratedTool {
  name: string;
  description: string;
  category: string;
  model_type: string[];
  url: string;
  logo?: string | null;
  pricing: string;
  tags: string[];
  submitted_by?: string;
  submitted_by_email?: string;
}

export const useAITools = () => {
  return useQuery({
    queryKey: ['ai_tools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as AIToolFromDB[];
    },
  });
};

export const useAIToolsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['ai_tools', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('ai_tools')
        .select('*')
        .eq('is_active', true)
        .eq('category', category)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as AIToolFromDB[];
    },
  });
};

export const useUserCuratedAITools = () => {
  return useQuery({
    queryKey: ['user_curated_ai_tools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_curated_ai_tools')
        .select('*')
        .eq('is_approved', true)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as UserCuratedAITool[];
    },
  });
};

export const useSubmitAITool = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (tool: NewUserCuratedTool) => {
      // Get user's IP address (optional)
      let ipAddress = null;
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        ipAddress = data.ip;
      } catch (error) {
        console.log('Could not fetch IP address');
      }

      const { data, error } = await supabase
        .from('user_curated_ai_tools')
        .insert([
          {
            ...tool,
            ip_address: ipAddress,
            is_approved: false, // Needs admin approval
            is_active: true,
          },
        ])
        .select();

      if (error) {
        console.error('❌ Supabase Error:', error);
        
        // Provide helpful error messages
        if (error.message.includes('relation') && error.message.includes('does not exist')) {
          throw new Error(
            'Database table not found. Please run the migration SQL in Supabase Dashboard. See SETUP-AI-TOOLS-DATABASE.md for instructions.'
          );
        }
        
        if (error.message.includes('violates row-level security policy')) {
          throw new Error(
            'Database permissions issue. Please check RLS policies in Supabase. See SETUP-AI-TOOLS-DATABASE.md for help.'
          );
        }
        
        throw error;
      }
      
      // Send Telegram notification using the same worker as contact form
      if (data && data[0]) {
        try {
          await fetch("https://telegram-contact-api.arb-avikroy.workers.dev/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              type: 'ai_tool_submission',
              tool: {
                id: data[0].id,
                name: tool.name,
                url: tool.url,
                category: tool.category,
                pricing: tool.pricing,
                description: tool.description,
                submitted_by: tool.submitted_by || 'Anonymous',
                submitted_by_email: tool.submitted_by_email || 'Not provided',
              }
            }),
          });
        } catch (telegramError) {
          console.log('Telegram notification failed:', telegramError);
          // Don't throw - tool was saved successfully
        }
      }
      
      return data;
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['user_curated_ai_tools'] });
    },
  });
};
