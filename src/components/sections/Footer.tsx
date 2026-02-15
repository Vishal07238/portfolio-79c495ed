import { Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative pt-20 pb-10">
      {/* Gradient divider */}
      <div className="h-px w-full mb-16" style={{
        background: "linear-gradient(90deg, transparent, hsl(var(--electric) / 0.3), hsl(var(--violet) / 0.3), hsl(var(--rose) / 0.2), transparent)",
      }} />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="font-display text-xl font-bold text-gradient-cyan tracking-tight">VA.</div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full-stack AI engineer & data professional building end-to-end solutions that bridge data and impact.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-mono text-[11px] font-medium mb-5 uppercase tracking-[0.2em] text-muted-foreground">
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-muted-foreground hover:text-electric transition-colors duration-300 text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-mono text-[11px] font-medium mb-5 uppercase tracking-[0.2em] text-muted-foreground">
              Connect
            </h4>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:vishalarkalwar2@gmail.com" className="text-sm text-muted-foreground hover:text-electric transition-colors duration-300">
                vishalarkalwar2@gmail.com
              </a>
              <a href="https://github.com/Vishal07238" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-electric transition-colors duration-300">
                GitHub
              </a>
              <span className="text-sm text-muted-foreground">Nagpur, Maharashtra</span>
            </div>
            <div className="flex gap-3 mt-5">
              {[
                { icon: Github, href: "https://github.com/Vishal07238" },
                { icon: Linkedin, href: "https://linkedin.com" },
                { icon: Mail, href: "mailto:vishalarkalwar2@gmail.com" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-secondary/40 hover:bg-[hsl(var(--electric)/0.1)] transition-colors duration-300"
                >
                  <s.icon size={15} className="text-muted-foreground" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 text-center" style={{ borderTop: "1px solid hsl(var(--border) / 0.5)" }}>
          <p className="text-[11px] text-muted-foreground tracking-wider">
            © {new Date().getFullYear()} Vishal Arkalwar. Crafted with precision.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
