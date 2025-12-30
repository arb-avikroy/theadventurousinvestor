import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useUserIP } from "./useBookmarks";

interface BookmarkedBlog {
  id: string;
  slug: string;
  title_en: string;
  title_hi: string;
  excerpt_en: string | null;
  excerpt_hi: string | null;
  read_time: string | null;
  publish_date: string | null;
  tags: string[] | null;
  bookmarked_at: string;
}

export const useBookmarkedBlogs = () => {
  const userIP = useUserIP();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookmarked-blogs", userIP],
    queryFn: async (): Promise<BookmarkedBlog[]> => {
      if (!userIP) return [];

      // Get all blog bookmarks for this IP
      const { data: bookmarks, error: bookmarkError } = await supabase
        .from("user_bookmarks")
        .select("content_id, created_at")
        .eq("ip_address", userIP)
        .eq("content_type", "blog");

      if (bookmarkError) throw bookmarkError;
      if (!bookmarks || bookmarks.length === 0) return [];

      // Get all blog IDs
      const blogIds = bookmarks.map((b) => b.content_id);

      // Fetch full blog details
      const { data: blogs, error: blogsError } = await supabase
        .from("content_blogs")
        .select("*")
        .in("id", blogIds);

      if (blogsError) throw blogsError;
      if (!blogs) return [];

      // Merge bookmark created_at with blog data
      return blogs.map((blog) => {
        const bookmark = bookmarks.find((b) => b.content_id === blog.id);
        return {
          id: blog.id,
          slug: blog.slug,
          title_en: blog.title_en,
          title_hi: blog.title_hi,
          excerpt_en: blog.excerpt_en,
          excerpt_hi: blog.excerpt_hi,
          read_time: blog.read_time,
          publish_date: blog.publish_date,
          tags: blog.tags,
          bookmarked_at: bookmark?.created_at || "",
        };
      });
    },
    enabled: !!userIP,
  });

  const removeBookmark = async (blogId: string) => {
    if (!userIP) return;

    await supabase
      .from("user_bookmarks")
      .delete()
      .eq("ip_address", userIP)
      .eq("content_type", "blog")
      .eq("content_id", blogId);

    // Invalidate queries to refresh data
    queryClient.invalidateQueries({ queryKey: ["bookmarked-blogs"] });
    queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    queryClient.invalidateQueries({ queryKey: ["isBookmarked", "blog", blogId] });
  };

  return { data: data || [], isLoading, error, removeBookmark, userIP };
};
