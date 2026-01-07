import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink, Clock, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { featuredProjects, otherProjects } from "@/data/projects";
import { motion } from "framer-motion";
import { useProject } from "@/hooks/useProjects";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { language } = useLanguage();
  const { data: dbProject, isLoading } = useProject(slug || "");

  // Fallback to local data
  const allLocalProjects = [...featuredProjects, ...otherProjects];
  const localProject = allLocalProjects.find((p) => p.slug === slug);

  // Use database project if available, otherwise use fallback
  const project = dbProject || (localProject ? {
    id: localProject.id.toString(),
    slug: localProject.slug,
    title_en: localProject.title.en,
    title_hi: localProject.title.hi,
    description_en: localProject.description.en,
    description_hi: localProject.description.hi,
    long_description_en: localProject.longDescription.en,
    long_description_hi: localProject.longDescription.hi,
    tags: localProject.tags,
    features_en: localProject.features.en,
    features_hi: localProject.features.hi,
    tech_stack: localProject.techStack,
    status: localProject.status,
    github_url: localProject.github_Url,
    live_url: localProject.live_Url,
  } : null);

  const statusColors: Record<string, string> = {
    completed: "bg-green-500/20 text-green-400 border-green-500/30",
    "in-progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    "coming-soon": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  };

  const statusText: Record<string, Record<string, string>> = {
    completed: { en: "Completed", hi: "पूर्ण" },
    "in-progress": { en: "In Progress", hi: "प्रगति में" },
    "coming-soon": { en: "Coming Soon", hi: "जल्द आ रहा है" },
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {language === "hi" ? "प्रोजेक्ट नहीं मिला" : "Project Not Found"}
            </h1>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "hi" ? "होम पर वापस जाएं" : "Back to Home"}
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="py-24 px-4 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/#projects">
              <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "hi" ? "प्रोजेक्ट्स पर वापस जाएं" : "Back to Projects"}
              </Button>
            </Link>

            <GlassCard className="p-8 md:p-10">
              <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-primary">
                  {language === "hi" ? project.title_hi : project.title_en}
                </h1>
                {project.status && (
                  <span
                    className={`px-3 py-1 rounded-full text-sm border ${statusColors[project.status] || ""}`}
                  >
                    {statusText[project.status]?.[language] || project.status}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {language === "hi" ? project.long_description_hi : project.long_description_en}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {language === "hi" ? "मुख्य विशेषताएं" : "Key Features"}
                  </h3>
                  <ul className="space-y-2">
                    {(language === "hi" ? project.features_hi : project.features_en)?.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {language === "hi" ? "टेक स्टैक" : "Tech Stack"}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech_stack?.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-secondary rounded-lg text-sm text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6 border-t border-border">
                {project.github_url && (
                  <Button variant="outline" asChild>
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      {language === "hi" ? "कोड देखें" : "View Code"}
                    </a>
                  </Button>
                )}
                {project.live_url && (
                  <Button asChild>
                    <a href="{project.live_url}" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {language === "hi" ? "लाइव डेमो" : "Live Demo"}
                    </a>
                  </Button>
                )}
                {project.status === "coming-soon" && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{language === "hi" ? "जल्द उपलब्ध होगा" : "Available Soon"}</span>
                  </div>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
