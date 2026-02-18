import { useEffect, useState } from 'react';
import './ForensicCursor.css';

const ForensicCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setIsVisible(true);

            const target = e.target;
            setIsPointer(
                window.getComputedStyle(target).cursor === 'pointer' ||
                target.tagName === 'A' ||
                target.tagName === 'BUTTON'
            );
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

    if (!isVisible) return null;

    return (
        <div
            className={`forensic-cursor ${isPointer ? 'forensic-cursor--pointer' : ''}`}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
        >
            <div className="cursor-dot" />
            <div className="cursor-aura" />
        </div>
    );
};

export default ForensicCursor;
