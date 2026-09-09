/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="w-full h-full min-h-[160px] bg-muted" />;
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-3 sm:p-4 bg-linear-to-br from-muted/60 via-background/30 to-muted/30">
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg transition-transform duration-500 group-hover:scale-105 shadow-xs"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row h-auto md:h-[350px] border border-border/80 dark:border-border/60 rounded-2xl overflow-hidden bg-card/95 dark:bg-zinc-900/95 backdrop-blur-md hover:border-primary/50 shadow-xs hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group",
        className
      )}
    >
      {/* Media Banner (Left column on desktop, horizontally placed rectangle) */}
      <div className="relative md:w-[44%] shrink-0 h-52 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-border/50">
        <Link
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full h-full overflow-hidden"
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : image ? (
            <ProjectImage src={image} alt={title} />
          ) : (
            <div className="w-full h-full bg-muted/60" />
          )}
        </Link>
        {links && links.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1 text-[11px] bg-black/80 hover:bg-black text-white dark:bg-neutral-900/90 dark:hover:bg-black dark:text-neutral-100 border border-white/20 backdrop-blur-md shadow-xs transition-all"
                  variant="default"
                >
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Content Side (Right column on desktop) */}
      <div className="p-5 sm:p-6 flex flex-col justify-between gap-3 flex-1 overflow-y-auto">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors leading-tight">
                {title}
              </h3>
              <time className="text-xs font-mono text-muted-foreground">{dates}</time>
            </div>
            <Link
              href={href || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-lg hover:bg-accent shrink-0"
              aria-label={`Open ${title}`}
            >
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>

          <div className="text-xs sm:text-sm text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
            <Markdown>{description}</Markdown>
          </div>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/40">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium border border-border/80 bg-muted/40 text-foreground/80 px-2 py-0.5 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
