import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Github, Linkedin, Mail, MapPin, Send } from "lucide-react";
import { SectionTitle } from "./about-skills";
import { TerminalChrome, Prompt } from "./terminal";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error("All fields are required.");
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    toast.success("Message queued. I'll reply within 1–2 days.");
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <section id="contact" className="px-5 md:px-8 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle cmd="./send-message --to fareed" sub="// secure channel. all fields encrypted in transit." />

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <TerminalChrome title="~/contact/send-message">
              <form onSubmit={onSubmit} className="space-y-4">
                <Field
                  label="name"
                  value={name}
                  onChange={setName}
                  placeholder="Ada Lovelace"
                  autoComplete="name"
                />
                <Field
                  label="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="ada@analyticalengine.io"
                  type="email"
                  autoComplete="email"
                />
                <div>
                  <label className="block font-mono text-xs text-muted-foreground mb-1">
                    <Prompt /> message:
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Hey Fareed, we'd love to chat about..."
                    className="w-full rounded-md bg-[oklch(0.11_0.015_250)] border border-[color:var(--color-border)] focus:border-[color:var(--color-neon-green)]/60 focus:ring-2 focus:ring-[color:var(--color-neon-green)]/20 outline-none px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="font-mono text-xs text-muted-foreground">
                    <span className="text-[color:var(--color-neon-green)]">✓</span> tls 1.3 · end-to-end
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-sm bg-[color:var(--color-neon-green)] text-[color:var(--color-primary-foreground)] shadow-glow-green hover:translate-y-[-1px] transition-transform disabled:opacity-60 disabled:translate-y-0"
                  >
                    {sending ? "sending…" : (<><Send className="size-4" /> send</>)}
                  </button>
                </div>
              </form>
            </TerminalChrome>
          </div>

          <aside className="lg:col-span-2 grid gap-3 font-mono text-sm">
            <ContactRow icon={Mail} label="email" value="fareedekisola@outlook.com" href="mailto:fareedekisola@outlook.com" />
            <ContactRow icon={Github} label="github" value="@fareed" href="https://github.com/ninety7-fareed/" />
            <ContactRow icon={Linkedin} label="linkedin" value="/in/fareed" href="https://linkedin.com/in/fareed97/" />
            <ContactRow icon={MapPin} label="location" value="Houston, TX" />
            <div className="rounded-lg border border-[color:var(--color-border)] bg-[oklch(0.16_0.025_250/0.6)] p-4">
              <div className="text-muted-foreground text-xs">availability</div>
              <div className="mt-1 flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full rounded-full bg-[color:var(--color-neon-green)] opacity-60 animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-[color:var(--color-neon-green)]" />
                </span>
                <span className="text-[color:var(--color-neon-green)]">accepting opportunities</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text", autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label className="block font-mono text-xs text-muted-foreground mb-1">
        <Prompt /> {label}:
      </label>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md bg-[oklch(0.11_0.015_250)] border border-[color:var(--color-border)] focus:border-[color:var(--color-neon-green)]/60 focus:ring-2 focus:ring-[color:var(--color-neon-green)]/20 outline-none px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/60"
      />
    </div>
  );
}

function ContactRow({
  icon: Icon, label, value, href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <div className="group flex items-center gap-3 rounded-lg border border-[color:var(--color-border)] bg-[oklch(0.16_0.025_250/0.55)] px-4 py-3 hover:border-[color:var(--color-neon-green)]/40 transition-colors">
      <Icon className="size-4 text-[color:var(--color-neon-cyan)] shrink-0" />
      <div className="min-w-0">
        <div className="text-muted-foreground text-xs">{label}</div>
        <div className="truncate text-foreground/90 group-hover:text-[color:var(--color-neon-green)] transition-colors">
          {value}
        </div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
      {Inner}
    </a>
  ) : Inner;
}

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--color-border)] bg-[oklch(0.1_0.02_250/0.6)]">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-8 grid gap-4 md:grid-cols-3 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full rounded-full bg-[color:var(--color-neon-green)] opacity-60 animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-[color:var(--color-neon-green)]" />
          </span>
          <span className="text-muted-foreground">system status:</span>
          <span className="text-[color:var(--color-neon-green)]">online</span>
        </div>
        <div className="md:text-center">
          <span className="text-muted-foreground">location:</span>{" "}
          <span className="text-[color:var(--color-neon-cyan)]">Houston, TX</span>
        </div>
        <div className="md:text-right text-muted-foreground">
          available for opportunities · © {new Date().getFullYear()} fareed
        </div>
      </div>
    </footer>
  );
}
