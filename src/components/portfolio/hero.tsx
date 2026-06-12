import { useState } from "react";
import { Download, Mail, FolderGit2, ArrowRight } from "lucide-react";
import { TerminalChrome, TypeSequence } from "./terminal";

export function Hero() {
  const [showCTAs, setShowCTAs] = useState(false);

  const lines = [
    { text: "whoami", prompt: true, delay: 280 },
    { text: "Mohammed-Fareed Ekisola", className: "text-foreground font-semibold", delay: 80 },
    { text: "Cloud Engineer · Systems Analyst · Azure Administrator", className: "text-muted-foreground", delay: 380 },
    { text: "", delay: 80 },
    { text: "cat skills.txt", prompt: true, delay: 250 },
    { text: "Azure · AWS · Terraform · Windows Server · Microsoft 365 · Cybersecurity", className: "text-[color:var(--color-neon-cyan)]", delay: 60 },
    { text: "Networking · AI · PowerShell · Python · Linux", className: "text-[color:var(--color-neon-cyan)]", delay: 350 },
    { text: "", delay: 60 },
    { text: "./show_projects.sh", prompt: true, delay: 250 },
    { text: "› Loading projects...", className: "text-muted-foreground", delay: 700 },
    { text: "› Ready. 6 projects indexed.", className: "text-[color:var(--color-neon-green)]", delay: 200 },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 px-5 md:px-8">
      <div className="mx-auto max-w-5xl w-full">
        <div className="mb-6 flex items-center justify-center gap-2 font-mono text-xs">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[color:var(--color-border)] bg-[oklch(0.16_0.025_250/0.6)]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-[color:var(--color-neon-green)] opacity-60 animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-[color:var(--color-neon-green)]" />
            </span>
            <span className="text-muted-foreground">system status:</span>
            <span className="text-[color:var(--color-neon-green)]">online</span>
          </span>
        </div>

        <TerminalChrome title="fareed@cloud: ~ — zsh">
          <TypeSequence lines={lines} onDone={() => setShowCTAs(true)} />
        </TerminalChrome>

        <div
          className={`mt-8 flex flex-wrap items-center justify-center gap-3 transition-all duration-700 ${
            showCTAs ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
          }`}
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-sm bg-[color:var(--color-neon-green)] text-[color:var(--color-primary-foreground)] shadow-glow-green hover:translate-y-[-1px] transition-transform"
          >
            <FolderGit2 className="size-4" />
            <span>View Projects</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="/resume.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-sm border border-[color:var(--color-neon-cyan)]/40 text-[color:var(--color-neon-cyan)] hover:bg-[color:var(--color-neon-cyan)]/10 transition-colors"
          >
            <Download className="size-4" />
            Download Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-sm border border-[color:var(--color-border)] text-foreground hover:bg-white/5 transition-colors"
          >
            <Mail className="size-4" />
            Contact Me
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto font-mono text-xs">
          {[
            { k: "uptime", v: "4+ yrs" },
            { k: "region", v: "us-south" },
            { k: "stack", v: "azure · terraform" },
            { k: "status", v: "available" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-md border border-[color:var(--color-border)] bg-[oklch(0.16_0.025_250/0.5)] px-3 py-2"
            >
              <div className="text-muted-foreground">{s.k}</div>
              <div className="text-[color:var(--color-neon-green)] truncate">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
