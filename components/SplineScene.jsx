'use client';

import React from 'react';

const SplineScene = () => {
    return (
        <div className="spline-container" style={{
            width: '100%',
            // Force a fixed height to ensure it doesn't collapse
            height: '600px',
            position: 'relative',
            borderRadius: '2rem',
            overflow: 'hidden',
            // Add a subtle border or background to see the container bounds for debugging
            background: '#050505'
        }}>
            <iframe
                src="https://my.spline.design/strokefollowcopycopy-5QXj9SpLdvpbn8FhKS7Y7Q7g-yEv/"
                frameBorder="0"
                width="100%"
                height="100%"
                style={{
                    border: 'none',
                    display: 'block',
                    // Scale up and shift to hide the watermark
                    width: '120%',
                    height: '120%',
                    position: 'absolute',
                    top: '-10%',
                    left: '-10%'
                }}
                title="Spline 3D Scene"
                allow="fullscreen; events"
            ></iframe>
        </div>
    );
};

export default SplineScene;
