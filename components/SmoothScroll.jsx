'use client';

import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
    useEffect(() => {
        // Initialize Lenis with smooth physics
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false, // Keeps native scroll on mobile for better performance
            touchMultiplier: 2,
        });

        // Synchronize Lenis with GSAP's ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        // Sync Lenis's requestAnimationFrame with GSAP's ticker
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Disable GSAP lag smoothing to avoid visual jittering
        gsap.ticker.lagSmoothing(0);

        // Cleanup when the component is removed
        return () => {
            lenis.destroy();
            gsap.ticker.remove((time) => lenis.raf(time * 1000));
        };
    }, []);

    // Render the rest of the website inside this wrapper
    return <>{children}</>;
};

export default SmoothScroll;
