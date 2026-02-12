import { useState } from "react";
import { motion } from "framer-motion";
import { Code2, BarChart3, Cloud, ChevronDown } from "lucide-react";

const cards = [
  {
    icon: Code2,
    title: "Full-Stack Solutions",
    desc: "End-to-end web applications with React, Node.js, and cloud deployment.",
    color: "cyan",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Insights",
    desc: "Analytics pipelines, ML models, and visualization dashboards that drive decisions.",
    color: "magenta",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    desc: "Scalable AWS architectures with event-driven pipelines and serverless computing.",
    color: "gold",
  },
];

const stats = [
  { value: "6+", label: "Projects Built" },
  { value: "5", label: "Tech Stacks" },
  { value: "100%", label: "Commitment" },
  { value: "Full", label: "Stack Dev" },
];

const colorMap: Record<string, string> = {
  cyan: "border-cyan/30 hover:border-cyan/60",
  magenta: "border-magenta/30 hover:border-magenta/60",
  gold: "border-gold/30 hover:border-gold/60",
};

const glowMap: Record<string, string> = {
  cyan: "shadow-[0_0_20px_hsl(var(--cyan)/0.15)]",
  magenta: "shadow-[0_0_20px_hsl(var(--magenta)/0.15)]",
  gold: "shadow-[0_0_20px_hsl(var(--gold)/0.15)]",
};

const About = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm tracking-widest text-cyan uppercase">Who I Am</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Data-Driven{" "}
            <span className="text-gradient-main">Problem Solver</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-5"
          >
            <p className="text-muted-foreground leading-relaxed">
              I'm a B.Tech AI & ML student from Nagpur, Maharashtra, passionate about building solutions 
              that bridge the gap between data and real-world impact. My work spans from data analysis 
              and pipeline engineering to full-stack web development.
            </p>
            <p className="text-muted-foreground leading-relaxed">
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
                className={`glass rounded-xl p-5 cursor-pointer transition-all duration-300 ${colorMap[card.color]} ${
                  expanded === i ? glowMap[card.color] : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <card.icon size={20} className={`text-${card.color}`} />
                    <h3 className="font-display font-semibold">{card.title}</h3>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-muted-foreground transition-transform duration-200 ${
                      expanded === i ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {expanded === i && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-muted-foreground text-sm mt-3"
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
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-6 text-center hover:border-primary/30 transition-colors">
              <div className="text-3xl font-display font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
