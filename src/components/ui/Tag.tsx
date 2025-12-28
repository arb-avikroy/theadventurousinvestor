import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export const Tag = ({ children, className }: TagProps) => {
  return (
    <span
      className={cn(
        "inline-block px-3 py-1 text-xs font-medium rounded-full",
        "bg-primary/10 text-primary border border-primary/30",
        className
      )}
    >
      {children}
    </span>
  );
};
