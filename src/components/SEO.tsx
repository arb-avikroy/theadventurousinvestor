import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  noindex?: boolean;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const SITE_NAME = "The Adventurous Investor";
const SITE_URL = "https://www.adventurousinvestorhub.com";
const DEFAULT_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/eAth7cBl2EeHNisej4wrC2TdJr02/social-images/social-1766938740900-WhatsApp Image 2025-12-15 at 22.56.50.jpeg";

export const SEO = ({
  title,
  description,
  canonical,
  type = "website",
  image = DEFAULT_IMAGE,
  publishedTime,
  modifiedTime,
  author,
  tags,
  noindex = false,
  jsonLd,
}: SEOProps) => {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical || `${SITE_URL}${window.location.pathname}`;

  const jsonLdArray = jsonLd
    ? Array.isArray(jsonLd) ? jsonLd : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Article-specific OG */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}
      {type === "article" && tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@adventurousinv" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {jsonLdArray.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

// Reusable JSON-LD builders
export const buildPersonSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Avik Barman",
  alternateName: "The Adventurous Investor",
  url: "https://www.adventurousinvestorhub.com",
  jobTitle: "SAP Consultant & AI Builder",
  description: "Multidisciplinary technologist building intelligent systems at the intersection of SAP, AI, automation, and content creation.",
  sameAs: [
    "https://www.linkedin.com/in/avik-barman/",
    "https://github.com/arb-avikroy",
    "https://youtube.com/@theadventurousinvestor",
    "https://instagram.com/theadventurousinvestor",
  ],
  knowsAbout: ["SAP", "Artificial Intelligence", "SAPUI5", "Node.js", "n8n", "Automation", "Content Creation", "Finance"],
});

export const buildWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "The Adventurous Investor",
  alternateName: "Adventurous Investor Hub",
  url: "https://www.adventurousinvestorhub.com",
  description: "SAP, AI, Automation & Content by Avik Barman",
  author: { "@type": "Person", name: "Avik Barman" },
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.adventurousinvestorhub.com/watch-read?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
});

export const buildBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
});

export const buildArticleSchema = ({
  title,
  description,
  url,
  publishedTime,
  modifiedTime,
  author = "Avik Barman",
  tags = [],
  image,
}: {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  image?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  url,
  datePublished: publishedTime,
  dateModified: modifiedTime || publishedTime,
  author: { "@type": "Person", name: author },
  publisher: {
    "@type": "Person",
    name: "Avik Barman",
    url: "https://www.adventurousinvestorhub.com",
  },
  keywords: tags.join(", "),
  mainEntityOfPage: { "@type": "WebPage", "@id": url },
  ...(image ? { image } : {}),
});

export const buildSoftwareAppSchema = ({
  name,
  description,
  url,
  applicationCategory = "WebApplication",
}: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name,
  description,
  url,
  applicationCategory,
  operatingSystem: "Web",
  author: { "@type": "Person", name: "Avik Barman" },
});
