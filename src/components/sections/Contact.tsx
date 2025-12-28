import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Linkedin, Github, Youtube, Instagram, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/avik-barman/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/arb-avikroy", label: "GitHub" },
  { icon: Youtube, href: "https://www.youtube.com/@theadventurousinvestor", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com/theadventurousinvestor", label: "Instagram" },
];

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    
    setName("");
    setEmail("");
    setMessage("");
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 px-4 bg-charcoal/30">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          handwritten="let's connect"
          title="Start the Conversation"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-muted-foreground mb-10 font-caveat text-xl"
        >
          "Let's build, automate, or create something meaningful."
        </motion.p>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-input border-glass-border focus:border-primary"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input border-glass-border focus:border-primary"
              />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="bg-input border-glass-border focus:border-primary min-h-[150px]"
              />
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_30px_hsl(30_45%_64%_/_0.4)]"
            >
              <Send className="mr-2 h-4 w-4" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </GlassCard>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center space-x-8 mt-10"
        >
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110"
              aria-label={link.label}
            >
              <link.icon size={28} />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
