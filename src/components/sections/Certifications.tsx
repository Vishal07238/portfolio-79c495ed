import { motion } from "framer-motion";
import { Award, ExternalLink, Shield, Star } from "lucide-react";

const certifications = [
  {
    title: "AWS Cloud Foundations",
    issuer: "Amazon Web Services",
    icon: Shield,
    color: "gold",
  },
  {
    title: "Python for Data Science",
    issuer: "IBM / Coursera",
    icon: Award,
    color: "cyan",
  },
  {
    title: "SQL & Database Management",
    issuer: "HackerRank",
    icon: Star,
    color: "magenta",
  },
  {
    title: "Full-Stack Web Development",
    issuer: "Udemy",
    icon: Award,
    color: "purple",
  },
];

const achievements = [
  "B.Tech AI & ML — 3rd Year Student with consistent academic performance",
  "Built 6+ production-ready projects spanning data analysis, cloud pipelines, and full-stack applications",
  "Designed event-driven pipelines processing real-world e-commerce datasets on AWS",
  "Developed ML model achieving 85%+ accuracy for agricultural price prediction",
];

const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
  cyan: { bg: "bg-cyan/10", text: "text-cyan", border: "border-cyan/30 hover:border-cyan/60" },
  magenta: { bg: "bg-magenta/10", text: "text-magenta", border: "border-magenta/30 hover:border-magenta/60" },
  gold: { bg: "bg-gold/10", text: "text-gold", border: "border-gold/30 hover:border-gold/60" },
  purple: { bg: "bg-purple/10", text: "text-purple", border: "border-purple/30 hover:border-purple/60" },
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[hsl(var(--purple)/0.03)] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm tracking-widest text-cyan uppercase">Recognition</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Certifications &{" "}
            <span className="text-gradient-main">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
              <Award size={20} className="text-primary" />
              Certifications
            </h3>
            {certifications.map((cert, i) => {
              const c = colorClasses[cert.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass rounded-xl p-5 flex items-center gap-4 ${c.border} transition-all duration-300 hover:scale-[1.02] cursor-default group`}
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className={`p-3 rounded-lg ${c.bg} flex-shrink-0`}
                  >
                    <cert.icon size={22} className={c.text} />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                  <ExternalLink size={14} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              );
            })}
          </div>

          {/* Achievements */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
              <Star size={20} className="text-gold" />
              Key Achievements
            </h3>
            <div className="glass rounded-xl p-6 space-y-4">
              {achievements.map((ach, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 group"
                >
                  <motion.div
                    whileInView={{ scale: [0, 1.2, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2 }}
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan to-magenta mt-2 flex-shrink-0"
                  />
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                    {ach}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
