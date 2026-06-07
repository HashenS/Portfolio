'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionTransition component that adds a scroll-reveal effect to its children.
 * Uses Framer Motion's whileInView prop for a clean, premium reveal animation.
 */
const SectionTransition = ({
    children,
    id,
    direction = 'up',
    delay = 0.1,
    distance = 30,
    duration = 1.2,
    radius = "0rem",
    className = ""
}) => {
    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
            x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
            clipPath: `inset(10% 0% 10% 0% round ${radius})`,
            filter: "blur(10px) brightness(0.5)",
            scale: 0.98,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            clipPath: `inset(-20% -20% -20% -20% round ${radius})`, // Expanded area so no hover/shadow is ever cut
            filter: "blur(0px) brightness(1)",
            scale: 1,
            transition: {
                duration: duration,
                delay: delay,
                ease: [0.16, 1, 0.3, 1], // Power4 quintic-like easing
                clipPath: { duration: duration, ease: "easeOut" }
            },
        },
    };

    return (
        <motion.div
            id={id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={variants}
            className={className}
            style={{
                scrollSnapAlign: 'start',
                scrollSnapStop: 'always'
            }}
        >
            {children}
        </motion.div>
    );
};

export default SectionTransition;
