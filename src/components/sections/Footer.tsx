import { Github } from "lucide-react";

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
    <footer className="border-t border-border py-12">
      {/* Gradient divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan to-transparent mb-12 -mt-12" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Vishal07238"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
              <span className="font-display text-xl font-bold text-gradient-cyan">Dev</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Full-stack AI engineer & data professional building end-to-end solutions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
              Connect
            </h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:vishalarkalwar2@gmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                vishalarkalwar2@gmail.com
              </a>
              <a href="https://github.com/Vishal07238" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                GitHub
              </a>
              <span className="text-sm text-muted-foreground">Nagpur, Maharashtra</span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Vishal Arkalwar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
