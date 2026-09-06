"use client";

import Link from "next/link";
import { DATA } from "@/data/resume";
import { Icons } from "@/components/icons";
import { Mail, ArrowUpRight, Copy, Check, Sparkles, MapPin } from "lucide-react";
import { useState } from "react";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(DATA.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto text-center space-y-4 pt-4">
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
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          Let&apos;s Build Something{" "}
          <span className="bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            Exceptional
          </span>
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
          Whether you want to discuss embedded systems firmware, bare-metal drivers, RTL design, or potential roles — my inbox is always open.
        </p>
      </div>

      {/* Location & Response Note */}
      <div className="flex items-center justify-center gap-3 text-xs font-mono text-muted-foreground pt-1">
        <span className="flex items-center gap-1">
          <MapPin className="size-3.5 text-primary" />
          Chennai, India
        </span>
        <span>•</span>
        <span>Usually replies within 24 hours</span>
      </div>

      {/* Interactive Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-3 text-left">
          {/* Email Direct Action Card */}
          <div className="p-4 sm:p-5 rounded-2xl border border-border/70 bg-card/75 dark:bg-zinc-900/75 hover:border-primary/50 transition-all flex flex-col justify-between gap-3 group">
            <div className="flex items-center justify-between">
              <div className="size-9 rounded-xl border border-border/60 bg-muted/60 flex items-center justify-center text-foreground">
                <Mail className="size-4" />
              </div>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-lg border border-border/80 bg-background hover:bg-accent text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-2xs"
                title="Copy email to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="size-3 text-emerald-500" />
                    <span className="text-emerald-500">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Direct Email</div>
              <div className="text-xs sm:text-sm font-semibold text-foreground truncate font-mono">
                {DATA.contact.email}
              </div>
            </div>
            <a
              href={`mailto:${DATA.contact.email}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline pt-1"
            >
              Compose email &rarr;
            </a>
          </div>

          {/* LinkedIn Direct Action Card */}
          <a
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-5 rounded-2xl border border-border/70 bg-card/75 dark:bg-zinc-900/75 hover:border-primary/50 transition-all flex flex-col justify-between gap-3 group"
          >
            <div className="flex items-center justify-between">
              <div className="size-9 rounded-xl border border-border/60 bg-muted/60 flex items-center justify-center text-foreground">
                <Icons.linkedin className="size-4" />
              </div>
              <div className="p-1 rounded-lg text-muted-foreground group-hover:text-foreground transition-colors">
                <ArrowUpRight className="size-4" />
              </div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Professional Network</div>
              <div className="text-xs sm:text-sm font-semibold text-foreground truncate">
                LinkedIn Profile
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-primary group-hover:underline pt-1">
              Connect on LinkedIn &rarr;
            </span>
          </a>
        </div>

        {/* Profile Quick Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3 border-t border-border/50">
          <a
            href={DATA.contact.social.GitHub.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/70 bg-card hover:bg-accent text-xs font-medium text-foreground transition-colors"
          >
            <Icons.github className="size-3.5" />
            GitHub
          </a>
          <a
            href={DATA.contact.social.LeetCode.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/70 bg-card hover:bg-accent text-xs font-medium text-foreground transition-colors"
          >
            <Icons.leetcode className="size-3.5" />
            LeetCode
          </a>
          <a
            href="/Pradeep_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/70 bg-card hover:bg-accent text-xs font-medium text-foreground transition-colors"
          >
            <Icons.globe className="size-3.5" />
            Download Resume (PDF)
          </a>
        </div>
    </div>
  );
}
