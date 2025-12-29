import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Play, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const contentDataEn = [
  {
    icon: "🎓",
    title: "SAP & AI Education",
    description:
      "Technical tutorials, career guidance, and deep dives into SAP technologies and AI integration for professionals and learners.",
  },
  {
    icon: "📖",
    title: "Stories & Animations",
    description:
      "Short animated narratives that blend creativity with technology, exploring ideas through visual storytelling.",
  },
  {
    icon: "🎯",
    title: "Kids Content",
    description:
      "One-minute educational videos designed to spark curiosity and make learning fun for young minds.",
  },
  {
    icon: "🌍",
    title: "Trending News",
    description:
      "AI-driven explainers covering global trends, technology updates, and insights presented in digestible formats.",
  },
];

const contentDataHi = [
  {
    icon: "🎓",
    title: "SAP और AI एजुकेशन",
    description:
      "प्रोफेशनल्स और लर्नर्स के लिए टेक्निकल ट्यूटोरियल, करियर गाइडेंस और SAP टेक्नोलॉजी और AI इंटीग्रेशन पर गहन जानकारी।",
  },
  {
    icon: "📖",
    title: "स्टोरीज और एनिमेशन",
    description:
      "छोटी एनिमेटेड कहानियां जो क्रिएटिविटी को टेक्नोलॉजी के साथ मिलाती हैं, विज़ुअल स्टोरीटेलिंग के माध्यम से विचारों की खोज।",
  },
  {
    icon: "🎯",
    title: "बच्चों का कंटेंट",
    description:
      "एक मिनट के एजुकेशनल वीडियो जो जिज्ञासा जगाने और युवा दिमागों के लिए सीखने को मज़ेदार बनाने के लिए डिज़ाइन किए गए हैं।",
  },
  {
    icon: "🌍",
    title: "ट्रेंडिंग न्यूज़",
    description:
      "AI-ड्रिवन एक्सप्लेनर जो ग्लोबल ट्रेंड्स, टेक्नोलॉजी अपडेट्स और इनसाइट्स को आसानी से समझने योग्य फॉर्मेट में प्रस्तुत करते हैं।",
  },
];

export const ContentEcosystem = () => {
  const { t, language } = useLanguage();
  const contentData = language === "hi" ? contentDataHi : contentDataEn;

  return (
    <section id="content" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          handwritten={t("contentSection.handwritten")}
          title={t("contentSection.title")}
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
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          <Button
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/10"
            asChild
          >
            <Link to="/watch-read">
              <BookOpen className="mr-2 h-4 w-4" />
              {t("contentSection.watchRead")}
            </Link>
          </Button>
          <Button
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/10"
            onClick={() => window.open("https://www.youtube.com/@theadventurousinvestor", "_blank")}
          >
            <Play className="mr-2 h-4 w-4" />
            {t("contentSection.watchMore")}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
