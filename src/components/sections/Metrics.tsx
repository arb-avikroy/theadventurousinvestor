import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

export const Metrics = () => {
  const { t } = useLanguage();

  const metricsData = [
    { value: "10+", label: t("metrics.projects") },
    { value: "50+", label: t("metrics.automations") },
    { value: "2", label: t("metrics.certifications") },
    { value: "∞", label: t("metrics.ideas") },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          handwritten={t("metrics.handwritten")}
          title={t("metrics.title")}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {metricsData.map((metric, index) => (
            <GlassCard
              key={metric.label}
              delay={index * 0.1}
              className="p-6 text-center"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
                className="font-caveat text-4xl md:text-5xl text-primary block"
              >
                {metric.value}
              </motion.span>
              <span className="text-muted-foreground text-sm mt-2 block">
                {metric.label}
              </span>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
