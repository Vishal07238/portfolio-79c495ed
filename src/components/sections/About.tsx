import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
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

// Magnetic hover card
const MagneticCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.08);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.08);
  };

  return (
    <motion.div
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 } as const,
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
  };

  return (
    <section id="about" className="py-28 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-[0.25em] text-electric uppercase"
          >
            Who I Am
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            Data-Driven{" "}
            <span className="text-gradient-main">Problem Solver</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Bio with word-by-word highlight */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
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

          {/* Interactive cards with staggered entrance */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-4"
          >
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                variants={itemVariants}
                onClick={() => setExpanded(expanded === i ? null : i)}
                whileHover={{ scale: 1.02, y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`glass-premium rounded-xl p-6 cursor-pointer transition-all duration-500 ${
                  expanded === i ? "glow-electric" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`p-2.5 rounded-lg bg-gradient-to-br ${card.gradient}`}
                      whileHover={{ rotate: 10, scale: 1.15 }}
                    >
                      <card.icon size={20} className={`text-${card.accent}`} />
                    </motion.div>
                    <h3 className="font-display font-semibold text-[15px]">{card.title}</h3>
                  </div>
                  <motion.div animate={{ rotate: expanded === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={16} className="text-muted-foreground" />
                  </motion.div>
                </div>
                <motion.div
                  initial={false}
                  animate={{ height: expanded === i ? "auto" : 0, opacity: expanded === i ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-muted-foreground text-sm mt-4 leading-relaxed pl-[52px]">
                    {card.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats row with magnetic hover */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-20"
        >
          {stats.map((stat, i) => (
            <MagneticCard key={stat.label}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ y: -6 }}
                className="glass-premium rounded-xl p-7 text-center group cursor-default"
              >
                <motion.div
                  className="text-3xl font-display font-bold text-gradient-main"
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs text-muted-foreground mt-2 tracking-wider uppercase">{stat.label}</div>
              </motion.div>
            </MagneticCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
