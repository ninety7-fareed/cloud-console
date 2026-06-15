import { useEffect, useRef, useState } from "react";
import { Bot, Send, X, Minus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const CHAT_API = "https://ydx8h5m055.execute-api.us-east-1.amazonaws.com/prod/chat";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const STARTERS = [
  "Tell me about Fareed",
  "What certifications does he have?",
  "What's his cloud experience?",
];

async function askFareedAi(question: string): Promise<string> {
  const res = await fetch(CHAT_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }

  const data = (await res.json()) as { success?: boolean; answer?: string };
  if (!data.answer) {
    throw new Error("No response from Fareed AI");
  }

  return data.answer;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[88%] rounded-lg px-3 py-2 text-xs leading-relaxed font-mono",
          isUser
            ? "bg-[color:var(--color-neon-green)]/15 border border-[color:var(--color-neon-green)]/30 text-foreground"
            : "bg-[oklch(0.11_0.015_250)] border border-[color:var(--color-border)] text-foreground/90",
        )}
      >
        {message.content.split("\n").map((line, i) => (
          <p key={i} className={i > 0 ? "mt-2" : undefined}>
            {line ? renderInline(line) : "\u00a0"}
          </p>
        ))}
      </div>
    </div>
  );
}

export function FareedAi() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hey — I'm Fareed AI. Ask me about Fareed's experience, skills, certifications, or projects.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const question = text.trim();
    if (!question || loading) return;

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: question };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const answer = await askFareedAi(question);
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Sorry — I couldn't reach the server. Try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[min(100vw-2.5rem,22rem)] sm:w-96 glass-terminal rounded-xl border border-[color:var(--color-neon-green)]/25 shadow-glow-green overflow-hidden flex flex-col h-[min(70vh,28rem)] animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="flex items-center gap-2 border-b border-[color:var(--color-border)] px-3 py-2.5 bg-[oklch(0.1_0.02_250/0.7)] shrink-0">
            <span className="size-2 rounded-full bg-[oklch(0.65_0.22_25)]" />
            <span className="size-2 rounded-full bg-[oklch(0.82_0.17_85)]" />
            <span className="size-2 rounded-full bg-[oklch(0.78_0.2_145)]" />
            <div className="flex-1 text-center font-mono text-xs text-[color:var(--color-neon-cyan)]">
              fareed-ai — online
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 rounded hover:bg-white/5 text-muted-foreground"
              aria-label="Minimize"
            >
              <Minus className="size-3.5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground px-1">
                <Loader2 className="size-3.5 animate-spin text-[color:var(--color-neon-green)]" />
                thinking…
              </div>
            )}
            {messages.length === 1 && !loading && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {STARTERS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="text-[10px] font-mono px-2 py-1 rounded border border-[color:var(--color-border)] text-muted-foreground hover:border-[color:var(--color-neon-green)]/40 hover:text-[color:var(--color-neon-green)] transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="border-t border-[color:var(--color-border)] p-2.5 flex gap-2 shrink-0"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Fareed…"
              disabled={loading}
              className="flex-1 min-w-0 rounded-md border border-[color:var(--color-border)] bg-[oklch(0.11_0.015_250)] px-3 py-2 text-xs font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-[color:var(--color-neon-green)]/50 disabled:opacity-50"
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              className="shrink-0 size-9 bg-[color:var(--color-neon-green)] text-[color:var(--color-primary-foreground)] hover:bg-[color:var(--color-neon-green)]/90 shadow-glow-green"
            >
              <Send className="size-4" />
            </Button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-xs border transition-all shadow-glow-green",
          open
            ? "glass-terminal border-[color:var(--color-border)] text-muted-foreground hover:text-foreground"
            : "bg-[color:var(--color-neon-green)] text-[color:var(--color-primary-foreground)] border-[color:var(--color-neon-green)] hover:scale-105",
        )}
        aria-expanded={open}
        aria-label={open ? "Close Fareed AI" : "Open Fareed AI"}
      >
        {open ? <X className="size-4" /> : <Bot className="size-4" />}
        Fareed AI
      </button>
    </div>
  );
}
