import { useEffect } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Home, User, Cpu, FolderGit2, Activity, ShieldCheck, Mail, Github, Linkedin, Download,
} from "lucide-react";
import { RESUME_URL } from "@/lib/resume";

export function CommandPalette({
  open, onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  const go = (id: string) => {
    onOpenChange(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search… (try 'projects')" />
      <CommandList>
        <CommandEmpty>No matches.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <Item icon={Home} label="Home" onSelect={() => go("home")} />
          <Item icon={User} label="About" onSelect={() => go("about")} />
          <Item icon={Cpu} label="Skills" onSelect={() => go("skills")} />
          <Item icon={FolderGit2} label="Projects" onSelect={() => go("projects")} />
          <Item icon={Activity} label="Experience" onSelect={() => go("experience")} />
          <Item icon={ShieldCheck} label="Certifications" onSelect={() => go("certifications")} />
          <Item icon={Mail} label="Contact" onSelect={() => go("contact")} />
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <Item icon={Download} label="Download resume" onSelect={() => window.open(RESUME_URL, "_blank")} />
          <Item icon={Github} label="Open GitHub" onSelect={() => window.open("https://github.com/ninety7-fareed/", "_blank")} />
          <Item icon={Linkedin} label="Open LinkedIn" onSelect={() => window.open("https://linkedin.com/in/fareed97", "_blank")} />
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

function Item({
  icon: Icon, label, onSelect,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onSelect: () => void;
}) {
  return (
    <CommandItem onSelect={onSelect} className="font-mono">
      <Icon className="size-4 text-[color:var(--color-neon-cyan)]" />
      <span>{label}</span>
    </CommandItem>
  );
}
