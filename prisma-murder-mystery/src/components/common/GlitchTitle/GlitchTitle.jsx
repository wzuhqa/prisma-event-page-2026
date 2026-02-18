import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './GlitchTitle.module.css';

const GlitchTitle = ({ text = "PRISMA" }) => {
    const containerRef = useRef(null);
    const baseRef = useRef(null);
    const redRef = useRef(null);
    const cyanRef = useRef(null);
    const flashRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Continuous Micro-Glitch (Jitter & Flicker)
            gsap.to([redRef.current, cyanRef.current], {
                x: () => gsap.utils.random(-2, 2),
                y: () => gsap.utils.random(-1, 1),
                duration: 0.1,
                repeat: -1,
                ease: "none",
                yoyo: true
            });

            gsap.to(containerRef.current, {
                opacity: () => gsap.utils.random(0.95, 1),
                filter: () => `contrast(${gsap.utils.random(1, 1.1)}) brightness(${gsap.utils.random(1, 1.05)})`,
                duration: 0.05,
                repeat: -1,
                ease: "none"
            });

            // 2. Aggressive Burst Glitch (Periodic)
            const triggerBurst = () => {
                const tl = gsap.timeline({
                    onComplete: () => {
                        gsap.delayedCall(gsap.utils.random(3, 6), triggerBurst);
                    }
                });

                // Violent Shake
                tl.to(containerRef.current, {
                    x: () => gsap.utils.random(-20, 20),
                    y: () => gsap.utils.random(-10, 10),
                    skewX: () => gsap.utils.random(-10, 10),
                    scale: 1.05,
                    duration: 0.05,
                    repeat: 5,
                });

                // RGB Split Expansion
                tl.to(redRef.current, { x: -15, duration: 0.03 }, 0);
                tl.to(cyanRef.current, { x: 15, duration: 0.03 }, 0);

                // Clip-path Slice
                tl.set([redRef.current, cyanRef.current, baseRef.current], {
                    clipPath: () => {
                        const y1 = gsap.utils.random(0, 80);
                        const y2 = y1 + gsap.utils.random(5, 15);
                        return `inset(${y1}% 0 ${100 - y2}% 0)`;
                    }
                }, 0.1);

                // Flash Overlay
                tl.to(flashRef.current, { opacity: 0.5, backgroundColor: "#7a0000", duration: 0.02 }, 0.05);
                tl.to(flashRef.current, { opacity: 0, duration: 0.02 }, 0.07);

                // Reset
                tl.set([redRef.current, cyanRef.current, baseRef.current], {
                    clipPath: "inset(0% 0 0% 0)",
                    x: 0,
                    y: 0,
                    scale: 1,
                    skewX: 0
                }, 0.2);

                // Random 1-frame blackout
                if (Math.random() > 0.7) {
                    tl.to(containerRef.current, { opacity: 0, duration: 0.05 }, 0.1);
                    tl.to(containerRef.current, { opacity: 1, duration: 0.01 }, 0.15);
                }
            };

            // Start the cycle
            gsap.delayedCall(2, triggerBurst);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className={styles.glitchContainer}>
            <div ref={flashRef} className="absolute inset-0 pointer-events-none z-[50] opacity-0" />
            <div className={styles.noiseOverlay} />
            <div className={styles.scanlines} />

            <div className={styles.titleWrapper}>
                <span ref={redRef} className={`${styles.glitchLayer} ${styles.redLayer} select-none`}>
                    {text}
                </span>
                <span ref={baseRef} className={styles.baseLayer}>
                    {text}
                </span>
                <span ref={cyanRef} className={`${styles.glitchLayer} ${styles.cyanLayer} select-none`}>
                    {text}
                </span>
            </div>
        </div>
    );
};

export default GlitchTitle;
