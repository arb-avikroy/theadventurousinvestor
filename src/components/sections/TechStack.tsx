import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const techStackData = [
  { icon: "⚙️", label: "SAP UI5/ABAP" },
  { icon: "📦", label: "Node.js" },
  { icon: "🍃", label: "MongoDB" },
  { icon: "📊", label: "Power BI" },
  { icon: "🔗", label: "n8n" },
  { icon: "🎨", label: "Canva" },
  { icon: "🤖", label: "LLMs" },
  { icon: "💼", label: "M365" },
];

export const TechStack = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-4 bg-secondary/50">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          handwritten={t("techStack.handwritten")}
          title={t("techStack.title")}
        />

        <GlassCard className="p-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {techStackData.map((tech, index) => (
              <motion.div
                key={tech.label}
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
        </GlassCard>
      </div>
    </section>
  );
};
