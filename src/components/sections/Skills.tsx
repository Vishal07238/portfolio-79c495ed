import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Server, Layout, Terminal, ChevronDown } from "lucide-react";

const skillCategories = [
  {
    icon: Database,
    title: "Data Analysis",
    color: "cyan",
    skills: ["Python", "SQL", "Pandas", "NumPy", "Matplotlib", "Power BI"],
  },
  {
    icon: Server,
    title: "Data Engineering",
    color: "magenta",
    skills: ["ETL/ELT", "Airflow", "MySQL", "Snowflake", "AWS"],
  },
  {
    icon: Layout,
    title: "Frontend Development",
    color: "purple",
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    icon: Terminal,
    title: "Backend Development",
    color: "gold",
    skills: ["Node.js", "Express.js", "PostgreSQL"],
  },
];

const proficiency = [
  { level: "Advanced", tags: ["Python", "SQL", "React", "Node.js"], color: "cyan" },
  { level: "Intermediate", tags: ["AWS", "Airflow", "PostgreSQL", "Power BI"], color: "magenta" },
  { level: "Foundation", tags: ["Snowflake", "Docker", "CI/CD"], color: "gold" },
];

const colorClasses: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  cyan: {
    border: "border-cyan/30 hover:border-cyan/60",
    bg: "bg-cyan/10",
    text: "text-cyan",
    glow: "shadow-[0_0_25px_hsl(var(--cyan)/0.2)]",
  },
  magenta: {
    border: "border-magenta/30 hover:border-magenta/60",
    bg: "bg-magenta/10",
    text: "text-magenta",
    glow: "shadow-[0_0_25px_hsl(var(--magenta)/0.2)]",
  },
  purple: {
    border: "border-purple/30 hover:border-purple/60",
    bg: "bg-purple/10",
    text: "text-purple",
    glow: "shadow-[0_0_25px_hsl(var(--purple)/0.2)]",
  },
  gold: {
    border: "border-gold/30 hover:border-gold/60",
    bg: "bg-gold/10",
    text: "text-gold",
    glow: "shadow-[0_0_25px_hsl(var(--gold)/0.2)]",
  },
};

const Skills = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="skills" className="py-24 relative">
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
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${c.bg}`}>
                      <cat.icon size={20} className={c.text} />
                    </div>
                    <h3 className="font-display font-semibold text-lg">{cat.title}</h3>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 pt-2">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${c.bg} ${c.text} border border-current/20`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Proficiency levels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {proficiency.map((p) => {
            const c = colorClasses[p.color];
            return (
              <div key={p.level} className={`glass rounded-xl p-5 ${c.border} transition-all duration-300`}>
                <h4 className={`font-display font-semibold mb-3 ${c.text}`}>{p.level}</h4>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-xs rounded-md bg-secondary text-secondary-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
