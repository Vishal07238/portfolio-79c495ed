import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, MessageSquare, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROFILE_IMG = "https://res.cloudinary.com/dchf1b4ci/image/upload/v1770040095/profile.jpg_mpswjd.jpg";

const roles = [
  "Full-Stack Developer",
  "Data Analyst",
  "Pipeline Engineer",
  "ML Engineer",
  "Cloud Architect",
];

const stats = [
  { value: "6+", label: "Projects" },
  { value: "5", label: "Tech Stacks" },
  { value: "E2E", label: "Solutions" },
];

// Particle background component
const ParticleGrid = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 4 + 3,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(var(--cyan))" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

// Typing effect hook
function useTypingEffect(words: string[], typingSpeed = 80, pauseTime = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setDisplay(word.substring(0, charIndex + 1));
          setCharIndex((c) => c + 1);
          if (charIndex + 1 === word.length) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          setDisplay(word.substring(0, charIndex - 1));
          setCharIndex((c) => c - 1);
          if (charIndex - 1 === 0) {
            setIsDeleting(false);
            setWordIndex((w) => (w + 1) % words.length);
          }
        }
      },
      isDeleting ? typingSpeed / 2 : typingSpeed
    );
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, typingSpeed, pauseTime]);

  return display;
}

const Hero = () => {
  const typedRole = useTypingEffect(roles);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-16">
      <ParticleGrid />

      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.08, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-10 w-72 h-72 bg-[hsl(var(--cyan))] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.07, 0.04] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-[hsl(var(--magenta))] rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 12, repeat: Infinity, delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(var(--gold))] rounded-full blur-[150px]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-3 rounded-2xl border border-dashed border-primary/20"
              />
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[hsl(var(--cyan))] via-[hsl(var(--magenta)/0.5)] to-[hsl(var(--gold))] opacity-60 blur-md group-hover:opacity-80 transition-opacity duration-500" />
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan rounded-tl-lg" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-magenta rounded-br-lg" />
              <img
                src={PROFILE_IMG}
                alt="Vishal Arkalwar"
                className="relative rounded-2xl w-72 h-80 lg:w-80 lg:h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-mono text-sm tracking-widest text-cyan uppercase flex items-center gap-2"
            >
              <span className="w-8 h-px bg-cyan" />
              <span>{typedRole}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-0.5 h-4 bg-cyan inline-block"
              />
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
              Vishal{" "}
              <span className="text-gradient-main">Arkalwar</span>
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="h-1 bg-gradient-to-r from-cyan via-magenta to-gold rounded-full overflow-hidden"
            />

            {/* Stats */}
            <div className="flex gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  className="text-center"
                >
                  <motion.div
                    className="text-2xl font-display font-bold text-primary"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.15, type: "spring" }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-xl text-lg">
              Building real-world solutions across the full stack. Data analyst, pipeline engineer, 
              and full-stack developer crafting end-to-end systems from ML models to cloud infrastructure.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                onClick={() => scrollTo("#projects")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6 group"
              >
                <ExternalLink size={16} className="group-hover:rotate-12 transition-transform" />
                Explore Work
              </Button>
              <Button
                onClick={() => scrollTo("#contact")}
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 gap-2 px-6"
              >
                <MessageSquare size={16} />
                Let's Connect
              </Button>
              <Button
                asChild
                variant="ghost"
                className="text-gold hover:text-gold hover:bg-gold/10 gap-2 px-6"
              >
                <a href="#contact">
                  <Download size={16} />
                  Resume
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={16} className="text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
