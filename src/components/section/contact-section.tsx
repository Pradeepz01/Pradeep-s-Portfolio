"use client";

import { DATA } from "@/data/resume";
import { Mail, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  return (
    <footer className="w-full flex-1 flex flex-col justify-between text-center">
      {/* Center content */}
      <div className="max-w-2xl mx-auto px-4 space-y-6 my-auto">
        {/* Availability Status Chip */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold tracking-wide">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Open for Opportunities &amp; Collaborations</span>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Get in Touch
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
            Whether you want to discuss embedded systems firmware, bare-metal drivers, RTL design, or potential roles — feel free to reach out.
          </p>
        </div>

        {/* Simple clickable text contact links */}
        <div className="flex flex-wrap items-center justify-center gap-5 text-sm">
          <a
            href={`mailto:${DATA.contact.email}`}
            className="text-foreground hover:text-primary font-medium underline underline-offset-4 decoration-border hover:decoration-primary transition-colors inline-flex items-center gap-1.5"
          >
            <Mail className="size-3.5 text-muted-foreground" />
            <span>{DATA.contact.email}</span>
          </a>
          <span className="text-muted-foreground/40">•</span>
          <a
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary font-medium underline underline-offset-4 decoration-border hover:decoration-primary transition-colors inline-flex items-center gap-1"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="size-3.5 text-muted-foreground" />
          </a>
        </div>
      </div>

      {/* Bottom corner footer: Exactly in level and alignment with the hover menu (bottom-4, h-14) */}
      <div className="w-full sm:h-14 px-4 sm:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-1 pb-20 sm:pb-0 text-xs text-muted-foreground font-mono">
        <div className="text-center sm:text-left flex items-center">
          <span>© 2026 Pradeep S. All rights reserved.</span>
        </div>
        <div className="text-center sm:text-right flex items-center justify-end gap-3">
          <span>Owner: <strong className="text-foreground font-medium font-sans">Pradeep S</strong></span>
          <span>•</span>
          <span>Chennai, India</span>
        </div>
      </div>
    </footer>
  );
}
