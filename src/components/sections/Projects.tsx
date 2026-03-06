import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { X, Github, ExternalLink, ArrowUpRight, Layers } from "lucide-react";

interface Project {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  short: string;
  tech: string[];
  github?: string;
  live?: string;
  details: string[];
}

const projects: Project[] = [
  {
    id: 1, category: "Data Analysis", categoryColor: "electric",
    title: "Customer Behaviour Analysis",
    short: "Customer segmentation and behavior analysis using clustering, SQL, and Power BI.",
    tech: ["Python", "SQL", "Power BI"],
    github: "https://github.com/Vishal07238/customer-behavior-analysis",
    details: [
      "Situation: Businesses often struggle to understand diverse customer segments and their purchasing patterns, leading to ineffective marketing strategies.",
      "Task: Develop a comprehensive customer behavior analysis system that segments customers based on purchasing patterns and demographics.",
      "Action: Built a data pipeline using Python and SQL to clean and transform raw transaction data. Applied K-Means clustering to identify distinct customer segments. Created interactive Power BI dashboards for visualization.",
      "Result: Successfully identified 5 distinct customer segments, enabling targeted marketing strategies that could improve customer retention by an estimated 25%.",
    ],
  },
  {
    id: 2, category: "Data Analysis", categoryColor: "electric",
    title: "Crop Price Prediction - Soybean",
    short: "ML model for predicting soybean crop prices in Maharashtra using historical market data.",
    tech: ["Python", "Machine Learning", "Data Analysis"],
    live: "https://crop-price-prediction-project-htk3.onrender.com",
    details: [
      "Problem Statement: Maharashtra farmers face uncertainty in soybean pricing, making it difficult to plan sales and maximize profits.",
      "Data Collection: Gathered historical market data from agricultural databases covering multiple mandis across Maharashtra, including seasonal trends and market fluctuations.",
      "Model Development: Implemented multiple regression and ensemble models, comparing Linear Regression, Random Forest, and XGBoost. Feature engineering included seasonal indicators, lag features, and market volume data.",
      "Web Deployment: Built an interactive web application using Flask that allows farmers to input parameters and get real-time price predictions with confidence intervals.",
      "Impact & Results: The model achieves 85%+ accuracy in price prediction, helping farmers make informed decisions about when and where to sell their soybean harvest.",
    ],
  },
  {
    id: 3, category: "Cloud Pipeline", categoryColor: "violet",
    title: "Olist AWS Event-Driven Pipeline",
    short: "Event-driven data pipeline on AWS using S3, Lambda, and Glue for the Olist dataset.",
    tech: ["AWS", "S3", "Lambda", "Glue"],
    details: [
      "Designed and implemented a fully event-driven data pipeline on AWS to process the Olist e-commerce dataset. The architecture leverages S3 for storage, Lambda for event triggers, and Glue for ETL transformations.",
      "The pipeline automatically detects new data uploads to S3, triggering Lambda functions that validate and route data to appropriate processing stages. AWS Glue crawlers catalog the data and Glue ETL jobs handle complex transformations.",
      "Implemented data quality checks at each stage, ensuring data integrity throughout the pipeline. CloudWatch monitors pipeline health and alerts on failures or anomalies.",
      "The resulting data warehouse enables business analysts to query processed data through Athena, providing insights into customer behavior, seller performance, and logistics efficiency across the Olist marketplace.",
    ],
  },
  {
    id: 4, category: "Frontend", categoryColor: "rose",
    title: "Smart Kisan",
    short: "AI-powered agriculture platform with crop prediction, disease detection, and community features.",
    tech: ["React.js", "Node.js", "Machine Learning"],
    live: "https://volunverse-organizer-hub-ecd3.vercel.app/",
    details: [
      "Smart Kisan is a comprehensive AI-powered agriculture platform designed to empower Indian farmers with technology-driven solutions for modern farming challenges.",
      "Community Forum: A vibrant space for farmers to share knowledge, ask questions, and connect with agricultural experts and fellow farmers across regions.",
      "Crop Price Prediction: ML-powered price forecasting that helps farmers decide optimal selling times based on historical trends and market analysis.",
      "Crop Recommendation: Intelligent system that suggests best crops based on soil type, climate conditions, and regional agricultural data.",
      "AI Disease Detection: Upload crop images to get instant disease diagnosis using computer vision and deep learning models trained on extensive plant pathology datasets.",
      "Farmer Calendar: Seasonal planning tool with region-specific crop calendars, reminder systems, and best practice guidelines.",
      "Government Schemes: Centralized database of government subsidies, schemes, and programs available to farmers with eligibility criteria.",
    ],
  },
  {
    id: 5, category: "Frontend", categoryColor: "rose",
    title: "Volunteer Management System",
    short: "Real-time event coordination platform with role-based access and skill-based volunteer assignment.",
    tech: ["React.js", "WebSockets", "JWT"],
    live: "https://volunteer-management-system-sooty.vercel.app/",
    details: [
      "A comprehensive real-time event coordination platform designed to streamline volunteer management for organizations of all sizes.",
      "Role-Based Access Control: Three-tier access system (Admin, Coordinator, Volunteer) with JWT authentication ensuring secure and appropriate access levels.",
      "Skill-Based Assignment: Intelligent matching algorithm that assigns volunteers to events based on their skills, availability, and proximity.",
      "Real-Time Updates: WebSocket integration for live event updates, volunteer check-ins, and instant communication between coordinators and volunteers.",
      "Event Dashboard: Interactive dashboard with event creation, volunteer tracking, and real-time attendance monitoring.",
      "Reporting & Analytics: Comprehensive reporting system with volunteer hours tracking, event success metrics, and organizational impact analysis.",
      "This project demonstrates expertise in real-time web applications, authentication systems, role-based architectures, and responsive design.",
    ],
  },
   {
     id: 6, category: "Backend", categoryColor: "gold",
     title: "Service Backend – Role-Based Task Management",
     short: "Role-based task management backend with JWT auth, PostgreSQL, and REST APIs.",
     tech: ["Node.js", "Express.js", "PostgreSQL"],
     github: "https://github.com/Vishal07238/service-workflow-backend",
     details: [
       "A robust backend service implementing role-based task management with secure JWT authentication and comprehensive REST API design.",
       "Built with Node.js and Express.js, featuring PostgreSQL for reliable data persistence. The API supports full CRUD operations with role-based access control.",
       "API Endpoints: POST /auth/register (User registration), POST /auth/login (JWT authentication), GET /tasks (List tasks by role), POST /tasks (Create task - Admin/Manager), PUT /tasks/:id (Update task status), DELETE /tasks/:id (Delete task - Admin only), GET /users (List users - Admin only).",
       "The system implements middleware for JWT verification, role validation, and request logging. Error handling follows REST best practices with appropriate HTTP status codes.",
     ],
   },
   {
     id: 7, category: "Frontend", categoryColor: "rose",
     title: "LUXE — E-Commerce Website",
     short: "A multi-page e-commerce website built using pure HTML, CSS, and JavaScript with authentication, cart, wishlist, and checkout functionality.",
     tech: ["HTML", "CSS", "JavaScript", "LocalStorage"],
     github: "https://github.com/Vishal07238/ecommers",
     live: "https://ecommers-beige.vercel.app",
     details: [
       "A fully functional e-commerce website built from scratch using vanilla HTML, CSS, and JavaScript. The project includes product browsing, authentication, wishlist management, cart system, and a complete checkout flow with persistent data using localStorage.",
       "Complete Shopping Flow: Users can browse products, add items to cart, manage wishlist, proceed through checkout, and receive order confirmation with order history stored in their profile.",
       "User Authentication: Secure login and registration system with form validation and password handling, enabling personalized user experiences.",
       "Wishlist System: Persistent storage of favorite items with local data management, allowing users to save and retrieve wishlist items across sessions.",
       "Advanced Product Features: Live search functionality, product filtering by category and price, sorting options, and detailed product information pages.",
       "Order Management: Complete order history tracking in user profiles, order status updates, and order confirmation emails simulation.",
       "Fully Responsive UI: Modern dark theme design that adapts seamlessly across desktop, tablet, and mobile devices with optimized user experience.",
     ],
   },
];

const accentMap: Record<string, { badge: string; glow: string; border: string }> = {
  electric: {
    badge: "bg-[hsl(var(--electric)/0.08)] text-electric border-[hsl(var(--electric)/0.15)]",
    glow: "hover:shadow-[0_8px_40px_hsl(var(--electric)/0.1)]",
    border: "hsl(var(--electric) / 0.25)",
  },
  violet: {
    badge: "bg-[hsl(var(--violet)/0.08)] text-violet border-[hsl(var(--violet)/0.15)]",
    glow: "hover:shadow-[0_8px_40px_hsl(var(--violet)/0.1)]",
    border: "hsl(var(--violet) / 0.25)",
  },
  rose: {
    badge: "bg-[hsl(var(--rose)/0.08)] text-rose border-[hsl(var(--rose)/0.15)]",
    glow: "hover:shadow-[0_8px_40px_hsl(var(--rose)/0.1)]",
    border: "hsl(var(--rose) / 0.25)",
  },
  gold: {
    badge: "bg-[hsl(var(--gold)/0.08)] text-gold border-[hsl(var(--gold)/0.15)]",
    glow: "hover:shadow-[0_8px_40px_hsl(var(--gold)/0.1)]",
    border: "hsl(var(--gold) / 0.25)",
  },
};

// 3D tilt project card
const TiltCard = ({ children, className, onMouseMove, onClick }: {
  children: React.ReactNode;
  className?: string;
  onMouseMove?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick?: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
    onMouseMove?.(e);
  };

  const handleLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  const handleSpotlight = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section id="projects" className="py-28 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <motion.div className="flex items-center gap-2 mb-4">
            <Layers size={14} className="text-electric" />
            <span className="font-mono text-xs tracking-[0.25em] text-electric uppercase">Portfolio Highlights</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Featured{" "}
            <span className="text-gradient-main">Projects</span>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => {
            const a = accentMap[project.categoryColor];
            return (
              <TiltCard
                key={project.id}
                onClick={() => setSelected(project)}
                onMouseMove={handleSpotlight}
                className={`spotlight-card glass-premium rounded-xl p-7 cursor-pointer group transition-all duration-500 ${a.glow}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="relative z-10"
                  style={{ transform: "translateZ(10px)" }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <motion.span
                      className={`text-[11px] font-mono px-3 py-1 rounded-full border ${a.badge}`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {project.category}
                    </motion.span>
                    <motion.div
                      whileHover={{ rotate: 45, scale: 1.3 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-electric transition-colors duration-300" />
                    </motion.div>
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-3 group-hover:text-electric transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{project.short}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, ti) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.06 + ti * 0.05 }}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-secondary/50 text-muted-foreground"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-4 pt-3 border-t border-border/20">
                    {project.github && (
                      <motion.div whileHover={{ scale: 1.2 }}>
                        <Github size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                      </motion.div>
                    )}
                    {project.live && (
                      <motion.div whileHover={{ scale: 1.2 }}>
                        <ExternalLink size={14} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>

        {/* GitHub banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-premium rounded-xl p-10 text-center"
        >
          <p className="text-muted-foreground mb-5 text-sm">More projects coming soon</p>
          <motion.a
            href="https://github.com/Vishal07238"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-premium inline-flex items-center gap-2 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github size={16} />
            Visit GitHub
          </motion.a>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
              style={{ boxShadow: "0 0 60px hsl(var(--electric) / 0.05), 0 25px 50px -12px rgba(0,0,0,0.4)" }}
            >
              <motion.button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary/50"
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <X size={18} />
              </motion.button>

              <span className={`text-[11px] font-mono px-3 py-1 rounded-full border ${accentMap[selected.categoryColor].badge}`}>
                {selected.category}
              </span>
              <h3 className="font-display text-2xl font-bold mt-4 mb-3 text-gradient-main">{selected.title}</h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {selected.tech.map((t, i) => (
                  <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-[11px] px-2.5 py-1 rounded-md bg-secondary/50 text-muted-foreground"
                  >
                    {t}
                  </motion.span>
                ))}
              </div>

              <div className="space-y-4">
                {selected.details.map((d, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {d}
                  </motion.p>
                ))}
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t border-border/30">
                {selected.github && (
                  <motion.a
                    href={selected.github} target="_blank" rel="noopener noreferrer"
                    className="btn-outline-premium text-sm flex items-center gap-2 !px-5 !py-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Github size={14} /> GitHub
                  </motion.a>
                )}
                {selected.live && (
                  <motion.a
                    href={selected.live} target="_blank" rel="noopener noreferrer"
                    className="btn-premium text-sm flex items-center gap-2 !px-5 !py-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ExternalLink size={14} /> Live Demo
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
