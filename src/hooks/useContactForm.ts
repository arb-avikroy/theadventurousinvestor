import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const useContactForm = () => {
  return useMutation({
    mutationFn: async (formData: ContactFormData) => {
      // Get user IP
      let ip = 'unknown';
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        ip = data.ip;
      } catch {
        // Continue without IP
      }

      const { error } = await supabase
        .from('contact_submissions')
        .insert([{
          name: formData.name,
          email: formData.email,
          message: formData.message,
          ip_address: ip,
          user_agent: navigator.userAgent,
        }]);

      if (error) throw error;
      return { success: true };
    },
  });
};
