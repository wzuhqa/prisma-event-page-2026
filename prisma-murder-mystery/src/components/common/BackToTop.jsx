import { useState, useEffect, useCallback } from 'react'
import './BackToTop.css'

/**
 * BackToTop - Forensic-style back to top button
 * Appears after scrolling down, returns user to case file header
 */
const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovered, setIsHovered] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Show after scrolling 500px (roughly past hero)
            setIsVisible(window.scrollY > 500)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])

    if (!isVisible) return null

    return (
        <button
            className={`back-to-top ${isHovered ? 'back-to-top--hovered' : ''}`}
            onClick={scrollToTop}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Return to case file header"
            title="Return to top"
        >
            <div className="back-to-top__inner">
                <span className="back-to-top__icon">↑</span>
                <span className="back-to-top__text">
                    {isHovered ? 'RETURN TO CASE FILE' : 'EVIDENCE TOP'}
                </span>
            </div>
            <div className="back-to-top__glow" />
            <div className="back-to-top__scanline" />
        </button>
    )
}

export default BackToTop
