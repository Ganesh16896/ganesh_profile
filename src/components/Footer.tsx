"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative z-20 bg-[#121212] pt-12 pb-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row justify-between items-center"
        >
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
              Let's build something <span className="text-indigo-400">extraordinary</span>.
            </h2>
            <p className="text-gray-400 font-light">
              Available for freelance opportunities and full-time roles.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end space-y-2">
            <a 
              href="mailto:dasarir199@gmail.com" 
              className="text-xl text-white hover:text-indigo-400 transition-colors"
            >
              dasarir199@gmail.com
            </a>
            <a 
              href="tel:9063105896" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              +91 9063105896
            </a>
            <div className="pt-4 flex gap-6">
              <a 
                href="https://linkedin.com/in/dasari-ganesh-a95899286" 
                target="_blank" 
                rel="noreferrer"
                className="text-gray-500 hover:text-indigo-400 transition-colors"
              >
                LinkedIn
              </a>
              <a 
                href="#" 
                className="text-gray-500 hover:text-indigo-400 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
