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
    return <div className="w-full h-48 bg-muted" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setImageError(true)}
    />
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
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col h-full border border-border/70 dark:border-border/50 rounded-2xl overflow-hidden bg-card hover:border-primary/50 shadow-xs hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group",
        className
      )}
    >
      <div className="relative shrink-0 overflow-hidden bg-muted/40 border-b border-border/50">
        <Link
          href={href || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="block overflow-hidden"
        >
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : image ? (
            <div className="overflow-hidden">
              <ProjectImage src={image} alt={title} />
            </div>
          ) : (
            <div className="w-full h-52 bg-muted/60" />
          )}
        </Link>
        {links && links.length > 0 && (
          <div className="absolute top-3 right-3 flex flex-wrap gap-2 z-10">
            {links.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
              >
                <Badge
                  className="flex items-center gap-1.5 text-xs bg-black/80 hover:bg-black text-white dark:bg-neutral-900/90 dark:hover:bg-black dark:text-neutral-100 border border-white/20 backdrop-blur-md shadow-sm transition-all"
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
      <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary transition-colors">{title}</h3>
            <time className="text-xs font-mono text-muted-foreground">{dates}</time>
          </div>
          <Link
            href={href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-accent"
            aria-label={`Open ${title}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <div className="text-xs sm:text-sm flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t border-border/40">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium border border-border/80 bg-muted/30 text-foreground/80 px-2 py-0.5 rounded-md"
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
