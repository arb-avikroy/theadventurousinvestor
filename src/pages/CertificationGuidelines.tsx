import { Link } from "react-router-dom";
import { SEO, buildBreadcrumbSchema } from "@/components/SEO";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

const CertificationGuidelines = () => {
  const { language } = useLanguage();

  return (
    <>
      <SEO
        title={language === "hi" ? "सर्टिफिकेशन गाइडलाइन्स" : "Certification Guidelines"}
        description={language === "hi"
          ? "विभिन्न आईटी प्रमाणन के लिए दिशा-निर्देश और संसाधन।"
          : "Guidelines and resources for various IT certifications."}
        canonical="https://www.adventurousinvestorhub.com/certification-guidelines"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", url: "https://www.adventurousinvestorhub.com" },
          { name: "Certification Guidelines", url: "https://www.adventurousinvestorhub.com/certification-guidelines" },
        ])}
      />
      <Layout>
        <section className="py-24 px-4 min-h-screen">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link to="/#content">
                <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {language === "hi" ? "होम पर वापस जाएं" : "Back to Home"}
                </Button>
              </Link>

              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {language === "hi" ? "सर्टिफिकेशन गाइडलाइन्स" : "Certification Guidelines"}
                </h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  {language === "hi"
                    ? "करियर ग्रोथ के लिए प्रमाणन तैयारी गाइड।"
                    : "Certification preparation guides for career growth."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <GlassCard hoverable className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Award className="h-10 w-10 text-primary" />
                  </div>
                  <h3 className="text-primary font-semibold text-xl mb-3">
                    SAP Build certification LCNC
                  </h3>
                  <p className="text-muted-foreground text-sm mb-6 line-clamp-3">
                    {language === "hi"
                      ? "सैप बिल्ड (Low-Code/No-Code) प्रमाणन के लिए एक विस्तृत गाइड।"
                      : "A comprehensive guide to prepare for SAP Build (Low-Code/No-Code) certification."}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-primary/40 text-primary hover:bg-primary/10"
                    asChild
                  >
                    <a
                      href="https://docs.google.com/document/d/1hrpi7sNGNIKPDm3lot7kNJGvJeLUvMo9JrEytdOuwAg/edit?tab=t.0"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {language === "hi" ? "गाइड पढ़ें" : "Read Guide"}
                    </a>
                  </Button>
                </GlassCard>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default CertificationGuidelines;
