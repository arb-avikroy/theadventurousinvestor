import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Calendar, Share2, BookmarkPlus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

// Sample blog data - you can move this to your contentData file
const blogArticles = {
    "blog-1": {
        id: "blog-1",
        title: {
            en: "Artificial Intelligence in SAP: Transforming Enterprise Intelligence",
            hi: "एंटरप्राइज इंटेलिजेंस में क्रांति ला रही है आर्टिफिशियल इंटेलिजेंस इन SAP"
        },
        excerpt: {
            en: "Discover how Artificial Intelligence in SAP is revolutionizing business processes, boosting efficiency, and driving intelligent automation across industries",
            hi: "जानिए कैसे SAP में आर्टिफिशियल इंटेलिजेंस व्यापारिक प्रक्रियाओं को स्मार्ट और कुशल बना रही है।"
        },
        tags: ["AI", "Enterprise", "SAP"],
        readTime: "~12 mins",
        date: "2025-12-30",
        author: {
            name: "The Adventurous Investor",
            avatar: "/api/placeholder/40/40"
        },
        content: {
            en: `
# Artificial Intelligence in SAP

Artificial Intelligence is no longer a futuristic buzzword—it has become the core engine driving digital transformation in modern enterprises. Within SAP ecosystems, AI is redefining how organizations process data, make faster decisions, and deliver highly personalized customer experiences. By embedding intelligence directly into enterprise workflows, SAP enables businesses to operate with greater speed, accuracy, and resilience.

## Understanding SAP and Its Core Functionality

SAP, short for Systems, Applications, and Products in Data Processing, is a leading Enterprise Resource Planning platform that integrates critical business functions into a single unified system. It allows organizations to manage finance, logistics, human resources, and supply chains with consistency and real-time visibility.

### Key SAP Modules

SAP delivers value through tightly integrated modules that support end-to-end business operations:

- SAP FI: Manages financial accounting and compliance
- SAP CO: Supports internal cost control and profitability analysis
- SAP MM: Handles procurement and inventory management
- SAP HR: Manages workforce data and talent processes
- SAP SD: Enables sales, billing, and distribution operations

Together, these modules ensure seamless data flow across departments and eliminate operational silos.

## The Role of Artificial Intelligence in SAP

### AI Integration with SAP S/4HANA

SAP S/4HANA embeds AI capabilities directly into business processes, enabling automation of repetitive tasks, intelligent recommendations, and real-time insights. This integration empowers organizations to move from reactive operations to proactive decision-making.

### Machine Learning Capabilities

Machine learning within SAP supports advanced use cases such as fraud detection, automated invoice matching, and predictive maintenance. These capabilities reduce manual effort while improving accuracy and risk management.

### Predictive Analytics and Data Intelligence

Predictive analytics allows organizations to forecast demand, identify potential risks, and uncover future growth opportunities. With AI-driven data intelligence, businesses gain the ability to anticipate outcomes rather than merely analyze past performance.

## Key Benefits of AI in SAP

AI adoption within SAP delivers measurable business value across multiple dimensions:

- Improved Decision-Making: AI-driven insights enable precise, data-backed decisions
- Automation and Cost Reduction: Intelligent automation reduces manual workload and operational expenses
- Enhanced Customer Experience: Personalized interactions increase customer satisfaction and loyalty

## Real-World Use Cases of AI in SAP

### AI in Financial Forecasting

AI-powered forecasting tools help organizations predict cash flows, optimize budgets, and reduce financial uncertainty.

### AI in Supply Chain Optimization

Predictive models improve demand planning, delivery accuracy, and resource utilization, resulting in more resilient supply chains.

### AI in Human Resources

AI streamlines recruitment by screening resumes, identifying high-potential candidates, and accelerating hiring decisions.

## Challenges in Implementing AI within SAP

Despite its transformative potential, AI adoption in SAP environments presents several challenges:

- Data integration and data quality management
- Shortage of skilled AI and SAP professionals
- Organizational resistance to digital transformation

Organizations that address these challenges strategically are better positioned to achieve long-term competitive advantage.

## The Future of AI-Driven SAP Systems

The future of SAP lies in intelligent automation, where AI, IoT, and advanced analytics converge to create self-learning enterprises. These systems will continuously adapt, optimize processes, and support autonomous decision-making at scale.

## Conclusion

Artificial Intelligence in SAP is foundational to the intelligent enterprise of tomorrow. By combining machine learning, predictive analytics, and automation, SAP enables organizations to achieve operational excellence and sustainable, data-driven growth. Enterprises that invest in AI today are building the capabilities required to lead in an increasingly competitive digital economy.

`,
            hi: `
# SAP में आर्टिफ़िशियल इंटेलिजेंस

आर्टिफ़िशियल इंटेलिजेंस अब केवल भविष्य की अवधारणा नहीं है, बल्कि यह आधुनिक एंटरप्राइज़ सिस्टम्स में डिजिटल ट्रांसफ़ॉर्मेशन की मुख्य शक्ति बन चुका है। SAP के भीतर AI का उपयोग संगठनों को डेटा आधारित निर्णय लेने, प्रक्रियाओं को स्वचालित करने और ग्राहकों को व्यक्तिगत अनुभव प्रदान करने में सक्षम बनाता है।

## SAP और इसकी मुख्य कार्यक्षमताओं को समझना

SAP का पूरा नाम Systems, Applications, and Products in Data Processing है। यह एक अग्रणी ERP प्लेटफ़ॉर्म है जो किसी संगठन के वित्त, लॉजिस्टिक्स, मानव संसाधन और सप्लाई चेन को एकीकृत करता है। इससे सभी विभाग एक ही सिस्टम पर निर्बाध रूप से कार्य कर पाते हैं।

### SAP के प्रमुख मॉड्यूल

SAP विभिन्न मॉड्यूल्स के माध्यम से संपूर्ण बिज़नेस ऑपरेशंस को सपोर्ट करता है:

- SAP FI: वित्तीय लेखांकन और अनुपालन प्रबंधन
- SAP CO: लागत नियंत्रण और लाभप्रदता विश्लेषण
- SAP MM: खरीद और इन्वेंट्री प्रबंधन
- SAP HR: कर्मचारी और टैलेंट मैनेजमेंट
- SAP SD: बिक्री, बिलिंग और वितरण

ये सभी मॉड्यूल मिलकर संगठन में डेटा साइलो को समाप्त करते हैं और पारदर्शिता बढ़ाते हैं।

## SAP में आर्टिफ़िशियल इंटेलिजेंस की भूमिका

### SAP S/4HANA में AI का एकीकरण

SAP S/4HANA में AI को सीधे बिज़नेस प्रोसेसेज़ में शामिल किया गया है। इससे नियमित कार्यों का ऑटोमेशन, स्मार्ट सुझाव और रियल-टाइम इनसाइट्स संभव हो पाते हैं।

### मशीन लर्निंग का उपयोग

SAP में मशीन लर्निंग का उपयोग धोखाधड़ी पहचान, इनवॉइस मैचिंग और प्रेडिक्टिव मेंटेनेंस जैसे कार्यों में किया जाता है। इससे मैन्युअल प्रयास कम होता है और सटीकता बढ़ती है।

### प्रीडिक्टिव एनालिटिक्स और डेटा इंटेलिजेंस

प्रीडिक्टिव एनालिटिक्स संगठनों को भविष्य की मांग, संभावित जोखिमों और नए अवसरों का अनुमान लगाने में मदद करता है। AI आधारित डेटा इंटेलिजेंस निर्णय प्रक्रिया को अधिक प्रभावी बनाता है।

## SAP में AI के प्रमुख लाभ

SAP में AI के उपयोग से व्यवसायों को कई स्तरों पर लाभ मिलता है:

- **बेहतर निर्णय क्षमता**: डेटा आधारित और अधिक सटीक निर्णय
- **ऑटोमेशन और लागत में कमी**: मैन्युअल कार्य कम होकर परिचालन लागत घटती है
- **बेहतर ग्राहक अनुभव**: व्यक्तिगत सेवाओं से ग्राहक संतुष्टि बढ़ती है

## SAP में AI के वास्तविक उपयोग

### वित्तीय पूर्वानुमान में AI

AI आधारित टूल्स कैश फ़्लो का पूर्वानुमान लगाने और बजट से जुड़े जोखिम कम करने में मदद करते हैं।

### सप्लाई चेन ऑप्टिमाइज़ेशन में AI

डिमांड फ़ोरकास्टिंग और संसाधन उपयोग बेहतर होने से सप्लाई चेन अधिक विश्वसनीय बनती है।

### मानव संसाधन प्रबंधन में AI

AI रिज़्यूमे स्क्रीनिंग और टैलेंट पहचान को तेज़ बनाकर भर्ती प्रक्रिया को सरल करता है।

## SAP में AI लागू करने की चुनौतियाँ

SAP में AI अपनाते समय कुछ प्रमुख चुनौतियाँ सामने आती हैं:

- डेटा इंटीग्रेशन और डेटा क्वालिटी
- कुशल प्रोफ़ेशनल्स की कमी
- डिजिटल बदलाव के प्रति प्रतिरोध

इन चुनौतियों को पार करने वाले संगठन दीर्घकालिक प्रतिस्पर्धात्मक बढ़त प्राप्त करते हैं।

## AI-संचालित SAP सिस्टम्स का भविष्य

SAP का भविष्य इंटेलिजेंट ऑटोमेशन में है, जहाँ AI, IoT और एडवांस्ड एनालिटिक्स मिलकर ऐसे एंटरप्राइज़ बनाएँगे जो स्वयं सीखेंगे और स्वयं निर्णय लेंगे।

## निष्कर्ष

SAP में आर्टिफ़िशियल इंटेलिजेंस आने वाले समय के इंटेलिजेंट एंटरप्राइज़ की नींव है। मशीन लर्निंग, प्रीडिक्टिव एनालिटिक्स और ऑटोमेशन के माध्यम से SAP संगठनों को ऑपरेशनल एक्सीलेंस और डेटा आधारित विकास हासिल करने में सक्षम बनाता है। जो संगठन आज AI में निवेश करते हैं, वही भविष्य की प्रतिस्पर्धा में आगे रहेंगे।
 `
        }
    }
};

const BlogDetail = () => {
    const { language } = useLanguage();
    const { blogId } = useParams();
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Get blog data based on blogId from URL params
    const blog = blogArticles[blogId];

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: blog.title[language],
                    text: blog.excerpt[language],
                    url: window.location.href,
                });
            } catch (err) {
                console.log("Error sharing:", err);
            }
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert(language === "hi" ? "लिंक कॉपी किया गया!" : "Link copied!");
        }
    };

    return (
        <Layout>
            <section className="py-24 px-4 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Back Button */}
                        <Link to="/watch-read">
                            <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                {language === "hi" ? "वापस जाएं" : "Back to Articles"}
                            </Button>
                        </Link>

                        {/* Article Header */}
                        <GlassCard className="p-8 mb-8">
                            <div className="mb-6">
                                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                                    {blog.title[language]}
                                </h1>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    <p>
                                        {blog.excerpt[language]}
                                    </p>
                                </div>

                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                                    <div className="flex items-center gap-2">
                                        {/* <img 
                      src={blog.author.avatar} 
                      alt={blog.author.name}
                      className="w-10 h-10 rounded-full"
                    /> */}
                                        <span className="text-sm font-medium">{blog.author.name}</span>
                                    </div>
                                    <span className="flex items-center gap-1 text-sm">
                                        <Calendar className="h-4 w-4" />
                                        {blog.date}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm">
                                        <Clock className="h-4 w-4" />
                                        {blog.readTime}
                                    </span>
                                </div>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {blog.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-secondary text-sm text-foreground rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
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
                                    {/* <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setIsBookmarked(!isBookmarked)}
                                        className={`border-primary/40 ${isBookmarked
                                                ? "bg-primary/10 text-primary"
                                                : "text-primary hover:bg-primary/10"
                                            }`}
                                    >
                                        <BookmarkPlus className="mr-2 h-4 w-4" />
                                        {language === "hi"
                                            ? (isBookmarked ? "सेव किया गया" : "सेव करें")
                                            : (isBookmarked ? "Saved" : "Save")}
                                    </Button> */}
                                </div>
                            </div>
                        </GlassCard>

                        {/* Article Content */}
                        <GlassCard className="p-8">
                            <article className="prose prose-invert prose-lg max-w-none">
                                {/* <div
  dangerouslySetInnerHTML={{ __html: blog.content[language] }}
/> */}
                                <div
                                    className="text-muted-foreground leading-relaxed"
                                    style={{
                                        whiteSpace: "pre-wrap"
                                    }}
                                >
                                    {blog.content[language].split('\n').map((paragraph, index) => {
                                        // Handle headings
                                        if (paragraph.startsWith('# ')) {
                                            return (
                                                <h1 key={index} className="text-3xl font-bold text-foreground mt-8 mb-4">
                                                    {paragraph.replace('# ', '')}
                                                </h1>
                                            );
                                        }
                                        if (paragraph.startsWith('## ')) {
                                            return (
                                                <h2 key={index} className="text-2xl font-bold text-foreground mt-6 mb-3">
                                                    {paragraph.replace('## ', '')}
                                                </h2>
                                            );
                                        }
                                        if (paragraph.startsWith('### ')) {
                                            return (
                                                <h3 key={index} className="text-xl font-semibold text-foreground mt-5 mb-2">
                                                    {paragraph.replace('### ', '')}
                                                </h3>
                                            );
                                        }
                                        // Handle list items
                                        if (paragraph.startsWith('- ') || paragraph.match(/^\d+\./)) {
                                            return (
                                                <li key={index} className="ml-6 mb-2 text-muted-foreground">
                                                    {paragraph.replace(/^- |\d+\.\s/, '')}
                                                </li>
                                            );
                                        }
                                        // Handle bold text
                                        if (paragraph.includes("**")) {
  const parts = paragraph.split("**");

  return (
    <p key={index} className="mb-4 text-muted-foreground">
      {parts.map((part, i) => (
        i % 2 === 1 ? (
          <strong key={i} className="text-foreground font-semibold">
            {part}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        )
      ))}
    </p>
  );
}
                                        
                                        

                                        // if (paragraph.includes('**')) {
                                        //   const parts = paragraph.split('**');
                                        //   return (
                                        //     <p key={index} className="mb-4 text-muted-foreground">
                                        //       {parts.map((part, i) => 
                                        //         i % 2 === 1 ? <strong key={i} className="text-foreground font-semibold">{part}</strong> : part
                                        //       )}
                                        //     </p>
                                        //   );
                                        // }
                                        // Regular paragraphs
                                        if (paragraph.trim()) {
                                            return (
                                                <p key={index} className="mb-4 text-muted-foreground">
                                                    {paragraph}
                                                </p>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </article>
                        </GlassCard>

                        {/* Related Articles Section (Optional) */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-12"
                        >
                            {/* <h2 className="text-2xl font-bold text-foreground mb-6">
                {language === "hi" ? "अधिक पढ़ें" : "Read More"}
              </h2> */}
                            <div className="text-center">
                                <Link to="/watch-read">
                                    <Button
                                        variant="outline"
                                        className="border-primary/40 text-primary hover:bg-primary/10"
                                    >
                                        {language === "hi" ? "सभी लेख देखें" : "View All Articles"}
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
};

export default BlogDetail;