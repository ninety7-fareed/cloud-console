import { TerminalChrome, Prompt } from "./terminal";
import { Cloud, Server, Network, Shield, Workflow, Cpu, Headphones, Box } from "lucide-react";

export function SectionTitle({ cmd, sub }: { cmd: string; sub?: string }) {
  return (
    <div className="mb-8 font-mono">
      <div className="text-sm md:text-base">
        <Prompt />
        <span>{cmd}</span>
      </div>
      {sub && <div className="mt-2 text-muted-foreground text-sm">{sub}</div>}
      <div className="mt-3 h-px bg-gradient-to-r from-[color:var(--color-neon-green)]/40 via-[color:var(--color-neon-cyan)]/20 to-transparent" />
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="px-5 md:px-8 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle cmd="cd ~/about && cat about.txt" />
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-3">
            <TerminalChrome title="~/about/about.txt">
              <div className="space-y-4 text-foreground/90">
                <p>
                  <span className="text-[color:var(--color-neon-green)]">$</span>{" "}
                  <span className="text-[color:var(--color-neon-green)]">Systems Engineer</span>{" "}
                  with a background in Computer Information Systems from the{" "}
                  <span className="text-[color:var(--color-neon-cyan)]">University of Houston</span>
                  , owning cloud and infrastructure projects across Azure, M365, and Intune.
                </p>
                <p className="text-muted-foreground">
                  Passionate about cloud infrastructure, automation, networking, and
                  cybersecurity — I build reliable systems with Azure, Terraform, and a
                  command line that always feels like home.
                </p>
                <p className="text-muted-foreground">
                  In MSP work, strong technical skills only go so far —{" "}
                  <span className="text-foreground/90">customer experience</span> is what
                  turns a resolved ticket into a client who trusts you. I communicate clearly,
                  follow through, and treat every interaction like it matters, because for the
                  person on the other end, it does.
                </p>
                <p className="text-muted-foreground">
                  When I'm not in a terminal, I'm spinning up labs, breaking things on
                  purpose, and writing runbooks so the next on-call shift is easier than
                  the last.
                </p>
              </div>
            </TerminalChrome>
          </div>

          <div className="lg:col-span-2 grid gap-3 font-mono text-sm">
            {[
              { icon: Cloud, k: "focus", v: "Cloud Infrastructure" },
              { icon: Server, k: "role", v: "Systems Engineer, MSP" },
              { icon: Headphones, k: "cx", v: "Customer Experience" },
              { icon: Cpu, k: "edu", v: "B.S. CIS — U. of Houston" },
              { icon: Network, k: "loc", v: "Houston, TX" },
            ].map(({ icon: Icon, k, v }) => (
              <div
                key={k}
                className="group flex items-center gap-3 rounded-lg border border-[color:var(--color-border)] bg-[oklch(0.16_0.025_250/0.55)] px-4 py-3 hover:border-[color:var(--color-neon-green)]/40 transition-colors"
              >
                <Icon className="size-4 text-[color:var(--color-neon-cyan)] shrink-0" />
                <div className="min-w-0">
                  <div className="text-muted-foreground text-xs">{k}</div>
                  <div className="truncate">{v}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const skillGroups = [
  {
    name: "Cloud",
    icon: Cloud,
    color: "var(--color-neon-cyan)",
    items: ["Azure", "Entra ID", "Microsoft 365", "Intune", "Azure Monitor"],
  },
  {
    name: "Infrastructure",
    icon: Server,
    color: "var(--color-neon-green)",
    items: ["Windows Server", "Active Directory", "VMware", "Hyper-V", "Linux"],
  },
  {
    name: "Networking",
    icon: Network,
    color: "var(--color-neon-cyan)",
    items: ["TCP/IP", "DNS / DHCP", "VPN", "Firewalls", "VLANs"],
  },
  {
    name: "Security",
    icon: Shield,
    color: "var(--color-neon-green)",
    items: ["MFA / Conditional Access", "Defender", "Zero Trust", "RBAC", "Auditing"],
  },
  {
    name: "Automation",
    icon: Workflow,
    color: "var(--color-neon-cyan)",
    items: ["Terraform", "PowerShell", "Python", "Bash", "GitHub Actions"],
  },
  {
    name: "Platforms",
    icon: Box,
    color: "var(--color-neon-green)",
    items: ["Git", "Docker", "REST APIs", "SQL", "Monitoring"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="px-5 md:px-8 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle cmd="ls -la ./skills/" sub="// curated capabilities, sorted by stack" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((g) => (
            <div
              key={g.name}
              className="group relative rounded-xl border border-[color:var(--color-border)] bg-[oklch(0.16_0.025_250/0.55)] p-5 hover:border-[color:var(--color-neon-green)]/40 transition-all hover:-translate-y-0.5"
            >
              <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-neon-green)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 font-mono text-sm">
                  <g.icon className="size-4" style={{ color: `oklch(0.85 0.2 ${g.name === "Cloud" || g.name === "Networking" || g.name === "Automation" ? 210 : 145})` }} />
                  <span className="text-foreground">{g.name.toLowerCase()}</span>
                  <span className="text-muted-foreground">.svc</span>
                </div>
                <span className="font-mono text-[10px] text-muted-foreground border border-[color:var(--color-border)] rounded px-1.5 py-0.5">
                  running
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-1.5 font-mono text-xs">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="flex items-center gap-1.5 text-muted-foreground"
                  >
                    <span className="text-[color:var(--color-neon-green)]">›</span>
                    <span className="truncate">{it}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2">
                <div className="h-1 flex-1 rounded-full bg-[oklch(0.2_0.03_250)] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[color:var(--color-neon-green)] to-[color:var(--color-neon-cyan)] animate-gradient-x"
                    style={{ width: `${72 + ((g.name.length * 7) % 22)}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {72 + ((g.name.length * 7) % 22)}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <div className="font-mono text-xs text-muted-foreground mb-3">
            <Prompt /> git --contributions --year=now
          </div>
          <ContributionsHeatmap />
        </div>
      </div>
    </section>
  );
}

function ContributionsHeatmap() {
  const weeks = 26;
  const days = 7;
  const cells: number[] = [];
  let seed = 1337;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < weeks * days; i++) {
    const r = rand();
    cells.push(r < 0.25 ? 0 : r < 0.55 ? 1 : r < 0.8 ? 2 : r < 0.95 ? 3 : 4);
  }
  const colors = [
    "oklch(0.2 0.02 250)",
    "oklch(0.4 0.12 145 / 0.5)",
    "oklch(0.55 0.18 145 / 0.7)",
    "oklch(0.72 0.22 145 / 0.85)",
    "oklch(0.88 0.26 145)",
  ];
  return (
    <div className="rounded-xl border border-[color:var(--color-border)] bg-[oklch(0.16_0.025_250/0.55)] p-4 overflow-x-auto">
      <div className="flex gap-1 min-w-fit">
        {Array.from({ length: weeks }).map((_, w) => (
          <div key={w} className="grid grid-rows-7 gap-1">
            {Array.from({ length: days }).map((_, d) => {
              const v = cells[w * days + d];
              return (
                <div
                  key={d}
                  className="size-3 rounded-[3px]"
                  style={{ backgroundColor: colors[v] }}
                  title={`level ${v}`}
                />
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-2 font-mono text-[10px] text-muted-foreground">
        less
        {colors.map((c, i) => (
          <span key={i} className="size-3 rounded-[3px]" style={{ backgroundColor: c }} />
        ))}
        more
      </div>
    </div>
  );
}
