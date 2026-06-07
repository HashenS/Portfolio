'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

export const useScrollSnap = (sectionsCount) => {
    const [currentSection, setCurrentSection] = useState(0);
    const [scrollVelocity, setScrollVelocity] = useState(0);
    const [isSnapping, setIsSnapping] = useState(false);
    const lastScrollY = useRef(0);
    const lastScrollTime = useRef(Date.now());
    const velocityTimeout = useRef(null);

    // Calculate scroll velocity
    const calculateVelocity = useCallback(() => {
        const now = Date.now();
        const currentScrollY = window.scrollY;
        const deltaY = currentScrollY - lastScrollY.current;
        const deltaTime = now - lastScrollTime.current;

        if (deltaTime > 0) {
            const velocity = Math.abs(deltaY / deltaTime);
            setScrollVelocity(velocity);
        }

        lastScrollY.current = currentScrollY;
        lastScrollTime.current = now;

        // Reset velocity after inactivity
        clearTimeout(velocityTimeout.current);
        velocityTimeout.current = setTimeout(() => {
            setScrollVelocity(0);
        }, 150);
    }, []);

    // Snap to section
    const snapToSection = useCallback((index) => {
        if (index < 0 || index >= sectionsCount || isSnapping) return;

        setIsSnapping(true);
        const section = document.querySelector(`[data-section-index="${index}"]`);

        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            setCurrentSection(index);

            setTimeout(() => {
                setIsSnapping(false);
            }, 1000);
        }
    }, [sectionsCount, isSnapping]);

    // Handle scroll events
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    calculateVelocity();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(velocityTimeout.current);
        };
    }, [calculateVelocity]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isSnapping) return;

            switch (e.key) {
                case 'ArrowDown':
                case 'PageDown':
                    e.preventDefault();
                    snapToSection(currentSection + 1);
                    break;
                case 'ArrowUp':
                case 'PageUp':
                    e.preventDefault();
                    snapToSection(currentSection - 1);
                    break;
                case 'Home':
                    e.preventDefault();
                    snapToSection(0);
                    break;
                case 'End':
                    e.preventDefault();
                    snapToSection(sectionsCount - 1);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSection, sectionsCount, snapToSection, isSnapping]);

    // Detect current section based on scroll position
    useEffect(() => {
        const handleSectionDetection = () => {
            const sections = document.querySelectorAll('[data-section-index]');
            const scrollPosition = window.scrollY + window.innerHeight / 2;

            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                const sectionTop = window.scrollY + rect.top;
                const sectionBottom = sectionTop + rect.height;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    setCurrentSection(index);
                }
            });
        };

        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleSectionDetection();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        handleSectionDetection(); // Initial detection

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return {
        currentSection,
        scrollVelocity,
        snapToSection,
        isSnapping
    };
};
