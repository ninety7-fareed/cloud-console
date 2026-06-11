import { SectionTitle } from "./about-skills";
import { Award, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";

const logs = [
  {
    year: "2026",
    level: "INFO",
    tag: "career",
    title: "Systems Analyst — MSP",
    body: "Supporting enterprise clients across Microsoft 365, Azure, Intune, and networking; on-call rotation and project work.",
  },
  {
    year: "2025",
    level: "OK",
    tag: "cert",
    title: "Azure Administrator (AZ-104) — Certified",
    body: "Earned AZ-104 with focus on identity, networking, and governance.",
  },
  {
    year: "2025",
    level: "INFO",
    tag: "edu",
    title: "B.S. Computer Information Systems — In progress",
    body: "University of Houston. Coursework: networking, databases, secure systems.",
  },
  {
    year: "2024",
    level: "OK",
    tag: "edu",
    title: "Associate Degree — Completed",
    body: "Foundations in systems administration and computer science.",
  },
  {
    year: "2024",
    level: "OK",
    tag: "cert",
    title: "CompTIA A+ — Certified",
    body: "Hardware, OS troubleshooting, mobile, and security fundamentals.",
  },
  {
    year: "2023",
    level: "INFO",
    tag: "lab",
    title: "Built Azure & Active Directory home labs",
    body: "Self-directed labs to deepen hands-on experience with hybrid identity and networking.",
  },
];

const levelColor: Record<string, string> = {
  INFO: "var(--color-neon-cyan)",
  OK: "var(--color-neon-green)",
  WARN: "oklch(0.82 0.17 85)",
};

export function Experience() {
  return (
    <section id="experience" className="px-5 md:px-8 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle cmd="tail -f /var/log/career.log" sub="// recent system events, newest first" />
        <div className="rounded-xl border border-[color:var(--color-border)] bg-[oklch(0.11_0.015_250)] overflow-hidden">
          <ul className="divide-y divide-[color:var(--color-border)] font-mono text-sm">
            {logs.map((l, i) => (
              <li
                key={i}
                className="group px-4 md:px-6 py-4 flex flex-col md:flex-row md:items-start gap-2 md:gap-5 hover:bg-[oklch(0.85_0.24_145/0.04)] transition-colors"
              >
                <div className="flex items-center gap-3 md:w-56 shrink-0">
                  <span className="text-muted-foreground">[{l.year}]</span>
                  <span
                    className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border"
                    style={{ color: levelColor[l.level], borderColor: `${levelColor[l.level]}66` }}
                  >
                    {l.level}
                  </span>
                  <span className="text-muted-foreground text-xs">{l.tag}</span>
                </div>
                <div className="min-w-0">
                  <div className="text-foreground">{l.title}</div>
                  <div className="text-muted-foreground text-xs md:text-sm mt-0.5">{l.body}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const certs = [
  {
    code: "AZ-104",
    title: "Microsoft Azure Administrator",
    issuer: "Microsoft",
    year: "2025",
    color: "var(--color-neon-cyan)",
    link: "https://learn.microsoft.com/credentials/certifications/azure-administrator/",
  },
  {
    code: "AZ-900",
    title: "Microsoft Azure Fundamentals",
    issuer: "Microsoft",
    year: "2024",
    color: "var(--color-neon-cyan)",
    link: "https://learn.microsoft.com/credentials/certifications/azure-fundamentals/",
  },
  {
    code: "A+",
    title: "CompTIA A+",
    issuer: "CompTIA",
    year: "2024",
    color: "var(--color-neon-green)",
    link: "https://www.comptia.org/certifications/a",
  },
];

export function Certifications() {
  return (
    <section id="certifications" className="px-5 md:px-8 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle cmd="ls ~/credentials/*.pem" sub="// verified, signed, current" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certs.map((c) => (
            <a
              key={c.code}
              href={c.link}
              target="_blank"
              rel="noreferrer"
              className="group relative rounded-xl border border-[color:var(--color-border)] bg-gradient-to-br from-[oklch(0.16_0.025_250)] to-[oklch(0.12_0.02_250)] p-6 hover:-translate-y-1 hover:border-[color:var(--color-neon-green)]/40 transition-all overflow-hidden"
            >
              <div
                className="absolute -top-12 -right-12 size-40 rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity"
                style={{ background: c.color }}
              />
              <div className="flex items-start justify-between mb-5">
                <div
                  className="grid place-items-center size-12 rounded-lg border"
                  style={{ borderColor: `${c.color}66`, color: c.color, background: `${c.color}14` }}
                >
                  <ShieldCheck className="size-6" />
                </div>
                <div className="flex items-center gap-1 font-mono text-[10px] text-[color:var(--color-neon-green)]">
                  <CheckCircle2 className="size-3" /> VERIFIED
                </div>
              </div>
              <div className="font-mono text-xs text-muted-foreground">{c.issuer} · {c.year}</div>
              <div className="mt-1 font-mono text-2xl font-semibold" style={{ color: c.color }}>
                {c.code}
              </div>
              <div className="mt-1 text-sm text-foreground/90">{c.title}</div>
              <div className="mt-5 flex items-center gap-1.5 font-mono text-xs text-muted-foreground group-hover:text-[color:var(--color-neon-green)] transition-colors">
                <Award className="size-3.5" />
                verify credential
                <ExternalLink className="size-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
