import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import './ForensicCursor.css';

const ForensicCursor = () => {
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorRef = useRef(null);
    const spotlightRef = useRef(null);

    useEffect(() => {
        gsap.set([cursorRef.current, spotlightRef.current], { xPercent: -50, yPercent: -50 });

        const xToCursor = gsap.quickSetter(cursorRef.current, "x", "px");
        const yToCursor = gsap.quickSetter(cursorRef.current, "y", "px");

        const xToSpotlight = gsap.quickSetter(spotlightRef.current, "x", "px");
        const yToSpotlight = gsap.quickSetter(spotlightRef.current, "y", "px");

        const handleMouseMove = (e) => {
            xToCursor(e.clientX);
            yToCursor(e.clientY);

            xToSpotlight(e.clientX);
            yToSpotlight(e.clientY);

            setIsVisible(true);

            const target = e.target;
            if (target && target.tagName) {
                try {
                    setIsPointer(
                        window.getComputedStyle(target).cursor === 'pointer' ||
                        target.tagName === 'A' ||
                        target.tagName === 'BUTTON'
                    );
                } catch (err) {
                    setIsPointer(false);
                }
            }
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove);
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    if (typeof window !== 'undefined' && window.innerWidth <= 1024) return null;

    return (
        <>
            <div
                ref={spotlightRef}
                className={`forensic-spotlight ${isVisible ? 'visible' : ''} ${isPointer ? 'spotlight-focus' : ''}`}
            />
            <div
                ref={cursorRef}
                className={`forensic-cursor ${isPointer ? 'forensic-cursor--pointer' : ''} ${isVisible ? 'visible' : ''}`}
            >
                <div className="cursor-dot" />
                <div className="cursor-aura" />
            </div>
        </>
    );
};

export default ForensicCursor;
