import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const projectsDataEn = [
  {
    id: 1,
    title: "SAPUI5 Bulk Excel Upload (Soon will be uploaded)",
    description:
      "Enterprise application enabling bulk Excel uploads with real-time validation, OData integration, and smart error handling for large-scale data processing.",
    tags: ["SAPUI5", "OData", "Excel", "Enterprise"],
    link: "#",
  },
  {
    id: 2,
    title: "AI Video Generation Pipeline (Soon will be uploaded)",
    description:
      "Automated content pipeline using multiple LLMs for script generation, voice synthesis, and video assembly—from idea to published video.",
    tags: ["AI", "Automation", "Video", "LLM"],
    link: "#",
  },
  {
    id: 3,
    title: "n8n Content Automation (Soon will be uploaded)",
    description:
      "Workflow automation system that orchestrates content creation, scheduling, and distribution across multiple platforms with AI-powered enhancements.",
    tags: ["n8n", "Workflow", "LLM", "Automation"],
    link: "#",
  },
  {
    id: 4,
    title: "Fiori + Node.js Full-Stack (Soon will be uploaded)",
    description:
      "Modern full-stack application combining SAP Fiori frontend with Node.js backend, MongoDB database, and RESTful API architecture.",
    tags: ["SAP Fiori", "Node.js", "REST API", "MongoDB"],
    link: "#",
  },
];

const projectsDataHi = [
  {
    id: 1,
    title: "SAPUI5 बल्क Excel अपलोड",
    description:
      "बड़े पैमाने पर डेटा प्रोसेसिंग के लिए रियल-टाइम वैलिडेशन, OData इंटीग्रेशन और स्मार्ट एरर हैंडलिंग के साथ एंटरप्राइज एप्लीकेशन।",
    tags: ["SAPUI5", "OData", "Excel", "Enterprise"],
    link: "#",
  },
  {
    id: 2,
    title: "AI वीडियो जेनरेशन पाइपलाइन",
    description:
      "स्क्रिप्ट जेनरेशन, वॉइस सिंथेसिस और वीडियो असेंबली के लिए मल्टीपल LLMs का उपयोग करने वाली ऑटोमेटेड कंटेंट पाइपलाइन।",
    tags: ["AI", "Automation", "Video", "LLM"],
    link: "#",
  },
  {
    id: 3,
    title: "n8n कंटेंट ऑटोमेशन",
    description:
      "AI-पावर्ड एन्हांसमेंट के साथ मल्टीपल प्लेटफॉर्म्स पर कंटेंट क्रिएशन, शेड्यूलिंग और डिस्ट्रीब्यूशन को ऑर्केस्ट्रेट करने वाला वर्कफ़्लो ऑटोमेशन सिस्टम।",
    tags: ["n8n", "Workflow", "LLM", "Automation"],
    link: "#",
  },
  {
    id: 4,
    title: "Fiori + Node.js फुल-स्टैक",
    description:
      "SAP Fiori फ्रंटएंड को Node.js बैकएंड, MongoDB डेटाबेस और RESTful API आर्किटेक्चर के साथ जोड़ने वाला मॉडर्न फुल-स्टैक एप्लीकेशन।",
    tags: ["SAP Fiori", "Node.js", "REST API", "MongoDB"],
    link: "#",
  },
];

export const FeaturedProjects = () => {
  const { t, language } = useLanguage();
  const projectsData = language === "hi" ? projectsDataHi : projectsDataEn;

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          handwritten={t("projects.handwritten")}
          title={t("projects.title")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, index) => (
            <GlassCard
              key={project.id}
              hoverable
              delay={index * 0.1}
              className="p-6 group"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-primary font-semibold text-xl mb-3">
                  {project.title}
                </h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
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
