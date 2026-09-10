/* eslint-disable @next/next/no-img-element */
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import HackathonsSection from "@/components/section/hackathons-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import EducationSection from "@/components/section/education-section";
import AnimatedSection from "@/components/animated-section";
import { ArrowUpRight, Cpu, Binary, Layers, Wrench, Mail, Briefcase, GraduationCap } from "lucide-react";

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

      {/* ═══════ 2. About & Skills (Large, Grand Bento Grid) ═══════ */}
      <AnimatedSection id="about" animation="fade-up" center={false} className="px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="max-w-7xl mx-auto w-full p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-border/80 dark:border-border/60 bg-background/90 dark:bg-zinc-950/90 backdrop-blur-xl shadow-2xl shadow-black/25 space-y-6 sm:space-y-8">
          <div className="flex items-center gap-3.5">
            <div className="size-10 sm:size-11 rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-500 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Cpu className="size-5 sm:size-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              About &amp; Technical Expertise
            </h2>
            <div className="flex-1 h-px bg-border/60 ml-2" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* About Bio Card */}
            <div className="lg:col-span-5 border border-border/80 dark:border-border/60 rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-card/90 dark:bg-zinc-950/90 shadow-lg flex flex-col justify-between gap-6 hover:border-sky-500/40 transition-colors">
              <div className="space-y-4">
                <div className="text-xs font-mono font-bold tracking-widest text-sky-500 dark:text-sky-400 uppercase flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-500 shadow-xs shadow-sky-500/50" />
                  BACKGROUND &amp; FOCUS
                </div>
                <div className="text-sm sm:text-base text-pretty font-sans leading-relaxed text-muted-foreground dark:text-zinc-300">
                  <Markdown>{DATA.summary}</Markdown>
                </div>
              </div>
              <div className="pt-4 border-t border-border/50 text-xs sm:text-sm text-muted-foreground flex flex-col gap-1.5 font-mono">
                <div>Major: Electronics &amp; Communication</div>
                <div>Minor: Computer Science (Cybersecurity)</div>
                <div className="text-sky-500 dark:text-sky-400 font-bold pt-0.5">
                  CEG, Anna University &apos;27
                </div>
              </div>
            </div>

            {/* Technical Skills Bento Grid (2x2 Matrix) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {SKILL_CATEGORIES.map((category) => {
                const Icon = category.icon;
                return (
                  <div
                    key={category.title}
                    className="border border-border/80 dark:border-border/60 rounded-2xl sm:rounded-3xl p-5 sm:p-6 bg-card/90 dark:bg-zinc-950/90 shadow-lg flex flex-col justify-between gap-4 hover:border-sky-500/40 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-500 dark:text-sky-400">
                        <Icon className="size-4 text-sky-500 dark:text-sky-400" />
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                        {category.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-medium border border-border/80 dark:border-border/60 bg-muted/40 text-foreground/90 px-3 py-1 rounded-full hover:border-sky-500/50 hover:bg-sky-500/10 transition-colors shadow-xs"
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

      {/* ═══════ 4. Work Experience & Internships (Full Template Cards) ═══════ */}
      <AnimatedSection id="experience" animation="slide-left" center={false} className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
              <Briefcase className="size-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Work Experience &amp; Internships</h2>
            <div className="flex-1 h-px bg-border/60" />
          </div>
          <WorkSection />
        </div>
      </AnimatedSection>

      {/* ═══════ 5. Education & Academics (Side-by-Side Cards) ═══════ */}
      <AnimatedSection id="education" animation="slide-right" center={false} className="px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="max-w-5xl mx-auto w-full space-y-6">
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0">
              <GraduationCap className="size-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Education &amp; Academics</h2>
            <div className="flex-1 h-px bg-border/60" />
          </div>
          <EducationSection />
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
