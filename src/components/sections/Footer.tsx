import { Github, Linkedin, Mail, Heart } from "lucide-react";
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
      {/* Animated gradient divider */}
      <motion.div
        className="h-px w-full mb-16"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--electric) / 0.4), hsl(var(--violet) / 0.4), hsl(var(--rose) / 0.3), transparent)",
          backgroundSize: "200% 100%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <motion.div
              className="font-display text-xl font-bold text-gradient-cyan tracking-tight inline-block"
              whileHover={{ scale: 1.1 }}
            >
              VA.
            </motion.div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Full-stack AI engineer & data professional building end-to-end solutions that bridge data and impact.
            </p>
          </motion.div>

          {/* Navigation with staggered reveal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
          >
            <h4 className="font-mono text-[11px] font-medium mb-5 uppercase tracking-[0.2em] text-muted-foreground">
              Navigation
            </h4>
            <div className="flex flex-col gap-2.5">
              {footerLinks.map((link) => (
                <motion.button
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -15 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  onClick={() => scrollTo(link.href)}
                  whileHover={{ x: 6, color: "hsl(var(--electric))" }}
                  className="text-sm text-muted-foreground hover:text-electric transition-colors duration-300 text-left"
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
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
                  whileHover={{ y: -4, scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-secondary/40 hover:bg-[hsl(var(--electric)/0.1)] transition-colors duration-300"
                >
                  <s.icon size={15} className="text-muted-foreground" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 pt-6 text-center"
          style={{ borderTop: "1px solid hsl(var(--border) / 0.5)" }}
        >
          <p className="text-[11px] text-muted-foreground tracking-wider flex items-center justify-center gap-1.5">
            © {new Date().getFullYear()} Vishal Arkalwar. Crafted with
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart size={10} className="text-rose fill-current" />
            </motion.span>
            and precision.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
