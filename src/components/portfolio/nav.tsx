import { useEffect, useState } from "react";
import { Menu, X, Terminal as TerminalIcon } from "lucide-react";

const links = [
  { href: "#home", label: "home" },
  { href: "#about", label: "about" },
  { href: "#skills", label: "skills" },
  { href: "#projects", label: "projects" },
  { href: "#experience", label: "experience" },
  { href: "#certifications", label: "certs" },
  { href: "#contact", label: "contact" },
];

export function Nav({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all ${
        scrolled
          ? "backdrop-blur-xl bg-[oklch(0.1_0.02_250/0.7)] border-b border-[color:var(--color-border)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-8 h-16">
        <a href="#home" className="group flex items-center gap-2 font-mono text-sm">
          <span className="grid place-items-center size-8 rounded-md bg-[oklch(0.85_0.24_145/0.12)] border border-[color:var(--color-border)] text-[color:var(--color-neon-green)]">
            <TerminalIcon className="size-4" />
          </span>
          <span className="text-[color:var(--color-neon-green)]">fareed</span>
          <span className="text-muted-foreground">@</span>
          <span className="text-[color:var(--color-neon-cyan)]">cloud</span>
          <span className="text-muted-foreground">:~</span>
          <span className="text-foreground/80 hidden sm:inline">$</span>
        </a>

        <ul className="hidden lg:flex items-center gap-1 font-mono text-sm">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  active === l.href.slice(1)
                    ? "text-[color:var(--color-neon-green)] bg-[oklch(0.85_0.24_145/0.08)]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                ./{l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenPalette}
            className="hidden md:inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-md border border-[color:var(--color-border)] text-muted-foreground hover:text-foreground hover:border-[color:var(--color-neon-green)]/40 transition-colors"
            aria-label="Open command palette"
          >
            <span className="opacity-70">⌘</span> K
          </button>
          <button
            className="lg:hidden p-2 -mr-2 text-foreground"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden border-t border-[color:var(--color-border)] bg-[oklch(0.1_0.02_250/0.95)] backdrop-blur-xl">
          <ul className="mx-auto max-w-7xl px-5 py-3 grid gap-1 font-mono text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 rounded-md text-muted-foreground hover:text-[color:var(--color-neon-green)] hover:bg-[oklch(0.85_0.24_145/0.08)]"
                >
                  ./{l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
