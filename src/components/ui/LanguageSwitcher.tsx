// import { motion } from "framer-motion";
// import { useLanguage } from "@/contexts/LanguageContext";

// export const LanguageSwitcher = () => {
//   const { language, setLanguage } = useLanguage();

//   return (
//     <div className="flex items-center bg-glass border border-glass-border rounded-lg overflow-hidden">
//       <button
//         onClick={() => setLanguage("en")}
//         className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
//           language === "en"
//             ? "bg-primary text-primary-foreground"
//             : "text-muted-foreground hover:text-foreground"
//         }`}
//         aria-label="Switch to English"
//       >
//         EN
//       </button>
//       <div className="w-px h-6 bg-glass-border" />
//       <button
//         onClick={() => setLanguage("hi")}
//         className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
//           language === "hi"
//             ? "bg-primary text-primary-foreground"
//             : "text-muted-foreground hover:text-foreground"
//         }`}
//         aria-label="Switch to Hindi"
//       >
//         हि
//       </button>
//     </div>
//   );
// };
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: "en", label: "English", flag: "US" },
    { code: "hi", label: "हिन्दी", flag: "IN" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    setLanguage(code as "en" | "hi");
    setIsOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background/50 hover:bg-background/80 border border-glass-border transition-colors"
        aria-label="Change language"
      >
        <Globe className="h-4 w-4" />
        <span className="text-sm font-medium">{currentLanguage?.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-background/95 backdrop-blur-lg border border-glass-border shadow-lg overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-primary/10 transition-colors ${
                language === lang.code ? "bg-primary/20" : ""
              }`}
            >
              <span className="text-2xl">{lang.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{lang.label}</span>
                <span className="text-xs text-muted-foreground">{lang.code.toUpperCase()}</span>
              </div>
              {language === lang.code && (
                <span className="ml-auto text-primary">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
