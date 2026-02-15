import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    role: "AWS Data Engineering Trainee",
    company: "AWS Academy Graduate – Data Engineering",
    period: "January 2026",
    location: "Online",
    description:
      "Completed AWS Academy Data Engineering training focused on cloud-based data pipelines and big data processing.",
    highlights: [
      "Designed ETL pipelines using AWS services",
      "Worked with Amazon S3, AWS Glue, and AWS Lambda",
      "Learned data warehousing and big data fundamentals",
      "Implemented data transformation workflows",
      "Gained hands-on experience with cloud data architecture",
    ],
    accent: "electric",
  },
  {
    role: "Machine Learning Intern",
    company: "iStudio",
    period: "Feb 2025 – Mar 2025",
    location: "Online",
    description:
      "Completed a 1-month Machine Learning Internship focused on building predictive models and real-world ML applications.",
    highlights: [
      "Built and trained ML models using Python and Scikit-learn",
      "Performed data preprocessing, feature engineering, and model evaluation",
      "Achieved 85%+ accuracy on prediction models",
      "Worked on real-world datasets and business problem statements",
      "Improved model performance using hyperparameter tuning",
    ],
    accent: "violet",
  },
];

const accentStyles: Record<string, { dot: string; glow: string }> = {
  electric: {
    dot: "border-electric bg-background shadow-[0_0_12px_hsl(var(--electric)/0.5)]",
    glow: "shadow-[0_0_30px_hsl(var(--electric)/0.06)]",
  },
  violet: {
    dot: "border-violet bg-background shadow-[0_0_12px_hsl(var(--violet)/0.5)]",
    glow: "shadow-[0_0_30px_hsl(var(--violet)/0.06)]",
  },
};

const Experience = () => {
  return (
    <section id="experience" className="py-28 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-xs tracking-[0.25em] text-electric uppercase">Career Journey</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            Experience &{" "}
            <span className="text-gradient-main">Internships</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Glowing vertical timeline line */}
          <div className="absolute left-[18px] md:left-[30px] top-0 bottom-0 w-px">
            <div className="h-full w-full" style={{
              background: "linear-gradient(to bottom, hsl(var(--electric) / 0.5), hsl(var(--violet) / 0.5), hsl(var(--rose) / 0.3))",
            }} />
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{
                height: "60px",
                background: "linear-gradient(to bottom, hsl(var(--electric) / 0.8), transparent)",
                filter: "blur(3px)",
              }}
              animate={{ top: ["0%", "90%", "0%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="space-y-10">
            {experiences.map((exp, i) => {
              const s = accentStyles[exp.accent];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="relative pl-12 md:pl-16"
                >
                  {/* Timeline dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 + 0.1, type: "spring", stiffness: 200 }}
                    className={`absolute left-[18px] md:left-[30px] -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 ${s.dot} z-10`}
                  />

                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`glass-premium rounded-xl p-7 transition-all duration-500 group hover:${s.glow}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground group-hover:text-electric transition-colors duration-300">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1.5">
                          <Briefcase size={13} className="text-violet" />
                          <span>{exp.company}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-[11px] text-muted-foreground font-mono shrink-0">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={11} className="text-electric" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={11} className="text-rose" />
                          <span>{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{exp.description}</p>

                    <div className="space-y-2.5">
                      {exp.highlights.map((h, hi) => (
                        <motion.div
                          key={hi}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.15 + hi * 0.04 }}
                          className="flex items-start gap-3 text-sm text-muted-foreground group-hover:text-foreground/70 transition-colors"
                        >
                          <span className="text-electric mt-1 flex-shrink-0 text-xs">▸</span>
                          <span>{h}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
