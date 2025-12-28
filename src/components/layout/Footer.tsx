import { Linkedin, Github, Youtube, Instagram } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/avik-barman/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/arb-avikroy", label: "GitHub" },
  { icon: Youtube, href: "https://youtube.com/@theadventurousinvestor", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com/theadventurousinvestor", label: "Instagram" },
];

export const Footer = () => {
  return (
    <footer className="bg-charcoal border-t border-glass-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <span className="font-caveat text-2xl text-primary">
            the adventurous investor
          </span>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">
            Building intelligent systems. Exploring ideas. Sharing the journey.
          </p>
          
          <div className="flex justify-center space-x-6 mt-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.label}
              >
                <link.icon size={24} />
              </a>
            ))}
          </div>
          
          <p className="text-muted-foreground text-sm mt-8">
            © 2026 Avik Barman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
