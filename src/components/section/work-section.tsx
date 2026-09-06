/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DATA } from "@/data/resume";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function LogoImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return (
      <div className="size-10 md:size-12 p-1.5 border rounded-xl shadow-xs ring-1 ring-border/50 bg-muted flex items-center justify-center flex-none font-bold text-xs text-muted-foreground">
        {alt.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div className="size-10 md:size-12 p-1.5 border border-border/60 rounded-xl bg-white shadow-xs ring-1 ring-border/40 overflow-hidden flex items-center justify-center flex-none">
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full object-contain"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

export default function WorkSection() {
  return (
    <Accordion type="single" collapsible className="w-full flex flex-col gap-3.5">
      {DATA.work.map((work) => (
        <AccordionItem
          key={work.company}
          value={work.company}
          className="w-full border border-border/70 bg-card/90 dark:bg-zinc-900/90 hover:border-primary/40 transition-all rounded-2xl p-4 shadow-xs"
        >
          <AccordionTrigger className="hover:no-underline p-0 cursor-pointer transition-colors rounded-none group [&>svg]:hidden">
            <div className="flex items-center gap-x-3 justify-between w-full text-left">
              <div className="flex items-center gap-x-3 flex-1 min-w-0">
                <LogoImage src={work.logoUrl} alt={work.company} />
                <div className="flex-1 min-w-0 gap-0.5 flex flex-col">
                  <div className="font-semibold leading-none flex items-center gap-2">
                    {work.company}
                    <span className="relative inline-flex items-center w-3.5 h-3.5">
                      <ChevronRight
                        className={cn(
                          "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-300 ease-out",
                          "translate-x-0 opacity-0",
                          "group-hover:translate-x-1 group-hover:opacity-100",
                          "group-data-[state=open]:opacity-0 group-data-[state=open]:translate-x-0"
                        )}
                      />
                      <ChevronDown
                        className={cn(
                          "absolute h-3.5 w-3.5 shrink-0 text-muted-foreground stroke-2 transition-all duration-200",
                          "opacity-0 rotate-0",
                          "group-data-[state=open]:opacity-100 group-data-[state=open]:rotate-180"
                        )}
                      />
                    </span>
                  </div>
                  <div className="font-sans text-sm text-muted-foreground">
                    {work.title}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs tabular-nums text-muted-foreground text-right flex-none">
                <span>
                  {work.start} - {work.end ?? "Present"}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-0 ml-13 text-xs sm:text-sm text-muted-foreground flex flex-col gap-3">
            <div className="whitespace-pre-line leading-relaxed space-y-2">
              {work.description}
            </div>
            {work.href && (
              <a
                href={work.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-xs inline-flex items-center gap-1 hover:underline w-fit font-medium"
              >
                View Repository / Details &rarr;
              </a>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

