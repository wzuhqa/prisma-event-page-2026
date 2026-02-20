import { useEffect, useState } from 'react';
import './AnalogDegradation.css';

const AnalogDegradation = () => {
    const [time, setTime] = useState('');

    // Update timestamp to simulate a surveillance camera or VCR
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = String(now.getHours() % 12 || 12).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
            setTime(`${hours}:${minutes}:${seconds} ${ampm}`);
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="analog-degradation-container">
            {/* Heavy VHS noise and scanlines */}
            <div className="vhs-noise"></div>

            {/* Occasional tape tracking errors (rolling bars) */}
            <div className="tape-tracking"></div>

            {/* Random film scratches */}
            <div className="film-scratch"></div>
            <div className="film-scratch scratch-2"></div>

            {/* Surveillance Camera Timestamp */}
            <div className="vcr-ui">
                <div className="vcr-rec">
                    <span className="rec-dot"></span> REC
                </div>
                <div className="vcr-timestamp">
                    {time}
                </div>
                <div className="vcr-play">PLAY &#9654;</div>
            </div>

            {/* Fisheye / Heavy Vignette distortion at the edges */}
            <div className="fisheye-vignette"></div>
        </div>
    );
};

export default AnalogDegradation;
