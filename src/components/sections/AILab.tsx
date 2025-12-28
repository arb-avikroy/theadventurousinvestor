import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Sparkles, Bot } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const AILab = () => {
  const { t } = useLanguage();

  return (
    <section id="lab" className="py-20 px-4 bg-secondary/50">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          handwritten={t("lab.handwritten")}
          title={t("lab.title")}
        />

        <GlassCard className="p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Bot className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold text-primary">{t("lab.subtitle")}</h3>
          </div>
          
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              {t("lab.paragraph1")} <span className="text-foreground">{t("lab.customGPTs")}</span> {t("lab.paragraph1End")}
            </p>
            <p>
              {t("lab.paragraph2")} <span className="text-primary">{t("lab.multiModel")}</span>{t("lab.paragraph2End")}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-8"
          >
            <Button
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {t("lab.explore")}
            </Button>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
};
