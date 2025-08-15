"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 0.4, ease: "easeIn" }}
      className="w-full h-full relative flex items-center justify-center"
    >
      {/* circle */}
      <motion.svg
        fill="transparent"
        viewBox="0 0 506 506"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[260px] h-[260px] xl:w-[460px] xl:h-[460px]"
      >
        <motion.circle
          cx={253}
          cy={253}
          r={250}
          stroke="#00ff99"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ strokeDasharray: "24 10 0 0" }}
          animate={{
            strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
            rotate: [120, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </motion.svg>

      {/* image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.4, ease: "easeInOut" }}
        className="absolute w-[250px] h-[250px] xl:w-[450px] xl:h-[450px] rounded-full overflow-hidden"
      >
        <Image
          src="/assets/photo3.png"
          alt="Rafid Al Khairy"
          priority
          quality={100}
          fill
          className="object-cover"
          
        />
      </motion.div>
    </motion.div>
  );
};

export default Photo;