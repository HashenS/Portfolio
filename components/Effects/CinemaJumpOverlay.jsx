'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CinemaJumpOverlay = () => {
    const [isTriggered, setIsTriggered] = useState(false);

    useEffect(() => {
        const handleJump = () => {
            setIsTriggered(true);
            setTimeout(() => setIsTriggered(false), 800);
        };

        window.addEventListener('cinema-jump', handleJump);
        return () => window.removeEventListener('cinema-jump', handleJump);
    }, []);

    return (
        <AnimatePresence>
            {isTriggered && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 0.4, 0],
                        scale: [1, 1.2, 1],
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="cinema-jump-overlay"
                >
                    <div className="flare-core"></div>
                    <style>{`
                        .cinema-jump-overlay {
                            position: fixed;
                            inset: 0;
                            z-index: 10000;
                            pointer-events: none;
                            background: radial-gradient(circle at center, rgba(var(--active-color-rgb, 168, 85, 247), 0.15) 0%, transparent 70%);
                            mix-blend-mode: screen;
                        }

                        .flare-core {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 200%;
                            height: 2px;
                            background: linear-gradient(90deg, transparent, var(--active-color, #a855f7), transparent);
                            transform: translate(-50%, -50%) rotate(-45deg);
                            opacity: 0.3;
                            filter: blur(20px);
                        }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CinemaJumpOverlay;
