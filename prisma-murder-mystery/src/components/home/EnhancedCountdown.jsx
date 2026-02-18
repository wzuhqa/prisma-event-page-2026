import { useState, useEffect, useCallback, useRef } from 'react'
import './EnhancedCountdown.css'

// Pre-defined deterministic data for particles (avoids Math.random during render)
const ASH_DATA = [...Array(18)].map((_, i) => ({
  id: i,
  left: (i * 5.56 + 2) % 100,
  delay: (i * 0.35) % 5,
  duration: 4 + (i * 0.2) % 3,
  size: i % 3 === 0 ? 'fast' : i % 2 === 0 ? 'slow' : ''
}))

const GOLD_SPARK_DATA = [...Array(8)].map((_, i) => ({
  id: i,
  left: (i * 12.5 + 5) % 90,
  top: 20 + (i * 10) % 60,
  delay: (i * 0.5) % 3,
  duration: 2 + (i * 0.15) % 2
}))

// Murder clue icons
const CLUE_ICONS = [
  { type: 'fingerprint', icon: '👁', style: { '--rotation': '-20deg' } },
  { type: 'fingerprint-2', icon: '👁', style: { '--rotation': '25deg' } },
  { type: 'magnifier', icon: '🔍', style: { '--rotation': '15deg' } },
  { type: 'blood', icon: '🩸', style: { '--rotation': '-30deg' } },
  { type: 'knife', icon: '🗡', style: { '--rotation': '45deg' } },
  { type: 'skull', icon: '💀', style: { '--rotation': '-10deg' } }
]

const EnhancedCountdown = ({ 
  targetTime = '2026-02-28T00:00:00',
  enableSound = false,
  onComplete 
}) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const [showImpact, setShowImpact] = useState(false)
  const [sliceDigit, setSliceDigit] = useState(null)
  const [glitchDigit, setGlitchDigit] = useState(null)
  const [flickerDigit, setFlickerDigit] = useState(null)
  const [isShaking, setIsShaking] = useState(false)
  const previousSecond = useRef(-1)
  const audioContextRef = useRef(null)

  // Parse and validate target time
  const getTargetDate = useCallback(() => {
    try {
      const target = new Date(targetTime)
      if (isNaN(target.getTime())) {
        return new Date('2026-02-28T00:00:00')
      }
      return target
    } catch {
      return new Date('2026-02-28T00:00:00')
    }
  }, [targetTime])

  const calculateTimeLeft = useCallback(() => {
    const difference = getTargetDate() - new Date()
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }, [getTargetDate])

  // Play tick sound (optional)
  const playTickSound = useCallback(() => {
    if (!enableSound || !audioContextRef.current) return
    
    try {
      const ctx = audioContextRef.current
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)
      
      oscillator.frequency.setValueAtTime(800, ctx.currentTime)
      oscillator.type = 'sine'
      
      gainNode.gain.setValueAtTime(0.03, ctx.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1)
      
      oscillator.start(ctx.currentTime)
      oscillator.stop(ctx.currentTime + 0.1)
    } catch {
      // Audio not supported or blocked
    }
  }, [enableSound])

  // Initial fade-in
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Initialize audio context (optional)
  useEffect(() => {
    if (enableSound) {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
      } catch {
        // Audio not supported
      }
    }
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [enableSound])

  // Initial time calculation
  useEffect(() => {
    const initialTime = calculateTimeLeft()
    setTimeLeft(initialTime)
    
    const totalSeconds = initialTime.days * 86400 + initialTime.hours * 3600 + initialTime.minutes * 60 + initialTime.seconds
    
    if (totalSeconds <= 0) {
      setShowImpact(true)
      onComplete?.()
    }
  }, [calculateTimeLeft, onComplete])

  // Main countdown interval
  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = calculateTimeLeft()
      setTimeLeft(newTime)
      
      const totalSeconds = newTime.days * 86400 + newTime.hours * 3600 + newTime.minutes * 60 + newTime.seconds
      
      // Handle second change animations
      if (newTime.seconds !== previousSecond.current && previousSecond.current !== -1) {
        // Play tick sound
        playTickSound()
        
        // Trigger slice animation on seconds
        setSliceDigit('seconds')
        setTimeout(() => setSliceDigit(null), 600)
        
        // Random glitch on one digit occasionally
        if (Math.random() > 0.8) {
          const units = ['days', 'hours', 'minutes', 'seconds']
          const randomUnit = units[Math.floor(Math.random() * units.length)]
          setGlitchDigit(randomUnit)
          setTimeout(() => setGlitchDigit(null), 350)
        }
        
        // Random flicker
        if (Math.random() > 0.7) {
          const units = ['days', 'hours', 'minutes', 'seconds']
          const randomUnit = units[Math.floor(Math.random() * units.length)]
          setFlickerDigit(randomUnit)
          setTimeout(() => setFlickerDigit(null), 200)
        }
        
        // Camera shake in final 5 seconds with increasing intensity
        if (totalSeconds <= 5 && totalSeconds > 0) {
          setIsShaking(true)
          setTimeout(() => setIsShaking(false), 600)
        }
      }
      previousSecond.current = newTime.seconds
      
      // Completion
      if (totalSeconds <= 0) {
        setShowImpact(true)
        onComplete?.()
        clearInterval(timer)
      }
    }, 1000)
    
    return () => clearInterval(timer)
  }, [calculateTimeLeft, onComplete, playTickSound])

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days, key: 'days' },
    { label: 'HOURS', value: timeLeft.hours, key: 'hours' },
    { label: 'MINS', value: timeLeft.minutes, key: 'minutes' },
    { label: 'SECS', value: timeLeft.seconds, key: 'seconds' },
  ]

  // Impact animation when countdown ends
  if (showImpact) {
    return (
      <div className="enhanced-countdown-wrapper" role="alert" aria-live="polite">
        <div className="countdown-impact-overlay">
          <div className="impact-flash" />
          <div className="impact-blood-splash" />
          <div className="impact-message">THE MYSTERY BEGINS</div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`enhanced-countdown-wrapper ${isShaking ? 'shake' : ''}`}
      role="timer"
      aria-label="Countdown to event"
      aria-live="polite"
    >
      {/* Screen reader accessible description */}
      <div className="sr-only">
        {timeLeft.days} days, {timeLeft.hours} hours, {timeLeft.minutes} minutes, {timeLeft.seconds} seconds remaining
      </div>

      {/* Fog layers */}
      <div className="countdown-fog-container" aria-hidden="true">
        <div className="countdown-fog fog-layer-1" />
        <div className="countdown-fog fog-layer-2" />
        <div className="countdown-fog fog-layer-3" />
      </div>
      
      {/* Shadow silhouettes */}
      <div className="countdown-shadows" aria-hidden="true">
        <div className="shadow-silhouette shadow-1" />
        <div className="shadow-silhouette shadow-2" />
        <div className="shadow-silhouette shadow-3" />
      </div>
      
      {/* Drifting ashes */}
      <div className="ashes-container" aria-hidden="true">
        {ASH_DATA.map((ash) => (
          <div
            key={ash.id}
            className={`ash-particle ${ash.size}`}
            style={{
              left: `${ash.left}%`,
              animationDelay: `${ash.delay}s`,
              animationDuration: `${ash.duration}s`,
            }}
          />
        ))}
      </div>
      
      {/* Spark particles */}
      <div className="sparks-container" aria-hidden="true">
        {GOLD_SPARK_DATA.map((spark) => (
          <div
            key={spark.id}
            className="spark"
            style={{
              left: `${spark.left}%`,
              top: `${spark.top}%`,
              animationDelay: `${spark.delay}s`,
              animationDuration: `${spark.duration}s`,
            }}
          />
        ))}
      </div>
      
      {/* Lens flares */}
      <div className="lens-flare" aria-hidden="true" />
      <div className="lens-flare lens-flare-2" aria-hidden="true" />
      
      {/* Murder clue icons */}
      <div className="clue-icons-overlay" aria-hidden="true">
        {CLUE_ICONS.map((clue) => (
          <span 
            key={clue.type} 
            className={`clue-icon ${clue.type}`}
            style={clue.style}
          >
            {clue.icon}
          </span>
        ))}
      </div>
      
      {/* Main countdown content */}
      <div className={`countdown-main ${isMounted ? 'fade-in-wrapper' : 'opacity-0'}`}>
        {/* Header */}
        <div className="countdown-header-section">
          <h2 className="countdown-title">TIME REMAINING</h2>
          <div className="countdown-divider">
            <div className="countdown-divider-line" />
            <span className="countdown-divider-icon" aria-hidden="true">⏱</span>
            <div className="countdown-divider-line" />
          </div>
          <p className="countdown-subtitle">The investigation awaits...</p>
        </div>
        
        {/* Timer digits */}
        <div className="countdown-timer-display" role="group" aria-label="Countdown timer units">
          {timeUnits.map((unit, index) => (
            <div key={unit.key} className="countdown-unit">
              {index > 0 && (
                <span className="countdown-separator" aria-hidden="true">:</span>
              )}
              
              <div className="digit-box-container">
                <div className="digit-card">
                  <div className="digit-glow-outer" />
                  <span 
                    className={`digit-value ${sliceDigit === unit.key ? 'slice' : ''} ${glitchDigit === unit.key ? 'glitch' : ''} ${flickerDigit === unit.key ? 'flicker' : ''}`}
                    aria-hidden="true"
                  >
                    {String(unit.value).padStart(2, '0')}
                  </span>
                  <div className="digit-glow-smoke" />
                </div>
                
                <span className="digit-label">{unit.label}</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Event date */}
        <div className="countdown-event-date">
          FEBRUARY 28 — MARCH 1, 2026
        </div>
      </div>
    </div>
  )
}

export default EnhancedCountdown

