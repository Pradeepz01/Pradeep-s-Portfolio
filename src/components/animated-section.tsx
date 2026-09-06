"use client";

import { motion, type Variants } from "motion/react";
import React from "react";

type AnimationType = "fade-up" | "fade-scale" | "slide-left" | "slide-right";

interface AnimatedSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  animation?: AnimationType;
  /** If true, content is centered vertically in the viewport */
  center?: boolean;
  /** Extra delay before animation starts */
  delay?: number;
}

const animations: Record<AnimationType, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 60, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },
  "fade-scale": {
    hidden: { opacity: 0, scale: 0.92, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1],
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -80, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 80, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.25, 0.4, 0.25, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  },
};

/** Child item variant — use on direct children for stagger effect */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

export default function AnimatedSection({
  children,
  id,
  className = "",
  animation = "fade-up",
  center = true,
  delay = 0,
}: AnimatedSectionProps) {
  const variants = animations[animation];

  return (
    <motion.section
      id={id}
      className={`min-h-dvh snap-start snap-always relative ${
        center ? "flex flex-col justify-center" : ""
      } ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        ...variants,
        visible: {
          ...((variants.visible as Record<string, unknown>) || {}),
          transition: {
            ...((
              (variants.visible as Record<string, unknown>)?.transition as Record<string, unknown>
            ) || {}),
            delay,
          },
        },
      }}
    >
      {children}
    </motion.section>
  );
}
