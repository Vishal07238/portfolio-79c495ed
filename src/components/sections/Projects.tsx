import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    id: 1,
    category: "Data Analysis",
    categoryColor: "cyan",
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
    id: 2,
    category: "Data Analysis",
    categoryColor: "cyan",
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
    id: 3,
    category: "Cloud Pipeline",
    categoryColor: "magenta",
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
    id: 4,
    category: "Frontend",
    categoryColor: "purple",
    title: "Smart Kisan",
    short: "AI-powered agriculture platform with crop prediction, disease detection, and community features.",
    tech: ["React.js", "Node.js", "Machine Learning"],
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
    id: 5,
    category: "Frontend",
    categoryColor: "purple",
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
    id: 6,
    category: "Backend",
    categoryColor: "gold",
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
];

const badgeColors: Record<string, string> = {
  cyan: "bg-cyan/10 text-cyan border-cyan/20",
  magenta: "bg-magenta/10 text-magenta border-magenta/20",
  purple: "bg-purple/10 text-purple border-purple/20",
  gold: "bg-gold/10 text-gold border-gold/20",
};

const Projects = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="font-mono text-sm tracking-widest text-cyan uppercase">Portfolio Highlights</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3">
            Featured{" "}
            <span className="text-gradient-main">Projects</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              onClick={() => setSelected(project)}
              whileHover={{ y: -4 }}
              className="glass rounded-xl p-6 cursor-pointer group hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--cyan)/0.1)] relative overflow-hidden"
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-mono px-3 py-1 rounded-full border ${badgeColors[project.categoryColor]}`}>
                    {project.category}
                  </span>
                  <motion.div whileHover={{ rotate: 45 }} className="flex gap-2">
                    <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </motion.div>
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{project.short}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  {project.github && <Github size={14} className="text-muted-foreground" />}
                  {project.live && <ExternalLink size={14} className="text-muted-foreground" />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Visit GitHub banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass rounded-xl p-8 text-center"
        >
          <p className="text-muted-foreground mb-4">More projects coming soon</p>
          <Button asChild variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 gap-2">
            <a href="https://github.com/Vishal07238" target="_blank" rel="noopener noreferrer">
              <Github size={16} />
              Visit GitHub
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-strong rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-secondary"
              >
                <X size={20} />
              </button>

              <span className={`text-xs font-mono px-3 py-1 rounded-full border ${badgeColors[selected.categoryColor]}`}>
                {selected.category}
              </span>
              <h3 className="font-display text-2xl font-bold mt-4 mb-2 text-primary">{selected.title}</h3>

              <div className="flex flex-wrap gap-2 mb-6">
                {selected.tech.map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground">
                    {t}
                  </span>
                ))}
              </div>

              <div className="space-y-4">
                {selected.details.map((d, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {d}
                  </motion.p>
                ))}
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t border-border">
                {selected.github && (
                  <Button asChild size="sm" variant="outline" className="gap-2 border-primary/30 text-primary hover:bg-primary/10">
                    <a href={selected.github} target="_blank" rel="noopener noreferrer">
                      <Github size={14} /> GitHub
                    </a>
                  </Button>
                )}
                {selected.live && (
                  <Button asChild size="sm" className="gap-2 bg-primary text-primary-foreground">
                    <a href={selected.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={14} /> Live Demo
                    </a>
                  </Button>
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
