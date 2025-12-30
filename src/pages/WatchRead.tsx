import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, BookOpen, Clock, Calendar, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { contentData } from "@/data/projects";
import { motion } from "framer-motion";
import { useVideos } from "@/hooks/useVideos";
import { useBlogs } from "@/hooks/useBlogs";

const WatchRead = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("blogs");
  const { data: dbVideos, isLoading: videosLoading } = useVideos();
  const { data: dbBlogs, isLoading: blogsLoading } = useBlogs();

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
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
                <TabsTrigger value="blogs" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {language === "hi" ? "ब्लॉग" : "Blogs"}
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
                {blogsLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog, index) => (
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
            </Tabs>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default WatchRead;
