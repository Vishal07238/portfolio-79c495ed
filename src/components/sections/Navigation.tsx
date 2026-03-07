import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const resumeUrl = "/resume/Vishal_Arkalwar_Data_Engineer_Resume.pdf";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Resume", href: resumeUrl, external: true },
  { label: "Contact", href: "#contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map((item) => item.href.substring(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("light");
  };

  const handleClick = (item: typeof navItems[0]) => {
    setIsOpen(false);
    if (item.external) {
      window.open(item.href, "_blank");
    } else {
      document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ${
        scrolled
          ? "glass-strong shadow-lg shadow-[hsl(var(--electric)/0.08)]"
          : "glass"
      } rounded-2xl px-5 py-2.5 max-w-4xl w-[95%] md:w-auto`}
    >
      <div className="flex items-center justify-between gap-6">
        <button
          onClick={() => handleClick({ label: "Home", href: "#home" })}
          className="font-display text-lg font-bold text-gradient-cyan tracking-tight"
        >
          VA.
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-0.5">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className={`relative text-[13px] font-medium px-3 py-1.5 rounded-lg transition-all duration-300 ${
                activeSection === item.href
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {activeSection === item.href && (
                <motion.span
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--electric) / 0.12), hsl(var(--violet) / 0.08))",
                    border: "1px solid hsl(var(--electric) / 0.15)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  <Sun size={15} className="text-gold" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                >
                  <Moon size={15} className="text-primary" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground p-1">
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden mt-2"
          >
            <div className="flex flex-col gap-0.5 pb-2">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleClick(item.href)}
                  className={`text-sm px-3 py-2 rounded-lg transition-colors text-left ${
                    activeSection === item.href
                      ? "text-foreground bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
