import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { contentData } from "@/data/content";
import { Play } from "lucide-react";

export const ContentEcosystem = () => {
  return (
    <section id="content" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          handwritten="content universe"
          title="The Adventurous Investor"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contentData.map((content, index) => (
            <GlassCard
              key={content.title}
              hoverable
              delay={index * 0.1}
              className="p-6"
            >
              <div className="text-5xl mb-4">{content.icon}</div>
              <h3 className="text-primary font-semibold text-lg mb-2">
                {content.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {content.description}
              </p>
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
          >
            <Play className="mr-2 h-4 w-4" />
            Watch & Read More
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
