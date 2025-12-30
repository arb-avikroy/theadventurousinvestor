import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, FolderOpen, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { useProjects } from "@/hooks/useProjects";

// Fallback data for when database is empty
const fallbackProjectsEn = [
  {
    id: "1",
    slug: "sapui5-bulk-upload",
    title_en: "SAPUI5 Bulk Excel Upload (Soon will be uploaded)",
    title_hi: "SAPUI5 बल्क Excel अपलोड",
    description_en: "Enterprise application enabling bulk Excel uploads with real-time validation, OData integration, and smart error handling for large-scale data processing.",
    description_hi: "बड़े पैमाने पर डेटा प्रोसेसिंग के लिए रियल-टाइम वैलिडेशन, OData इंटीग्रेशन और स्मार्ट एरर हैंडलिंग के साथ एंटरप्राइज एप्लीकेशन।",
    tags: ["SAPUI5", "OData", "Excel", "Enterprise"],
    is_featured: true,
  },
  {
    id: "2",
    slug: "ai-video-pipeline",
    title_en: "AI Video Generation Pipeline (Soon will be uploaded)",
    title_hi: "AI वीडियो जेनरेशन पाइपलाइन",
    description_en: "Automated content pipeline using multiple LLMs for script generation, voice synthesis, and video assembly—from idea to published video.",
    description_hi: "स्क्रिप्ट जेनरेशन, वॉइस सिंथेसिस और वीडियो असेंबली के लिए मल्टीपल LLMs का उपयोग करने वाली ऑटोमेटेड कंटेंट पाइपलाइन।",
    tags: ["AI", "Automation", "Video", "LLM"],
    is_featured: true,
  },
  {
    id: "3",
    slug: "n8n-content-automation",
    title_en: "n8n Content Automation (Soon will be uploaded)",
    title_hi: "n8n कंटेंट ऑटोमेशन",
    description_en: "Workflow automation system that orchestrates content creation, scheduling, and distribution across multiple platforms with AI-powered enhancements.",
    description_hi: "AI-पावर्ड एन्हांसमेंट के साथ मल्टीपल प्लेटफॉर्म्स पर कंटेंट क्रिएशन, शेड्यूलिंग और डिस्ट्रीब्यूशन को ऑर्केस्ट्रेट करने वाला वर्कफ़्लो ऑटोमेशन सिस्टम।",
    tags: ["n8n", "Workflow", "LLM", "Automation"],
    is_featured: true,
  },
  {
    id: "4",
    slug: "fiori-nodejs-fullstack",
    title_en: "Fiori + Node.js Full-Stack (Soon will be uploaded)",
    title_hi: "Fiori + Node.js फुल-स्टैक",
    description_en: "Modern full-stack application combining SAP Fiori frontend with Node.js backend, MongoDB database, and RESTful API architecture.",
    description_hi: "SAP Fiori फ्रंटएंड को Node.js बैकएंड, MongoDB डेटाबेस और RESTful API आर्किटेक्चर के साथ जोड़ने वाला मॉडर्न फुल-स्टैक एप्लीकेशन।",
    tags: ["SAP Fiori", "Node.js", "REST API", "MongoDB"],
    is_featured: true,
  },
];

export const FeaturedProjects = () => {
  const { t, language } = useLanguage();
  const { data: dbProjects, isLoading } = useProjects(true);
  
  // Use database projects if available, otherwise use fallback
  const projects = dbProjects && dbProjects.length > 0 ? dbProjects : fallbackProjectsEn;

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          handwritten={t("projects.handwritten")}
          title={t("projects.title")}
        />

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <GlassCard
                key={project.id}
                hoverable
                delay={index * 0.1}
                className="p-6 group"
              >
                <div className="flex items-start justify-between">
                  <h3 className="text-primary font-semibold text-xl mb-3">
                    {language === "hi" ? project.title_hi : project.title_en}
                  </h3>
                  <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {language === "hi" ? project.description_hi : project.description_en}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          <Link to="/other-projects">
            <Button
              variant="outline"
              className="border-primary/40 text-primary hover:bg-primary/10"
            >
              <FolderOpen className="mr-2 h-4 w-4" />
              {t("projects.otherProjects")}
            </Button>
          </Link>
          <Button
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/10"
            asChild
          >
            <a href="https://github.com/arb-avikroy" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              {t("projects.viewAll")}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
