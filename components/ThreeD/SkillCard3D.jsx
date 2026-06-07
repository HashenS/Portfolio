'use client';

import React, { useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import Skills3DHub from './Skills3DHub';

const SkillCard3D = ({ isBig }) => {
    const cardRef = useRef(null);
    const x = useSpring(0, { stiffness: 100, damping: 30 });
    const y = useSpring(0, { stiffness: 100, damping: 30 });

    const onMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const rotationX = (mouseY / height - 0.5) * -10;
        const rotationY = (mouseX / width - 0.5) * 10;
        x.set(rotationX);
        y.set(rotationY);
    };

    const onMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
                rotateX: x,
                rotateY: y,
                transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`skill-category skill-card-3d ${isBig ? 'big-card' : ''}`}
        >
            <div className="canvas-container">
                <Skills3DHub containerRef={cardRef} />
            </div>

            <style>{`
                .skill-card-3d {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    min-height: 240px;
                    display: flex;
                    flex-direction: column;
                    background: transparent;
                    padding: 0;
                    border-radius: 2.5rem;
                    overflow: hidden;
                    cursor: crosshair;
                }

                .canvas-container {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 2.5rem;
                    overflow: hidden;
                    z-index: 1;
                }
            `}</style>
        </motion.div>
    );
};

export default SkillCard3D;
