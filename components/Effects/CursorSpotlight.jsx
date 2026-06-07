'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorSpotlight = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { stiffness: 100, damping: 30 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY, isVisible]);

    return (
        <motion.div
            className="cursor-spotlight-global"
            style={{
                left: x,
                top: y,
                opacity: isVisible ? 1 : 0,
            }}
        >
            <style>{`
                .cursor-spotlight-global {
                    position: fixed;
                    width: 800px;
                    height: 800px;
                    background: radial-gradient(circle at center, rgba(var(--active-color-rgb, 168, 85, 247), 0.15) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1; /* Behind content but in front of bg text usually */
                    transform: translate(-50%, -50%);
                    mix-blend-mode: screen;
                    filter: blur(40px);
                    transition: opacity 0.5s ease;
                }

                @media (max-width: 1024px) {
                    .cursor-spotlight-global {
                        display: none;
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default CursorSpotlight;
