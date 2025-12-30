import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Zap, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSkills } from "@/hooks/useSkills";

// Fallback data
const fallbackSkillsEn = [
  { id: "1", category: "SAP & Enterprise", items: ["SAP Fiori Developer (Certified)", "SAP Build Developer (Certified)", "SAPUI5 / Fiori Elements", "OData Integration", "Process Automation"] },
  { id: "2", category: "Backend & Databases", items: ["Node.js / Express", "MongoDB / SQL", "REST API Design", "Cloud Services", "SAP ABAP"] },
  { id: "3", category: "Automation & AI", items: ["n8n Workflows", "LLM Integration", "Custom GPTs", "Prompt Engineering", "AI Pipelines"] },
  { id: "4", category: "Data & Analytics", items: ["Power BI", "Data Visualization", "Excel Automation", "Report Building", "Business Intelligence"] },
  { id: "5", category: "Content & Video", items: ["Video Production", "Canva Design", "AI Video Generation", "Technical Writing", "Storytelling"] },
  { id: "6", category: "Tools & Platforms", items: ["Microsoft 365", "GitHub / Git", "VS Code", "Figma", "Cloud Platforms"] },
];

const fallbackSkillsHi = [
  { id: "1", category: "SAP और एंटरप्राइज", items: ["SAP Fiori डेवलपर (प्रमाणित)", "SAP Build डेवलपर (प्रमाणित)", "SAPUI5 / Fiori Elements", "OData इंटीग्रेशन", "प्रोसेस ऑटोमेशन"] },
  { id: "2", category: "बैकएंड और डेटाबेस", items: ["Node.js / Express", "MongoDB / SQL", "REST API डिज़ाइन", "क्लाउड सर्विसेज", "SAP ABAP"] },
  { id: "3", category: "ऑटोमेशन और AI", items: ["n8n वर्कफ़्लो", "LLM इंटीग्रेशन", "कस्टम GPTs", "प्रॉम्प्ट इंजीनियरिंग", "AI पाइपलाइन्स"] },
  { id: "4", category: "डेटा और एनालिटिक्स", items: ["Power BI", "डेटा विज़ुअलाइज़ेशन", "Excel ऑटोमेशन", "रिपोर्ट बिल्डिंग", "बिज़नेस इंटेलिजेंस"] },
  { id: "5", category: "कंटेंट और वीडियो", items: ["वीडियो प्रोडक्शन", "Canva डिज़ाइन", "AI वीडियो जेनरेशन", "टेक्निकल राइटिंग", "स्टोरीटेलिंग"] },
  { id: "6", category: "टूल्स और प्लेटफॉर्म्स", items: ["Microsoft 365", "GitHub / Git", "VS Code", "Figma", "क्लाउड प्लेटफॉर्म्स"] },
];

export const SkillsSnapshot = () => {
  const { t, language } = useLanguage();
  const { data: dbSkills, isLoading } = useSkills();
  
  // Use database skills if available, otherwise use fallback
  const fallbackData = language === "hi" ? fallbackSkillsHi : fallbackSkillsEn;
  const skillsData = dbSkills && dbSkills.length > 0 ? dbSkills : fallbackData;

  return (
    <section id="skills" className="py-20 px-4 bg-secondary/50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          handwritten={t("skills.handwritten")}
          title={t("skills.title")}
        />

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillsData.map((skill, index) => (
              <GlassCard
                key={skill.id || skill.category}
                hoverable
                delay={index * 0.1}
                className="p-6"
              >
                <h3 className="text-primary font-semibold text-lg mb-4">
                  {skill.category}
                </h3>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="text-muted-foreground text-sm flex items-start">
                      <span className="text-primary mr-2 font-bold">×</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/10"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          >
            <Zap className="mr-2 h-4 w-4" />
            {t("skills.seeInAction")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
