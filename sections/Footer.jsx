'use client';

import React from 'react';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, link: 'https://github.com/hashens/', label: 'GitHub' },
    { icon: Linkedin, link: 'https://www.linkedin.com/in/hashen-shehara-142049332/', label: 'LinkedIn' },
    { icon: Mail, link: 'mailto:hashenshehara4@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <a href="#home" className="brand-logo">
              HASHEN<span className="brand-dot">.</span>
            </a>
            <p className="brand-tagline">
              Building digital experiences with passion and precision
            </p>
          </div>

          <div className="footer-links">
            <h4 className="footer-title">Quick Links</h4>
            <nav className="links-nav">
              {footerLinks.map((link) => (
                <a key={link.name} href={link.href} className="footer-link">
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="footer-social">
            <h4 className="footer-title">Connect</h4>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} Hashen Shehara. All rights reserved.
          </p>
          <p className="made-with">
            Made with <Heart size={14} className="heart-icon" /> using React & Vite
          </p>
        </div>
      </div>

      <style>{`
        .footer {
          padding: 4rem 0 2rem;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }

        .footer-content {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }

        @media (min-width: 768px) {
          .footer-content {
            grid-template-columns: 1.5fr 1fr 1fr;
            gap: 4rem;
          }
        }

        .footer-brand {
          max-width: 350px;
        }

        .brand-logo {
          font-size: 1.75rem;
          font-weight: 800;
          color: white;
          text-decoration: none;
          letter-spacing: -0.02em;
          display: inline-block;
          margin-bottom: 1rem;
        }

        .brand-dot {
          color: var(--active-color);
        }

        .brand-tagline {
          font-size: 0.95rem;
          line-height: 1.6;
          color: #64748b;
        }

        .footer-title {
          font-size: 0.9rem;
          font-weight: 700;
          color: white;
          margin-bottom: 1.25rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .links-nav {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-link {
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: var(--active-color);
        }

        .social-links {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .social-link {
          width: 40px;
          height: 40px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .social-link:hover {
          background: rgba(var(--active-color-rgb), 0.1);
          border-color: rgba(var(--active-color-rgb), 0.3);
          color: var(--active-color);
          transform: translateY(-2px);
        }

        .footer-bottom {
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          text-align: center;
        }

        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
          }
        }

        .copyright, .made-with {
          font-size: 0.875rem;
          color: #64748b;
        }

        .made-with {
          display: flex;
          align-items: center;
          gap: 0.35rem;
        }

        .heart-icon {
          color: #ef4444;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(1.1); }
          20%, 40% { transform: scale(1); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
