import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import CinematicGlitchHero from '../home/CinematicGlitchHero'
import styles from './HeroSection.module.css'
import InvocationLayer from './InvocationLayer'
import TemporalSealLayer from './TemporalSealLayer'
import EntryDecisionLayer from './EntryDecisionLayer'

const HeroSection = memo(function HeroSection() {
  const rootRef = useRef(null)
  const invocationRef = useRef(null)
  const temporalRef = useRef(null)
  const entryRef = useRef(null)
  const riteRef = useRef(null)

  const [showRiteAwaits, setShowRiteAwaits] = useState(false)

  // Slow fade-in stagger using transform + opacity only
  useLayoutEffect(() => {
    if (!rootRef.current) return

    const ctx = gsap.context(() => {
      const targets = [invocationRef.current, temporalRef.current, entryRef.current].filter(Boolean)

      const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
      if (prefersReduced) {
        gsap.set(targets, { opacity: 1, y: 0 })
        return
      }

      gsap.set(targets, { opacity: 0, y: 14 })
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power2.out',
        stagger: 0.15,
        delay: 0.15,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  // Optional atmospheric detail: show after 15s idle (mount idle)
  useEffect(() => {
    const t = window.setTimeout(() => setShowRiteAwaits(true), 15000)
    return () => window.clearTimeout(t)
  }, [])

  useLayoutEffect(() => {
    if (!showRiteAwaits || !riteRef.current) return
    const tween = gsap.fromTo(
      riteRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    )
    return () => tween.kill()
  }, [showRiteAwaits])

  return (
    <section
      ref={rootRef}
      className={[
        styles.heroRoot,
        'relative overflow-hidden bg-[#0A0A0B] text-[#D8D3C4]',
        'min-h-screen flex items-center justify-center',
      ].join(' ')}
      aria-label="Prisma hero"
    >
      <div className={styles.sigil} aria-hidden="true" />

      <div className={[styles.content, 'w-full'].join(' ')}>
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 py-24 sm:py-28 lg:py-32">
          <header className="text-center">
            {/* Title stays as-is; refactor targets content below */}
            <CinematicGlitchHero text="PRISMA" className="mx-auto" showCountdown={false} />

            {/* Ritual dossier divider */}
            <div className="mx-auto mt-10 h-px w-32 bg-[#5A0E0E]/60" aria-hidden="true" />
          </header>

          <div className="mt-10 grid gap-12 sm:gap-14">
            <div ref={invocationRef} className={styles.willChange}>
              <InvocationLayer />
            </div>
            <div ref={temporalRef} className={styles.willChange}>
              <TemporalSealLayer />
            </div>
            <div ref={entryRef} className={styles.willChange}>
              <EntryDecisionLayer />
            </div>
          </div>

          <div className="mt-14 flex justify-center">
            <p
              ref={riteRef}
              className={[
                'font-mono text-[11px] sm:text-xs uppercase tracking-[0.42em]',
                'text-[#D8D3C4]/45',
                showRiteAwaits ? '' : 'opacity-0',
              ].join(' ')}
            >
              The rite awaits.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
})

export default HeroSection


