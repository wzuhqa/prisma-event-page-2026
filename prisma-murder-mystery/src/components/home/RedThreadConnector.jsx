import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RedThreadConnector = () => {
    const pathRef = useRef(null);

    useEffect(() => {
        const path = pathRef.current;
        // SVG paths need to be rendered first before their length can be accurately measured.
        // Wrapping in a tiny timeout ensures the browser has painted it.
        const timeout = setTimeout(() => {
            if (!path) return;
            const length = path.getTotalLength();

            // Setup initial dash array and offset to hide the line completely
            gsap.set(path, {
                strokeDasharray: length,
                strokeDashoffset: length,
            });

            // Use ScrollTrigger to draw the line down the page
            gsap.to(path, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    // Trigger off the whole body to draw it over the entire page height
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                }
            });
        }, 100);

        return () => {
            clearTimeout(timeout);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <svg
            className="fixed top-0 left-0 w-full h-screen pointer-events-none z-[1]"
            viewBox="0 0 1000 3000"
            preserveAspectRatio="none"
        >
            {/* Soft glow for the red thread */}
            <defs>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            {/* Thematic, erratic path that sweeps across the page */}
            <path
                ref={pathRef}
                d="M500,0 C800,400 200,800 500,1200 S800,2000 500,2400 S200,2800 500,3000"
                fill="none"
                stroke="#7a0000"
                strokeWidth="3"
                style={{ opacity: 0.8 }}
                filter="url(#glow)"
            />
        </svg>
    );
}

export default RedThreadConnector;
