export interface Project {
  id: number;
  slug: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  longDescription: { en: string; hi: string };
  tags: string[];
  features: { en: string[]; hi: string[] };
  techStack: string[];
  status: "completed" | "in-progress" | "coming-soon";
  githubUrl?: string;
  liveUrl?: string;
}

export const featuredProjects: Project[] = [
  {
    id: 1, slug: "sapui5-bulk-excel-upload",
    title: { en: "SAPUI5 Bulk Excel Upload", hi: "SAPUI5 बल्क Excel अपलोड" },
    description: { en: "Enterprise application enabling bulk Excel uploads with real-time validation, OData integration, and smart error handling.", hi: "बड़े पैमाने पर डेटा प्रोसेसिंग के लिए रियल-टाइम वैलिडेशन और OData इंटीग्रेशन के साथ एंटरप्राइज एप्लीकेशन।" },
    longDescription: { en: "A comprehensive enterprise solution built on SAPUI5 framework that revolutionizes data entry workflows with bulk Excel processing.", hi: "SAPUI5 फ्रेमवर्क पर बनाया गया एक व्यापक एंटरप्राइज समाधान।" },
    tags: ["SAPUI5", "OData", "Excel", "Enterprise"],
    features: { en: ["Bulk Excel upload", "Real-time validation", "OData integration", "Error handling"], hi: ["बल्क Excel अपलोड", "रियल-टाइम वैलिडेशन", "OData इंटीग्रेशन", "एरर हैंडलिंग"] },
    techStack: ["SAPUI5", "JavaScript", "OData", "SAP HANA"], status: "coming-soon"
  },
  {
    id: 2, slug: "ai-video-generation-pipeline",
    title: { en: "AI Video Generation Pipeline", hi: "AI वीडियो जेनरेशन पाइपलाइन" },
    description: { en: "Automated content pipeline using multiple LLMs for script generation, voice synthesis, and video assembly.", hi: "स्क्रिप्ट जेनरेशन और वीडियो असेंबली के लिए मल्टीपल LLMs का उपयोग करने वाली पाइपलाइन।" },
    longDescription: { en: "An end-to-end automated video production system that transforms ideas into polished videos.", hi: "एक एंड-टू-एंड ऑटोमेटेड वीडियो प्रोडक्शन सिस्टम।" },
    tags: ["AI", "Automation", "Video", "LLM"],
    features: { en: ["AI script generation", "Voice synthesis", "Automated video assembly", "Multi-language"], hi: ["AI स्क्रिप्ट जेनरेशन", "वॉइस सिंथेसिस", "ऑटोमेटेड वीडियो", "मल्टी-लैंग्वेज"] },
    techStack: ["Python", "GPT-4", "ElevenLabs", "FFmpeg"], status: "coming-soon"
  },
  {
    id: 3, slug: "n8n-content-automation",
    title: { en: "n8n Content Automation", hi: "n8n कंटेंट ऑटोमेशन" },
    description: { en: "Workflow automation for content creation, scheduling, and distribution across multiple platforms.", hi: "मल्टीपल प्लेटफॉर्म्स पर कंटेंट क्रिएशन और डिस्ट्रीब्यूशन के लिए वर्कफ़्लो ऑटोमेशन।" },
    longDescription: { en: "A sophisticated workflow automation platform built on n8n.", hi: "n8n पर बनाया गया एक परिष्कृत वर्कफ़्लो ऑटोमेशन प्लेटफॉर्म।" },
    tags: ["n8n", "Workflow", "LLM", "Automation"],
    features: { en: ["Visual workflow builder", "AI content writing", "Social media scheduling", "Analytics"], hi: ["विज़ुअल वर्कफ़्लो बिल्डर", "AI कंटेंट राइटिंग", "सोशल मीडिया शेड्यूलिंग", "एनालिटिक्स"] },
    techStack: ["n8n", "Node.js", "OpenAI API", "PostgreSQL"], status: "coming-soon"
  },
  {
    id: 4, slug: "fiori-nodejs-fullstack",
    title: { en: "Fiori + Node.js Full-Stack", hi: "Fiori + Node.js फुल-स्टैक" },
    description: { en: "Modern full-stack application combining SAP Fiori frontend with Node.js backend and MongoDB.", hi: "SAP Fiori फ्रंटएंड को Node.js बैकएंड और MongoDB के साथ जोड़ने वाला एप्लीकेशन।" },
    longDescription: { en: "A modern full-stack application bridging SAP and modern web technologies.", hi: "SAP और आधुनिक वेब तकनीकों को जोड़ने वाला एप्लीकेशन।" },
    tags: ["SAP Fiori", "Node.js", "REST API", "MongoDB"],
    features: { en: ["SAP Fiori UI", "RESTful API", "MongoDB storage", "JWT auth"], hi: ["SAP Fiori UI", "RESTful API", "MongoDB स्टोरेज", "JWT ऑथ"] },
    techStack: ["SAP Fiori", "Node.js", "Express", "MongoDB"], status: "coming-soon"
  },
];

export const otherProjects: Project[] = [
  {
    id: 5, slug: "personal-finance-tracker",
    title: { en: "Personal Finance Tracker", hi: "पर्सनल फाइनेंस ट्रैकर" },
    description: { en: "A personal finance app with expense tracking and budgeting.", hi: "खर्च ट्रैकिंग और बजटिंग के साथ एक फाइनेंस ऐप।" },
    longDescription: { en: "A full-featured personal finance application.", hi: "एक पूर्ण फाइनेंस एप्लीकेशन।" },
    tags: ["React", "TypeScript", "Finance"],
    features: { en: ["Expense tracking", "Budget planning", "Charts"], hi: ["खर्च ट्रैकिंग", "बजट प्लानिंग", "चार्ट्स"] },
    techStack: ["React", "TypeScript", "Recharts"], status: "in-progress"
  },
  {
    id: 6, slug: "smart-home-dashboard",
    title: { en: "Smart Home Dashboard", hi: "स्मार्ट होम डैशबोर्ड" },
    description: { en: "IoT dashboard for smart home devices.", hi: "स्मार्ट होम डिवाइसों के लिए IoT डैशबोर्ड।" },
    longDescription: { en: "A centralized dashboard for managing smart home devices.", hi: "स्मार्ट होम डिवाइसों को प्रबंधित करने के लिए डैशबोर्ड।" },
    tags: ["IoT", "React", "WebSocket"],
    features: { en: ["Real-time monitoring", "Device control", "Automation"], hi: ["रियल-टाइम मॉनिटरिंग", "डिवाइस कंट्रोल", "ऑटोमेशन"] },
    techStack: ["React", "Node.js", "WebSocket"], status: "in-progress"
  },
];

export const aiProjects = {
  community: [
    { id: "gpt-sap", name: { en: "SAP Consultant GPT (coming soon)", hi: "SAP कंसल्टेंट GPT (जल्द आ रहा है)" }, description: { en: "Custom GPT for SAP queries.", hi: "SAP प्रश्नों के लिए कस्टम GPT।" }, link: "https://www.chatgpt.com", type: "Custom GPT" },
    { id: "gpt-career", name: { en: "Youtube Script Writer", hi: "यूट्यूब स्क्रिप्ट राइटर" }, description: { en: "Consistent YouTube scriptwriting Gem for your channel", hi: "आपके चैनल के लिए लगातार YouTube स्क्रिप्टराइटिंग का बेहतरीन तरीका।" }, link: "https://gemini.google.com/gem/1mm5mzIjQxM00RQNo84iNBRWiruXVZfZM?usp=sharing", type: "Custom GPT/Gem" },
  ],
  projects: [
    { id: "ai-content", name: { en: "AI Content Generator", hi: "AI कंटेंट जेनरेटर" }, description: { en: "Multi-platform content generation.", hi: "मल्टी-प्लेटफॉर्म कंटेंट जेनरेशन।" }, status: "Active", tech: ["GPT-4", "Python"] },
    { id: "voice-clone", name: { en: "Voice Clone Studio", hi: "वॉइस क्लोन स्टूडियो" }, description: { en: "Natural voice clones.", hi: "प्राकृतिक वॉइस क्लोन।" }, status: "Beta", tech: ["ElevenLabs", "React"] },
  ],
  articles: [
    { id: "intro-llm", title: { en: "Introduction to LLMs", hi: "LLMs का परिचय" }, excerpt: { en: "Guide to understanding LLMs.", hi: "LLMs को समझने की गाइड।" }, readTime: "8 min", date: "2024-01-15" },
    { id: "ai-sap", title: { en: "AI in SAP Ecosystem", hi: "SAP में AI इंटीग्रेशन" }, excerpt: { en: "AI transforming SAP.", hi: "AI SAP को बदल रहा है।" }, readTime: "12 min", date: "2024-02-20" },
  ],
};

export const contentData = {
  
  videos: [
    { id: "LcDAAnOCDfc", title: { en: "Fiori Developer vs ABAP vs SAP AI: Which Role Pays ", hi: "Fiori डेवलपर बनाम ABAP बनाम SAP AI: अगले 3 वर्षों में कौन सी भूमिका अधिक वेतन देगी?" }, description: { en: "Beginner's guide to ABAP.", hi: "ABAP की शुरुआती गाइड।" }, thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400", youtubeUrl: "https://youtube.com", duration: "15:30", views: "12K", date: "2025-12-23",  embedUrl: "https://www.youtube.com/embed/LcDAAnOCDfc?si=edsGz46JAfdGpfi3?autoplay=1&mute=1"},
    { id: "N4T9FVcaHrk", title: { en: "Get Lovable.dev Pro for FREE (Limited-Time Trick)", hi: "Lovable.dev Pro को मुफ़्त में पाएं (सीमित समय के लिए ऑफर)" }, description: { en: "Best AI tools for productivity.", hi: "उत्पादकता के लिए AI टूल्स।" }, thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400", youtubeUrl: "https://youtube.com", duration: "20:45", views: "8.5K", date: "2025-12-26" },
  ],
  blogs: [
    { id: "blog-1", title: { en: "Artificial Intelligence in SAP: Transforming Enterprise Intelligence", hi: "एंटरप्राइज इंटेलिजेंस में क्रांति ला रही है आर्टिफिशियल इंटेलिजेंस इन SAP" }, excerpt: { en: "Discover how Artificial Intelligence in SAP is revolutionizing business processes, boosting efficiency, and driving intelligent automation across industries", hi: "जानिए कैसे SAP में आर्टिफिशियल इंटेलिजेंस व्यापारिक प्रक्रियाओं को स्मार्ट और कुशल बना रही है।" }, readTime: "~11 mins", date: "2025-12-30", tags: ["AI", "Enterprise", "SAP"] },
    { id: "blog-2", title: { en: "SAP BTP Guide (Updating)", hi: "SAP BTP गाइड" }, excerpt: { en: "Complete guide to SAP BTP.", hi: "SAP BTP की पूर्ण गाइड।" }, readTime: "15 min", date: "2024-02-10", tags: ["SAP", "BTP"] },
  ],
};
