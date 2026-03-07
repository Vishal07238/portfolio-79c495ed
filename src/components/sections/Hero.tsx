import { useEffect, useState, useMemo, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ExternalLink, MessageSquare, Download, Sparkles } from "lucide-react";
import profileImg from "@/assets/vishal-profile.jpeg";

const roles = [
  "Full-Stack Developer",
  "Data Analyst",
  "Pipeline Engineer",
  "ML Engineer",
  "Cloud Architect",
];

const stats = [
  { value: 6, suffix: "+", label: "Projects" },
  { value: 5, suffix: "", label: "Tech Stacks" },
  { value: 100, suffix: "%", label: "Commitment" },
];

// Animated counter
const Counter = ({ value, suffix, delay }: { value: number; suffix: string; delay: number }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let current = 0;
    const step = Math.max(1, Math.floor(value / 30));
    const interval = setInterval(() => {
      current += step;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [started, value]);

  return <>{count}{suffix}</>;
};

// Animated mesh background with connecting lines
const MeshBackground = () => {
  const nodes = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 0.5,
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
          animate={{ y: [0, -25, 0], opacity: [0.1, 0.6, 0.1], scale: [1, 1.5, 1] }}
          transition={{ duration: n.duration, delay: n.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
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

// 3D tilt effect for profile image
const TiltImage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative group perspective-[1000px]"
    >
      {/* Rotating border */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-4 rounded-2xl opacity-40"
        style={{ border: "1px dashed hsl(var(--electric) / 0.3)" }}
      />
      {/* Gradient glow */}
      <motion.div
        className="absolute -inset-1.5 rounded-2xl opacity-40 blur-lg"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          background: "linear-gradient(135deg, hsl(var(--electric) / 0.4), hsl(var(--violet) / 0.3), hsl(var(--rose) / 0.2))",
        }}
      />
      {/* Corner accents with pulse */}
      {[
        { pos: "-top-3 -left-3", border: "border-t-2 border-l-2 rounded-tl-lg", color: "hsl(var(--electric))" },
        { pos: "-bottom-3 -right-3", border: "border-b-2 border-r-2 rounded-br-lg", color: "hsl(var(--violet))" },
        { pos: "-top-3 -right-3", border: "border-t-2 border-r-2 rounded-tr-lg", color: "hsl(var(--rose) / 0.5)" },
        { pos: "-bottom-3 -left-3", border: "border-b-2 border-l-2 rounded-bl-lg", color: "hsl(var(--electric) / 0.5)" },
      ].map((c, i) => (
        <motion.div
          key={i}
          className={`absolute ${c.pos} w-6 h-6 ${c.border}`}
          style={{ borderColor: c.color }}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
        />
      ))}
      {/* Shine overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl z-20 pointer-events-none"
        style={{
          background: "linear-gradient(105deg, transparent 40%, hsl(var(--electric) / 0.1) 45%, transparent 50%)",
        }}
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
      />
      <img
        src={profileImg}
        alt="Vishal Arkalwar"
        className="relative rounded-2xl w-72 h-80 lg:w-80 lg:h-96 object-cover z-10"
        style={{ transform: "translateZ(20px)" }}
      />
    </motion.div>
  );
};

const Hero = () => {
  const typedRole = useTypingEffect(roles);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-16">
      <MeshBackground />

      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.04, 0.1, 0.04] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-10 right-20 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{ background: "hsl(var(--electric))" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.07, 0.03] }}
          transition={{ duration: 12, repeat: Infinity, delay: 3 }}
          className="absolute bottom-20 left-10 w-[400px] h-[400px] rounded-full blur-[130px]"
          style={{ background: "hsl(var(--violet))" }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 14, repeat: Infinity, delay: 6 }}
          className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full blur-[120px]"
          style={{ background: "hsl(var(--rose))" }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Profile Image with 3D tilt */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end order-2 lg:order-1">
            <TiltImage />
          </div>

          {/* Content with staggered reveals */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-7 order-1 lg:order-2"
          >
            <motion.div
              variants={itemVariants}
              className="font-mono text-sm tracking-[0.2em] text-electric uppercase flex items-center gap-3"
            >
              <motion.span
                className="w-10 h-px bg-electric"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
              <span>{typedRole}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="w-0.5 h-4 bg-electric inline-block"
              />
            </motion.div>

            <motion.h1 variants={itemVariants} className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Vishal{" "}
              </motion.span>
              <motion.span
                className="text-gradient-main inline-block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                Arkalwar
              </motion.span>
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="h-0.5 rounded-full overflow-hidden"
              style={{ background: "linear-gradient(90deg, hsl(var(--electric)), hsl(var(--violet)), hsl(var(--rose)))" }}
            />

            {/* Animated counter stats */}
            <motion.div variants={itemVariants} className="flex gap-10">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.1, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="cursor-default"
                >
                  <div className="text-2xl font-display font-bold text-electric">
                    <Counter value={stat.value} suffix={stat.suffix} delay={0.8 + i * 0.2} />
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            <motion.p variants={itemVariants} className="text-muted-foreground leading-relaxed max-w-lg text-[17px]">
              Building real-world solutions across the full stack. Data analyst, pipeline engineer,
              and full-stack developer crafting end-to-end systems from ML models to cloud infrastructure.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-3">
              <motion.button
                onClick={() => scrollTo("#projects")}
                className="btn-premium flex items-center gap-2 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Sparkles size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                Explore Work
              </motion.button>
              <motion.button
                onClick={() => scrollTo("#contact")}
                className="btn-outline-premium flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageSquare size={16} />
                Let's Connect
              </motion.button>
              <motion.a
                href="/resume/Vishal_Arkalwar_Data_Engineer_Resume.pdf"
                download="Vishal_Arkalwar_Data_Engineer_Resume.pdf"
                className="btn-outline-premium flex items-center gap-2"
                style={{ borderColor: "hsl(var(--gold) / 0.3)", color: "hsl(var(--gold))" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download size={16} />
                Resume
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
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
