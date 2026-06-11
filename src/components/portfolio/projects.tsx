import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Github, ExternalLink, Folder, FolderOpen, FileCode2 } from "lucide-react";
import { SectionTitle } from "./about-skills";

type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  highlights: string[];
};

const projects: Project[] = [
  {
    id: "terraform-azure-static-site",
    name: "terraform-azure-static-site",
    tagline: "IaC — Static site on Azure Storage + CDN",
    description:
      "Provisions an end-to-end static website on Azure using Terraform: resource group, storage account with static website enabled, custom domain, and Azure CDN with HTTPS.",
    tech: ["Terraform", "Azure", "Storage", "CDN", "GitHub Actions"],
    github: "https://github.com/",
    demo: "https://example.com",
    highlights: [
      "Reusable Terraform modules with remote state",
      "CI/CD pipeline pushes content + plan/apply on PR",
      "HTTPS via Azure-managed certificates",
    ],
  },
  {
    id: "azure-virtual-network-lab",
    name: "azure-virtual-network-lab",
    tagline: "Hub-and-spoke VNet lab with NSGs & VPN",
    description:
      "A practice lab simulating an enterprise Azure network: hub VNet, two spokes, peering, NSGs, Bastion, and a site-to-site VPN to an on-prem simulator.",
    tech: ["Azure", "VNet", "NSG", "Bastion", "VPN Gateway"],
    github: "https://github.com/",
    highlights: ["Hub-and-spoke topology", "NSG flow logs to Log Analytics", "Bicep + Terraform variants"],
  },
  {
    id: "active-directory-home-lab",
    name: "active-directory-home-lab",
    tagline: "Windows AD lab with GPOs and PowerShell",
    description:
      "A virtualized AD environment for testing OU design, group policies, and bulk user provisioning with PowerShell scripts.",
    tech: ["Windows Server", "Active Directory", "PowerShell", "Hyper-V"],
    github: "https://github.com/",
    highlights: ["1000+ test users provisioned via script", "Custom GPOs for hardening", "Tiered admin model"],
  },
  {
    id: "certification-quiz-app",
    name: "certification-quiz-app",
    tagline: "Web app to practice Azure & CompTIA exams",
    description:
      "A study companion that serves randomized question sets, tracks streaks, and surfaces weak topics from past attempts.",
    tech: ["React", "TypeScript", "Tailwind", "Supabase"],
    github: "https://github.com/",
    demo: "https://example.com",
    highlights: ["Spaced-repetition queue", "Per-domain analytics", "Offline-first PWA"],
  },
  {
    id: "quickpad-ai",
    name: "quickpad-ai",
    tagline: "AI-powered scratchpad for engineers",
    description:
      "Local-first notes app with AI summaries, command palette, and snippet templates tuned for systems and cloud work.",
    tech: ["React", "Vite", "AI Gateway", "IndexedDB"],
    github: "https://github.com/",
    demo: "https://example.com",
    highlights: ["⌘K command palette", "AI summarize / rewrite / explain", "Encrypted local storage"],
  },
];

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="projects" className="px-5 md:px-8 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle cmd="tree ~/projects -L 1" sub="// click a directory to inspect" />

        <div className="rounded-xl border border-[color:var(--color-border)] bg-[oklch(0.13_0.02_250/0.7)] p-5 md:p-7 font-mono">
          <div className="flex items-center gap-2 text-[color:var(--color-neon-cyan)] mb-3">
            <FolderOpen className="size-4" /> /projects
          </div>
          <ul className="space-y-1.5">
            {projects.map((p, i) => {
              const last = i === projects.length - 1;
              return (
                <li key={p.id}>
                  <button
                    onClick={() => setOpen(p)}
                    className="group w-full text-left flex items-start gap-3 rounded-md px-2 py-2 hover:bg-[oklch(0.85_0.24_145/0.06)] transition-colors"
                  >
                    <span className="text-muted-foreground select-none mt-0.5">
                      {last ? "└──" : "├──"}
                    </span>
                    <Folder className="size-4 mt-0.5 text-[color:var(--color-neon-green)] group-hover:scale-110 transition-transform shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-foreground group-hover:text-[color:var(--color-neon-green)] transition-colors truncate">
                          {p.name}/
                        </span>
                        <span className="text-xs text-muted-foreground">— {p.tagline}</span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {p.tech.slice(0, 4).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-1.5 py-0.5 rounded border border-[color:var(--color-border)] text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ExternalLink className="size-3.5 mt-1 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-2xl glass-terminal border-[color:var(--color-neon-green)]/30 p-0 overflow-hidden">
          {open && (
            <>
              <div className="flex items-center gap-2 border-b border-[color:var(--color-border)] px-4 py-2.5 bg-[oklch(0.1_0.02_250/0.7)]">
                <span className="size-3 rounded-full bg-[oklch(0.65_0.22_25)]" />
                <span className="size-3 rounded-full bg-[oklch(0.82_0.17_85)]" />
                <span className="size-3 rounded-full bg-[oklch(0.78_0.2_145)]" />
                <div className="mx-auto font-mono text-xs text-muted-foreground truncate">
                  ~/projects/{open.name}
                </div>
              </div>

              <div className="p-6 md:p-7 space-y-5">
                <DialogHeader className="space-y-2 text-left">
                  <DialogTitle className="font-mono text-lg flex items-center gap-2">
                    <FileCode2 className="size-5 text-[color:var(--color-neon-green)]" />
                    {open.name}
                  </DialogTitle>
                  <DialogDescription className="text-[color:var(--color-neon-cyan)] font-mono text-sm">
                    {open.tagline}
                  </DialogDescription>
                </DialogHeader>

                <p className="text-sm text-foreground/90 leading-relaxed">{open.description}</p>

                <div className="rounded-md border border-[color:var(--color-border)] bg-[oklch(0.11_0.015_250)] p-4 font-mono text-xs space-y-1">
                  {open.highlights.map((h, i) => (
                    <div key={i}>
                      <span className="text-[color:var(--color-neon-green)]">›</span>{" "}
                      <span className="text-muted-foreground">{h}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {open.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded border border-[color:var(--color-neon-cyan)]/30 text-[color:var(--color-neon-cyan)] font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  {open.github && (
                    <a
                      href={open.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-[color:var(--color-border)] font-mono text-xs hover:bg-white/5"
                    >
                      <Github className="size-4" /> source
                    </a>
                  )}
                  {open.demo && (
                    <a
                      href={open.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-[color:var(--color-neon-green)] text-[color:var(--color-primary-foreground)] font-mono text-xs shadow-glow-green"
                    >
                      <ExternalLink className="size-4" /> live demo
                    </a>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
