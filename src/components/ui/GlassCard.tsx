import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  delay?: number;
}

export const GlassCard = ({ children, className, hoverable = false, delay = 0 }: GlassCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={cn(
        "bg-glass backdrop-blur-md border border-glass-border rounded-2xl transition-all duration-300",
        hoverable && "hover:bg-glass-hover hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_0_30px_hsl(30_45%_64%_/_0.3)]",
        className
      )}
    >
      {children}
    </motion.div>
  );
};
