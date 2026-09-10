/* eslint-disable @next/next/no-img-element */
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import AnimatedSection from "@/components/animated-section";
import { ArrowUpRight, Cpu, Binary, Layers, Wrench, Mail } from "lucide-react";

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
      {/* ═══════ 1. Hero (Matches Image 2 reference layout & text) ═══════ */}
      <AnimatedSection id="hero" animation="fade-scale" className="px-4 sm:px-6 lg:px-8 min-h-dvh flex flex-col justify-center pt-24 pb-12">
        <div className="max-w-4xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-foreground">
              Hi, I&apos;m{" "}
              <span className="text-sky-500 dark:text-sky-400">
                Pradeep S
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground/90 tracking-tight leading-snug">
              Embedded Systems, Firmware &amp; RTL Design Engineer
            </p>

            <p className="text-sm sm:text-base md:text-lg font-semibold text-foreground/80">
              ECE (Major) &amp; CSE (Minor) @ CEG&apos;27, Anna University, Chennai.
            </p>

            <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
              Passionate about building reliable systems from silicon to software.
            </p>
          </div>

          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-1">
            {["ARM CORTEX-M", "RISC-V", "BARE-METAL", "FPGA", "ASIC"].map((badge) => (
              <span
                key={badge}
                className="px-3 sm:px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-sky-500/40 text-sky-600 dark:text-sky-400 bg-sky-500/10 shadow-xs"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold text-sm shadow-md transition-all active:scale-95"
            >
              View My Projects
              <span aria-hidden="true">&rarr;</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-sky-500/40 hover:border-sky-500 bg-card/80 hover:bg-accent text-foreground font-semibold text-sm transition-all active:scale-95 shadow-xs"
            >
              Get in Touch
              <Mail className="size-4 text-sky-500" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="pt-6 flex items-center gap-2 text-xs font-mono tracking-widest text-sky-600 dark:text-sky-400/80 uppercase">
            <span className="text-sm font-sans">&darr;</span> SCROLL TO EXPLORE
          </div>
        </div>
      </AnimatedSection>

      {/* ═══════ 2. About & Skills (Combined Section) ═══════ */}
      <AnimatedSection id="about" animation="fade-up" className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-border/80 bg-background/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-2xl shadow-black/25 space-y-6">
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

      {/* ═══════ 3. Featured Projects (2x2 Matrix) ═══════ */}
      <AnimatedSection id="projects" animation="fade-scale" className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto w-full">
          <ProjectsSection />
        </div>
      </AnimatedSection>

      {/* ═══════ 4. Experience & Education (Combined Section) ═══════ */}
      <AnimatedSection id="work" animation="slide-left" className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-border/80 bg-background/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-2xl shadow-black/25 space-y-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Experience &amp; Education</h2>
            <div className="flex-1 h-px bg-border/60 hidden sm:block" />
            <Link
              href="/experience"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-sky-500 hover:text-sky-600 dark:hover:text-sky-400 hover:underline shrink-0"
            >
              Full Experience Page &rarr;
            </Link>
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
        <div className="max-w-5xl mx-auto w-full p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border border-border/80 bg-background/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-2xl shadow-black/25">
          <HackathonsSection />
        </div>
      </AnimatedSection>

      {/* ═══════ 6. Contact & Footer ═══════ */}
      <AnimatedSection
        id="contact"
        animation="fade-scale"
        center={false}
        className="w-full min-h-dvh flex flex-col justify-between pt-4 pb-4 px-0"
      >
        <ContactSection />
      </AnimatedSection>
    </main>
  );
}
