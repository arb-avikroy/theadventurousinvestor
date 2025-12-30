import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, BookOpen, Clock, Calendar, Loader2, Bookmark, BookmarkX, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { contentData } from "@/data/projects";
import { motion } from "framer-motion";
import { useVideos } from "@/hooks/useVideos";
import { useBlogs } from "@/hooks/useBlogs";
import { useBookmarkedBlogs } from "@/hooks/useBookmarkedBlogs";

const WatchRead = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("blogs");
  
  // ===== ADD THESE TWO NEW STATE VARIABLES =====
  const [selectedBlogTags, setSelectedBlogTags] = useState([]);
  const [selectedSavedTags, setSelectedSavedTags] = useState([]);
  // =============================================
  
  const { data: dbVideos, isLoading: videosLoading } = useVideos();
  const { data: dbBlogs, isLoading: blogsLoading } = useBlogs();
  const { data: bookmarkedBlogs, isLoading: savedLoading, removeBookmark } = useBookmarkedBlogs();

  // Use database data if available, otherwise use fallback
  const videos = dbVideos && dbVideos.length > 0 ? dbVideos : contentData.videos.map(v => ({
    id: v.id,
    youtube_id: v.id,
    title_en: v.title.en,
    title_hi: v.title.hi,
    description_en: v.description.en,
    description_hi: v.description.hi,
    duration: v.duration,
    views: v.views,
    publish_date: v.date,
  }));

  const blogs = dbBlogs && dbBlogs.length > 0 ? dbBlogs : contentData.blogs.map(b => ({
    id: b.id,
    slug: b.id,
    title_en: b.title.en,
    title_hi: b.title.hi,
    excerpt_en: b.excerpt.en,
    excerpt_hi: b.excerpt.hi,
    read_time: b.readTime,
    publish_date: b.date,
    tags: b.tags,
  }));

  // ===== ADD THESE HELPER FUNCTIONS =====
  // Extract unique tags from blogs
  const allBlogTags = useMemo(() => {
    const tags = blogs.flatMap(blog => blog.tags || []);
    return [...new Set(tags)].sort();
  }, [blogs]);

  // Extract unique tags from saved articles
  const allSavedTags = useMemo(() => {
    const tags = bookmarkedBlogs.flatMap(blog => blog.tags || []);
    return [...new Set(tags)].sort();
  }, [bookmarkedBlogs]);

  // Toggle tag for blogs
  const toggleBlogTag = (tag) => {
    setSelectedBlogTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Toggle tag for saved articles
  const toggleSavedTag = (tag) => {
    setSelectedSavedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  // Filter blogs based on selected tags
  const filteredBlogs = useMemo(() => {
    if (selectedBlogTags.length === 0) return blogs;
    return blogs.filter(blog => 
      selectedBlogTags.every(tag => blog.tags?.includes(tag))
    );
  }, [blogs, selectedBlogTags]);

  // Filter saved articles based on selected tags
  const filteredSavedBlogs = useMemo(() => {
    if (selectedSavedTags.length === 0) return bookmarkedBlogs;
    return bookmarkedBlogs.filter(blog => 
      selectedSavedTags.every(tag => blog.tags?.includes(tag))
    );
  }, [bookmarkedBlogs, selectedSavedTags]);
  // ======================================

  return (
    <Layout>
      <section className="py-24 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/#content">
              <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "hi" ? "होम पर वापस जाएं" : "Back to Home"}
              </Button>
            </Link>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {language === "hi" ? "देखें और पढ़ें" : "Watch & Read More"}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {language === "hi"
                  ? "वीडियो ट्यूटोरियल, ब्लॉग पोस्ट और एजुकेशनल कंटेंट का संग्रह।"
                  : "A collection of video tutorials, blog posts, and educational content."}
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full max-w-xl mx-auto grid-cols-3 mb-8">
                <TabsTrigger value="blogs" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {language === "hi" ? "ब्लॉग" : "Blogs"}
                </TabsTrigger>
                <TabsTrigger value="saved" className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4" />
                  {language === "hi" ? "सेव किए गए" : "Saved Articles"}
                </TabsTrigger>
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  {language === "hi" ? "यूट्यूब वीडियो" : "YouTube Videos"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="videos">
                {videosLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videos.map((video) => (
                      <GlassCard key={video.id} className="overflow-hidden">
                        <div className="player-wrapper">
                          <iframe
                            width="100%"
                            height="315"
                            src={`https://www.youtube.com/embed/${video.youtube_id}?rel=0&autoplay=1&mute=1&origin=${window.location.origin}`}
                            title={language === "hi" ? video.title_hi : video.title_en}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                            className="w-full rounded-lg"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="text-primary font-semibold text-lg mb-2">
                            {language === "hi" ? video.title_hi : video.title_en}
                          </h3>
                          <div className="flex items-center justify-end">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <p>Uploaded On</p>{video.publish_date}
                            </span>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-center mt-10"
                >
                  <Button
                    variant="outline"
                    className="border-primary/40 text-primary hover:bg-primary/10"
                    asChild
                  >
                    <a
                      href="https://www.youtube.com/@theadventurousinvestor"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Play className="mr-2 h-4 w-4" />
                      {language === "hi" ? "यूट्यूब चैनल पर जाएं" : "Visit YouTube Channel"}
                    </a>
                  </Button>
                </motion.div>
              </TabsContent>

              <TabsContent value="blogs">
                {/* ===== ADD THIS TAG FILTER SECTION ===== */}
                {allBlogTags.length > 0 && (
                  <GlassCard className="p-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-foreground">
                        {language === "hi" ? "टैग के आधार पर फ़िल्टर करें" : "Filter by Tags"}
                      </h3>
                      {selectedBlogTags.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedBlogTags([])}
                          className="text-xs text-primary hover:text-primary/80 h-auto p-1"
                        >
                          <X className="h-3 w-3 mr-1" />
                          {language === "hi" ? "सभी साफ़ करें" : "Clear All"}
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {allBlogTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleBlogTag(tag)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                            selectedBlogTags.includes(tag)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {selectedBlogTags.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          {language === "hi" 
                            ? `${filteredBlogs.length} लेख मिले` 
                            : `Showing ${filteredBlogs.length} ${filteredBlogs.length === 1 ? 'article' : 'articles'}`}
                        </p>
                      </div>
                    )}
                  </GlassCard>
                )}
                {/* ======================================= */}

                {blogsLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : filteredBlogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <BookOpen className="h-16 w-16 text-muted-foreground/40 mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {language === "hi" ? "कोई लेख नहीं मिला" : "No articles found"}
                    </h3>
                    <p className="text-muted-foreground max-w-md mb-6">
                      {language === "hi"
                        ? "चयनित फ़िल्टर से मेल खाने वाला कोई लेख नहीं है।"
                        : "No articles match the selected filters."}
                    </p>
                    <Button
                      variant="outline"
                      className="border-primary/40 text-primary hover:bg-primary/10"
                      onClick={() => setSelectedBlogTags([])}
                    >
                      {language === "hi" ? "फ़िल्टर साफ़ करें" : "Clear Filters"}
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* ===== CHANGE blogs.map TO filteredBlogs.map ===== */}
                    {filteredBlogs.map((blog, index) => (
                      <GlassCard key={blog.id} hoverable delay={index * 0.1} className="p-6">
                        <h3 className="text-primary font-semibold text-lg mb-2">
                          {language === "hi" ? blog.title_hi : blog.title_en}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {language === "hi" ? blog.excerpt_hi : blog.excerpt_en}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-secondary text-xs text-foreground rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {blog.read_time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {blog.publish_date}
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:bg-primary/10"
                          >
                            <Link to={`/blog/${blog.slug}`}>
                              {language === "hi" ? "पढ़ें" : "Read"}
                            </Link>
                          </Button>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="saved">
                <p><center>{language === "hi" ? "ध्यान दें: इस साइट पर लॉगिन की आवश्यकता नहीं है, इसलिए बुकमार्क आपके आईपी पते के आधार पर सहेजे जाते हैं। यदि आप यात्रा के दौरान लेख पढ़ने की योजना बना रहे हैं, तो बुकमार्क को सहेजने और लगातार एक्सेस करने के लिए मोबाइल नेटवर्क का उपयोग करें।" : "Note: This site does not require login, so bookmarks are saved based on your IP address. If you plan to read articles while travelling, use a mobile network to save and access your bookmarks consistently."}
                </center></p>
                
                {/* ===== ADD THIS TAG FILTER SECTION FOR SAVED ARTICLES ===== */}
                {!savedLoading && bookmarkedBlogs.length > 0 && allSavedTags.length > 0 && (
                  <GlassCard className="p-4 mb-6 mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-foreground">
                        {language === "hi" ? "टैग के आधार पर फ़िल्टर करें" : "Filter by Tags"}
                      </h3>
                      {selectedSavedTags.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedSavedTags([])}
                          className="text-xs text-primary hover:text-primary/80 h-auto p-1"
                        >
                          <X className="h-3 w-3 mr-1" />
                          {language === "hi" ? "सभी साफ़ करें" : "Clear All"}
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {allSavedTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleSavedTag(tag)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                            selectedSavedTags.includes(tag)
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>

                    {selectedSavedTags.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-xs text-muted-foreground">
                          {language === "hi" 
                            ? `${filteredSavedBlogs.length} लेख मिले` 
                            : `Showing ${filteredSavedBlogs.length} ${filteredSavedBlogs.length === 1 ? 'article' : 'articles'}`}
                        </p>
                      </div>
                    )}
                  </GlassCard>
                )}
                {/* ========================================================= */}

                {savedLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : bookmarkedBlogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Bookmark className="h-16 w-16 text-muted-foreground/40 mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {language === "hi" ? "अभी तक कोई सेव किए गए लेख नहीं" : "No saved articles yet"}
                    </h3>
                    <p className="text-muted-foreground max-w-md mb-6">
                      {language === "hi"
                        ? "ब्लॉग टैब से लेखों को बुकमार्क करें ताकि उन्हें यहां देख सकें।"
                        : "Bookmark articles from the Blogs tab to see them here."}
                    </p>
                    <Button
                      variant="outline"
                      className="border-primary/40 text-primary hover:bg-primary/10"
                      onClick={() => setActiveTab("blogs")}
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      {language === "hi" ? "ब्लॉग ब्राउज़ करें" : "Browse Blogs"}
                    </Button>
                  </div>
                ) : filteredSavedBlogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <Bookmark className="h-16 w-16 text-muted-foreground/40 mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {language === "hi" ? "कोई लेख नहीं मिला" : "No articles found"}
                    </h3>
                    <p className="text-muted-foreground max-w-md mb-6">
                      {language === "hi"
                        ? "चयनित फ़िल्टर से मेल खाने वाला कोई सहेजा गया लेख नहीं है।"
                        : "No saved articles match the selected filters."}
                    </p>
                    <Button
                      variant="outline"
                      className="border-primary/40 text-primary hover:bg-primary/10"
                      onClick={() => setSelectedSavedTags([])}
                    >
                      {language === "hi" ? "फ़िल्टर साफ़ करें" : "Clear Filters"}
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* ===== CHANGE bookmarkedBlogs.map TO filteredSavedBlogs.map ===== */}
                    {filteredSavedBlogs.map((blog, index) => (
                      <GlassCard key={blog.id} hoverable delay={index * 0.1} className="p-6">
                        <h3 className="text-primary font-semibold text-lg mb-2">
                          {language === "hi" ? blog.title_hi : blog.title_en}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {language === "hi" ? blog.excerpt_hi : blog.excerpt_en}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {blog.tags?.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-secondary text-xs text-foreground rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                          <Bookmark className="h-3 w-3 text-primary" />
                          <span>
                            {language === "hi" ? "सेव किया गया:" : "Saved:"}{" "}
                            {new Date(blog.bookmarked_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {blog.read_time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {blog.publish_date}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => removeBookmark(blog.id)}
                            >
                              <BookmarkX className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:bg-primary/10"
                            >
                              <Link to={`/blog/${blog.slug}`}>
                                {language === "hi" ? "पढ़ें" : "Read"}
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default WatchRead;