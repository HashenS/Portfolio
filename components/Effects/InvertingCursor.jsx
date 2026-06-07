'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';

const InvertingCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    // Main cursor pos
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smoothed spring positions for liquid effect
    const springConfig = { stiffness: 400, damping: 28, mass: 0.2 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Lagged "tail" for bubble stretch - multiple droplets
    const tail1X = useSpring(mouseX, { stiffness: 150, damping: 25, mass: 0.6 });
    const tail1Y = useSpring(mouseY, { stiffness: 150, damping: 25, mass: 0.6 });

    const tail2X = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.8 });
    const tail2Y = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.8 });

    const tail3X = useSpring(mouseX, { stiffness: 80, damping: 15, mass: 1 });
    const tail3Y = useSpring(mouseY, { stiffness: 80, damping: 15, mass: 1 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseDown = () => setIsPressed(true);
        const handleMouseUp = () => setIsPressed(false);

        // Detect if hovering interactive elements
        const handleMouseOver = (e) => {
            const target = e.target;
            if (target.closest?.('button, a, .interactive, .nav-dot, .nav-btn, .skill-chip')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Liquid SVG Filter */}
            <svg style={{ position: 'fixed', width: 0, height: 0 }}>
                <defs>
                    <filter id="liquid">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            <div className="cursor-wrapper">
                <div className="gooey-container">
                    {/* Main Bubble */}
                    <motion.div
                        className="bubble bubble-main"
                        style={{
                            left: springX,
                            top: springY,
                            scale: isPressed ? 0.7 : isHovering ? 1.6 : 1,
                        }}
                    />

                    {/* Multiple Droplets for organic stretch */}
                    <motion.div
                        className="bubble bubble-t1"
                        style={{
                            left: tail1X,
                            top: tail1Y,
                            scale: isPressed ? 0.5 : 0.9,
                        }}
                    />

                    <motion.div
                        className="bubble bubble-t2"
                        style={{
                            left: tail2X,
                            top: tail2Y,
                            scale: isPressed ? 0.4 : 0.75,
                        }}
                    />

                    <motion.div
                        className="bubble bubble-t3"
                        style={{
                            left: tail3X,
                            top: tail3Y,
                            scale: isPressed ? 0.3 : 0.6,
                        }}
                    />
                </div>
            </div>

            <style>{`
                .cursor-wrapper {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 9999;
                    mix-blend-mode: difference;
                }

                .gooey-container {
                    width: 100%;
                    height: 100%;
                    filter: url(#liquid);
                }

                .bubble {
                    position: absolute;
                    background-color: white;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                    will-change: transform;
                    animation: wobble 4s ease-in-out infinite;
                }

                .bubble-main { width: 34px; height: 34px; animation-duration: 3s; }
                .bubble-t1 { width: 28px; height: 28px; animation-duration: 4.5s; }
                .bubble-t2 { width: 22px; height: 22px; animation-duration: 5.2s; }
                .bubble-t3 { width: 16px; height: 16px; animation-duration: 6s; }

                @keyframes wobble {
                    0%, 100% { border-radius: 50% 50% 50% 50%; transform: translate(-50%, -50%) scale(1); }
                    25% { border-radius: 55% 45% 52% 48%; transform: translate(-50%, -50%) scale(1.02, 0.98); }
                    50% { border-radius: 48% 52% 45% 55%; transform: translate(-50%, -50%) scale(0.98, 1.02); }
                    75% { border-radius: 52% 48% 55% 45%; transform: translate(-50%, -50%) scale(1.01, 0.99); }
                }

                @media (max-width: 1024px) {
                    .cursor-wrapper {
                        display: none;
                    }
                }
            `}</style>
        </>
    );
};

export default InvertingCursor;
