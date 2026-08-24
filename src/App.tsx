import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Hackathons from "./components/Hackathons";
import GithubStats from "./components/GithubStats";
import Footer from "./components/Footer";
import SpideyInteractivity from "./components/SpideyInteractivity";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sectionIds = ["hero", "about", "skills", "projects", "hackathons", "footer"];
    
    // Create intersection observers for each section
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          // Trigger when at least 25% of the section enters the screen
          threshold: 0.25,
          rootMargin: "-10% 0px -20% 0px",
        }
      );
      
      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-blue-600 selection:text-white relative">
      {/* Spider-Man interactive controls */}
      <SpideyInteractivity />

      {/* Navigation Header */}
      <Header activeSection={activeSection} />

      {/* Main Sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Hackathons />
        <GithubStats username="unnkarm" />
      </main>

      {/* Footer and Contacts */}
      <Footer />
    </div>
  );
}


