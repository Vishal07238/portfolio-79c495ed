import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Clock, Github, Linkedin, Send, Download, MessageCircle } from "lucide-react";
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
  { icon: Mail, label: "Email", value: "vishalarkalwar2@gmail.com", color: "electric" },
  { icon: MapPin, label: "Location", value: "Nagpur, Maharashtra", color: "violet" },
  { icon: Clock, label: "Response Time", value: "24-48 hours", color: "rose" },
];

const socials = [
  { icon: Github, href: "https://github.com/Vishal07238", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:vishalarkalwar2@gmail.com", label: "Email" },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  electric: { bg: "bg-[hsl(var(--electric)/0.08)]", text: "text-electric" },
  violet: { bg: "bg-[hsl(var(--violet)/0.08)]", text: "text-violet" },
  rose: { bg: "bg-[hsl(var(--rose)/0.08)]", text: "text-rose" },
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

  const focusGlow = focused
    ? `0 0 40px hsl(var(--${focused === "email" ? "violet" : focused === "subject" ? "rose" : "electric"}) / 0.08)`
    : "none";

  return (
    <section id="contact" className="py-28 relative">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div className="flex items-center gap-2 mb-4">
            <MessageCircle size={14} className="text-electric" />
            <span className="font-mono text-xs tracking-[0.25em] text-electric uppercase">Get In Touch</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Let's{" "}
            <span className="text-gradient-main">Connect</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-5"
          >
            {contactInfo.map((info, i) => {
              const c = colorMap[info.color];
              return (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                  whileHover={{ x: 6, y: -2 }}
                  className="glass-premium rounded-xl p-5 flex items-center gap-4 transition-all duration-500 group"
                >
                  <motion.div
                    className={`p-3 rounded-lg ${c.bg}`}
                    whileHover={{ rotate: 15, scale: 1.1 }}
                  >
                    <info.icon size={18} className={c.text} />
                  </motion.div>
                  <div>
                    <div className="text-[11px] text-muted-foreground uppercase tracking-wider">{info.label}</div>
                    <div className="font-medium text-sm mt-0.5 group-hover:text-electric transition-colors">{info.value}</div>
                  </div>
                </motion.div>
              );
            })}

            <div className="flex gap-3 pt-4">
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.15, y: -4, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="glass-premium rounded-xl p-4 transition-all duration-500 hover:glow-electric"
                >
                  <s.icon size={18} className="text-muted-foreground" />
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-4"
            >
              <motion.button
                className="btn-outline-premium w-full flex items-center justify-center gap-2 text-sm"
                style={{ borderColor: "hsl(var(--gold) / 0.3)", color: "hsl(var(--gold))" }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={16} />
                Download Resume
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-premium rounded-xl p-8 space-y-5 relative overflow-hidden"
            style={{ boxShadow: focusGlow, transition: "box-shadow 0.5s ease" }}
          >
            {/* Animated border glow when focused */}
            <motion.div
              className="absolute inset-0 rounded-xl pointer-events-none"
              animate={{
                boxShadow: focused
                  ? `inset 0 0 0 1px hsl(var(--electric) / 0.2)`
                  : `inset 0 0 0 1px transparent`,
              }}
              transition={{ duration: 0.3 }}
            />

            <div className="space-y-4">
              <Input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused(null)}
                required
                className="bg-secondary/30 border-border/50 focus:border-electric/50 transition-all duration-300 h-11"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
                required
                className="bg-secondary/30 border-border/50 focus:border-violet/50 transition-all duration-300 h-11"
              />
              <Input
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                onFocus={() => setFocused("subject")}
                onBlur={() => setFocused(null)}
                required
                className="bg-secondary/30 border-border/50 focus:border-rose/50 transition-all duration-300 h-11"
              />
              <Textarea
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                required
                rows={5}
                className="bg-secondary/30 border-border/50 focus:border-electric/50 resize-none transition-all duration-300"
              />
              <motion.button
                type="submit"
                disabled={loading}
                className="btn-premium w-full flex items-center justify-center gap-2 group disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  animate={loading ? { rotate: 360 } : {}}
                  transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
                >
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </motion.div>
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
