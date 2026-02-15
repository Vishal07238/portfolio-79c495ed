import { motion } from "framer-motion";
import { Award, ExternalLink, Shield, Star } from "lucide-react";

const certifications = [
  { title: "AWS Cloud Foundations", issuer: "Amazon Web Services", icon: Shield, color: "gold" },
  { title: "Python for Data Science", issuer: "IBM / Coursera", icon: Award, color: "electric" },
  { title: "SQL & Database Management", issuer: "HackerRank", icon: Star, color: "violet" },
  { title: "Full-Stack Web Development", issuer: "Udemy", icon: Award, color: "rose" },
];

const achievements = [
  "B.Tech AI & ML — 3rd Year Student with consistent academic performance",
  "Built 6+ production-ready projects spanning data analysis, cloud pipelines, and full-stack applications",
  "Designed event-driven pipelines processing real-world e-commerce datasets on AWS",
  "Developed ML model achieving 85%+ accuracy for agricultural price prediction",
];

const colorMap: Record<string, { bg: string; text: string }> = {
  electric: { bg: "bg-[hsl(var(--electric)/0.08)]", text: "text-electric" },
  violet: { bg: "bg-[hsl(var(--violet)/0.08)]", text: "text-violet" },
  rose: { bg: "bg-[hsl(var(--rose)/0.08)]", text: "text-rose" },
  gold: { bg: "bg-[hsl(var(--gold)/0.08)]", text: "text-gold" },
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-28 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-xs tracking-[0.25em] text-electric uppercase">Recognition</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 tracking-tight">
            Certifications &{" "}
            <span className="text-gradient-main">Achievements</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold mb-6 flex items-center gap-2.5">
              <Award size={18} className="text-electric" />
              Certifications
            </h3>
            {certifications.map((cert, i) => {
              const c = colorMap[cert.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 4, y: -2 }}
                  className="glass-premium rounded-xl p-5 flex items-center gap-4 transition-all duration-500 cursor-default group"
                >
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className={`p-3 rounded-lg ${c.bg} flex-shrink-0`}
                  >
                    <cert.icon size={20} className={c.text} />
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-display font-semibold text-[15px] text-foreground group-hover:text-electric transition-colors duration-300">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-0.5">{cert.issuer}</p>
                  </div>
                  <ExternalLink size={13} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              );
            })}
          </div>

          {/* Achievements */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 flex items-center gap-2.5">
              <Star size={18} className="text-gold" />
              Key Achievements
            </h3>
            <div className="glass-premium rounded-xl p-7 space-y-5">
              {achievements.map((ach, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-4 group"
                >
                  <motion.div
                    whileInView={{ scale: [0, 1.3, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 + 0.15 }}
                    className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, hsl(var(--electric)), hsl(var(--violet)))" }}
                  />
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
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
