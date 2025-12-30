import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useState, useEffect } from 'react';

interface Bookmark {
  id: string;
  ip_address: string;
  content_type: string;
  content_id: string;
  created_at: string;
}

// Get user IP using a public API
const getUserIP = async (): Promise<string> => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return 'unknown';
  }
};

export const useUserIP = () => {
  const [ip, setIP] = useState<string | null>(null);

  useEffect(() => {
    getUserIP().then(setIP);
  }, []);

  return ip;
};

export const useBookmarks = (contentType?: string) => {
  const ip = useUserIP();

  return useQuery({
    queryKey: ['bookmarks', ip, contentType],
    queryFn: async () => {
      if (!ip) return [];

      let query = supabase
        .from('user_bookmarks')
        .select('*')
        .eq('ip_address', ip);

      if (contentType) {
        query = query.eq('content_type', contentType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Bookmark[];
    },
    enabled: !!ip,
  });
};

export const useIsBookmarked = (contentType: string, contentId: string) => {
  const ip = useUserIP();

  return useQuery({
    queryKey: ['bookmark', ip, contentType, contentId],
    queryFn: async () => {
      if (!ip) return false;

      const { data, error } = await supabase
        .from('user_bookmarks')
        .select('id')
        .eq('ip_address', ip)
        .eq('content_type', contentType)
        .eq('content_id', contentId)
        .maybeSingle();

      if (error) throw error;
      return !!data;
    },
    enabled: !!ip && !!contentId,
  });
};

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();
  const ip = useUserIP();

  return useMutation({
    mutationFn: async ({ contentType, contentId }: { contentType: string; contentId: string }) => {
      if (!ip) throw new Error('IP not available');

      // Check if bookmark exists
      const { data: existing } = await supabase
        .from('user_bookmarks')
        .select('id')
        .eq('ip_address', ip)
        .eq('content_type', contentType)
        .eq('content_id', contentId)
        .maybeSingle();

      if (existing) {
        // Remove bookmark
        const { error } = await supabase
          .from('user_bookmarks')
          .delete()
          .eq('id', (existing as { id: string }).id);
        if (error) throw error;
        return { action: 'removed' };
      } else {
        // Add bookmark
        const { error } = await supabase
          .from('user_bookmarks')
          .insert([{
            ip_address: ip,
            content_type: contentType,
            content_id: contentId,
          }]);
        if (error) throw error;
        return { action: 'added' };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookmarks'] });
      queryClient.invalidateQueries({ queryKey: ['bookmark'] });
    },
  });
};
