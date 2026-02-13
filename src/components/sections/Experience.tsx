import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Freelance / Academic Projects",
    period: "2023 – Present",
    location: "Nagpur, Maharashtra",
    description:
      "Building end-to-end web applications and data pipelines. Developed multiple production-ready projects including AI-powered agriculture platforms, real-time volunteer management systems, and cloud-based data pipelines on AWS.",
    highlights: [
      "Designed event-driven data pipelines using AWS S3, Lambda, and Glue",
      "Built responsive React applications with real-time WebSocket features",
      "Implemented ML models for crop price prediction with 85%+ accuracy",
      "Created REST APIs with JWT authentication and role-based access control",
    ],
    color: "cyan",
  },
  {
    role: "Data Analyst Intern",
    company: "Academic Research",
    period: "2023",
    location: "Nagpur, Maharashtra",
    description:
      "Conducted customer behavior analysis using clustering algorithms and built interactive Power BI dashboards for data visualization and business insights.",
    highlights: [
      "Processed and cleaned large datasets using Python and SQL",
      "Applied K-Means clustering for customer segmentation",
      "Created interactive Power BI dashboards for stakeholder presentations",
      "Identified 5 distinct customer segments improving targeting by 25%",
    ],
    color: "magenta",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-[hsl(var(--gold)/0.03)] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm tracking-widest text-cyan uppercase">Career Journey</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Experience &{" "}
            <span className="text-gradient-main">Internships</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan via-magenta to-gold" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative pl-8 md:pl-20"
              >
                {/* Timeline dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 + 0.1, type: "spring" }}
                  className={`absolute left-0 md:left-8 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-${exp.color} bg-background shadow-[0_0_10px_hsl(var(--${exp.color})/0.4)]`}
                />

                <div className="glass rounded-xl p-6 hover:border-primary/30 transition-all duration-300 group hover:shadow-[0_0_30px_hsl(var(--cyan)/0.08)]">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-display text-xl font-bold text-primary group-hover:text-cyan transition-colors">
                        {exp.role}
                      </h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                        <Briefcase size={14} />
                        <span>{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={12} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{exp.description}</p>

                  <div className="space-y-2">
                    {exp.highlights.map((h, hi) => (
                      <motion.div
                        key={hi}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 + hi * 0.05 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="text-cyan mt-1.5 flex-shrink-0">▹</span>
                        <span>{h}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
