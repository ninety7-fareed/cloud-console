import { useEffect, useRef, useState } from "react";

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const fontSize = 14;
    let columns = Math.floor(w / fontSize);
    let drops: number[] = Array(columns).fill(1);
    const chars =
      "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプ01<>{}#$&*+=/\\".split("");

    let raf = 0;
    let last = 0;
    const step = (t: number) => {
      raf = requestAnimationFrame(step);
      if (t - last < 60) return;
      last = t;
      ctx.fillStyle = "rgba(10, 15, 20, 0.08)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const isHead = Math.random() > 0.975;
        ctx.fillStyle = isHead ? "rgba(180,255,210,0.9)" : "rgba(80,220,140,0.45)";
        ctx.fillText(text, x, y);
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    raf = requestAnimationFrame(step);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      columns = Math.floor(w / fontSize);
      drops = Array(columns).fill(1);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-[0.18]"
    />
  );
}

export function TerminalChrome({
  title = "fareed@cloud: ~",
  children,
  className = "",
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`glass-terminal scanlines rounded-xl overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-[color:var(--color-border)] px-4 py-2.5 bg-[oklch(0.1_0.02_250/0.6)]">
        <span className="size-3 rounded-full bg-[oklch(0.65_0.22_25)]" aria-hidden />
        <span className="size-3 rounded-full bg-[oklch(0.82_0.17_85)]" aria-hidden />
        <span className="size-3 rounded-full bg-[oklch(0.78_0.2_145)]" aria-hidden />
        <div className="mx-auto font-mono text-xs text-muted-foreground select-none">{title}</div>
      </div>
      <div className="font-mono text-sm md:text-[15px] leading-relaxed p-5 md:p-7">{children}</div>
    </div>
  );
}

export function Prompt({ user = "fareed", host = "cloud", cwd = "~" }: { user?: string; host?: string; cwd?: string }) {
  return (
    <span className="select-none">
      <span className="text-[color:var(--color-neon-green)]">{user}@{host}</span>
      <span className="text-muted-foreground">:</span>
      <span className="text-[color:var(--color-neon-cyan)]">{cwd}</span>
      <span className="text-muted-foreground">$ </span>
    </span>
  );
}

export function Cursor() {
  return (
    <span className="inline-block w-[0.6ch] h-[1.05em] translate-y-[2px] bg-[color:var(--color-neon-green)] animate-blink ml-0.5" />
  );
}

/** Types out a sequence of lines with optional pauses */
export function TypeSequence({
  lines,
  speed = 22,
  onDone,
}: {
  lines: { text: string; delay?: number; className?: string; prompt?: boolean }[];
  speed?: number;
  onDone?: () => void;
}) {
  const [rendered, setRendered] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (currentLine >= lines.length) {
      if (!doneRef.current) {
        doneRef.current = true;
        onDone?.();
      }
      return;
    }
    const line = lines[currentLine];
    if (currentChar === 0) {
      setRendered((r) => [...r, ""]);
    }
    if (currentChar < line.text.length) {
      const t = setTimeout(() => {
        setRendered((r) => {
          const copy = [...r];
          copy[currentLine] = line.text.slice(0, currentChar + 1);
          return copy;
        });
        setCurrentChar((c) => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, line.delay ?? 250);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar, lines, speed, onDone]);

  return (
    <div className="space-y-1">
      {rendered.map((text, i) => {
        const meta = lines[i];
        const isTyping = i === currentLine;
        return (
          <div key={i} className={`whitespace-pre-wrap break-words ${meta?.className ?? ""}`}>
            {meta?.prompt && <Prompt />}
            <span>{text}</span>
            {isTyping && <Cursor />}
          </div>
        );
      })}
    </div>
  );
}
