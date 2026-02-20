import { useState, useEffect } from 'react'
import './ScrollProgress.css'

/**
 * ScrollProgress - Forensic-style scroll progress indicator
 * Shows investigation progress through the case file
 */
const ScrollProgress = () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight
            const currentProgress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0
            setProgress(Math.min(100, Math.max(0, currentProgress)))
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial calculation

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="scroll-progress-container" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
            <div className="scroll-progress-track">
                <div
                    className="scroll-progress-bar"
                    style={{ height: `${progress}%` }}
                />
                <div className="scroll-progress-glow" style={{ top: `${progress}%` }} />
            </div>
            <div className="scroll-progress-label">
                <span className="progress-icon">⌕</span>
                <span className="progress-text">INVESTIGATION: {Math.round(progress)}%</span>
            </div>
        </div>
    )
}

export default ScrollProgress
