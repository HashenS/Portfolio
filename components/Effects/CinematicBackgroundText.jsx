'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CinematicBackgroundText = ({ text, top = "20%", left = "5%", fontSize = "25vw" }) => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <motion.div
            ref={ref}
            style={{ y, opacity }}
            className="cinematic-bg-text-container"
        >
            <div className="marquee-wrapper">
                <span className="marquee-text">{text}&nbsp;&nbsp;&nbsp;</span>
                <span className="marquee-text">{text}&nbsp;&nbsp;&nbsp;</span>
                <span className="marquee-text">{text}&nbsp;&nbsp;&nbsp;</span>
                <span className="marquee-text">{text}&nbsp;&nbsp;&nbsp;</span>
            </div>
            <style>{`
                .cinematic-bg-text-container {
                    position: absolute;
                    top: ${top};
                    left: 0;
                    width: 100%;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 1;
                }

                .marquee-wrapper {
                    display: flex;
                    width: max-content;
                    animation: marquee 30s linear infinite;
                }

                .marquee-text {
                    font-size: ${fontSize};
                    font-weight: 900;
                    line-height: 1;
                    color: transparent;
                    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.12);
                    letter-spacing: -0.05em;
                    white-space: nowrap;
                    font-family: 'Outfit', sans-serif;
                    text-transform: uppercase;
                }

                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-25%); }
                }

                @media (max-width: 768px) {
                    .marquee-text {
                        font-size: calc(${fontSize} * 0.6) !important;
                    }
                }
            `}</style>
        </motion.div>
    );
};

export default CinematicBackgroundText;
