import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTechStack } from "@/hooks/useTechStack";
import { Loader2 } from "lucide-react";

// Fallback data
const fallbackTechStack = [
  { id: "1", icon: "⚙️", label: "SAP UI5/ABAP" },
  { id: "2", icon: "📦", label: "Node.js" },
  { id: "3", icon: "🍃", label: "MongoDB" },
  { id: "4", icon: "📊", label: "Power BI" },
  { id: "5", icon: "🔗", label: "n8n" },
  { id: "6", icon: "🎨", label: "Canva" },
  { id: "7", icon: "🤖", label: "LLMs" },
  { id: "8", icon: "💼", label: "M365" },
];

export const TechStack = () => {
  const { t } = useLanguage();
  const { data: dbTechStack, isLoading } = useTechStack();
  
  const techStackData = dbTechStack && dbTechStack.length > 0 ? dbTechStack : fallbackTechStack;

  return (
    <section className="py-20 px-4 bg-secondary/50">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          handwritten={t("techStack.handwritten")}
          title={t("techStack.title")}
        />

        <GlassCard className="p-8">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {techStackData.map((tech, index) => (
                <motion.div
                  key={tech.id || tech.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center p-4 rounded-xl hover:bg-glass-hover transition-colors cursor-default"
                >
                  <span className="text-4xl mb-2">{tech.icon}</span>
                  <span className="text-sm text-muted-foreground">{tech.label}</span>
                </motion.div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  );
};
