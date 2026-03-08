import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Server, Layout, Terminal, ChevronDown, Zap } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const skillCategories = [
  {
    icon: Database, title: "Data Analysis", color: "electric",
    skills: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 88 },
      { name: "Pandas", level: 85 },
      { name: "NumPy", level: 82 },
      { name: "Matplotlib", level: 78 },
      { name: "Power BI", level: 75 },
    ],
  },
  {
    icon: Server, title: "Data Engineering", color: "violet",
    skills: [
      { name: "ETL/ELT", level: 80 },
      { name: "Airflow", level: 72 },
      { name: "MySQL", level: 85 },
      { name: "Snowflake", level: 68 },
      { name: "AWS", level: 75 },
    ],
  },
  {
    icon: Layout, title: "Frontend Development", color: "rose",
    skills: [
      { name: "HTML", level: 92 },
      { name: "CSS", level: 88 },
      { name: "JavaScript", level: 85 },
      { name: "React.js", level: 80 },
    ],
  },
  {
    icon: Terminal, title: "Backend Development", color: "gold",
    skills: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 80 },
      { name: "PostgreSQL", level: 78 },
    ],
  },
  {
    icon: Database, title: "Machine Learning", color: "violet",
    skills: [
      { name: "Scikit-learn", level: 80 },
      { name: "TensorFlow", level: 75 },
      { name: "Deep Learning", level: 72 },
      { name: "Model Training", level: 78 },
    ],
  },
];

const colorMap: Record<string, { text: string; bg: string; bar: string; glow: string; border: string }> = {
  electric: {
    text: "text-electric", bg: "bg-[hsl(var(--electric)/0.08)]",
    bar: "linear-gradient(90deg, hsl(var(--electric)), hsl(var(--electric) / 0.5))",
    glow: "shadow-[0_0_25px_hsl(var(--electric)/0.15)]",
    border: "hsl(var(--electric) / 0.3)",
  },
  violet: {
    text: "text-violet", bg: "bg-[hsl(var(--violet)/0.08)]",
    bar: "linear-gradient(90deg, hsl(var(--violet)), hsl(var(--violet) / 0.5))",
    glow: "shadow-[0_0_25px_hsl(var(--violet)/0.15)]",
    border: "hsl(var(--violet) / 0.3)",
  },
  rose: {
    text: "text-rose", bg: "bg-[hsl(var(--rose)/0.08)]",
    bar: "linear-gradient(90deg, hsl(var(--rose)), hsl(var(--rose) / 0.5))",
    glow: "shadow-[0_0_25px_hsl(var(--rose)/0.15)]",
    border: "hsl(var(--rose) / 0.3)",
  },
  gold: {
    text: "text-gold", bg: "bg-[hsl(var(--gold)/0.08)]",
    bar: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--gold) / 0.5))",
    glow: "shadow-[0_0_25px_hsl(var(--gold)/0.15)]",
    border: "hsl(var(--gold) / 0.3)",
  },
};

const AnimatedBar = ({ level, color, delay, animate }: { level: number; color: string; delay: number; animate: boolean }) => (
  <div className="h-1.5 w-full rounded-full bg-secondary/60 overflow-hidden relative">
    <motion.div
      className="h-full rounded-full relative"
      style={{ background: colorMap[color].bar }}
      initial={{ width: 0 }}
      animate={animate ? { width: `${level}%` } : { width: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Shimmer effect on bar */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={animate ? { backgroundPosition: ["200% 0", "-200% 0"] } : {}}
        transition={{ duration: 2, delay: delay + 1, repeat: Infinity, repeatDelay: 3 }}
      />
    </motion.div>
  </div>
);

const Skills = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="skills" className="py-28 relative" ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div className="flex items-center gap-2 mb-4">
            <Zap size={14} className="text-electric" />
            <span className="font-mono text-xs tracking-[0.25em] text-electric uppercase">Technical Arsenal</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Skills &{" "}
            <span className="text-gradient-main">Expertise</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-0.5 mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(var(--electric)), hsl(var(--violet)))" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillCategories.map((cat, i) => {
            const c = colorMap[cat.color];
            const isOpen = expanded === i;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                onClick={() => setExpanded(isOpen ? null : i)}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`glass-premium rounded-xl p-6 cursor-pointer transition-all duration-500 ${
                  isOpen ? c.glow : ""
                }`}
                style={isOpen ? { borderColor: c.border } : {}}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`p-2.5 rounded-lg ${c.bg}`}
                      animate={isOpen ? { rotate: [0, 10, -10, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      <cat.icon size={18} className={c.text} />
                    </motion.div>
                    <h3 className="font-display font-semibold">{cat.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground font-mono">{cat.skills.length} skills</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={14} className="text-muted-foreground" />
                    </motion.div>
                  </div>
                </div>

                {/* Skill preview tags with staggered animation */}
                <div className="flex flex-wrap gap-2 mb-1">
                  {cat.skills.slice(0, isOpen ? 0 : 3).map((skill, si) => (
                    <motion.span
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ delay: si * 0.05 }}
                      className={`px-3 py-1 rounded-full text-[11px] font-medium ${c.bg} ${c.text}`}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                  {cat.skills.length > 3 && !isOpen && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-secondary/50 text-muted-foreground">
                      +{cat.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Expanded bars */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="space-y-3 pt-4 border-t border-border/30 mt-3">
                        {cat.skills.map((skill, si) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: si * 0.06 }}
                            className="space-y-1.5"
                          >
                            <div className="flex justify-between text-xs">
                              <span className="text-foreground/80 font-medium">{skill.name}</span>
                              <motion.span
                                className={`${c.text} font-mono text-[11px]`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: si * 0.06 + 0.3 }}
                              >
                                {skill.level}%
                              </motion.span>
                            </div>
                            <AnimatedBar level={skill.level} color={cat.color} delay={si * 0.08} animate={isOpen && isVisible} />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
