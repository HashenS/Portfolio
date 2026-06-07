'use client';

import React from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

// Custom WhatsApp Icon Component (Official Logo)
const WhatsAppIcon = ({ size = 24, className = "" }) => (
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

const SocialSidebar = () => {
    const socialLinks = [
        { icon: Github, link: "https://github.com/hashens/", label: "GitHub" },
        {
            icon: Linkedin,
            link: "https://www.linkedin.com/in/hashen-shehara-142049332/",
            label: "LinkedIn",
        },
        { icon: Mail, link: "mailto:hashenshehara4@gmail.com", label: "Email" },
        { icon: WhatsAppIcon, link: "https://wa.me/94701595851", label: "WhatsApp" },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="social-sidebar-container"
        >
            <div className="social-sidebar-icons">
                {socialLinks.map((social) => (
                    <a
                        key={social.label}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-sidebar-item"
                        aria-label={social.label}
                    >
                        <social.icon size={20} className="social-icon" />
                        <div className="social-tooltip">{social.label}</div>
                    </a>
                ))}
            </div>

            <style>{`
        .social-sidebar-container {
          position: fixed;            /* stays in same place while scrolling */
          left: 2rem;
          top: 50%;
          transform: translateY(-50%);
          z-index: 9999;
          display: none;
          pointer-events: none;       /* container doesn't block clicks */
        }

        @media (min-width: 1024px) {
          .social-sidebar-container {
            display: block;
          }
        }

        .social-sidebar-icons {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          pointer-events: auto;       /* icons remain clickable */
        }

        .social-sidebar-item {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;

          /* remove the box */
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-radius: 0 !important;

          color: rgba(255, 255, 255, 0.7);
          position: relative;
          text-decoration: none;
          transition: transform 0.25s ease, color 0.25s ease;
        }

        .social-icon {
          transition: transform 0.25s ease;
        }

        .social-sidebar-item:hover {
          color: var(--active-color);
          transform: translateX(3px);
        }

        .social-sidebar-item:hover .social-icon {
          transform: scale(1.1);
        }

        .social-tooltip {
          position: absolute;
          left: 100%;
          margin-left: 1.25rem;
          padding: 0.5rem 0.9rem;
          background: rgba(15, 23, 42, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 8px;
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
          opacity: 0;
          pointer-events: none;
          transition: all 0.25s ease;
          white-space: nowrap;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
          transform: translateX(0);
        }

        .social-sidebar-item:hover .social-tooltip {
          opacity: 1;
          transform: translateX(6px);
        }
      `}</style>
        </motion.div>
    );
};

export default SocialSidebar;
