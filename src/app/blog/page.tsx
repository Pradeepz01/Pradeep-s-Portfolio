import Link from "next/link";
import type { Metadata } from "next";
import { PenLine, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description: "Blog coming soon — stay tuned for posts on embedded systems, firmware, and RTL design.",
};

export default function BlogPage() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md mx-auto space-y-6">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-xs flex items-center justify-center shadow-xs">
          <PenLine className="size-7 text-muted-foreground" />
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Blog — Coming Soon
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            I&apos;ll start writing about embedded systems, firmware development, RTL design, and my engineering journey soon. Stay tuned!
          </p>
        </div>

        {/* Back to Home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-accent text-foreground font-medium text-sm transition-all active:scale-95 shadow-xs"
        >
          <ArrowLeft className="size-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
