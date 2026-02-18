import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Landing.css'

const Landing = () => {
    const [loadingComplete, setLoadingComplete] = useState(false)
    const [showSlash, setShowSlash] = useState(false)
    const [showTitle, setShowTitle] = useState(false)
    const [currentLine, setCurrentLine] = useState(0)
    const [typedText, setTypedText] = useState('')
    const [showRecognition, setShowRecognition] = useState(false)
    const [pulseActive, setPulseActive] = useState(false)
    const keyBufferRef = useRef('')
    const navigate = useNavigate()

    const loadingLines = [
        'INITIALIZING PRISMA…',
        'Loading Archive Core…',
        'Verifying Structural Integrity…',
        'Architect Signature: AK-01',
        'System Status: STABLE'
    ]

    // Typewriter effect
    useEffect(() => {
        if (currentLine >= loadingLines.length) {
            const timer = setTimeout(() => {
                setShowSlash(true)
                setTimeout(() => {
                    setLoadingComplete(true)
                    setTimeout(() => setShowTitle(true), 300)
                }, 800)
            }, 500)
            return () => clearTimeout(timer)
        }

        const line = loadingLines[currentLine]
        let charIndex = 0

        const typeInterval = setInterval(() => {
            if (charIndex <= line.length) {
                setTypedText(line.substring(0, charIndex))
                charIndex++
            } else {
                clearInterval(typeInterval)
                setTimeout(() => {
                    setCurrentLine(prev => prev + 1)
                    setTypedText('')
                }, 400)
            }
        }, 50)

        return () => clearInterval(typeInterval)
    }, [currentLine])

    // Check for sealed record
    useEffect(() => {
        if (loadingComplete) {
            const sealed = localStorage.getItem('sealed_record_unlocked')
            if (sealed === 'true') {
                setTimeout(() => setShowRecognition(true), 1000)
            }
        }
    }, [loadingComplete])

    // Keyword detection
    useEffect(() => {
        const handleKeyPress = (e) => {
            keyBufferRef.current += e.key.toLowerCase()
            keyBufferRef.current = keyBufferRef.current.slice(-20)

            if (keyBufferRef.current.includes('archive')) {
                setPulseActive(true)
                setTimeout(() => setPulseActive(false), 1000)
                keyBufferRef.current = ''
            }
        }

        window.addEventListener('keypress', handleKeyPress)
        return () => window.removeEventListener('keypress', handleKeyPress)
    }, [])

    return (
        <div className="landing-page">
            {/* Grain overlay */}
            <div className="landing-grain" />

            {/* Vignette */}
            <div className="landing-vignette" />

            {/* Scan line */}
            {!loadingComplete && <div className="scan-line" />}

            {/* Dust particles */}
            <div className="dust-container">
                <div className="dust dust-1" />
                <div className="dust dust-2" />
                <div className="dust dust-3" />
                <div className="dust dust-4" />
                <div className="dust dust-5" />
            </div>

            {/* Ambient pulse */}
            <div className="ambient-pulse" />

            {/* ARG pulse */}
            {pulseActive && <div className="arg-pulse" />}

            {/* Loading sequence */}
            {!loadingComplete && (
                <div className="loading-sequence">
                    <div className="terminal-text">
                        {loadingLines.slice(0, currentLine).map((line, i) => (
                            <div key={i} className="terminal-line completed">{line}</div>
                        ))}
                        {currentLine < loadingLines.length && (
                            <div className="terminal-line typing">
                                {typedText}
                                <span className="cursor">_</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Slash transition */}
            {showSlash && !loadingComplete && (
                <div className="transition-slash" />
            )}

            {/* Main content */}
            {loadingComplete && (
                <div className="main-content">
                    <div className={`title-container ${showTitle ? 'visible' : ''}`}>
                        <h1 className="main-title">PRISMA</h1>
                        <div className="year-subtitle">2K26</div>
                    </div>

                    <div className={`button-container ${showTitle ? 'visible' : ''}`}>
                        <button
                            className="landing-button"
                            onClick={() => navigate('/register')}
                        >
                            <span className="button-text">REGISTER NOW</span>
                            <div className="button-slash" />
                        </button>

                        <button
                            className="landing-button"
                            onClick={() => navigate('/events')}
                        >
                            <span className="button-text">VIEW EVENTS</span>
                            <div className="button-slash" />
                        </button>
                    </div>

                    {showRecognition && (
                        <div className="recognition-text">
                            Reconstruction recognized.
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default Landing
