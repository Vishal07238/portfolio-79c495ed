import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, BarChart3, Cloud, ChevronDown } from "lucide-react";

const cards = [
  {
    icon: Code2,
    title: "Full-Stack Solutions",
    desc: "End-to-end web applications with React, Node.js, and cloud deployment.",
    gradient: "from-[hsl(var(--electric)/0.1)] to-transparent",
    accent: "electric",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    desc: "Analytics pipelines, ML models, and visualization dashboards that drive decisions.",
    gradient: "from-[hsl(var(--violet)/0.1)] to-transparent",
    accent: "violet",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    desc: "Scalable AWS architectures with event-driven pipelines and serverless computing.",
    gradient: "from-[hsl(var(--rose)/0.1)] to-transparent",
    accent: "rose",
  },
];

const stats = [
  { value: "6+", label: "Projects Built" },
  { value: "5", label: "Tech Stacks" },
  { value: "100%", label: "Commitment" },
  { value: "Full", label: "Stack Dev" },
];

const About = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="about" className="py-28 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-xs tracking-[0.25em] text-electric uppercase">Who I Am</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            Data-Driven{" "}
            <span className="text-gradient-main">Problem Solver</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <p className="text-muted-foreground leading-[1.8] text-[15px]">
              I'm a B.Tech AI & ML student from Nagpur, Maharashtra, passionate about building solutions
              that bridge the gap between data and real-world impact. My work spans from data analysis
              and pipeline engineering to full-stack web development.
            </p>
            <p className="text-muted-foreground leading-[1.8] text-[15px]">
              Whether it's designing ETL workflows on AWS, training ML models for crop price prediction,
              or crafting responsive web apps with React and Node.js — I focus on delivering end-to-end
              systems that solve real problems.
            </p>
          </motion.div>

          {/* Interactive cards */}
          <div className="lg:col-span-7 space-y-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => setExpanded(expanded === i ? null : i)}
                className={`glass-premium rounded-xl p-6 cursor-pointer transition-all duration-500 hover:translate-y-[-2px] ${
                  expanded === i ? "glow-electric" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-lg bg-gradient-to-br ${card.gradient}`}>
                      <card.icon size={20} className={`text-${card.accent}`} />
                    </div>
                    <h3 className="font-display font-semibold text-[15px]">{card.title}</h3>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform duration-300 ${
                      expanded === i ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expanded === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-muted-foreground text-sm mt-4 leading-relaxed pl-[52px]"
                  >
                    {card.desc}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="glass-premium rounded-xl p-7 text-center group"
            >
              <div className="text-3xl font-display font-bold text-gradient-main">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-2 tracking-wider uppercase">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
