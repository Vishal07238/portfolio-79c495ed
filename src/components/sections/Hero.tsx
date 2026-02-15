import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, MessageSquare, Download } from "lucide-react";
import profileImg from "@/assets/vishal-profile.jpeg";

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

// Animated mesh background
const MeshBackground = () => {
  const nodes = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2.5 + 0.5,
        duration: Math.random() * 5 + 4,
        delay: Math.random() * 3,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {nodes.map((n) => (
        <motion.div
          key={n.id}
          className="absolute rounded-full bg-electric/15"
          style={{ left: `${n.x}%`, top: `${n.y}%`, width: n.size, height: n.size }}
          animate={{ y: [0, -25, 0], opacity: [0.15, 0.5, 0.15] }}
          transition={{ duration: n.duration, delay: n.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="text-electric" />
      </svg>
    </div>
  );
};

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
      <MeshBackground />

      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.08, 0.04] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 right-20 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{ background: "hsl(var(--electric))" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }}
          transition={{ duration: 12, repeat: Infinity, delay: 3 }}
          className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full blur-[130px]"
          style={{ background: "hsl(var(--violet))" }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.02, 0.04, 0.02] }}
          transition={{ duration: 14, repeat: Infinity, delay: 6 }}
          className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full blur-[120px]"
          style={{ background: "hsl(var(--rose))" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end order-2 lg:order-1"
          >
            <div className="relative group">
              {/* Rotating border */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 rounded-2xl opacity-40"
                style={{
                  border: "1px dashed hsl(var(--electric) / 0.3)",
                }}
              />
              {/* Gradient glow */}
              <div
                className="absolute -inset-1.5 rounded-2xl opacity-50 blur-lg group-hover:opacity-70 transition-opacity duration-700"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--electric) / 0.4), hsl(var(--violet) / 0.3), hsl(var(--rose) / 0.2))",
                }}
              />
              {/* Corner accents */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: "hsl(var(--electric))" }} />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: "hsl(var(--violet))" }} />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: "hsl(var(--rose) / 0.3)" }} />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: "hsl(var(--electric) / 0.3)" }} />
              <img
                src={profileImg}
                alt="Vishal Arkalwar"
                className="relative rounded-2xl w-72 h-80 lg:w-80 lg:h-96 object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-7 order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-mono text-sm tracking-[0.2em] text-electric uppercase flex items-center gap-3"
            >
              <span className="w-10 h-px bg-electric" />
              <span>{typedRole}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-0.5 h-4 bg-electric inline-block"
              />
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Vishal{" "}
              <span className="text-gradient-main">Arkalwar</span>
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-0.5 rounded-full overflow-hidden"
              style={{ background: "linear-gradient(90deg, hsl(var(--electric)), hsl(var(--violet)), hsl(var(--rose)))" }}
            />

            {/* Stats */}
            <div className="flex gap-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.12 }}
                >
                  <motion.div
                    className="text-2xl font-display font-bold text-electric"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.12, type: "spring", stiffness: 200 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-lg text-[17px]">
              Building real-world solutions across the full stack. Data analyst, pipeline engineer,
              and full-stack developer crafting end-to-end systems from ML models to cloud infrastructure.
            </p>

            <div className="flex flex-wrap gap-4 pt-3">
              <button onClick={() => scrollTo("#projects")} className="btn-premium flex items-center gap-2 group">
                <ExternalLink size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                Explore Work
              </button>
              <button onClick={() => scrollTo("#contact")} className="btn-outline-premium flex items-center gap-2">
                <MessageSquare size={16} />
                Let's Connect
              </button>
              <a href="#contact" className="btn-outline-premium flex items-center gap-2" style={{ borderColor: "hsl(var(--gold) / 0.3)", color: "hsl(var(--gold))" }}>
                <Download size={16} />
                Resume
              </a>
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
          <span className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} className="text-electric" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
