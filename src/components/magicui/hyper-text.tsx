"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface HyperTextProps {
  text: string;
  duration?: number;
  className?: string;
  animateOnHover?: boolean;
}

const CHARACTERS = "0123456789ABCDEF_#<>*/+$";

export function HyperText({
  text,
  duration = 700,
  className,
  animateOnHover = true,
}: HyperTextProps) {
  const [displayText, setDisplayText] = useState(text.split(""));
  const [trigger, setTrigger] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const iterations = useRef(0);
  const isFirstRender = useRef(true);

  const triggerAnimation = () => {
    iterations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (!trigger) return;
        if (iterations.current < text.length) {
          setDisplayText((t) =>
            t.map((l, i) =>
              l === " "
                ? " "
                : i <= iterations.current
                  ? text[i]
                  : CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
            )
          );
          iterations.current = iterations.current + 0.5;
        } else {
          setDisplayText(text.split(""));
          setTrigger(false);
          clearInterval(interval);
        }
      },
      duration / (text.length * 4)
    );

    return () => clearInterval(interval);
  }, [text, duration, trigger]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      triggerAnimation();
    }
  }, []);

  return (
    <div
      className="inline-flex items-center overflow-visible cursor-pointer select-none group relative py-1 px-1 -mx-1"
      onMouseEnter={() => {
        setIsHovered(true);
        if (animateOnHover) triggerAnimation();
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={triggerAnimation}
      title="Click or hover to decode"
    >
      <span className="sr-only">{text}</span>
      <div className="flex">
        {displayText.map((letter, i) => (
          <motion.span
            key={i}
            className={cn(
              "inline-block transition-transform duration-150 font-extrabold",
              letter === " " && "w-3 sm:w-4",
              className
            )}
            whileHover={{ y: -4, scale: 1.12 }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
      {/* Subtle glowing halo on hover */}
      <span
        className={cn(
          "absolute -inset-x-3 -inset-y-1.5 rounded-2xl bg-gradient-to-r from-sky-500/20 via-blue-500/25 to-indigo-500/20 blur-md pointer-events-none transition-opacity duration-300 -z-10",
          isHovered ? "opacity-100 scale-105" : "opacity-0 scale-95"
        )}
      />
    </div>
  );
}
