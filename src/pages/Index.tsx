import { Layout } from "@/components/layout/Layout";
import { SEO, buildPersonSchema, buildWebSiteSchema, buildBreadcrumbSchema } from "@/components/SEO";
import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { SkillsSnapshot } from "@/components/sections/SkillsSnapshot";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { AILab } from "@/components/sections/AILab";
import { ContentEcosystem } from "@/components/sections/ContentEcosystem";
import { TechStack } from "@/components/sections/TechStack";
import { Metrics } from "@/components/sections/Metrics";
import { Contact } from "@/components/sections/Contact";

const SITE_URL = "https://www.adventurousinvestorhub.com";

const Index = () => {
  return (
    <>
      <SEO
        title="Avik Barman — SAP Consultant, AI Builder & Content Creator"
        description="Multidisciplinary technologist building intelligent systems at the intersection of SAP, AI, automation, and content creation. Explore projects, blogs, tools & more."
        canonical={SITE_URL}
        jsonLd={[
          buildPersonSchema(),
          buildWebSiteSchema(),
          buildBreadcrumbSchema([
            { name: "Home", url: SITE_URL },
          ]),
        ]}
      />
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
