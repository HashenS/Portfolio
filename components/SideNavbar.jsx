'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Code2, Briefcase, MessageSquare, ChevronLeft } from 'lucide-react';
import { useCinematicScroll } from '../hooks/useCinematicScroll';

const SideNavbar = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isCollapsed, setIsCollapsed] = useState(true);
    const { scrollTo } = useCinematicScroll();

    const navItems = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'about', icon: User, label: 'About' },
        { id: 'skills', icon: Code2, label: 'Skills' },
        { id: 'projects', icon: Briefcase, label: 'Projects' },
        { id: 'contact', icon: MessageSquare, label: 'Contact' }
    ];

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0% -40% 0%',
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        navItems.forEach((item) => {
            const element = document.getElementById(item.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            window.dispatchEvent(new CustomEvent('cinema-jump'));
            const targetY = element.getBoundingClientRect().top + window.scrollY;
            scrollTo(targetY);
            // Auto close on mobile after selection
            if (typeof window !== 'undefined' && window.innerWidth <= 768) setIsCollapsed(true);
        }
    };

    return (
        <div className="side-nav-wrapper">
            <motion.div
                className="side-nav-inner"
                initial={false}
                animate={{
                    x: (typeof window !== 'undefined' && window.innerWidth <= 768 && isCollapsed) ? '76px' : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                {/* Mobile Toggle Trigger - Now part of the horizontal flow */}
                <motion.button
                    initial={false}
                    animate={{
                        rotate: isCollapsed ? 0 : 180,
                    }}
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="side-nav-toggle-btn glass"
                    aria-label="Toggle Navigation"
                >
                    <ChevronLeft
                        size={20}
                        color="var(--active-color)"
                    />
                </motion.button>

                <div className="side-nav-container">
                    <div className="side-nav-pill glass">
                        {navItems.map((item) => (
                            <a
                                key={item.id}
                                href={`#${item.id}`}
                                onClick={(e) => handleClick(e, item.id)}
                                className={`side-nav-item ${activeSection === item.id ? 'active' : ''}`}
                                aria-label={item.label}
                            >
                                {activeSection === item.id && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="active-indicator"
                                        transition={{
                                            type: "spring",
                                            stiffness: 380,
                                            damping: 30,
                                            mass: 1
                                        }}
                                    />
                                )}

                                <item.icon size={20} className="nav-icon" />
                                <div className="tooltip">{item.label}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </motion.div>

            <style>{`
                .side-nav-wrapper {
                    position: fixed;
                    right: 2rem;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 9999;
                }

                @media (max-width: 1024px) {
                    .side-nav-wrapper {
                        right: 1.5rem;
                    }
                }

                .side-nav-inner {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .side-nav-toggle-btn {
                    display: none;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    cursor: pointer;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    background: rgba(10, 10, 20, 0.6);
                    backdrop-filter: blur(10px);
                    flex-shrink: 0;
                }

                @media (max-width: 768px) {
                    .side-nav-wrapper {
                        right: 0;
                    }
                    .side-nav-inner {
                        flex-direction: row !important;
                        gap: 1rem !important;
                        padding-right: 0.75rem !important;
                    }
                    .side-nav-toggle-btn {
                        display: flex;
                        margin-bottom: 0;
                        background: rgba(10, 10, 20, 0.8) !important;
                        box-shadow: -5px 0 15px rgba(0,0,0,0.2);
                    }
                    .side-nav-pill {
                        flex-direction: column !important;
                        padding: 0.75rem 0.5rem !important;
                        gap: 1rem !important;
                        background: rgba(10, 10, 20, 0.9) !important;
                        border-radius: 100px !important; /* Restore rounded look */
                    }
                    .side-nav-item {
                        width: 38px !important;
                        height: 38px !important;
                    }
                    .nav-icon {
                        width: 18px;
                        height: 18px;
                    }
                    .tooltip {
                        display: none;
                    }
                }

                .side-nav-pill {
                    display: flex;
                    flex-direction: column;
                    gap: 1.25rem;
                    padding: 1rem;
                    border-radius: 100px;
                    background: rgba(10, 10, 20, 0.6);
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
                }

                .side-nav-item {
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: rgba(255, 255, 255, 0.4);
                    border-radius: 50%;
                    position: relative;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    z-index: 1;
                }

                .nav-icon {
                    position: relative;
                    z-index: 2;
                    transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .side-nav-item:hover .nav-icon {
                    transform: scale(1.15);
                }

                .side-nav-item.active {
                    color: white;
                }

                .side-nav-item.active .nav-icon {
                    color: var(--active-color);
                    transform: scale(1.1);
                }

                .active-indicator {
                    position: absolute;
                    inset: 0;
                    background: rgba(var(--active-color-rgb, 168, 85, 247), 0.15);
                    border: 1px solid var(--active-color);
                    border-radius: 50%;
                    z-index: 1;
                    box-shadow: 0 0 25px rgba(var(--active-color-rgb, 168, 85, 247), 0.4), 0 0 50px rgba(var(--active-color-rgb, 168, 85, 247), 0.2);
                }

                .tooltip {
                    position: absolute;
                    right: 100%;
                    margin-right: 1.5rem;
                    padding: 0.5rem 1rem;
                    background: rgba(10, 10, 20, 0.9);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    color: white;
                    font-size: 0.8rem;
                    font-weight: 600;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.3s ease;
                    white-space: nowrap;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
                }

                .side-nav-item:hover .tooltip {
                    opacity: 1;
                    transform: translateX(-5px);
                }
            `}</style>
        </div>
    );
};

export default SideNavbar;
