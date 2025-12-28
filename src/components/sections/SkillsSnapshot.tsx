import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { skillsData } from "@/data/skills";
import { Zap } from "lucide-react";

export const SkillsSnapshot = () => {
  return (
    <section id="skills" className="py-20 px-4 bg-charcoal/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          handwritten="what i do"
          title="Skills & Expertise"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((skill, index) => (
            <GlassCard
              key={skill.category}
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
            See Skills in Action
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
