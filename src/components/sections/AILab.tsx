import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Sparkles, Bot } from "lucide-react";

export const AILab = () => {
  return (
    <section id="lab" className="py-20 px-4 bg-charcoal/30">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          handwritten="the lab"
          title="AI & Experimentation"
        />

        <GlassCard className="p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Bot className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-semibold text-primary">Building with Intelligence</h3>
          </div>
          
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              The lab is where ideas become experiments. I build <span className="text-foreground">custom GPTs</span> for 
              specific workflows, engineer prompts that unlock creative possibilities, and create pipelines that 
              transform concepts into content at scale.
            </p>
            <p>
              My work spans <span className="text-primary">multi-model LLM orchestration</span>—combining the 
              strengths of different AI models for tasks ranging from video script generation to automated 
              research synthesis. Every experiment teaches something new about the intersection of 
              human creativity and machine intelligence.
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
              Explore AI Projects
            </Button>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
};
