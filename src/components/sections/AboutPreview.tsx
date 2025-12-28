import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const AboutPreview = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          handwritten={t("about.handwritten")}
          title={t("about.title")}
        />

        <GlassCard className="p-8 md:p-10">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              {t("about.paragraph1")} <span className="text-foreground font-medium">{t("about.multidisciplinary")}</span> {t("about.paragraph1End")}
            </p>
            <p>
              {t("about.paragraph2")} <span className="text-primary">{t("about.sapFiori")}</span>,{" "}
              <span className="text-primary">{t("about.sapAbap")}</span>{t("about.paragraph2End")}
            </p>
            <p>
              <span className="font-caveat text-xl text-primary">{t("about.brandName")}</span> {t("about.paragraph3")} {t("about.author")}
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
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {t("about.connect")}
            </Button>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
};
