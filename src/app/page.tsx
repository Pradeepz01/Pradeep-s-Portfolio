/* eslint-disable @next/next/no-img-element */
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import AnimatedSection from "@/components/animated-section";
import { ArrowUpRight, Cpu, Binary, Layers, Wrench, FileText, Mail } from "lucide-react";
import { Icons } from "@/components/icons";
import { HyperText } from "@/components/magicui/hyper-text";

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
    <main className="h-dvh overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      {/* ═══════ 1. Hero (Seamless background merge) ═══════ */}
      <AnimatedSection id="hero" animation="fade-scale" className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Embedded Systems &amp; Firmware Roles
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Hi, I&apos;m</span>
              <HyperText
                text="Pradeep S"
                className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent"
              />
            </h1>

            <p className="text-lg sm:text-xl font-medium text-foreground/80">
              Embedded Systems, Firmware &amp; RTL Design Engineer
            </p>

            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
              ECE (Major) &amp; CSE (Minor) @ CEG&apos;27, Anna University, Chennai. Specializing in ARM Cortex-M4 bare-metal firmware, peripheral drivers (UART, SPI, I²C), RISC-V RV32I architecture, and Tiny Tapeout Sky130 ASIC tapeouts.
            </p>
          </div>

          {/* Call to Action Buttons */}
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
              href="https://leetcode.com/u/saltlee/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-all shadow-xs"
              aria-label="LeetCode Profile"
            >
              <Icons.leetcode className="size-4" />
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════ 2. About & Skills (Combined Section) ═══════ */}
      <AnimatedSection id="about" animation="fade-up" className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto w-full p-6 sm:p-8 rounded-3xl border border-border/80 bg-background/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-2xl shadow-black/25 space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">About &amp; Technical Expertise</h2>
            <div className="flex-1 h-px bg-border/60" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* About Bio Card */}
            <div className="lg:col-span-5 border border-border/70 dark:border-border/50 rounded-2xl p-5 sm:p-6 bg-card/90 dark:bg-zinc-900/90 shadow-xs flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  Background &amp; Focus
                </div>
                <div className="text-xs sm:text-sm text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
                  <Markdown>{DATA.summary}</Markdown>
                </div>
              </div>
              <div className="pt-3 border-t border-border/50 text-xs text-muted-foreground flex flex-col gap-1 font-mono">
                <div>Major: Electronics &amp; Communication</div>
                <div>Minor: Computer Science (Cybersecurity)</div>
                <div className="text-primary font-semibold">CEG, Anna University &apos;27</div>
              </div>
            </div>

            {/* Technical Skills Bento Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SKILL_CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.title}
                    className="border border-border/70 dark:border-border/50 rounded-2xl p-4 bg-card/90 dark:bg-zinc-900/90 shadow-xs flex flex-col justify-between gap-3 hover:border-primary/40 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg border border-border/60 bg-muted/60">
                        <Icon className="size-3.5 text-foreground" />
                      </div>
                      <h3 className="font-semibold text-xs sm:text-sm text-foreground">
                        {category.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-medium border border-border/80 bg-background/90 text-foreground/85 px-2 py-0.5 rounded-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════ 3. Featured Projects (Horizontal Landscape Cards) ═══════ */}
      <AnimatedSection id="projects" animation="fade-scale" className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto w-full">
          <ProjectsSection />
        </div>
      </AnimatedSection>

      {/* ═══════ 4. Experience & Education (Combined Section) ═══════ */}
      <AnimatedSection id="work" animation="slide-left" className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto w-full p-6 sm:p-8 rounded-3xl border border-border/80 bg-background/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-2xl shadow-black/25 space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Experience &amp; Education</h2>
            <div className="flex-1 h-px bg-border/60" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Work Experience Column */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <h3 className="h-6 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  Work Experience &amp; Internships
                </span>
                <span className="text-[11px] font-normal normal-case font-mono text-muted-foreground/80">
                  (Click to view details)
                </span>
              </h3>
              <WorkSection />
            </div>

            {/* Education Column */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <h3 className="h-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                Education &amp; Academics
              </h3>
              {/* Internal container box */}
              <div className="rounded-2xl border border-border/80 bg-muted/30 dark:bg-zinc-900/40 p-3 sm:p-4 flex flex-col gap-3 shadow-inner">
                {DATA.education.map((education) => (
                  <Link
                    key={education.school}
                    href={education.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 group p-3.5 rounded-xl border border-border/70 bg-card/95 dark:bg-zinc-900/95 hover:border-primary/50 hover:bg-card transition-all shadow-xs"
                  >
                    {education.logoUrl ? (
                      <div className="size-11 p-1.5 border border-border/60 rounded-xl bg-white shadow-xs overflow-hidden flex items-center justify-center flex-none">
                        <img
                          src={education.logoUrl}
                          alt={education.school}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="size-11 p-1.5 border border-border/60 rounded-xl shadow-xs bg-muted flex items-center justify-center flex-none font-bold text-xs text-muted-foreground">
                        {education.school.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold text-xs sm:text-sm leading-tight flex items-center gap-1.5 group-hover:text-primary transition-colors">
                        <span className="truncate">{education.school}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-none" />
                      </div>
                      <div className="text-xs text-muted-foreground leading-snug">
                        {education.degree}
                      </div>
                      <div className="text-[11px] font-mono text-muted-foreground/80 pt-0.5">
                        {education.start} – {education.end}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════ 5. Certifications (With Verified Links) ═══════ */}
      <AnimatedSection id="hackathons" animation="slide-right" className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto w-full p-6 sm:p-8 rounded-3xl border border-border/80 bg-background/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-2xl shadow-black/25">
          <HackathonsSection />
        </div>
      </AnimatedSection>

      {/* ═══════ 6. Contact & Footer ═══════ */}
      <AnimatedSection
        id="contact"
        animation="fade-scale"
        center={false}
        className="w-full min-h-dvh flex flex-col justify-between pt-12 pb-4 px-0"
      >
        <ContactSection />
      </AnimatedSection>
    </main>
  );
}
