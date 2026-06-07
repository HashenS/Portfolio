'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Navbar from './Navbar';
import SideNavbar from './SideNavbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import Fireflies from './Effects/Fireflies';
import InvertingCursor from './Effects/InvertingCursor';
import LoadingScreen from './Effects/LoadingScreen';
import CinemaJumpOverlay from './Effects/CinemaJumpOverlay';
import SectionTransition from './Effects/SectionTransition';
import CinematicSection from './CinematicSection';
import WhatsAppButton from './WhatsAppButton';
import SmoothScroll from './SmoothScroll';

const FIREFLY_COLORS = [
  '#a855f7',
  '#0ea5e9',
  '#22c55e',
  '#eab308',
  '#f43f5e',
  '#6366f1',
  '#ffffff',
];

const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '168, 85, 247';
};

export default function PortfolioApp() {
  const [colorIndex, setColorIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const toggleColor = () => {
    setColorIndex((prev) => (prev + 1) % FIREFLY_COLORS.length);
  };

  const activeColor = FIREFLY_COLORS[colorIndex];
  const activeColorRgb = hexToRgb(activeColor);

  return (
    <SmoothScroll>
      <div
        className="app"
        style={{
          '--active-color': activeColor,
          '--active-color-rgb': activeColorRgb,
        }}
      >
        <div className="bg-container">
          <Fireflies count={120} color={FIREFLY_COLORS[colorIndex]} />
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen key="loader" onComplete={() => setLoading(false)} />
          ) : (
            <motion.div
              key="site"
              className="site-reveal-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <Navbar onToggleColor={toggleColor} color={FIREFLY_COLORS[colorIndex]} />
              <InvertingCursor />
              <CinemaJumpOverlay />
              <SideNavbar />
              <WhatsAppButton />

              <main className="content-container">
                <CinematicSection id="hero" index={0} parallaxIntensity={0.6}>
                  <Hero color={FIREFLY_COLORS[colorIndex]} />
                </CinematicSection>

                <CinematicSection id="about" index={1} parallaxIntensity={0.5}>
                  <About />
                </CinematicSection>

                <SectionTransition id="skills" radius="2.5rem">
                  <Skills />
                </SectionTransition>

                <CinematicSection id="projects" index={3} parallaxIntensity={0.5}>
                  <Projects />
                </CinematicSection>

                <CinematicSection id="contact" index={4} parallaxIntensity={0.3}>
                  <Contact />
                </CinematicSection>
              </main>

              <Footer />
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          .app {
            position: relative;
            min-height: 100vh;
            background: #000000;
            overflow-x: hidden;
          }
          .content-container {
            position: relative;
            z-index: 10;
          }
        `}</style>
      </div>
    </SmoothScroll>
  );
}
