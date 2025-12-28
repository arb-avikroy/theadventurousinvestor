import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export const AboutPreview = () => {
  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          handwritten="who am i?"
          title="The Explorer"
        />

        <GlassCard className="p-8 md:p-10">
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I'm a <span className="text-foreground font-medium">multidisciplinary technologist</span> who 
              thrives at the intersection of enterprise systems, artificial intelligence, and creative storytelling. 
              My journey has taken me from corporate SAP implementations to building AI-powered content pipelines.
            </p>
            <p>
              By day, I architect solutions using <span className="text-primary">SAP Fiori</span>, 
              <span className="text-primary"> Node.js</span>, and workflow automation tools like n8n. 
              By night, I experiment with LLMs, create educational content, and explore the endless 
              possibilities of AI-driven creation.
            </p>
            <p>
              <span className="font-caveat text-xl text-primary">The Adventurous Investor</span> is my 
              personal brand—a space where technical expertise meets creative exploration, where every 
              project is an adventure, and where the journey matters as much as the destination.
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
              Let's Connect
            </Button>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
};
