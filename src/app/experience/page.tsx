/* eslint-disable @next/next/no-img-element */
import { DATA } from "@/data/resume";
import { Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience | Pradeep S",
  description: "Work experience and internships in Embedded Systems, Firmware, and Wireless Transceiver Design.",
};

export default function ExperiencePage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* ═══════ Work Experience & Internships Section ═══════ */}
        <section className="space-y-6">
          {/* Section Header with Briefcase Icon */}
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-500 dark:text-sky-400 flex items-center justify-center shrink-0">
              <Briefcase className="size-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Work Experience &amp; Internships
            </h1>
            <div className="flex-1 h-px bg-border/60 ml-2 hidden sm:block" />
          </div>

          {/* Cards List */}
          <div className="space-y-6">
            {DATA.work.map((work) => (
              <div
                key={work.company}
                className="border border-border/80 dark:border-border/60 rounded-2xl sm:rounded-3xl bg-card/90 dark:bg-zinc-950/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl shadow-black/10 hover:border-sky-500/40 transition-all duration-300 group"
              >
                {/* Card Top: Logo, Company, Title, Badge, Dates */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="size-12 sm:size-14 rounded-2xl border border-border/80 bg-white dark:bg-zinc-900 p-2 flex items-center justify-center shrink-0 shadow-xs">
                      {work.logoUrl ? (
                        <img
                          src={work.logoUrl}
                          alt={work.company}
                          className="size-full object-contain rounded-lg"
                        />
                      ) : (
                        <Briefcase className="size-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base sm:text-lg font-bold text-foreground group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                          {work.company}
                        </h2>
                        {work.badges?.map((badge) => (
                          <span
                            key={badge}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {work.title}
                      </p>
                    </div>
                  </div>

                  {/* Dates & Location */}
                  <div className="sm:text-right shrink-0 font-mono text-xs sm:text-sm pl-16 sm:pl-0">
                    <div className="font-semibold text-sky-600 dark:text-sky-400">
                      {work.start} – {work.end}
                    </div>
                    <div className="text-muted-foreground text-xs pt-0.5">
                      {work.location}
                    </div>
                  </div>
                </div>

                {/* Description Paragraphs */}
                <div className="mt-5 pt-5 border-t border-border/50 text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-3">
                  {work.description.split("\n\n").map((paragraph, idx) => (
                    <p key={idx} className="text-pretty">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Action Link: View Repository / Details */}
                {work.href && (
                  <div className="mt-5 pt-3">
                    <Link
                      href={work.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-500 dark:text-sky-400 hover:text-sky-600 dark:hover:text-sky-300 hover:underline transition-colors"
                    >
                      View Repository / Details
                      <span aria-hidden="true">&rarr;</span>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ═══════ Education Section ═══════ */}
        <section className="space-y-6 pt-6">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl border border-indigo-500/30 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <GraduationCap className="size-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Education
            </h2>
            <div className="flex-1 h-px bg-border/60 ml-2 hidden sm:block" />
          </div>

          <div className="space-y-4">
            {DATA.education.map((edu) => (
              <div
                key={edu.school}
                className="border border-border/80 dark:border-border/60 rounded-2xl bg-card/90 dark:bg-zinc-950/90 backdrop-blur-xl p-5 sm:p-6 shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex items-start gap-4">
                    <div className="size-11 sm:size-12 rounded-xl border border-border/80 bg-white dark:bg-zinc-900 p-1.5 flex items-center justify-center shrink-0">
                      {edu.logoUrl ? (
                        <img
                          src={edu.logoUrl}
                          alt={edu.school}
                          className="size-full object-contain rounded-lg"
                        />
                      ) : (
                        <GraduationCap className="size-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-foreground">
                        {edu.school}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                        {edu.degree}
                      </p>
                    </div>
                  </div>
                  <div className="font-mono text-xs sm:text-sm text-muted-foreground sm:text-right shrink-0 pl-15 sm:pl-0">
                    {edu.start} – {edu.end}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
