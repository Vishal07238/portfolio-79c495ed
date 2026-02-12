import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const PROFILE_IMG = "https://res.cloudinary.com/dchf1b4ci/image/upload/v1770040095/profile.jpg_mpswjd.jpg";

const stats = [
  { value: "6+", label: "Projects" },
  { value: "5", label: "Tech Stacks" },
  { value: "E2E", label: "Solutions" },
];

const Hero = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-24 pb-16">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[hsl(var(--cyan)/0.05)] rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[hsl(var(--magenta)/0.04)] rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[hsl(var(--gold)/0.02)] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[hsl(var(--cyan))] via-[hsl(var(--magenta)/0.5)] to-[hsl(var(--gold))] opacity-60 blur-md group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Corner accents */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-cyan rounded-tl-lg" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-magenta rounded-br-lg" />
              
              <img
                src={PROFILE_IMG}
                alt="Vishal Arkalwar"
                className="relative rounded-2xl w-72 h-80 lg:w-80 lg:h-96 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="font-mono text-sm tracking-widest text-cyan uppercase">
              Full-Stack AI Engineer
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight">
              Vishal{" "}
              <span className="text-gradient-main">Arkalwar</span>
            </h1>

            {/* Accent line */}
            <div className="h-1 w-24 bg-gradient-to-r from-cyan via-magenta to-gold rounded-full" />

            {/* Stats */}
            <div className="flex gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-display font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-xl text-lg">
              Building real-world solutions across the full stack. Data analyst, pipeline engineer, 
              and full-stack developer crafting end-to-end systems from ML models to cloud infrastructure.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Button
                onClick={() => scrollTo("#projects")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6"
              >
                <ExternalLink size={16} />
                Explore Work
              </Button>
              <Button
                onClick={() => scrollTo("#contact")}
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 gap-2 px-6"
              >
                <MessageSquare size={16} />
                Let's Connect
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={16} className="text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
