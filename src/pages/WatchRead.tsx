import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Play, BookOpen, Clock, Eye, Calendar, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { contentData } from "@/data/projects";
import { motion } from "framer-motion";

const WatchRead = () => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState("videos");

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
                <TabsTrigger value="videos" className="flex items-center gap-2">
                  <Play className="h-4 w-4" />
                  {language === "hi" ? "यूट्यूब वीडियो" : "YouTube Videos"}
                </TabsTrigger>
                <TabsTrigger value="blogs" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  {language === "hi" ? "ब्लॉग" : "Blogs"}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="videos">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contentData.videos.map((video, index) => (
                    <GlassCard key={video.id} hoverable delay={index * 0.1} className="overflow-hidden">
                      <div className="relative">
                        <img
                          src={video.thumbnail}
                          alt={video.title[language]}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
                            <Play className="h-8 w-8 text-primary-foreground ml-1" />
                          </div>
                        </div>
                        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="text-primary font-semibold text-lg mb-2">
                          {video.title[language]}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {video.description[language]}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {video.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {video.date}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-primary/40 text-primary hover:bg-primary/10"
                            asChild
                          >
                            <a href={video.youtubeUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-1 h-3 w-3" />
                              {language === "hi" ? "देखें" : "Watch"}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </GlassCard>
                  ))}
                </div>

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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contentData.blogs.map((blog, index) => (
                    <GlassCard key={blog.id} hoverable delay={index * 0.1} className="p-6">
                      <h3 className="text-primary font-semibold text-lg mb-2">
                        {blog.title[language]}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4">
                        {blog.excerpt[language]}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag) => (
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
                            {blog.readTime}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {blog.date}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:bg-primary/10"
                        >
                          {language === "hi" ? "पढ़ें" : "Read"}
                        </Button>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default WatchRead;
