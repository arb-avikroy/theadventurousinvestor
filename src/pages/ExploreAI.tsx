import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Users, Folder, FileText, Bot, Sparkles, Loader2, ExternalLinkIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { aiProjects } from "@/data/projects";
import { motion } from "framer-motion";
import { useAIProjectsByCategories } from "@/hooks/useAIProjects";

const ExploreAI = () => {
  const { language } = useLanguage();
  const { data: dbData, isLoading } = useAIProjectsByCategories();

  // Use database data if available, otherwise use fallback
  const community = dbData?.community && dbData.community.length > 0
    ? dbData.community
    : aiProjects.community.map(item => ({
      id: item.id,
      name_en: item.name.en,
      name_hi: item.name.hi,
      description_en: item.description.en,
      description_hi: item.description.hi,
      link: item.link,
      type: item.type,
    }));

  const projects = dbData?.projects && dbData.projects.length > 0
    ? dbData.projects
    : aiProjects.projects.map(item => ({
      id: item.id,
      name_en: item.name.en,
      name_hi: item.name.hi,
      description_en: item.description.en,
      description_hi: item.description.hi,
      status: item.status,
      tech: item.tech,
      github_Url: item.github_Url,
      live_Url: item.live_Url,
    }));

  const articles = dbData?.articles && dbData.articles.length > 0
    ? dbData.articles
    : aiProjects.articles.map(item => ({
      id: item.id,
      name_en: item.title.en,
      name_hi: item.title.hi,
      description_en: item.excerpt.en,
      description_hi: item.excerpt.hi,
      read_time: item.readTime,
      publish_date: item.date,
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
            <Link to="/#lab">
              <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "hi" ? "होम पर वापस जाएं" : "Back to Home"}
              </Button>
            </Link>

            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Bot className="h-10 w-10 text-primary" />
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {language === "hi" ? "AI प्रोजेक्ट्स खोजें" : "Explore AI Projects"}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {language === "hi"
                  ? "AI और मशीन लर्निंग में मेरे प्रयोग, कस्टम GPTs, और ऑटोमेशन प्रोजेक्ट्स देखें।"
                  : "Discover my experiments in AI and machine learning, custom GPTs, and automation projects."}
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {/* Community Section - Custom GPTs */}
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">
                      {language === "hi" ? "कम्युनिटी - कस्टम GPTs" : "Community - Custom GPTs"}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {community.map((item, index) => (
                      <GlassCard key={item.id} hoverable delay={index * 0.1} className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-primary font-semibold text-lg">
                            {language === "hi" ? item.name_hi : item.name_en}
                          </h3>
                          {item.type && (
                            <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full">
                              {item.type}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          {language === "hi" ? item.description_hi : item.description_en}
                        </p>
                        {item.link && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-primary/40 text-primary hover:bg-primary/10"
                            asChild
                          >
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="mr-2 h-4 w-4" />
                              {language === "hi" ? "आज़माएं" : "Try It"}
                            </a>
                          </Button>
                        )}
                      </GlassCard>
                    ))}
                  </div>
                </div>

                {/* Projects Section */}
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-6">
                    <Folder className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">
                      {language === "hi" ? "प्रोजेक्ट्स" : "Projects"}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                      <GlassCard key={project.id} hoverable delay={index * 0.1} className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-primary font-semibold text-lg">
                            {language === "hi" ? project.name_hi : project.name_en}
                          </h3>
                          {project.status && (
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${project.status === "Active"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                                }`}
                            >
                              {project.status}
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mb-4">
                          {language === "hi" ? project.description_hi : project.description_en}
                        </p>
                        {project.tech && (
                          <div className="flex flex-wrap gap-1">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="px-2 py-0.5 bg-secondary text-xs text-foreground rounded"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="mt-4 flex items-center gap-6">
                          {project.live_url && (
                            <Button asChild className="rounded-full bg-[#D1A67F] text-black hover:bg-[#c4956a] h-10">
                              <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                                <ExternalLinkIcon className="mr-2 h-4 w-4" />
                                {language === "hi" ? "लाइव डेमो" : "Live Demo"}
                              </a>
                            </Button>
                          )}

                          {project.github_url && (
                            <Button
                              asChild
                              className="rounded-none bg-slate-600 text-white hover:bg-slate-700 h-10 px-4"
                            >
                              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                {language === "hi" ? "गिट कोड" : "Git Code"}
                              </a>
                            </Button>
                          )}
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                </div>

                {/* Articles Section */}
                <div>
                  {/* <div className="flex items-center gap-3 mb-6">
                    <FileText className="h-6 w-6 text-primary" />
                    <h2 className="text-2xl font-bold text-foreground">
                      {language === "hi" ? "लेख" : "Articles"}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {articles.map((article, index) => (
                      <GlassCard key={article.id} hoverable delay={index * 0.1} className="p-6">
                        <h3 className="text-primary font-semibold text-lg mb-2">
                          {language === "hi" ? article.name_hi : article.name_en}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4">
                          {language === "hi" ? article.description_hi : article.description_en}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          {article.read_time && <span>📖 {article.read_time}</span>}
                          {article.publish_date && <span>📅 {article.publish_date}</span>}
                        </div>
                      </GlassCard>
                    ))}
                  </div> */}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ExploreAI;
