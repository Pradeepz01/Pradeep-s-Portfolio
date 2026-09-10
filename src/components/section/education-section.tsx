/* eslint-disable @next/next/no-img-element */
import { DATA } from "@/data/resume";
import Link from "next/link";

export default function EducationSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full">
      {DATA.education.map((edu) => {
        const isExternal = edu.href && edu.href !== "#";
        const content = (
          <div
            className="border border-border/80 dark:border-border/60 rounded-2xl sm:rounded-3xl bg-card/90 dark:bg-zinc-950/90 backdrop-blur-xl p-5 sm:p-6 shadow-xl shadow-black/10 hover:border-sky-500/40 transition-all duration-300 flex flex-col justify-between gap-4 group h-full"
          >
            <div className="flex items-start gap-4">
              {edu.logoUrl ? (
                <div className="size-12 sm:size-14 rounded-2xl border border-border/80 bg-white dark:bg-zinc-900 p-2 flex items-center justify-center shrink-0 shadow-xs">
                  <img
                    src={edu.logoUrl}
                    alt={edu.school}
                    className="size-full object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div className="size-12 sm:size-14 rounded-2xl border border-sky-500/30 bg-sky-500/10 text-sky-500 dark:text-sky-400 flex items-center justify-center shrink-0 font-bold text-xs tracking-wider shadow-xs">
                  SP
                </div>
              )}
              <div className="space-y-1 flex-1 min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors leading-snug">
                  {edu.school}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {edu.degree}
                </p>
                <div className="pt-2 font-mono text-xs font-semibold text-sky-500 dark:text-sky-400">
                  {edu.start} – {edu.end}
                </div>
              </div>
            </div>
          </div>
        );

        if (isExternal) {
          return (
            <Link
              key={edu.school}
              href={edu.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block h-full"
            >
              {content}
            </Link>
          );
        }

        return (
          <div key={edu.school} className="h-full">
            {content}
          </div>
        );
      })}
    </div>
  );
}
