import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { MatrixBackground } from "@/components/portfolio/terminal";
import { Nav } from "@/components/portfolio/nav";
import { Hero } from "@/components/portfolio/hero";
import { About, Skills } from "@/components/portfolio/about-skills";
import { Projects } from "@/components/portfolio/projects";
import { Experience, Certifications } from "@/components/portfolio/experience-certs";
import { Contact, Footer } from "@/components/portfolio/contact-footer";
import { CommandPalette } from "@/components/portfolio/command-palette";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammed-Fareed Ekisola — Cloud & Systems Engineer" },
      { name: "description", content: "Terminal-inspired portfolio for a Cloud Engineer, Systems Analyst, and Azure Administrator based in Houston, TX." },
      { property: "og:title", content: "Mohammed-Fareed Ekisola — Cloud & Systems Engineer" },
      { property: "og:description", content: "Cloud · Systems · Azure · Terraform · Automation. Explore my workstation." },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  return (
    <main className="relative min-h-screen text-foreground">
      <MatrixBackground />
      <Nav onOpenPalette={() => setPaletteOpen(true)} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certifications />
      <Contact />
      <Footer />
      <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <Toaster theme="dark" />
    </main>
  );
}
