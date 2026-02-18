import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CaseSummaryPanel.module.css';

gsap.registerPlugin(ScrollTrigger);

const CaseSummaryPanel = () => {
    const sectionRef = useRef(null);
    const paperRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Paper slide-up and background darkening on scroll
            gsap.to(paperRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5,
                },
                y: -150,
                rotateX: 5,
                ease: "none"
            });

            // Background dimming intensity
            gsap.to(sectionRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 60%",
                    end: "bottom 20%",
                    scrub: 1,
                },
                backgroundColor: "#060608",
                ease: "none"
            });

            // Content reveal
            gsap.from(contentRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                },
                opacity: 0,
                y: 40,
                duration: 1.2,
                ease: "power2.out"
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className={styles.sectionRoot}>
            <div className={styles.lampOverlay} />

            <div ref={paperRef} className={styles.caseSummaryPaper}>
                <div className={styles.paperTexture} />

                <div ref={contentRef} className={styles.content}>
                    <div className={styles.caseHeader}>
                        <span className={styles.caseLabel}>CASE SUMMARY</span>
                        <span className={styles.caseNumber}>#PR-2026-B2</span>
                    </div>

                    <h2 className={styles.title}>The PRISMA Anomaly</h2>

                    <div className={styles.metadata}>
                        <p><strong>INCIDENT DATE:</strong> FEB 28, 2026</p>
                        <p><strong>LOCATION:</strong> SRM UNIVERSITY DELHI-NCR</p>
                        <p><strong>PRIORITY:</strong> <span className={styles.highPriority}>CRITICAL</span></p>
                    </div>

                    <div className={styles.divider} />

                    <div className={styles.summaryText}>
                        <p>
                            Reports indicate a series of unexplained technical disturbances centered around the
                            Prisma Event Horizon. Digital artifacts, corrupted transmissions, and
                            "ghost" signals have been documented.
                        </p>
                        <p className="mt-4">
                            Authorized personnel only. Proceeding further implies acceptance of mental
                            instability protocols. The truth is not what it seems.
                        </p>
                    </div>

                    <div className={styles.stamps}>
                        <div className={styles.stampClassified}>CLASSIFIED</div>
                    </div>
                </div>

                {/* Physical Detail: Paperclip or Staple */}
                <div className={styles.staple} />
            </div>

            {/* Background shadow for paper depth */}
            <div className={styles.paperShadow} />
        </section>
    );
};

export default CaseSummaryPanel;
