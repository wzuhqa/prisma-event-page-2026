import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import styles from '../CinematicIntro.module.css'

/**
 * Scene 1: Darkness
 * 
 * Black screen with breathing vignette
 * Subtle frame jitter
 * Sets the mood
 */

const DarknessScene = ({ isActive }) => {
    const sceneRef = useRef(null)
    const timelineRef = useRef(null)

    useEffect(() => {
        if (!isActive) return

        const tl = gsap.timeline()

        // Subtle breathing effect
        tl.to(sceneRef.current, {
            opacity: 0.95,
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        })

        timelineRef.current = tl

        return () => {
            if (timelineRef.current) {
                timelineRef.current.kill()
            }
        }
    }, [isActive])

    if (!isActive) return null

    return (
        <div
            ref={sceneRef}
            className={`${styles.scene} ${styles.darknessScene} ${styles.frameJitter}`}
        />
    )
}

export default DarknessScene
