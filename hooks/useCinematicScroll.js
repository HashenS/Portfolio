'use client';

import { animate } from "framer-motion";

/**
 * Custom hook to perform a cinematic, spring-based scroll to a target position.
 */
export const useCinematicScroll = () => {
    const scrollTo = (targetY) => {
        const currentY = window.scrollY;

        animate(currentY, targetY, {
            type: "spring",
            stiffness: 100, // Weighted feel
            damping: 20,
            mass: 1,
            onUpdate: (latest) => {
                window.scrollTo(0, latest);
            }
        });
    };

    return { scrollTo };
};
