import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/projects";
import { Github, ExternalLink } from "lucide-react";

export const FeaturedProjects = () => {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          handwritten="what i've built"
          title="Featured Projects"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projectsData.map((project, index) => (
            <GlassCard
              key={project.id}
              hoverable
              delay={index * 0.1}
              className="p-6 group"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-primary font-semibold text-xl mb-3">
                  {project.title}
                </h3>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
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
            asChild
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View All Projects on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
