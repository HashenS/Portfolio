'use client';

import React, { useState } from 'react';
import { Code2, Palette, Zap, Award } from 'lucide-react';
import CinematicBackgroundText from '../components/Effects/CinematicBackgroundText';
import ScrollReveal from '../components/ScrollReveal';

const About = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const stats = [
    { label: 'Years Experience', value: '3+', icon: Award },
    { label: 'Projects Completed', value: '50+', icon: Code2 },
    { label: 'Technologies', value: '15+', icon: Zap },
    { label: 'Happy Clients', value: '20+', icon: Palette },
  ];

  return (
    <section className="about-section">
      <CinematicBackgroundText text="STORY" top="10%" left="5%" />
      <div className="container">
        <div className="section-header">
          <span className="pre-text">IDENTITY ARCHIVE</span>
          <h2 className="main-title text-gradient">About Me</h2>
          <div className="scanner-line" />
        </div>

        <div className="about-grid">
          <div className="about-portrait">
            <div className={`avatar-mask ${videoLoaded ? 'loaded' : ''}`}>
              {!videoLoaded && <div className="video-skeleton" />}
              <video
                poster="/image/DP.jpg"
                onLoadedData={() => setVideoLoaded(true)}
                autoPlay
                loop
                muted
                playsInline
                className="about-video"
              >
                <source src="/me-portrait.webm" type="video/webm" />
                <source src="/me-portrait.mp4" type="video/mp4" />
              </video>
              <div className="video-overlay" />
            </div>
          </div>

          <div className="about-content">
            <ScrollReveal direction="left" delay={0.2}>
              <div className="content-card glass">
                <h3 className="content-title">Who I Am</h3>
                <div className="content-text">
                  <p>
  I’m a <strong>Full Stack Developer</strong>, <strong>Software Engineer</strong>, and Founder of <strong>Exora</strong> based in Sri Lanka, specializing in building real-world web and software systems.
</p>
<p>
  I prioritize clean architecture, maintainable code, and practical solutions, and I develop automation tools that help optimize workflows and productivity.
</p>
                </div>
              </div>
            </ScrollReveal>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <ScrollReveal
                  key={stat.label}
                  direction={index % 2 === 0 ? 'left' : 'right'}
                  delay={0.4 + index * 0.1}
                >
                  <div className="stat-card glass">
                    <div className="stat-icon">
                      <stat.icon size={20} />
                    </div>
                    <div className="stat-value">{stat.value}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 4rem 0;
          position: relative;
        }

        .section-header {
          text-align: center;
          margin-bottom: 3.5rem;
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
          font-weight: 900;
          letter-spacing: -0.04em;
          margin-bottom: 1rem;
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
          margin-bottom: 1.5rem;
        }

        .section-subtitle {
          font-size: 1.1rem;
          color: #94a3b8;
          line-height: 1.6;
          max-width: 600px;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
          align-items: center;
        }

        @media (min-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
          }
        }

        .about-portrait {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            z-index: 2;
        }

        .avatar-mask {
            width: 100%;
            max-width: 450px;
            aspect-ratio: 4/5;
            margin: 0 auto;
            position: relative;
            mask-image: radial-gradient(circle at center, black 40%, transparent 85%);
            -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 85%);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            border-radius: 2rem;
            background: rgba(var(--active-color-rgb, 124, 58, 237), 0.05);
        }

        .video-skeleton {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          z-index: 1;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .video-overlay {
            position: absolute;
            inset: 0;
            background: repeating-linear-gradient(
                0deg,
                rgba(0, 0, 0, 0.1) 0px,
                rgba(0, 0, 0, 0.1) 1px,
                transparent 1px,
                transparent 2px
            );
            pointer-events: none;
            z-index: 2;
            opacity: 0.5;
        }

        .about-video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
            filter: contrast(1.1) brightness(1.1) saturate(1.1);
            opacity: 0;
            transition: opacity 1s ease;
        }

        .avatar-mask.loaded .about-video {
            opacity: 1;
        }

        .about-content {
            display: flex;
            flex-direction: column;
            gap: 2rem;
        }

        .content-card {
          padding: 2rem;
          border-radius: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .content-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1.5rem;
        }

        .content-text {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .content-text p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: #94a3b8;
        }

        .content-text strong {
          color: var(--active-color, #a855f7);
          font-weight: 600;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .stat-card {
          padding: 1.5rem 1.25rem;
          border-radius: 1.25rem;
          border: 1px solid rgba(255, 255, 255, 0.08);
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: var(--active-color);
          box-shadow: 0 10px 30px rgba(var(--active-color-rgb, 168, 85, 247), 0.1);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          margin: 0 auto 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(var(--active-color-rgb, 168, 85, 247), 0.1);
          border-radius: 12px;
          color: var(--active-color);
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: white;
          margin-bottom: 0.5rem;
          font-family: var(--font-heading);
        }

        .stat-label {
          font-size: 0.85rem;
          color: #94a3b8;
          font-weight: 500;
        }
        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
            text-align: center;
          }

          .about-portrait {
            margin: 0 auto;
            max-width: 400px;
          }

          .content-title {
            text-align: center;
          }

          .content-title::after {
            left: 50%;
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .about-grid {
            gap: 1.5rem;
          }

          .avatar-mask {
            max-width: 320px;
            aspect-ratio: 4/5;
            mask-image: radial-gradient(circle at center, black 40%, transparent 90%);
            -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 90%);
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .about-section {
            padding: 1rem 0;
          }
          
          .section-header {
            margin-bottom: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
