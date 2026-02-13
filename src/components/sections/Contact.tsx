import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Github, Linkedin, Send, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

const contactInfo = [
  { icon: Mail, label: "Email", value: "vishalarkalwar2@gmail.com", color: "cyan" },
  { icon: MapPin, label: "Location", value: "Nagpur, Maharashtra", color: "magenta" },
  { icon: Clock, label: "Response Time", value: "24-48 hours", color: "gold" },
];

const socials = [
  { icon: Github, href: "https://github.com/Vishal07238", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:vishalarkalwar2@gmail.com", label: "Email" },
];

const colorBg: Record<string, string> = {
  cyan: "bg-[hsl(var(--cyan)/0.1)]",
  magenta: "bg-[hsl(var(--magenta)/0.1)]",
  gold: "bg-[hsl(var(--gold)/0.1)]",
};

const colorText: Record<string, string> = {
  cyan: "text-cyan",
  magenta: "text-magenta",
  gold: "text-gold",
};

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://formspree.io/f/mzdadzee", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (res.ok) {
        toast.success("Thank you! Your message has been sent.");
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[hsl(var(--magenta)/0.03)] rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm tracking-widest text-cyan uppercase">Get In Touch</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Let's{" "}
            <span className="text-gradient-main">Connect</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 4 }}
                className="glass rounded-xl p-5 flex items-center gap-4 hover:border-primary/30 transition-all duration-300"
              >
                <div className={`p-3 rounded-lg ${colorBg[info.color]}`}>
                  <info.icon size={20} className={colorText[info.color]} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{info.label}</div>
                  <div className="font-medium">{info.value}</div>
                </div>
              </motion.div>
            ))}

            <div className="flex gap-4 pt-4">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.15, y: -2 }}
                  className="glass rounded-xl p-4 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_20px_hsl(var(--cyan)/0.15)]"
                >
                  <s.icon size={20} className="text-muted-foreground hover:text-primary transition-colors" />
                </motion.a>
              ))}
            </div>

            {/* Resume Download */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <Button
                variant="outline"
                className="border-gold/30 text-gold hover:bg-gold/10 gap-2 w-full"
              >
                <Download size={16} />
                Download Resume
              </Button>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass rounded-xl p-8 space-y-5 relative overflow-hidden"
          >
            {/* Animated border glow based on focus */}
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              animate={{
                boxShadow: focused
                  ? `0 0 30px hsl(var(--${focused === "email" ? "magenta" : focused === "subject" ? "gold" : "cyan"}) / 0.1)`
                  : "none",
              }}
              transition={{ duration: 0.3 }}
            />

            <div className="relative z-10 space-y-5">
              <Input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                required
                className="bg-secondary/50 border-border focus:border-cyan focus:ring-cyan/20 transition-all duration-300"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                required
                className="bg-secondary/50 border-border focus:border-magenta focus:ring-magenta/20 transition-all duration-300"
              />
              <Input
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                onFocus={() => setFocused("subject")}
                onBlur={() => setFocused(null)}
                required
                className="bg-secondary/50 border-border focus:border-gold focus:ring-gold/20 transition-all duration-300"
              />
              <Textarea
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                required
                rows={5}
                className="bg-secondary/50 border-border focus:border-cyan focus:ring-cyan/20 resize-none transition-all duration-300"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 group"
              >
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
