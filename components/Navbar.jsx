'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onToggleColor, color = '#a855f7' }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Smooth exit when leaving the immediate hero area
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`nav-fixed ${isScrolled ? 'nav-scrolled' : 'nav-default'}`} style={{ '--active-color': color }}>
            <div className="container nav-container">
                <motion.a
                    key="logo"
                    initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    href="#home"
                    className="logo"
                >
                    Hashen<span className="logo-purple">S</span><span className="logo-dot">.</span>
                </motion.a>

                <motion.div
                    key="nav-actions"
                    initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                    className="nav-actions-group"
                >
                    <button
                        className="color-toggle-btn"
                        onClick={onToggleColor}
                        aria-label="Change Background Color"
                        title="Magic Fireflies"
                    >
                        <Sparkles size={20} />
                    </button>

                    <div className="nav-action">
                        <motion.a
                            href="#contact"
                            className="btn-primary contrast-text"
                            whileHover={{
                                y: -3,
                                scale: 1.05,
                                transition: { type: "spring", stiffness: 400, damping: 10 }
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Hire Me
                        </motion.a>
                    </div>
                </motion.div>
            </div>

            <style>{`
        .nav-fixed { position: fixed; top: 0; left: 0; width: 100%; z-index: 1000; transition: all 0.4s ease; }
        .nav-scrolled { padding: 0.75rem 0; }
        .nav-default { padding: 1.5rem 0; margin-top: 1rem; }
        
        .nav-container { display: flex; align-items: center; justify-content: space-between; height: 3.5rem; }
        
        .logo { font-size: 1.875rem; font-weight: 800; text-decoration: none; color: white; letter-spacing: -0.05em; display: flex; align-items: center; }
        .logo-purple { color: var(--active-color); transition: color 0.4s ease; }
        .logo-dot { color: var(--active-color); transition: color 0.4s ease; }

        @media (max-width: 768px) {
            .nav-default { padding: 0.75rem 0; margin-top: 0; }
            .logo { font-size: 1.25rem; }
            .btn-primary { padding: 0.5rem 1rem; font-size: 0.75rem; }
            .color-toggle-btn { padding: 0.5rem; }
        }
        
        /* Contrast Fix */
        .contrast-text {
            color: white;
            transition: color 0.3s ease;
        }

        /* If white theme active */
        [style*="--active-color: #ffffff"] .contrast-text,
        [style*="--active-color: #fff"] .contrast-text {
            color: #000000 !important;
        }

        .nav-actions-group {
            display: flex;
            align-items: center;
            gap: 1rem;
        }

        .color-toggle-btn {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            color: var(--active-color);
            padding: 0.6rem;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .color-toggle-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: scale(1.1) rotate(10deg);
            box-shadow: 0 0 15px var(--active-color);
        }

        .nav-action { padding-left: 1rem; }
        .btn-primary { 
          padding: 0.625rem 1.5rem; font-size: 0.875rem; font-weight: 700; color: white; border-radius: 99px; text-decoration: none;
          background: var(--active-color); 
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); 
          display: inline-block;
          box-shadow: 0 4px 15px rgba(var(--active-color-rgb), 0.3);
          position: relative;
          overflow: hidden;
        }

        .btn-primary:hover { 
          box-shadow: 0 5px 20px rgba(var(--active-color-rgb), 0.5), 0 0 40px rgba(var(--active-color-rgb), 0.2); 
          filter: brightness(1.2);
          border-color: #fff;
        }

        /* White theme special case */
        [style*="--active-color: #ffffff"] .btn-primary,
        [style*="--active-color: #fff"] .btn-primary {
            background: #ffffff !important;
            color: #000 !important;
            border-color: #ccc !important;
        }
      `}</style>
        </nav>
    );
};

export default Navbar;
