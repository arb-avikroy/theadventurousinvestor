export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          slug: string
          title_en: string
          title_hi: string
          description_en: string
          description_hi: string
          long_description_en: string | null
          long_description_hi: string | null
          tags: string[]
          features_en: string[]
          features_hi: string[]
          tech_stack: string[]
          status: string | null
          github_url: string | null
          live_url: string | null
          is_featured: boolean
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title_en: string
          title_hi: string
          description_en: string
          description_hi: string
          long_description_en?: string | null
          long_description_hi?: string | null
          tags?: string[]
          features_en?: string[]
          features_hi?: string[]
          tech_stack?: string[]
          status?: string | null
          github_url?: string | null
          live_url?: string | null
          is_featured?: boolean
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title_en?: string
          title_hi?: string
          description_en?: string
          description_hi?: string
          long_description_en?: string | null
          long_description_hi?: string | null
          tags?: string[]
          features_en?: string[]
          features_hi?: string[]
          tech_stack?: string[]
          status?: string | null
          github_url?: string | null
          live_url?: string | null
          is_featured?: boolean
          display_order?: number
          created_at?: string
        }
      }
      ai_projects: {
        Row: {
          id: string
          category: string
          name_en: string
          name_hi: string
          description_en: string
          description_hi: string
          link: string | null
          type: string | null
          status: string | null
          tech: string[]
          read_time: string | null
          publish_date: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          category: string
          name_en: string
          name_hi: string
          description_en: string
          description_hi: string
          link?: string | null
          type?: string | null
          status?: string | null
          tech?: string[]
          read_time?: string | null
          publish_date?: string | null
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          category?: string
          name_en?: string
          name_hi?: string
          description_en?: string
          description_hi?: string
          link?: string | null
          type?: string | null
          status?: string | null
          tech?: string[]
          read_time?: string | null
          publish_date?: string | null
          display_order?: number
          created_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          category: string
          items: string[]
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          category: string
          items?: string[]
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          category?: string
          items?: string[]
          display_order?: number
          created_at?: string
        }
      }
      content_videos: {
        Row: {
          id: string
          youtube_id: string
          title_en: string
          title_hi: string
          description_en: string
          description_hi: string
          duration: string | null
          views: string | null
          publish_date: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          youtube_id: string
          title_en: string
          title_hi: string
          description_en: string
          description_hi: string
          duration?: string | null
          views?: string | null
          publish_date?: string | null
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          youtube_id?: string
          title_en?: string
          title_hi?: string
          description_en?: string
          description_hi?: string
          duration?: string | null
          views?: string | null
          publish_date?: string | null
          display_order?: number
          created_at?: string
        }
      }
      content_blogs: {
        Row: {
          id: string
          slug: string
          title_en: string
          title_hi: string
          excerpt_en: string
          excerpt_hi: string
          content_en: string
          content_hi: string
          author_name: string
          read_time: string
          publish_date: string
          tags: string[]
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          slug: string
          title_en: string
          title_hi: string
          excerpt_en: string
          excerpt_hi: string
          content_en: string
          content_hi: string
          author_name?: string
          read_time: string
          publish_date: string
          tags?: string[]
          is_published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title_en?: string
          title_hi?: string
          excerpt_en?: string
          excerpt_hi?: string
          content_en?: string
          content_hi?: string
          author_name?: string
          read_time?: string
          publish_date?: string
          tags?: string[]
          is_published?: boolean
          created_at?: string
        }
      }
      user_bookmarks: {
        Row: {
          id: string
          ip_address: string
          content_type: string
          content_id: string
          created_at: string
        }
        Insert: {
          id?: string
          ip_address: string
          content_type: string
          content_id: string
          created_at?: string
        }
        Update: {
          id?: string
          ip_address?: string
          content_type?: string
          content_id?: string
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          ip_address: string | null
          user_agent: string | null
          submitted_at: string
          is_read: boolean
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          ip_address?: string | null
          user_agent?: string | null
          submitted_at?: string
          is_read?: boolean
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          ip_address?: string | null
          user_agent?: string | null
          submitted_at?: string
          is_read?: boolean
        }
      }
      metrics: {
        Row: {
          id: string
          value: string
          label: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          value: string
          label: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          value?: string
          label?: string
          display_order?: number
          created_at?: string
        }
      }
      content_categories: {
        Row: {
          id: string
          icon: string
          title_en: string
          title_hi: string
          description_en: string
          description_hi: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          icon: string
          title_en: string
          title_hi: string
          description_en: string
          description_hi: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          icon?: string
          title_en?: string
          title_hi?: string
          description_en?: string
          description_hi?: string
          display_order?: number
          created_at?: string
        }
      }
      tech_stack: {
        Row: {
          id: string
          icon: string
          label: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          icon: string
          label: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          icon?: string
          label?: string
          display_order?: number
          created_at?: string
        }
      }
      ai_tools: {
        Row: {
          id: string
          name: string
          description: string
          category: string
          model_type: string[]
          url: string
          logo: string | null
          pricing: string
          tags: string[]
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          category: string
          model_type?: string[]
          url: string
          logo?: string | null
          pricing: string
          tags?: string[]
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category?: string
          model_type?: string[]
          url?: string
          logo?: string | null
          pricing?: string
          tags?: string[]
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      user_curated_ai_tools: {
        Row: {
          id: string
          name: string
          description: string
          category: string
          model_type: string[]
          url: string
          logo: string | null
          pricing: string
          tags: string[]
          submitted_by: string | null
          submitted_by_email: string | null
          ip_address: string | null
          is_approved: boolean
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          category: string
          model_type?: string[]
          url: string
          logo?: string | null
          pricing: string
          tags?: string[]
          submitted_by?: string | null
          submitted_by_email?: string | null
          ip_address?: string | null
          is_approved?: boolean
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          category?: string
          model_type?: string[]
          url?: string
          logo?: string | null
          pricing?: string
          tags?: string[]
          submitted_by?: string | null
          submitted_by_email?: string | null
          ip_address?: string | null
          is_approved?: boolean
          is_active?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']
