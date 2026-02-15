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
    color: "cyan",
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
