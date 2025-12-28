import { motion } from "framer-motion";
import { forwardRef } from "react";

interface SectionHeaderProps {
  handwritten: string;
  title: string;
  subtitle?: string;
}

export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ handwritten, title, subtitle }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="font-caveat text-primary text-2xl md:text-3xl">{handwritten}</span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-2 text-foreground">{title}</h2>
        {subtitle && (
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">{subtitle}</p>
        )}
      </motion.div>
    );
  }
);

SectionHeader.displayName = "SectionHeader";
