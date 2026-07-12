import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from '@/components/ui/sonner';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Experience from './sections/Experience';
import AIAgents from './sections/AIAgents';
import Projects from './sections/Projects';
import Certifications from './sections/Certifications';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import CursorSpotlight from './components/CursorSpotlight';
import AIChat from './components/AIChat';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build pinned ranges and snap targets
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap configuration
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            // If not in a pinned section, allow free scroll
            if (!inPinned) return value;

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <main className="relative bg-navy min-h-screen">
      {/* Global UI */}
      <ScrollProgress />
      <CursorSpotlight />
      <BackToTop />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Sections */}
      <Hero />
      <About />
      <Skills />
      <Experience />
      <AIAgents />
      <Projects />
      <Certifications />
      <Testimonials />
      <Contact />

      {/* AI assistant chat widget */}
      <AIChat />

      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0F1623',
            border: '1px solid rgba(123, 97, 255, 0.3)',
            color: '#F2F5FA',
          },
        }}
      />
    </main>
  );
}

export default App;
