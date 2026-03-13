"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    company: "Div International Technology Services",
    role: "Front End Developer (Next.js / React.js)",
    date: "05/2023 – 04/2025",
    description: [
      "Develop and maintain dynamic web applications using Next.js and React.js.",
      "Collaborate with cross-functional teams to implement responsive UIs with Tailwind CSS/Material UI.",
      "Optimize application performance through code splitting and SSR/SSG implementations."
    ]
  },
  {
    company: "Trend Soft Technologies Pvt Ltd",
    role: "Front End Developer (Next.js / React.js)",
    date: "09/2022 – 04/2023",
    description: [
      "Develop and maintain dynamic web applications using Gatsby.js, React.js and Next.js.",
      "Collaborate with cross-functional teams to implement responsive UIs.",
      "Integrated RESTful APIs for seamless data flow in enterprise applications."
    ]
  },
  {
    company: "Mayil Technologies",
    role: "FrontEnd Developer (React.js) - Intern",
    date: "03/2022 – 06/2022",
    description: [
      "Assisted in developing React.js web applications.",
      "Gained hands-on experience with React hooks and state management."
    ]
  }
];

export default function Experience() {
  return (
    <section className="relative z-20 bg-[#121212] py-24 px-8 md:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Work Experience
          </h2>
        </motion.div>

        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline Line (Desktop) */}
              <div className="hidden md:block absolute left-[-60px] top-2 bottom-[-48px] w-px bg-white/10" />
              {/* Timeline Dot (Desktop) */}
              <div className="hidden md:block absolute left-[-64px] top-2 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />

              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {exp.company}
                </h3>
                <span className="text-sm font-light text-indigo-400 tracking-widest mt-1 md:mt-0">
                  {exp.date}
                </span>
              </div>
              <h4 className="text-lg text-gray-300 font-medium mb-4">{exp.role}</h4>
              <ul className="space-y-2 text-gray-400 font-light list-disc list-inside marker:text-gray-600">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
