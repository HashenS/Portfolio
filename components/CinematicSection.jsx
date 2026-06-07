'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const CinematicSection = ({
    children,
    id,
    index = 0,
    className = '',
    parallaxIntensity = 0.5
}) => {
    const sectionRef = useRef(null);
    const [isInView, setIsInView] = useState(false);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Smooth spring animation for parallax
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Parallax transforms for different layers
    const backgroundY = useTransform(smoothProgress, [0, 1], [100 * parallaxIntensity, -100 * parallaxIntensity]);
    const contentY = useTransform(smoothProgress, [0, 1], [50 * parallaxIntensity, -50 * parallaxIntensity]);

    // Scale effect for depth
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

    // Opacity for fade transitions
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // Detect when section is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <motion.section
            ref={sectionRef}
            id={id}
            className={`cinematic-section ${className}`}
            style={{
                scale,
                opacity
            }}
            data-section-index={index}
        >
            {/* Background parallax layer */}
            <motion.div
                className="parallax-background"
                style={{ y: backgroundY }}
            />

            {/* Content with subtle parallax */}
            <motion.div
                className="parallax-content"
                style={{ y: contentY }}
            >
                {children}
            </motion.div>

            {/* Motion blur overlay during transitions */}
            <motion.div
                className="motion-blur-overlay"
                style={{
                    opacity: useTransform(scrollYProgress,
                        [0, 0.1, 0.9, 1],
                        [0.3, 0, 0, 0.3]
                    )
                }}
            />

        </motion.section>
    );
};

export default CinematicSection;
