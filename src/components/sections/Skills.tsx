import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Server, Layout, Terminal, ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const skillCategories = [
  {
    icon: Database,
    title: "Data Analysis",
    color: "electric",
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
    icon: Server,
    title: "Data Engineering",
    color: "violet",
    skills: [
      { name: "ETL/ELT", level: 80 },
      { name: "Airflow", level: 72 },
      { name: "MySQL", level: 85 },
      { name: "Snowflake", level: 68 },
      { name: "AWS", level: 75 },
    ],
  },
  {
    icon: Layout,
    title: "Frontend Development",
    color: "rose",
    skills: [
      { name: "HTML", level: 92 },
      { name: "CSS", level: 88 },
      { name: "JavaScript", level: 85 },
      { name: "React.js", level: 80 },
    ],
  },
  {
    icon: Terminal,
    title: "Backend Development",
    color: "gold",
    skills: [
      { name: "Node.js", level: 82 },
      { name: "Express.js", level: 80 },
      { name: "PostgreSQL", level: 78 },
    ],
  },
];

const colorMap: Record<string, { text: string; bg: string; bar: string; glow: string }> = {
  electric: {
    text: "text-electric",
    bg: "bg-[hsl(var(--electric)/0.08)]",
    bar: "linear-gradient(90deg, hsl(var(--electric)), hsl(var(--electric) / 0.5))",
    glow: "shadow-[0_0_25px_hsl(var(--electric)/0.15)]",
  },
  violet: {
    text: "text-violet",
    bg: "bg-[hsl(var(--violet)/0.08)]",
    bar: "linear-gradient(90deg, hsl(var(--violet)), hsl(var(--violet) / 0.5))",
    glow: "shadow-[0_0_25px_hsl(var(--violet)/0.15)]",
  },
  rose: {
    text: "text-rose",
    bg: "bg-[hsl(var(--rose)/0.08)]",
    bar: "linear-gradient(90deg, hsl(var(--rose)), hsl(var(--rose) / 0.5))",
    glow: "shadow-[0_0_25px_hsl(var(--rose)/0.15)]",
  },
  gold: {
    text: "text-gold",
    bg: "bg-[hsl(var(--gold)/0.08)]",
    bar: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--gold) / 0.5))",
    glow: "shadow-[0_0_25px_hsl(var(--gold)/0.15)]",
  },
};

const AnimatedBar = ({ level, color, delay, animate }: { level: number; color: string; delay: number; animate: boolean }) => (
  <div className="h-1.5 w-full rounded-full bg-secondary/60 overflow-hidden">
    <motion.div
      className="h-full rounded-full"
      style={{ background: colorMap[color].bar }}
      initial={{ width: 0 }}
      animate={animate ? { width: `${level}%` } : { width: 0 }}
      transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
    />
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
          <span className="font-mono text-xs tracking-[0.25em] text-electric uppercase">Technical Arsenal</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            Skills &{" "}
            <span className="text-gradient-main">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {skillCategories.map((cat, i) => {
            const c = colorMap[cat.color];
            const isOpen = expanded === i;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setExpanded(isOpen ? null : i)}
                className={`glass-premium rounded-xl p-6 cursor-pointer transition-all duration-500 hover:translate-y-[-3px] ${
                  isOpen ? c.glow : ""
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg ${c.bg}`}>
                      <cat.icon size={18} className={c.text} />
                    </div>
                    <h3 className="font-display font-semibold">{cat.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground font-mono">{cat.skills.length} skills</span>
                    <ChevronDown
                      size={14}
                      className={`text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>

                {/* Skill preview tags */}
                <div className="flex flex-wrap gap-2 mb-1">
                  {cat.skills.slice(0, 3).map((skill) => (
                    <span key={skill.name} className={`px-3 py-1 rounded-full text-[11px] font-medium ${c.bg} ${c.text}`}>
                      {skill.name}
                    </span>
                  ))}
                  {cat.skills.length > 3 && !isOpen && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-secondary/50 text-muted-foreground">
                      +{cat.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Expanded bars */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pt-4 border-t border-border/30 mt-3">
                    {cat.skills.map((skill, si) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-foreground/80 font-medium">{skill.name}</span>
                          <span className={`${c.text} font-mono text-[11px]`}>{skill.level}%</span>
                        </div>
                        <AnimatedBar level={skill.level} color={cat.color} delay={si * 0.08} animate={isOpen && isVisible} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
