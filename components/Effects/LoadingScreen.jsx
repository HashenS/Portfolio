'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';

const LoadingScreen = ({ onComplete }) => {
    const [animationData, setAnimationData] = useState(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Fetch lottie data from public folder
        fetch('/space boy developer.json')
            .then(res => res.json())
            .then(data => setAnimationData(data))
            .catch(err => console.error("Lottie Load Error:", err));

        // Progress bar timer (1.8 seconds total for a snappier feel)
        const duration = 1800;
        const interval = 30; // update slightly faster for smoothness
        const step = (interval / duration) * 100;

        const progressTimer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return prev + step;
            });
        }, interval);

        const timer = setTimeout(onComplete, duration);

        return () => {
            clearTimeout(timer);
            clearInterval(progressTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                y: -100,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
            }}
            className="loading-screen"
        >
            <div className="loader-content">
                <div className="lottie-container">
                    {animationData && (
                        <Lottie
                            animationData={animationData}
                            loop={true}
                            className="rocket-lottie"
                        />
                    )}
                    <div className="loading-glow" />
                </div>

                <div className="progress-container">
                    <div className="progress-bar-wrapper">
                        <motion.div
                            className="progress-bar-fill"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.1 }}
                        />
                    </div>
                    <div className="progress-text">
                        <span>SYSTEM INITIALIZING</span>
                        <span>{Math.round(progress)}%</span>
                    </div>
                </div>
            </div>

            <style>{`
                .loading-screen {
                    position: fixed;
                    inset: 0;
                    background: #000;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }

                .loader-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 2rem;
                    width: 100%;
                    max-width: 400px;
                    padding: 2rem;
                }

                .lottie-container {
                    position: relative;
                    width: clamp(200px, 50vw, 300px);
                    height: clamp(200px, 50vw, 300px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .rocket-lottie {
                    width: 100%;
                    height: 100%;
                    filter: drop-shadow(0 0 20px rgba(var(--active-color-rgb, 124, 58, 237), 0.3));
                }

                .loading-glow {
                    position: absolute;
                    inset: 30px;
                    background: radial-gradient(circle, rgba(var(--active-color-rgb, 124, 58, 237), 0.15) 0%, transparent 70%);
                    pointer-events: none;
                }

                .progress-container {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .progress-bar-wrapper {
                    width: 100%;
                    height: 2px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 4px;
                    overflow: hidden;
                    position: relative;
                }

                .progress-bar-fill {
                    height: 100%;
                    background: var(--active-color, #7c3aed);
                    box-shadow: 0 0 10px var(--active-color, #7c3aed);
                }

                .progress-text {
                    display: flex;
                    justify-content: space-between;
                    font-family: 'JetBrains Mono', monospace;
                    font-size: 0.7rem;
                    color: rgba(255, 255, 255, 0.5);
                    letter-spacing: 0.1em;
                }
            `}</style>
        </motion.div>
    );
};

export default LoadingScreen;
