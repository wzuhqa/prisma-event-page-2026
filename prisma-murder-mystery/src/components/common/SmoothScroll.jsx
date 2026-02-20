import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis, useLenis } from 'lenis/react';
import { useLocation } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }) => {
    const lenis = useLenis(ScrollTrigger.update);
    const { pathname } = useLocation();

    useEffect(() => {
        // Let GSAP drive the requestAnimationFrame loop for perfect sync
        gsap.ticker.add((time) => {
            if (lenis) {
                lenis.raf(time * 1000);
            }
        });

        // Disable GSAP lag smoothing to avoid jumps during heavy scrolling
        gsap.ticker.lagSmoothing(0);

        return () => {
            // Cleanup on unmount
            gsap.ticker.remove((time) => {
                if (lenis) {
                    lenis.raf(time * 1000);
                }
            });
        };
    }, [lenis]);

    // Reset scroll position on route change
    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, lenis]);

    return (
        <ReactLenis root options={{
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        }}>
            {children}
        </ReactLenis>
    );
};

export default SmoothScroll;
