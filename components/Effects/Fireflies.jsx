'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Firefly = ({ x, y, duration, delay, size, color }) => {
    return (
        <motion.div
            style={{
                position: 'absolute',
                left: `${x}%`,
                top: `${y}%`,
                width: size,
                height: size,
                backgroundColor: color,
                borderRadius: '50%',
                boxShadow: `0 0 8px ${color}`,
                pointerEvents: 'none',
                zIndex: 1,
            }}
            initial={{ opacity: 0 }}
            animate={{
                x: [0, Math.random() * 80 - 40, Math.random() * 80 - 40, 0],
                y: [0, Math.random() * 80 - 40, Math.random() * 80 - 40, 0],
                opacity: [0, 0.4, 0.7, 0.4, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
        >
            {/* Color Transition Overlay */}
            <motion.div
                initial={false}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                key={color} // Triggers fade whenever color changes
                style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    backgroundColor: color,
                }}
            />
        </motion.div>
    );
};

const Fireflies = ({ count = 120, color = '#a855f7', style = {} }) => {
    // Generate static position/movement data once
    const fireflyData = useMemo(() => {
        return Array.from({ length: count }).map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: 15 + Math.random() * 25, // Slower for stability
            delay: Math.random() * 2,
            size: 1 + Math.random() * 1.5,
        }));
    }, [count]);

    return (
        <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1, ...style }}>
            {fireflyData.map((data, i) => (
                <Firefly key={i} {...data} color={color} />
            ))}
        </div>
    );
};

export default Fireflies;
