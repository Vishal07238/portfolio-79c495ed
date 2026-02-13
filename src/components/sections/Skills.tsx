import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Server, Layout, Terminal, ChevronDown } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const skillCategories = [
  {
    icon: Database,
    title: "Data Analysis",
    color: "cyan",
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
    color: "magenta",
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
    color: "purple",
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

const colorClasses: Record<string, { border: string; bg: string; text: string; glow: string; bar: string }> = {
  cyan: {
    border: "border-cyan/30 hover:border-cyan/60",
    bg: "bg-cyan/10",
    text: "text-cyan",
    glow: "shadow-[0_0_25px_hsl(var(--cyan)/0.2)]",
    bar: "bg-gradient-to-r from-cyan to-cyan/60",
  },
  magenta: {
    border: "border-magenta/30 hover:border-magenta/60",
    bg: "bg-magenta/10",
    text: "text-magenta",
    glow: "shadow-[0_0_25px_hsl(var(--magenta)/0.2)]",
    bar: "bg-gradient-to-r from-magenta to-magenta/60",
  },
  purple: {
    border: "border-purple/30 hover:border-purple/60",
    bg: "bg-purple/10",
    text: "text-purple",
    glow: "shadow-[0_0_25px_hsl(var(--purple)/0.2)]",
    bar: "bg-gradient-to-r from-purple to-purple/60",
  },
  gold: {
    border: "border-gold/30 hover:border-gold/60",
    bg: "bg-gold/10",
    text: "text-gold",
    glow: "shadow-[0_0_25px_hsl(var(--gold)/0.2)]",
    bar: "bg-gradient-to-r from-gold to-gold/60",
  },
};

const AnimatedBar = ({ level, color, delay, animate }: { level: number; color: string; delay: number; animate: boolean }) => (
  <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
    <motion.div
      className={`h-full rounded-full ${colorClasses[color].bar}`}
      initial={{ width: 0 }}
      animate={animate ? { width: `${level}%` } : { width: 0 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  </div>
);

const Skills = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const { ref, isVisible } = useScrollReveal(0.2);

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-[hsl(var(--cyan)/0.03)] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm tracking-widest text-cyan uppercase">Technical Arsenal</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Skills &{" "}
            <span className="text-gradient-main">Expertise</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => {
            const c = colorClasses[cat.color];
            const isOpen = expanded === i;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setExpanded(isOpen ? null : i)}
                className={`glass rounded-xl p-6 cursor-pointer transition-all duration-300 ${c.border} ${
                  isOpen ? c.glow : ""
                } hover:scale-[1.02]`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className={`p-2 rounded-lg ${c.bg}`}
                    >
                      <cat.icon size={20} className={c.text} />
                    </motion.div>
                    <h3 className="font-display font-semibold text-lg">{cat.title}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-mono">{cat.skills.length} skills</span>
                    <ChevronDown
                      size={16}
                      className={`text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </div>

                {/* Skill preview tags (always visible) */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {cat.skills.slice(0, 3).map((skill) => (
                    <span key={skill.name} className={`px-3 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text} border border-current/20`}>
                      {skill.name}
                    </span>
                  ))}
                  {cat.skills.length > 3 && !isOpen && (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-muted-foreground">
                      +{cat.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Expanded: animated bars */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 pt-4 border-t border-border/50 mt-2">
                    {cat.skills.map((skill, si) => (
                      <div key={skill.name} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-foreground font-medium">{skill.name}</span>
                          <span className={`${c.text} font-mono`}>{skill.level}%</span>
                        </div>
                        <AnimatedBar level={skill.level} color={cat.color} delay={si * 0.1} animate={isOpen && isVisible} />
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
