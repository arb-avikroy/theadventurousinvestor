import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, Share2, BookmarkPlus, Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { useBlog } from "@/hooks/useBlogs";
import { useIsBookmarked, useToggleBookmark } from "@/hooks/useBookmarks";
import { useToast } from "@/hooks/use-toast";

// Fallback blog data for when database is empty
const fallbackBlogs: Record<string, any> = {
  "blog-1": {
    id: "blog-1",
    slug: "blog-1",
    title_en: "Artificial Intelligence in SAP: Transforming Enterprise Intelligence",
    title_hi: "एंटरप्राइज इंटेलिजेंस में क्रांति ला रही है आर्टिफिशियल इंटेलिजेंस इन SAP",
    excerpt_en: "Discover how Artificial Intelligence in SAP is revolutionizing business processes, boosting efficiency, and driving intelligent automation across industries",
    excerpt_hi: "जानिए कैसे SAP में आर्टिफिशियल इंटेलिजेंस व्यापारिक प्रक्रियाओं को स्मार्ट और कुशल बना रही है।",
    tags: ["AI", "Enterprise", "SAP"],
    read_time: "~12 mins",
    publish_date: "2025-12-30",
    author_name: "The Adventurous Investor",
    content_en: `# Artificial Intelligence in SAP

Artificial Intelligence is no longer a futuristic buzzword—it has become the core engine driving digital transformation in modern enterprises. Within SAP ecosystems, AI is redefining how organizations process data, make faster decisions, and deliver highly personalized customer experiences.

## Understanding SAP and Its Core Functionality

SAP, short for Systems, Applications, and Products in Data Processing, is a leading Enterprise Resource Planning platform that integrates critical business functions into a single unified system.

### Key SAP Modules

- SAP FI: Manages financial accounting and compliance
- SAP CO: Supports internal cost control and profitability analysis
- SAP MM: Handles procurement and inventory management
- SAP HR: Manages workforce data and talent processes
- SAP SD: Enables sales, billing, and distribution operations

## The Role of Artificial Intelligence in SAP

### AI Integration with SAP S/4HANA

SAP S/4HANA embeds AI capabilities directly into business processes, enabling automation of repetitive tasks, intelligent recommendations, and real-time insights.

### Machine Learning Capabilities

Machine learning within SAP supports advanced use cases such as fraud detection, automated invoice matching, and predictive maintenance.

## Key Benefits of AI in SAP

- **Improved Decision-Making**: AI-driven insights enable precise, data-backed decisions
- **Automation and Cost Reduction**: Intelligent automation reduces manual workload
- **Enhanced Customer Experience**: Personalized interactions increase satisfaction

## Conclusion

Artificial Intelligence in SAP is foundational to the intelligent enterprise of tomorrow. Organizations that invest in AI today are building the capabilities required to lead in an increasingly competitive digital economy.`,
    content_hi: `# SAP में आर्टिफ़िशियल इंटेलिजेंस

आर्टिफ़िशियल इंटेलिजेंस अब केवल भविष्य की अवधारणा नहीं है, बल्कि यह आधुनिक एंटरप्राइज़ सिस्टम्स में डिजिटल ट्रांसफ़ॉर्मेशन की मुख्य शक्ति बन चुका है।

## SAP और इसकी मुख्य कार्यक्षमताओं को समझना

SAP का पूरा नाम Systems, Applications, and Products in Data Processing है। यह एक अग्रणी ERP प्लेटफ़ॉर्म है।

### SAP के प्रमुख मॉड्यूल

- SAP FI: वित्तीय लेखांकन और अनुपालन प्रबंधन
- SAP CO: लागत नियंत्रण और लाभप्रदता विश्लेषण
- SAP MM: खरीद और इन्वेंट्री प्रबंधन
- SAP HR: कर्मचारी और टैलेंट मैनेजमेंट
- SAP SD: बिक्री, बिलिंग और वितरण

## SAP में AI के प्रमुख लाभ

- **बेहतर निर्णय क्षमता**: डेटा आधारित और अधिक सटीक निर्णय
- **ऑटोमेशन और लागत में कमी**: मैन्युअल कार्य कम होकर परिचालन लागत घटती है
- **बेहतर ग्राहक अनुभव**: व्यक्तिगत सेवाओं से ग्राहक संतुष्टि बढ़ती है

## निष्कर्ष

SAP में आर्टिफ़िशियल इंटेलिजेंस आने वाले समय के इंटेलिजेंट एंटरप्राइज़ की नींव है।`,
  },
};

const BlogDetail = () => {
  const { language } = useLanguage();
  const { blogId } = useParams();
  const { toast } = useToast();
  
  // Fetch from database
  const { data: dbBlog, isLoading } = useBlog(blogId || "");
  
  // Use database blog if available, otherwise use fallback
  const blog = dbBlog || fallbackBlogs[blogId || ""];
  
  // Set dynamic, localized document.title
  useEffect(() => {
    if (!blog) return;
    const siteName = "The Adventurous Investor";
    const articleTitle = language === "hi" ? blog.title_hi : blog.title_en;
    document.title = `${articleTitle} | ${siteName}`;
    return () => {
      document.title = siteName;
    };
  }, [blog, language]);

  // Prepare SEO meta, canonical, and hreflang URLs
  const siteUrl = "https://www.adventurousinvestorhub.com";
  // Prepare SEO meta and canonical URL for HashRouter
  const canonicalUrl = `${siteUrl}/#/blog/${blog?.slug}`;
  // Bookmark functionality
  const { data: isBookmarked } = useIsBookmarked("blog", blog?.id || "");
  const toggleBookmark = useToggleBookmark();

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: language === "hi" ? blog?.title_hi : blog?.title_en,
          text: language === "hi" ? blog?.excerpt_hi : blog?.excerpt_en,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: language === "hi" ? "लिंक कॉपी किया गया!" : "Link copied!",
      });
    }
  };

  const handleBookmark = async () => {
    if (!blog?.id) return;
    
    try {
      const result = await toggleBookmark.mutateAsync({
        contentType: "blog",
        contentId: blog.id,
      });
      
      toast({
        title: result.action === "added" 
          ? (language === "hi" ? "बुकमार्क जोड़ा गया!" : "Bookmark added!")
          : (language === "hi" ? "बुकमार्क हटाया गया!" : "Bookmark removed!"),
      });
    } catch (err) {
      console.error(err);
    }
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

  if (!blog) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              {language === "hi" ? "ब्लॉग नहीं मिला" : "Blog Not Found"}
            </h1>
            <Link to="/watch-read">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "hi" ? "वापस जाएं" : "Back to Articles"}
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${language === "hi" ? blog.title_hi : blog.title_en} | The Adventurous Investor`}</title>
        <meta name="description" content={language === "hi" ? blog.excerpt_hi : blog.excerpt_en} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={language === "hi" ? blog.title_hi : blog.title_en} />
        <meta property="og:description" content={language === "hi" ? blog.excerpt_hi : blog.excerpt_en} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.adventurousinvestorhub.com/og-default.png" />
        <meta name="twitter:image" content="https://www.adventurousinvestorhub.com/og-default.png" />
        <meta property="og:locale" content={language === "hi" ? "hi_IN" : "en_US"} />
        <meta name="twitter:title" content={language === "hi" ? blog.title_hi : blog.title_en} />
        <meta name="twitter:description" content={language === "hi" ? blog.excerpt_hi : blog.excerpt_en} />
      </Helmet>
      <Layout>
        <section className="py-24 px-4 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/watch-read">
              <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {language === "hi" ? "वापस जाएं" : "Back to Articles"}
              </Button>
            </Link>

            <GlassCard className="p-8 mb-8">
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {language === "hi" ? blog.title_hi : blog.title_en}
                </h1>

                <div className="flex flex-wrap gap-2 mb-6">
                  <p>{language === "hi" ? blog.excerpt_hi : blog.excerpt_en}</p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{blog.author_name}</span>
                  </div>
                  <span className="flex items-center gap-1 text-sm">
                    <Calendar className="h-4 w-4" />
                    {blog.publish_date}
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Clock className="h-4 w-4" />
                    {blog.read_time}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {blog.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-secondary text-sm text-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="border-primary/40 text-primary hover:bg-primary/10"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    {language === "hi" ? "शेयर करें" : "Share"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBookmark}
                    className={`border-primary/40 hover:bg-primary/10 ${
                      isBookmarked ? "text-primary bg-primary/10" : "text-primary"
                    }`}
                  >
                    <BookmarkPlus className="mr-2 h-4 w-4" />
                    {isBookmarked
                      ? (language === "hi" ? "बुकमार्क किया गया" : "Bookmarked")
                      : (language === "hi" ? "बुकमार्क करें" : "Bookmark")}
                  </Button>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-8">
              <article className="prose prose-invert max-w-none">
                <div
                  className="text-muted-foreground leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{
                    __html: (language === "hi" ? blog.content_hi : blog.content_en)
                      ?.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-foreground mt-8 mb-4">$1</h1>')
                      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold text-foreground mt-6 mb-3">$1</h2>')
                      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-foreground mt-4 mb-2">$1</h3>')
                      .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
                      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                      .replace(/\n\n/g, '</p><p class="mb-4">')
                      || "",
                  }}
                />
              </article>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </Layout>
    </>
  );
};

export default BlogDetail;
