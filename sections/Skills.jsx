'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CinematicBackgroundText from '../components/Effects/CinematicBackgroundText';
import InfiniteMenu from '../components/Effects/InfiniteMenu';

const nodejsLogo  = '/logos/nodejs.svg';
const reactLogo   = '/logos/react.svg';
const aspnetLogo  = '/logos/aspnet.svg';
const pythonLogo  = '/logos/python.svg';
const mysqlLogo   = '/logos/mysql.svg';
const htmlCssJs   = '/logos/html css js.svg';
const Skills = () => {
  const containerRef = useRef(null);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const lineVariants = {
    hidden: { width: 0, opacity: 0 },
    visible: {
      width: "120px",
      opacity: 1,
      transition: { duration: 1, ease: "easeOut", delay: 0.5 }
    }
  };

  const menuItems = [
    {
    image: nodejsLogo,
    link: 'https://nodejs.org/',
    title: 'Node.js',
    description: 'Fast, scalable server-side JavaScript runtime.'
  },
  {
    image: reactLogo,
    link: 'https://react.dev/',  // updated to current official URL
    title: 'React.js',
    description: 'Component-based library for dynamic UIs.'
  },
  {
    image: aspnetLogo,
    link: 'https://dotnet.microsoft.com/apps/aspnet',
    title: 'ASP.NET Core',
    description: 'Free, open-source, cross-platform framework for modern apps.'
  },
  {
    image: pythonLogo,
    link: 'https://www.python.org/',
    title: 'Python',
    description: 'Clean, readable language for web, AI & automation.'
  },
  {
    image: mysqlLogo,
    link: 'https://www.mysql.com/',
    title: 'MySQL',
    description: 'Popular open-source relational database.'
  },
  {
    image: htmlCssJs,
    link: 'https://developer.mozilla.org/en-US/docs/Web',  // better general link
    title: 'HTML | CSS | JS',
    description: 'Core technologies for building websites.'
  }
];

  return (
    <section className="skills-section" ref={containerRef}>
      <CinematicBackgroundText text="SKILLS" top="15%" left="2%" />

      <motion.div 
        className="container content-layer"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="section-header">
          <motion.span className="pre-text" variants={itemVariants}>
            EXPERTISE ARCHIVE
          </motion.span>
          <motion.h2 className="main-title text-gradient" variants={itemVariants}>
            Mastered Stack
          </motion.h2>
          <motion.div className="scanner-line" variants={lineVariants} />
        </div>

        <motion.div className="skills-unified-display" variants={itemVariants}>
          <div className="swiper-container" style={{ height: '340px', position: 'relative', perspective: '1000px' }}>
            <div className="slides-track" style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              <div
                className="skill-slide-item has-3d active"
                style={{
                  position: 'absolute',
                  width: '100%',
                  maxWidth: '900px',
                  height: 'auto',
                }}
              >
                <div className="skill-category-card has-3d-content">
                  <div className="card-3d-wrapper">
                    <InfiniteMenu items={menuItems} scale={1.2} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <style>{`
  .skills-section {
    min-height: 100vh;
    padding: 8rem 0;
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    background: transparent;
  }

  .content-layer {
    position: relative;
    z-index: 2;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
  }

  .section-header {
    text-align: center;
    margin-bottom: 6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .pre-text {
    font-size: 0.75rem;
    color: var(--active-color);
    letter-spacing: 0.6em;
    margin-bottom: 1.5rem;
    font-weight: 800;
  }

  .main-title {
    font-size: clamp(3rem, 10vw, 5rem);
    font-weight: 900;
    letter-spacing: -0.04em;
    margin-bottom: 1.5rem;
    line-height: 1;
  }

  .text-gradient {
    background: linear-gradient(135deg, #fff 0%, var(--active-color, #a855f7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .scanner-line {
    width: 120px;
    height: 2px;
    background: var(--active-color);
    box-shadow: 0 0 15px var(--active-color), 0 0 30px var(--active-color);
    margin-bottom: 2rem;
  }

  .skills-unified-display {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
  }

  .slides-track {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
    min-height: 280px;
  }

  .skill-slide-item {
    min-width: 100%;
    padding: 0 1rem;
    box-sizing: border-box;
    will-change: transform, opacity;
  }

  .skill-category-card {
    position: relative;
    min-height: 280px;
    display: flex;
    flex-direction: column;
    transform-style: preserve-3d;
  }

  .skill-category-card.has-3d-content {
    padding: 0;
    overflow: hidden;
    background: transparent;
  }

  .card-3d-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 280px;
  }

  .card-overlay-info {
    position: absolute;
    top: 2.5rem;
    left: 2.5rem;
    z-index: 10;
    pointer-events: none;
  }

  .instruction-text {
    font-size: 0.75rem;
    letter-spacing: 0.2em;
    color: var(--active-color);
    opacity: 0.8;
    margin-top: 0.5rem;
    font-weight: 600;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { opacity: 0.4; }
    50% { opacity: 1; }
    100% { opacity: 0.4; }
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 2.5rem;
  }

  .category-icon {
    font-size: 1.5rem;
    background: rgba(var(--active-color-rgb, 168, 85, 247), 0.1);
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    border: 1px solid rgba(var(--active-color-rgb, 168, 85, 247), 0.2);
  }

  .category-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.02em;
  }

  .skills-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    margin-bottom: auto;
  }

  .skill-chip {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1.25rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.7);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .skill-chip:hover {
    background: rgba(var(--active-color-rgb, 168, 85, 247), 0.1);
    border-color: var(--active-color);
    color: #fff;
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 10px 20px -5px rgba(var(--active-color-rgb, 168, 85, 247), 0.2);
  }

  .chip-dot {
    width: 6px;
    height: 6px;
    background: var(--active-color);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--active-color);
  }

  .tech-badge {
    position: absolute;
    bottom: 2rem;
    right: 2.5rem;
    font-family: monospace;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
    color: var(--active-color);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(0, 0, 0, 0.3);
    padding: 0.4rem 0.8rem;
    border-radius: 20px;
    border: 1px solid rgba(var(--active-color-rgb, 168, 85, 247), 0.2);
  }

  .lock-icon {
    font-size: 0.8rem;
    filter: drop-shadow(0 0 5px var(--active-color));
  }

  /* Swiper Controls */
  .swiper-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    margin-top: 3rem;
    position: relative;
    z-index: 20;
  }

  .nav-btn {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #fff;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  .nav-btn:hover {
    background: rgba(var(--active-color-rgb, 168, 85, 247), 0.15);
    border-color: var(--active-color);
    transform: scale(1.1);
  }

  .nav-dots {
    display: flex;
    gap: 0.75rem;
  }

  .nav-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .nav-dot.active {
    background: var(--active-color);
    width: 24px;
    border-radius: 4px;
    box-shadow: 0 0 15px var(--active-color);
  }
  
  .mobile-scroll-lock-btn {
      display: none; /* Desktop default */
      pointer-events: auto;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      padding: 0.75rem 1.25rem;
      border-radius: 100px;
      color: white;
      font-size: 0.8rem;
      font-weight: 600;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
      transition: all 0.3s ease;
  }

  .mobile-scroll-lock-btn.locked {
      background: var(--active-color);
      border-color: var(--active-color);
      color: black;
  }

  @media(max-width: 768px) {
    .skills-section {
      padding: 2rem 0;
      min-height: auto;
    }
    
    .section-header {
      margin-bottom: 3rem;
    }
    
    .swiper-controls {
      position: absolute;
      bottom: 6rem; /* Move significantly up to avoid clipping */
      left: 0;
      width: 100%;
      margin-top: 0;
      z-index: 100;
      justify-content: center;
      pointer-events: none;
    }
    
    .swiper-controls .nav-btn {
      background: rgba(255, 255, 255, 0.15); /* Premium glass */
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(12px);
    }
    
    .swiper-controls > * {
      pointer-events: auto;
    }

    .slides-track {
      min-height: 600px;
      padding-bottom: 8rem; /* Ensure space for buttons */
    }

    .skill-category-card {
      padding: 1.5rem;
      min-height: auto;
    }

    .main-title {
      font-size: 2.5rem;
    }
    
    .mobile-scroll-lock-btn {
        display: flex; /* Show on mobile */
    }
  }
`}</style>
    </section>
  );
};

export default Skills;
