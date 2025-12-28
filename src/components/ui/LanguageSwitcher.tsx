import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center bg-glass border border-glass-border rounded-lg overflow-hidden">
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
          language === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <div className="w-px h-6 bg-glass-border" />
      <button
        onClick={() => setLanguage("hi")}
        className={`px-3 py-2 text-sm font-medium transition-all duration-300 ${
          language === "hi"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Switch to Hindi"
      >
        हि
      </button>
    </div>
  );
};
