'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import CinematicBackgroundText from '../components/Effects/CinematicBackgroundText';
import { ExternalLink, Github, Monitor, Play, Info } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';

const ComputerMockup = ({ videoUrl, imageUrl, youtubeUrl }) => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  // Derive WebM URL from MP4 for easy fallback
  const webmUrl = videoUrl ? videoUrl.replace('.mp4', '.webm') : null;

  return (
    <div className="computer-mockup">
      {/* Monitor Bezel */}
      <div className="monitor-bezel">
        <div className="monitor-screen">
          {!videoLoaded && imageUrl && !youtubeUrl && (
            <div className="screen-placeholder">
              <Image
                src={imageUrl}
                alt="Project preview"
                fill
                sizes="280px"
                className="poster-placeholder"
                style={{ objectFit: 'cover', filter: 'blur(5px) brightness(0.5)' }}
              />
              <div className="monitor-skeleton" />
            </div>
          )}
          {youtubeUrl ? (
            <iframe
              src={youtubeUrl}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="screen-content youtube-iframe"
              onLoad={() => setVideoLoaded(true)}
            />
          ) : videoUrl ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
              className={`screen-content ${videoLoaded ? 'loaded' : ''}`}
            >
              {webmUrl && <source src={webmUrl} type="video/webm" />}
              <source src={videoUrl} type="video/mp4" />
            </video>
          ) : (
            <div className="screen-placeholder">
              <Play className="play-icon" />
            </div>
          )}
          {/* Screen Glare/Reflection */}
          <div className="screen-glare" />
        </div>
        {/* Power LED */}
        <div className="bezel-dot" />
      </div>
      {/* Monitor Stand */}
      <div className="monitor-stand">
        <div className="stand-neck" />
        <div className="stand-base" />
      </div>
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Parallax shifts for internal content
  const contentX = useTransform(mouseXSpring, [-0.5, 0.5], ["15px", "-15px"]);
  const contentY = useTransform(mouseYSpring, [-0.5, 0.5], ["15px", "-15px"]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`project-card ${isHovered ? 'card-active' : ''}`}
    >
      <div
        style={{
          transform: "translateZ(80px)",
          x: contentX,
          y: contentY
        }}
        className="card-animator"
      >
        <div className="project-showcase">
          <ComputerMockup
            videoUrl={project.video}
            imageUrl={project.image}
            youtubeUrl={project.youtube}
            isHovered={isHovered}
          />
        </div>

        <div className="project-info">
          <div className="project-header">
            <h3 className="project-title">{project.title}</h3>
            <div className="active-indicator" />
          </div>

          <p className="project-desc">{project.description}</p>

          <div className="tech-stack">
            {project.tags.map(tag => (
              <span key={tag} className="tech-tag">{tag}</span>
            ))}
          </div>

          <div className="card-actions">
            <a href={project.github} className="btn-secondary" target="_blank" rel="noopener noreferrer">
              <Github size={18} />
              <span>Source</span>
            </a>

          </div>
        </div>
      </div>

    </motion.div>
  );
};

const Projects = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const projects = [
    {
      title: 'Urban Fitness Center',
      description: 'A premium fitness hub integration with AI-driven progress tracking and immersive user dashboards.',
      tags: ['React', 'Node.js', 'PostgreSQL'],
      github: 'https://github.com/HashenS/urban-gym-website.git',
      demo: '#',
      video: null,
      youtube: 'https://www.youtube.com/embed/VgfdvQLhV8g?autoplay=1&mute=1&controls=0&loop=1&playlist=VgfdvQLhV8g&modestbranding=1',
      image: '/image/gym_ss.png'
    },
    {
      title: 'Dynamic Portfolio',
      description: 'The very platform you are browsing—a high-performance, 3D-integrated digital experience.',
      tags: ['React', 'Three.js', 'Framer Motion'],
      github: 'https://github.com/HashenS/Portfolio.git',
      demo: '#',
      video: null,
      youtube: 'https://www.youtube.com/embed/MjSh741ScaQ?autoplay=1&mute=1&controls=0&loop=1&playlist=MjSh741ScaQ&modestbranding=1',
      image: '/image/portfolio_ss.png'
    },
    {
      title: 'Portfolio for Exora',
      description: 'Portfolio website to showcase their works and prices.',
      tags: ['React', 'Typescript', 'HTML', ' CSS', 'JS'],
      github: 'https://github.com/HashenS/exora',
      video: null,
      youtube: 'https://www.youtube.com/embed/rzO65u5uwo4?autoplay=1&mute=1&controls=0&loop=1&playlist=rzO65u5uwo4&modestbranding=1',
      image: null
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section id="projects" className="projects-view">
      <CinematicBackgroundText text="PROJECTS" top="20%" left="0%" />

      <div className="wrapper">
        <div className="intro-header">
          <span className="pre-text">DIGITAL ARCHIVE</span>
          <h2 className="main-title text-gradient">System Projects</h2>
          <div className="scanner-line" />
        </div>

        {isMobile ? (
          // MOBILE SWIPER VIEW
          <div className="mobile-project-swiper">
            <div className="swiper-track">
              {projects.map((project, index) => {
                const len = projects.length;
                let dist = index - activeIndex;
                if (dist > len / 2) dist -= len;
                if (dist < -len / 2) dist += len;

                const isActive = index === activeIndex;

                return (
                  <motion.div
                    key={project.title}
                    initial={false}
                    animate={{
                      x: `${dist * 110}%`, // 110% to add gap
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.5,
                      zIndex: isActive ? 10 : 0,
                      rotateY: dist * 5
                    }}
                    transition={{
                      type: "spring", stiffness: 300, damping: 30
                    }}
                    className="mobile-slide"
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                );
              })}
            </div>

            {/* Navigation Controls */}
            <div className="swiper-controls">
              <button onClick={handlePrev} className="nav-btn prev" aria-label="Previous Project">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>

              <div className="nav-dots">
                {projects.map((_, i) => (
                  <div
                    key={i}
                    className={`nav-dot ${i === activeIndex ? 'active' : ''}`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>

              <button onClick={handleNext} className="nav-btn next" aria-label="Next Project">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </div>
          </div>
        ) : (
          // DESKTOP GRID VIEW
          <div className="grid-system">
            {projects.map((project, index) => (
              <ScrollReveal key={project.title} direction={index % 2 === 0 ? 'left' : 'right'} delay={index * 0.1}>
                <ProjectCard project={project} index={index} />
              </ScrollReveal>
            ))}
          </div>
        )}

        <motion.div
          className="extra-projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <a href="https://github.com/HashenS?tab=repositories" target="_blank" rel="noopener noreferrer" className="github-link">
            <Github size={20} />
            <span>DECRYPT FULL REPOSITORY</span>
          </a>
        </motion.div>
      </div>

      <style>{`
        .projects-view {
           min-height: 100vh;
           padding: 8rem 0;
           position: relative;
           background: transparent;
           overflow: hidden;
        }

        .wrapper {
           max-width: 1280px;
           margin: 0 auto;
           padding: 0 2rem;
           position: relative;
           z-index: 5;
        }

        .intro-header {
           text-align: center;
           margin-bottom: 5rem;
           display: flex;
           flex-direction: column;
           align-items: center;
        }

        .pre-text {
           font-size: 0.75rem;
           color: var(--active-color);
           letter-spacing: 0.6em;
           margin-bottom: 1rem;
           font-weight: 800;
        }

        .main-title {
           font-size: clamp(3rem, 10vw, 5rem);
           margin-bottom: 1.5rem;
           letter-spacing: -0.03em;
           font-weight: 900;
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

        .grid-system {
           display: grid;
           grid-template-columns: repeat(2, 1fr); /* 2 columns for card look */
           gap: 3rem;
           max-width: 1200px;
           margin: 0 auto;
           margin-bottom: 6rem;
        }
        
        @media (min-width: 1024px) {
           .grid-system { grid-template-columns: repeat(3, 1fr); }
        }

        /* --- Mobile Swiper Styles --- */
        .mobile-project-swiper {
           position: relative;
           height: 600px; /* Adjust based on card height */
           display: flex;
           flex-direction: column;
           align-items: center;
           perspective: 1000px;
           margin-bottom: 2rem;
        }

        .swiper-track {
           position: relative;
           width: 100%;
           height: 100%;
           display: flex;
           justify-content: center;
           align-items: center;
        }

        .mobile-slide {
           position: absolute;
           width: 100%;
           max-width: 400px;
           height: auto;
           /* Center the card vertically if needed */
        }

        .swiper-controls {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            margin-top: 4rem; /* Increased from 2rem to move down */
            z-index: 20;
            position: relative;
        }

        .nav-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
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
            background: rgba(var(--active-color-rgb), 0.2);
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
            box-shadow: 0 0 10px var(--active-color);
        }

        /* Project Card Stylings */
        .project-card {
           position: relative;
           height: 600px;
           background: rgba(10, 10, 15, 0.4);
           border-radius: 3rem;
           border: 1px solid rgba(255, 255, 255, 0.05);
           backdrop-filter: blur(40px);
           overflow: hidden;
           cursor: crosshair;
           transition: transform 0.2s ease, border-color 0.4s ease;
        }
        
        .card-animator {
            height: 100%;
            padding: 2.5rem;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            position: relative;
            z-index: 3;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .card-active .card-animator {
            transform: translateZ(50px);
        }

        /* Computer Mockup CSS */
        .project-showcase {
            height: 220px;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            padding-bottom: 1rem;
            perspective: 1000px;
        }

        .computer-mockup {
            width: 100%;
            max-width: 280px;
            display: flex;
            flex-direction: column;
            align-items: center;
            filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5));
            transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .card-active .computer-mockup {
            transform: translateZ(100px) scale(1.05);
        }

        .monitor-bezel {
            width: 100%;
            aspect-ratio: 16/10;
            background: #1a1a1a;
            border-radius: 1rem;
            padding: 10px;
            position: relative;
            border: 1px solid #333;
            box-shadow: inset 0 0 10px rgba(0,0,0,1);
        }

        .monitor-screen {
            width: 100%;
            height: 100%;
            background: #000;
            border-radius: 0.4rem;
            overflow: hidden;
            position: relative;
        }

        .screen-content {
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            transition: opacity 1s ease;
        }
        
        .youtube-iframe {
            width: 100%;
            height: 100%;
            border: none;
            opacity: 1;
        }
        
        .screen-content.loaded {
            opacity: 1;
        }

        .poster-placeholder {
            position: absolute;
            inset: 0;
        }

        .monitor-skeleton {
            position: absolute;
            inset: 0;
            background: linear-gradient(
                90deg,
                transparent 0%,
                rgba(255, 255, 255, 0.05) 50%,
                transparent 100%
            );
            background-size: 200% 100%;
            animation: shimmer-pc 2s infinite;
        }

        @keyframes shimmer-pc {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }

        .card-active .screen-content {
            opacity: 1;
        }

        .screen-placeholder {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(45deg, #0a0a0a, #1a1a1a);
            position: relative;
        }

        .play-icon { color: rgba(255,255,255,0.1); }

        .screen-glare {
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 50%);
            pointer-events: none;
        }

        .bezel-dot {
            position: absolute;
            bottom: 3px;
            right: 15px;
            width: 4px;
            height: 4px;
            background: #333;
            border-radius: 50%;
            transition: background 0.3s;
        }

        .card-active .bezel-dot { background: var(--active-color); box-shadow: 0 0 5px var(--active-color); }

        /* Stand styles */
        .monitor-stand { display: flex; flex-direction: column; align-items: center; }
        .stand-neck { width: 40px; height: 15px; background: #151515; box-shadow: inset 0 0 5px #000; }
        .stand-base { width: 80px; height: 6px; background: #222; border-radius: 10px 10px 2px 2px; box-shadow: 0 2px 5px #000; }

        /* Content Styling */
        .project-info { display: flex; flex-direction: column; gap: 1rem; }
        .project-header { display: flex; align-items: center; gap: 1rem; }
        .project-title { font-size: 1.5rem; font-weight: 800; color: white; letter-spacing: -0.02em; }
        .active-indicator { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.1); transition: all 0.4s; }
        .card-active .active-indicator { background: var(--active-color); box-shadow: 0 0 10px var(--active-color); transform: scale(1.2); }
        .project-desc { font-size: 0.95rem; line-height: 1.6; color: rgba(255,255,255,0.5); }
        .tech-stack { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-top: 0.5rem; }
        .tech-tag { font-size: 0.7rem; font-weight: 700; color: var(--active-color); padding: 0.4rem 0.8rem; background: rgba(var(--active-color-rgb), 0.05); border: 1px solid rgba(var(--active-color-rgb), 0.1); border-radius: 2rem; text-transform: uppercase; letter-spacing: 0.05em; }
        .card-actions { display: flex; gap: 1rem; margin-top: auto; }
        .btn-primary, .btn-secondary { flex: 1; padding: 0.8rem; border-radius: 1rem; display: flex; align-items: center; justify-content: center; gap: 0.6rem; font-size: 0.9rem; font-weight: 700; transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); text-decoration: none; position: relative; overflow: hidden; }
        .btn-primary { background: var(--active-color); color: white; box-shadow: 0 5px 15px rgba(var(--active-color-rgb), 0.4), 0 0 30px rgba(var(--active-color-rgb), 0.2); border: 1px solid rgba(255, 255, 255, 0.2); }
        .btn-secondary { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.7); }
        .btn-primary:hover { transform: translateY(-4px) scale(1.05); box-shadow: 0 10px 25px rgba(var(--active-color-rgb), 0.6), 0 0 60px rgba(var(--active-color-rgb), 0.4); filter: brightness(1.2); border-color: #fff; }
        .btn-secondary:hover { background: rgba(255,255,255,0.08); color: white; transform: translateY(-4px); }

        .extra-projects { text-align: center; }
        .github-link { display: inline-flex; align-items: center; gap: 1rem; padding: 1.5rem 3rem; border-radius: 1.5rem; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); color: white; font-weight: 800; font-size: 0.9rem; letter-spacing: 0.1em; text-decoration: none; transition: all 0.4s; }
        .github-link:hover { border-color: var(--active-color); background: rgba(var(--active-color-rgb), 0.05); box-shadow: 0 0 30px rgba(var(--active-color-rgb), 0.2); transform: translateY(-5px); }

        @media (max-width: 1024px) {
           .grid-system {
              grid-template-columns: 1fr;
              gap: 4rem;
           }
        }

         @media (max-width: 768px) {
            .projects-view {
               padding: 2rem 0;
               min-height: auto;
            }
            .mobile-project-swiper {
               height: auto;
               min-height: 950px;
               padding-bottom: 3rem;
               display: flex;
               flex-direction: column;
               justify-content: flex-start;
            }
            .swiper-track {
               height: 750px; /* Increased to ensure card fits */
               align-items: flex-start; /* Align top */
               padding-top: 1rem;
            }
            .mobile-slide {
               position: absolute;
               top: 0; /* Force top align */
            }
            .swiper-controls {
               margin-top: 4rem; /* More space */
            }
            .main-title {
               font-size: 2.5rem;
            }
            .project-card {
              height: auto;
              min-height: 600px;
            }
         }
      `}</style>
    </section>
  );
};
export default Projects;
