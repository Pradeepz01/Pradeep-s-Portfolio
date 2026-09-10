/* eslint-disable @next/next/no-img-element */
import { DATA } from "@/data/resume";
import Link from "next/link";
import { Briefcase } from "lucide-react";

export default function WorkSection() {
  return (
    <div className="flex flex-col gap-5 sm:gap-6 w-full">
      {DATA.work.map((work) => (
        <div
          key={work.company}
          className="border border-border/80 dark:border-border/60 rounded-2xl sm:rounded-3xl bg-card/90 dark:bg-zinc-950/90 backdrop-blur-xl p-5 sm:p-7 shadow-xl shadow-black/10 hover:border-sky-500/40 transition-all duration-300 group"
        >
          {/* Card Top: Logo, Company, Title, Badge, Dates */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-3.5 sm:gap-4">
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
                  <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
                    {work.company}
                  </h3>
                  {work.badges?.map((badge) => (
                    <span
                      key={badge}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm font-medium text-muted-foreground">
                  {work.title}
                </p>
              </div>
            </div>

            {/* Dates & Location */}
            <div className="sm:text-right shrink-0 font-mono text-xs sm:text-sm pl-15 sm:pl-0">
              <div className="font-semibold text-sky-600 dark:text-sky-400">
                {work.start} – {work.end ?? "Present"}
              </div>
              <div className="text-muted-foreground text-xs pt-0.5">
                {work.location}
              </div>
            </div>
          </div>

          {/* Full description paragraphs directly displayed */}
          <div className="mt-4 pt-4 border-t border-border/50 text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-2.5">
            {work.description.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Action Link: View Repository / Details */}
          {work.href && (
            <div className="mt-4 pt-2">
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
  );
}
