/* eslint-disable @next/next/no-img-element */
import BlurFade from "@/components/magicui/blur-fade";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight, Cpu, Binary, Layers, Wrench, FileText, Mail } from "lucide-react";
import { Icons } from "@/components/icons";

const BLUR_FADE_DELAY = 0.04;

const SKILL_CATEGORIES = [
  {
    title: "Microcontrollers & Architecture",
    icon: Cpu,
    color: "from-sky-500/20 to-blue-500/5 text-sky-500",
    skills: [
      "ARM Cortex-M4 (STM32F446RE)",
      "PIC16F877A",
      "RISC-V (RV32I)",
      "Arduino & ESP",
      "Sky130 (Tiny Tapeout)",
    ],
  },
  {
    title: "Firmware & Low-Level Drivers",
    icon: Binary,
    color: "from-emerald-500/20 to-teal-500/5 text-emerald-500",
    skills: [
      "Embedded C",
      "Bare-Metal Programming",
      "Peripheral Driver Development",
      "UART",
      "SPI",
      "I²C",
      "Timers & Interrupts",
      "FSM (State Machines)",
      "Marlin Firmware",
    ],
  },
  {
    title: "VLSI, RTL & Digital Design",
    icon: Layers,
    color: "from-purple-500/20 to-indigo-500/5 text-purple-500",
    skills: [
      "Verilog",
      "RTL Design",
      "AXI Protocol",
      "Vivado",
      "ModelSim",
      "GTKWave & Quartus",
    ],
  },
  {
    title: "Engineering Tools & Lab",
    icon: Wrench,
    color: "from-amber-500/20 to-orange-500/5 text-amber-500",
    skills: [
      "C",
      "C++",
      "Python",
      "STM32CubeIDE",
      "MPLAB X IDE",
      "EasyEDA",
      "GNU Radio",
      "PICSimLab",
      "MATLAB",
      "Linux",
      "Git",
      "VS Code",
    ],
  },
];

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-16 relative">
      {/* Hero Section - Clean, High-Impact (No DP) */}
      <section id="hero" className="pt-4 sm:pt-6">
        <div className="w-full space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Available for Embedded Systems &amp; Firmware Roles
            </div>
          </BlurFade>

          <div className="space-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
                Hi, I&apos;m{" "}
                <span className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Pradeep S
                </span>
              </h1>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <p className="text-lg sm:text-xl font-medium text-foreground/80">
                Embedded Systems, Firmware &amp; RTL Design Engineer
              </p>
            </BlurFade>

            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
                ECE (Major) &amp; CSE (Minor) @ CEG’27, Anna University, Chennai. Specializing in ARM Cortex-M4 bare-metal firmware, peripheral drivers (UART, SPI, I²C), RISC-V RV32I architecture, and Tiny Tapeout Sky130 ASIC tapeouts.
              </p>
            </BlurFade>
          </div>

          {/* Call to Action Buttons */}
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="/Pradeep_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm shadow-md hover:bg-primary/90 transition-all active:scale-95"
              >
                <FileText className="size-4" />
                View / Download Resume
              </a>
              <a
                href="mailto:pradeepsaravana01@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-accent text-foreground font-medium text-sm transition-all active:scale-95 shadow-xs"
              >
                <Mail className="size-4" />
                Get in Touch
              </a>
              <div className="h-6 w-px bg-border mx-1 hidden sm:block" />
              <a
                href="https://github.com/Pradeepz01"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all shadow-xs"
                aria-label="GitHub Profile"
              >
                <Icons.github className="size-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/pradeep-s06/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all shadow-xs"
                aria-label="LinkedIn Profile"
              >
                <Icons.linkedin className="size-4" />
              </a>
              <a
                href="https://leetcode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all shadow-xs"
                aria-label="LeetCode Profile"
              >
                <Icons.leetcode className="size-4" />
              </a>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="space-y-4">
        <BlurFade delay={BLUR_FADE_DELAY * 6}>
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">About Me</h2>
            <div className="flex-1 h-px bg-border/60" />
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 7}>
          <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert text-sm sm:text-base border border-border/60 rounded-2xl p-6 bg-card/40 backdrop-blur-xs">
            <Markdown>
              {DATA.summary}
            </Markdown>
          </div>
        </BlurFade>
      </section>

      {/* Skills Section - Modern Engineering Bento Grid */}
      <section id="skills" className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 8}>
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Technical Skills</h2>
            <div className="flex-1 h-px bg-border/60" />
          </div>
        </BlurFade>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKILL_CATEGORIES.map((category, idx) => {
            const Icon = category.icon;
            return (
              <BlurFade
                key={category.title}
                delay={BLUR_FADE_DELAY * 9 + idx * 0.05}
              >
                <div className="h-full border border-border/70 dark:border-border/50 rounded-2xl p-5 bg-card/60 backdrop-blur-xs hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl border border-border/60 bg-muted/60">
                      <Icon className="size-4 text-foreground" />
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base text-foreground">
                      {category.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-medium border border-border/80 bg-background/80 hover:bg-accent text-foreground/85 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="work" className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Work Experience</h2>
            <div className="flex-1 h-px bg-border/60" />
          </div>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 12}>
          <WorkSection />
        </BlurFade>
      </section>

      {/* Education Section */}
      <section id="education" className="space-y-6">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Education</h2>
            <div className="flex-1 h-px bg-border/60" />
          </div>
        </BlurFade>
        <div className="flex flex-col gap-4">
          {DATA.education.map((education, index) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 14 + index * 0.05}
            >
              <Link
                href={education.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 justify-between group p-4 rounded-2xl border border-border/60 bg-card/60 hover:border-primary/40 hover:bg-card/90 transition-all shadow-xs"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {education.logoUrl ? (
                    <div className="size-12 p-1.5 border border-border/60 rounded-xl bg-white shadow-xs ring-1 ring-border/40 overflow-hidden flex items-center justify-center flex-none">
                      <img
                        src={education.logoUrl}
                        alt={education.school}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="size-12 p-1.5 border border-border/60 rounded-xl shadow-xs ring-1 ring-border/40 bg-muted flex items-center justify-center flex-none font-bold text-xs text-muted-foreground">
                      {education.school.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <div className="font-semibold text-sm sm:text-base leading-none flex items-center gap-2 group-hover:text-primary transition-colors">
                      {education.school}
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" aria-hidden />
                    </div>
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      {education.degree}
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-xs font-mono text-muted-foreground text-right flex-none">
                  <span>
                    {education.start} – {education.end}
                  </span>
                </div>
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 15}>
          <ProjectsSection />
        </BlurFade>
      </section>

      {/* Certifications Section */}
      <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 17}>
          <HackathonsSection />
        </BlurFade>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 19}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
