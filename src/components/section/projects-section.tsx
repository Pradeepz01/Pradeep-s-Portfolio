"use client";

import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const atStart = el.scrollLeft <= 0 && e.deltaY < 0;
        const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 && e.deltaY > 0;
        if (!atStart && !atEnd) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 1.3;
        }
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -500 : 500;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="w-full">
      <div className="flex min-h-0 flex-col gap-y-6">
        {/* Header */}
        <div className="flex flex-col gap-y-3 items-center justify-center text-center">
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-linear-to-r from-transparent via-border to-transparent" />
            <div className="border bg-primary z-10 rounded-xl px-4 py-1">
              <span className="text-background text-sm font-medium">My Projects</span>
            </div>
            <div className="flex-1 h-px bg-linear-to-l from-transparent via-border to-transparent" />
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Featured Engineering Projects
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto">
              Swipe or scroll horizontally to explore firmware, RTL design, and ASIC projects.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => scroll("left")}
              className="p-1.5 rounded-lg border border-border/80 bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Scroll projects left"
            >
              <ChevronLeft className="size-4" />
            </button>
            <span className="text-xs text-muted-foreground font-mono px-1">
              Scroll &rarr;
            </span>
            <button
              onClick={() => scroll("right")}
              className="p-1.5 rounded-lg border border-border/80 bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Scroll projects right"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Projects List */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory py-2 px-1 scroll-smooth focus:outline-none [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-border/80 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary/50"
        >
          {DATA.projects.map((project) => (
            <div
              key={project.title}
              className="w-[85vw] sm:w-[620px] md:w-[720px] lg:w-[760px] shrink-0 snap-center"
            >
              <ProjectCard
                href={project.href}
                title={project.title}
                description={project.description}
                dates={project.dates}
                tags={project.technologies}
                image={project.image}
                video={project.video}
                links={project.links}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
