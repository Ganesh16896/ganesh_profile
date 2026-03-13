"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

export default function Overlay({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  // Section 1 (0% scroll): Hero Introduction
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Section 2 (25% scroll): About - Technical Focus
  const opacity2 = useTransform(
    scrollYProgress,
    [0.15, 0.25, 0.4, 0.5],
    [0, 1, 1, 0],
  );
  const y2 = useTransform(scrollYProgress, [0.15, 0.5], [100, -100]);

  // Section 3 (55% scroll): About - Problem Solving & UX
  const opacity3 = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.7, 0.8],
    [0, 1, 1, 0],
  );
  const y3 = useTransform(scrollYProgress, [0.45, 0.8], [100, -100]);

  // Section 4 (85% scroll): Goals
  const opacity4 = useTransform(
    scrollYProgress,
    [0.75, 0.85, 0.95, 1],
    [0, 1, 1, 0],
  );
  const y4 = useTransform(scrollYProgress, [0.75, 1], [100, -100]);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col justify-start">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-8 md:p-24 overflow-hidden">
        {/* Section 1 */}
        <motion.div
          style={{ opacity: opacity1, y: y1 }}
          className="absolute w-full px-10"
        >
          <div className="flex items-center justify-between">
            {/* Left Side - Name */}
            <div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white">
                Dasari Ganesh
              </h1>
            </div>

            {/* Right Side - Description */}
            <div className="text-right max-w-xl">
              <p className="text-xl md:text-3xl font-medium text-white  mb-6 drop-shadow-md">
                Frontend Developer <span className="text-indigo-400">|</span>{" "}
                React & Next.js
              </p>

              <p className="text-lg text-gray-100 font-light">
                Passionate front-end developer translating complex designs into
                polished, interactive user interfaces with a seamless user
                experience.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Section 2 */}
        <motion.div
          style={{ opacity: opacity2, y: y2 }}
          className="absolute left-8 md:left-24 max-w-2xl"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            React.js & <span className="text-indigo-400">Next.js</span>.
          </h2>
          <p className="text-lg md:text-xl text-gray-300 font-light drop-shadow-md">
            Proficient in building dynamic and responsive web applications using
            cutting-edge technologies. Ensuring clean, maintainable code that
            aligns with industry best practices.
          </p>
        </motion.div>

        {/* Section 3 */}
        <motion.div
          style={{ opacity: opacity3, y: y3 }}
          className="absolute right-8 md:right-24 max-w-2xl text-right"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            UI/UX & <span className="text-teal-400">Problem Solving</span>.
          </h2>
          <p className="text-lg md:text-xl text-gray-300 font-light ml-auto drop-shadow-md">
            Skilled in creating visually appealing interfaces while bringing an
            analytical mindset to troubleshoot and resolve complex issues
            efficiently.
          </p>
        </motion.div>

        {/* Section 4 */}
        <motion.div
          style={{ opacity: opacity4, y: y4 }}
          className="absolute text-center max-w-3xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Eager to <span className="text-purple-400">innovate</span>.
          </h2>
          <p className="text-lg md:text-xl text-gray-300 font-light drop-shadow-md">
            Looking to contribute my skills to a dynamic team, taking on
            challenging projects to further enhance my expertise and deliver
            innovative solutions.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
