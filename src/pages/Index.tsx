import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { SkillsSnapshot } from "@/components/sections/SkillsSnapshot";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { AILab } from "@/components/sections/AILab";
import { ContentEcosystem } from "@/components/sections/ContentEcosystem";
import { TechStack } from "@/components/sections/TechStack";
import { Metrics } from "@/components/sections/Metrics";
import { Contact } from "@/components/sections/Contact";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>The Adventurous Investor | AI | Content | Finance | Growth</title>
      </Helmet>
      <Layout>
        <Hero />
        <AboutPreview />
        <SkillsSnapshot />
        <FeaturedProjects />
        <AILab />
        <ContentEcosystem />
        <TechStack />
        <Metrics />
        <Contact />
      </Layout>
    </>
  );
};

export default Index;
