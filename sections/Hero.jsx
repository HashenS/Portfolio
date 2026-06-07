'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import CinematicBackgroundText from '../components/Effects/CinematicBackgroundText';
import { Github, Linkedin, Mail } from 'lucide-react';

// Custom WhatsApp Icon Component (Official Logo)
const WhatsAppIcon = ({ size = 22, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const Hero = ({ color = '#a855f7' }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const titles = [
    "a Designer",
    "a Frontend Developer",
    "a Backend Developer",
    "a Freelancer",
    "an Editor"
  ];

  const socialLinks = [
    { icon: Github, link: "https://github.com/hashens/", label: "GitHub" },
    { icon: Linkedin, link: "https://www.linkedin.com/in/hashen-shehara-142049332/", label: "LinkedIn" },
    { icon: Mail, link: "mailto:hashenshehara4@gmail.com", label: "Email" },
    { icon: WhatsAppIcon, link: "https://wa.me/94701595851", label: "WhatsApp" },
  ];

  // Mouse tracking logic for professional interactions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const shineX = useTransform(springX, [-0.5, 0.5], ["0%", "100%"]);
  const shineY = useTransform(springY, [-0.5, 0.5], ["0%", "100%"]);

  const glowX = useTransform(springX, [-0.5, 0.5], ["30%", "70%"]);
  const glowY = useTransform(springY, [-0.5, 0.5], ["30%", "70%"]);

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % titles.length;
      const fullText = titles[i];

      setText(isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, titles]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const blurVariants = {
    hidden: { opacity: 0, filter: 'blur(20px)', scale: 0.9, x: 60 },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      scale: 1,
      x: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.4
      }
    }
  };

  return (
    <section id="home" className="hero-section">
      <CinematicBackgroundText text="H-S-S" top="15%" left="2%" />

      {/* Hero Integrated Social Icons - Static & Centered on Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: "-50%" }}
        whileInView={{ opacity: 1, x: 0, y: "-50%" }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="hero-social-icons-container"
      >
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-icon-item"
            aria-label={social.label}
          >
            <social.icon size={18} className="social-icon" />
            <div className="hero-social-tooltip">{social.label}</div>
          </a>
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
           .marquee-text {
              opacity: 0.05 !important;
           }
        }
      `}</style>

      <div className="container hero-grid">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="hero-text-content"
        >

          <motion.h1 variants={itemVariants} className="hero-title">
            Hi, I'm
          </motion.h1>
          <motion.h1 variants={itemVariants} className="hero-title">
            <span className="text-gradient">Hashen Shehara</span>
          </motion.h1>

          <motion.h2 variants={itemVariants} className="hero-subtitle">
            I'm&nbsp;
            <span className="typewriter-container">
              {text}
              <span className="cursor">|</span>
            </span>
          </motion.h2>

          <motion.p variants={itemVariants} className="hero-description">
            I design and build real-world software systems and automation solutions focused on performance, usability, and clean structure.
          </motion.p>

          <motion.div variants={itemVariants} className="hero-actions">
            <a href="#contact" className="btn-glass btn-primary">
              Get In Touch
              <div className="btn-glow"></div>
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-glass btn-secondary">
              Resume
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          variants={blurVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="hero-animation-container"
        >
          <div
            className="image-card-wrapper"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >

            <motion.div
              className="glass-card"
              style={{ rotateX, rotateY, perspective: 1000 }}
            >
              <div className="glass-card-inner">
                <Image
                  src="/image/DP.webp"
                  alt="Hashen Shehara"
                  fill
                  priority
                  sizes="(max-width: 768px) 280px, 440px"
                  className="hero-main-image"
                  style={{ objectFit: 'cover' }}
                />
                <div className="glass-overlay"></div>
              </div>

              {/* Dynamic Specular Highlights */}
              <motion.div
                className="interactive-shine"
                style={{
                  background: useTransform(
                    [shineX, shineY],
                    ([x, y]) => `radial-gradient(500px circle at ${x} ${y}, rgba(255, 255, 255, 0.15), transparent 60%)`
                  )
                }}
              />
              <motion.div
                className="eye-light"
                style={{
                  background: useTransform(
                    [shineX, shineY],
                    ([x, y]) => `radial-gradient(200px circle at ${x} ${y}, rgba(255, 255, 255, 0.08), transparent 80%)`
                  )
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-section { 
          min-height: 100vh; 
          display: flex; 
          align-items: center; 
          position: relative; 
          overflow: hidden; 
          padding: 8rem 0 4rem;
          background: radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
        }
        
        .hero-grid { 
          display: grid; 
          grid-template-columns: 1fr; 
          gap: 3rem; 
          align-items: center; 
          position: relative;
          z-index: 10;
        }
        
        @media (min-width: 1024px) { 
          .hero-grid { 
            grid-template-columns: 1.1fr 0.9fr; 
            gap: 8rem;
          } 
        }
        
        .hero-text-content { 
          max-width: 650px; 
          position: relative;
          z-index: 20;
        }

        .hero-title {
          font-family: 'Outfit', sans-serif;
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 800;
          line-height: 1.1;
          color: white;
          margin-bottom: 0.5rem;
        }

        .text-gradient {
          background: linear-gradient(135deg, #fff 0%, var(--active-color, #a855f7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: clamp(1.25rem, 3vw, 2rem);
          margin: 1.5rem 0 2rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          min-height: 1.5em;
          display: flex;
          align-items: center;
        }

        .typewriter-container {
          background: linear-gradient(135deg, #fff 0%, var(--active-color, #a855f7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .cursor {
          -webkit-text-fill-color: var(--active-color, #a855f7);
          margin-left: 2px;
          animation: blink 1s step-end infinite;
        }

        @keyframes blink {
          from, to { opacity: 1; }
          50% { opacity: 0; }
        }

        .hero-description {
          font-size: clamp(1rem, 1.5vw, 1.125rem);
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 3.5rem;
          max-width: 540px;
        }

        .hero-actions { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 1.5rem; 
        }
        
        .btn-glass {
          padding: 1.1rem 2.5rem; 
          border-radius: 1.25rem; 
          font-weight: 700; 
          font-size: 1rem;
          text-decoration: none; 
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-primary { 
          background: rgba(var(--active-color-rgb, 168, 85, 247), 0.15); 
          color: white; 
          box-shadow: 0 5px 15px rgba(var(--active-color-rgb, 168, 85, 247), 0.3), 0 0 30px rgba(var(--active-color-rgb, 168, 85, 247), 0.1);
          border-color: rgba(var(--active-color-rgb, 168, 85, 247), 0.3);
        }

        .btn-primary:hover { 
          background: var(--active-color);
          transform: translateY(-5px) scale(1.05); 
          box-shadow: 0 15px 40px rgba(var(--active-color-rgb, 168, 85, 247), 0.6), 0 0 60px rgba(var(--active-color-rgb, 168, 85, 247), 0.3); 
          border-color: #fff;
          color: #000 !important;
        }

        .btn-secondary { 
          background: rgba(255, 255, 255, 0.03);
          color: white; 
          border: 1px solid rgba(255, 255, 255, 0.1); 
        }
        
        .btn-secondary:hover { 
          background: rgba(255, 255, 255, 0.1); 
          transform: translateY(-5px) scale(1.05); 
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
        }

        .btn-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, #fff 0%, transparent 80%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
          mix-blend-mode: overlay;
        }

        .btn-primary:hover .btn-glow {
          opacity: 0.5;
        }
        
        .hero-animation-container { 
          position: relative; 
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          z-index: 5;
        }

        .image-card-wrapper {
          position: relative;
          width: 100%;
          max-width: 440px;
          perspective: 2000px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .glass-card {
          position: relative;
          width: 100%;
          aspect-ratio: 4/5;
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(35px);
          border-radius: 3.5rem;
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 1.25rem;
          box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.8);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          transform-style: preserve-3d;
        }

        .glass-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 2.25rem;
          overflow: hidden;
          background: #050810;
        }

        .hero-main-image {
          opacity: 0.85;
        }




        /* Hero Social Icons Styles - Perfectly Centered on Viewport (Static) */
        .hero-social-icons-container {
            position: absolute;
            left: 2rem;
            top: 50%;
            transform: translateY(-50%);
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
            z-index: 100;
        }

        .hero-social-icon-item {
            color: rgba(255, 255, 255, 0.5);
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            text-decoration: none;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            width: 48px;
            height: 48px;
        }

        .hero-social-icon-item:hover {
            color: var(--active-color);
            transform: scale(1.1) translateX(3px);
            background: rgba(255, 255, 255, 0.1);
            border-color: var(--active-color);
        }

        .hero-social-icon-item .social-icon {
            width: 18px !important;
            height: 18px !important;
            transition: transform 0.3s ease;
        }

        .hero-social-icon-item:hover .social-icon {
            transform: scale(1.1);
        }

        .hero-social-tooltip {
            position: absolute;
            left: 100%;
            margin-left: 1.5rem;
            padding: 0.5rem 1rem;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 8px;
            color: white;
            font-size: 0.8rem;
            font-weight: 600;
            opacity: 0;
            pointer-events: none;
            transition: all 0.3s ease;
            white-space: nowrap;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            transform: translateX(-5px);
        }

        .hero-social-icon-item:hover .hero-social-tooltip {
            opacity: 1;
            transform: translateX(5px);
        }

        @media (max-width: 1024px) {
            .hero-social-icons-container {
                left: 1rem;
            }
        }

        @media (max-width: 768px) {
            .hero-section {
                min-height: auto; /* Remove forced full screen height */
                padding: 8rem 1.5rem 1rem; /* Better top padding for Navbar, reduced bottom gap */
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                gap: 2rem;
            }
            .hero-grid {
                gap: 2.5rem; 
            }
            .hero-social-icons-container {
                position: absolute;
                left: 0.5rem; /* Closer to edge */
                top: 50%;
                transform: translateY(-50%);
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                z-index: 100;
            }
            .hero-social-icon-item {
                width: 36px;
                height: 36px;
                border-radius: 6px;
            }
            .hero-social-icon-item .social-icon {
                width: 14px !important;
                height: 14px !important;
            }
            .hero-text-content {
                padding: 0;
                text-align: center; /* Center for mobile compactness */
                max-width: 100%;
            }
            .hero-title {
                font-size: clamp(2rem, 9vw, 2.75rem); 
                margin-bottom: 0.5rem;
                line-height: 1.2;
            }
            .hero-subtitle {
                font-size: 1.25rem;
                margin: 0.5rem 0 1rem;
                justify-content: center;
            }
            .hero-description {
                font-size: 0.95rem;
                margin-bottom: 2rem;
                line-height: 1.6;
                color: rgba(255, 255, 255, 0.7);
            }
            .hero-actions {
                justify-content: center;
                gap: 1.5rem;
            }
            .btn-glass {
                padding: 0.8rem 1.5rem;
                font-size: 0.9rem;
            }
            .hero-animation-container {
                width: 100%;
                display: flex;
                justify-content: center;
                transform: none; /* Removed confusing scale */
                margin: 0;
            }
            .image-card-wrapper {
                max-width: 280px; /* Controlled size for mobile */
                width: 85%;
            }
            .glass-card {
                border-radius: 2rem;
            }
            .hero-social-tooltip {
                display: none;
            }
        }
      `}</style>
    </section>
  );
};

export default Hero;
