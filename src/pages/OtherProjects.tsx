import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { otherProjects } from "@/data/projects";
import { motion } from "framer-motion";

const OtherProjects = () => {
  const { language, t } = useLanguage();

  const statusColors = {
    completed: "bg-green-500/20 text-green-400 border-green-500/30",
    "in-progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    "coming-soon": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };

  const statusText = {
    completed: { en: "Completed", hi: "पूर्ण" },
    "in-progress": { en: "In Progress", hi: "प्रगति में" },
    "coming-soon": { en: "Coming Soon", hi: "जल्द आ रहा है" },
  };

  return (
    <Layout>
      <section className="py-24 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/#projects">
              <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "hi" ? "होम पर वापस जाएं" : "Back to Home"}
              </Button>
            </Link>

            <SectionHeader
              handwritten={language === "hi" ? "और भी..." : "more..."}
              title={language === "hi" ? "अन्य प्रोजेक्ट्स" : "Other Projects"}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <GlassCard
                  key={project.id}
                  hoverable
                  delay={index * 0.1}
                  className="p-6 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-primary font-semibold text-xl">
                      {project.title[language]}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs border ${statusColors[project.status]}`}
                    >
                      {statusText[project.status][language]}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {project.description[language]}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>

                  <Link to={`/projects/${project.slug}`}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-primary/40 text-primary hover:bg-primary/10"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {language === "hi" ? "विवरण देखें" : "View Details"}
                    </Button>
                  </Link>
                </GlassCard>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-12"
            >
              <p className="text-muted-foreground mb-4">
                {language === "hi" 
                  ? "और प्रोजेक्ट्स जल्द ही जोड़े जाएंगे!"
                  : "More projects coming soon!"}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default OtherProjects;
