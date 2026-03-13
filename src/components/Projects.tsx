"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Track on Travel",
    category: "Web App",
    description: "A travel booking platform built with React.js for seamless flight and hotel reservations.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2674&auto=format&fit=crop",
  },
  {
    title: "Trend Soft Technologies",
    category: "Corporate",
    description: "Revamped the company website with Gatsby.js for enhanced performance and improved accessibility.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop",
  },
  {
    title: "Tenali Double Horse",
    category: "E-Commerce",
    description: "High-performance e-commerce platform for organic foods utilizing React.js and Tailwind CSS.",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: "AroundMe",
    category: "Web App",
    description: "Local business discovery app leveraging geolocation APIs, built with Next.js and React.js.",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop",
  },
];

export default function Projects() {
  return (
    <section className="relative z-20 bg-[#121212] py-24 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 mb-16 max-w-2xl font-light">
            A selection of web applications built with modern frontend technologies, focusing on performance and user experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="group relative cursor-pointer"
            >
              {/* Glassmorphic Card Container */}
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 group-hover:bg-white/10 group-hover:border-white/20">
                {/* Background Image (dimmed) */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-[#121212]/90 via-[#121212]/30 to-transparent">
                  <span className="text-sm font-medium tracking-wider text-indigo-400 uppercase mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 font-light transform transition-all duration-300 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
