import { motion } from "framer-motion";
import { Award, ExternalLink, Shield, Star, Trophy } from "lucide-react";

const certifications = [
  { title: "Fundamentals of Deep Learning", issuer: "NVIDIA", icon: Shield, color: "electric", pdf: "https://drive.google.com/file/d/1XWJ1NMqf7jcso1Et5JQpDpJ4Un5R5hmR/view?usp=sharing" },
  { title: "AWS Academy Graduate – Data Engineering", issuer: "Amazon Web Services", icon: Shield, color: "gold", pdf: "https://drive.google.com/file/d/1ypYWxHEdqGprCzYcLf6F-pg0W-e2gNvW/view?usp=sharing" },
  { title: "SQL (Basic) Certificate", issuer: "HackerRank", icon: Star, color: "violet", pdf: "https://drive.google.com/file/d/1NEpx5hfkr8LEtcqr8iiaYOucikDPT-Dr/view?usp=sharing" },
  { title: "Machine Learning Internship", issuer: "iStudio", icon: Award, color: "rose", pdf: "https://drive.google.com/file/d/1JqigHZxUi6ydy8-86W54XqYv8_A5ia61/view?usp=sharing" },
];

const achievements = [
  "B.Tech AI & ML — 3rd Year Student with consistent academic performance",
  "Built 6+ production-ready projects spanning data analysis, cloud pipelines, and full-stack applications",
  "Designed event-driven pipelines processing real-world e-commerce datasets on AWS",
  "Developed ML model achieving 85%+ accuracy for agricultural price prediction",
];

const colorMap: Record<string, { bg: string; text: string; glow: string }> = {
  electric: { bg: "bg-[hsl(var(--electric)/0.08)]", text: "text-electric", glow: "hsl(var(--electric) / 0.15)" },
  violet: { bg: "bg-[hsl(var(--violet)/0.08)]", text: "text-violet", glow: "hsl(var(--violet) / 0.15)" },
  rose: { bg: "bg-[hsl(var(--rose)/0.08)]", text: "text-rose", glow: "hsl(var(--rose) / 0.15)" },
  gold: { bg: "bg-[hsl(var(--gold)/0.08)]", text: "text-gold", glow: "hsl(var(--gold) / 0.15)" },
};

const Certifications = () => {
  const getCertificateHref = (pdfPath: string) => {
    if (typeof window === "undefined") return pdfPath;

    const token = new URLSearchParams(window.location.search).get("__lovable_token");
    if (!token) return pdfPath;

    const url = new URL(pdfPath, window.location.origin);
    url.searchParams.set("__lovable_token", token);

    return `${url.pathname}${url.search}`;
  };

  return (
    <section id="certifications" className="py-28 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div className="flex items-center gap-2 mb-4">
            <Trophy size={14} className="text-gold" />
            <span className="font-mono text-xs tracking-[0.25em] text-electric uppercase">Recognition</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Certifications &{" "}
            <span className="text-gradient-main">Achievements</span>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-0.5 mt-4 rounded-full"
            style={{ background: "linear-gradient(90deg, hsl(var(--gold)), hsl(var(--electric)))" }}
          />
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
                <motion.a
                  key={i}
                  href={getCertificateHref(cert.pdf)}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -30, scale: 0.95 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ x: 6, y: -3, boxShadow: `0 8px 30px ${c.glow}` }}
                  className="glass-premium rounded-xl p-5 flex items-center gap-4 transition-all duration-500 cursor-pointer group relative overflow-hidden block"
                >
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(105deg, transparent 40%, hsl(var(--foreground) / 0.03) 45%, transparent 50%)",
                    }}
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.6 }}
                  />
                  <motion.div
                    whileHover={{ rotate: 15, scale: 1.15 }}
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
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink size={13} className="text-muted-foreground" />
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Achievements */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 flex items-center gap-2.5">
              <Star size={18} className="text-gold" />
              Key Achievements
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-premium rounded-xl p-7 space-y-5"
            >
              {achievements.map((ach, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ x: 8 }}
                  className="flex items-start gap-4 group cursor-default"
                >
                  <motion.div
                    whileInView={{ scale: [0, 1.5, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, type: "spring" }}
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0 relative"
                    style={{ background: "linear-gradient(135deg, hsl(var(--electric)), hsl(var(--violet)))" }}
                  >
                    {/* Pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: "linear-gradient(135deg, hsl(var(--electric)), hsl(var(--violet)))" }}
                      animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  </motion.div>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                    {ach}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
