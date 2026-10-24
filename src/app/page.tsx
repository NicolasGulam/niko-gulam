import { AboutSection } from "@/components/AboutSection";
import { CareerSection } from "@/components/CareerSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { FrameLines } from "@/components/ui/FrameLines";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { NTKSection } from "@/components/NTKSection";
import { ProjectsSection } from "@/components/ProjectsSection";

export default function Home() {
  return (
    <>
      <FrameLines />
      <Navbar />
      <main id="main" className="flex-1">
        <HeroSection />
        <ProjectsSection />
        <CareerSection />
        <AboutSection />
        <NTKSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
