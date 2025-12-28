import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
};
