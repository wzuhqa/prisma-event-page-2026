import { useState, useCallback, useEffect, useRef, useMemo } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import gsap from 'gsap'
import './SlashNavbar.css'

// ============================================
// NAVIGATION ITEMS CONFIGURATION
// Narrative-driven investigation terms
// ============================================
const NAV_ITEMS = [
  { id: 'home', label: 'CASE OVERVIEW', path: '/' },
  { id: 'events', label: 'SUSPECT DOSSIER', path: '/events' },
  { id: 'team', label: 'INVESTIGATORS', path: '/team' },
  { id: 'about', label: 'AUTOPSY REPORT', path: '/about' },
  { id: 'contact', label: 'EVIDENCE ARCHIVE', path: '/contact' }
]

// ============================================
// LIVE CLOCK COMPONENT
// ============================================
const LiveClock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <span className="status-time">
      {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
    </span>
  )
}

// ============================================
// ACTIVE MARKER COMPONENT
// Forensic-style active state indicator
// ============================================
const ActiveMarker = () => (
  <div className="nav-active-marker">
    <span className="marker-line" />
    <span className="marker-dot" />
  </div>
)

// ============================================
// NAV ITEM COMPONENT
// ============================================
const NavItem = ({ item, isActive, isLocked, onClick, onHover, isHovered, onNavClick }) => {
  const linkRef = useRef(null)
  const threadRef = useRef(null)
  const [isGlitching, setIsGlitching] = useState(false)

  // GSAP Hover Thread Animation
  useEffect(() => {
    if (isHovered && !isLocked) {
      gsap.to(threadRef.current, {
        width: "100%",
        opacity: 0.8,
        duration: 0.4,
        ease: "power2.out"
      })
    } else {
      gsap.to(threadRef.current, {
        width: "0%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      })
    }
  }, [isHovered, isLocked])

  const handleClick = () => {
    if (isLocked) return
    setIsGlitching(true)
    setTimeout(() => {
      onClick(item.path)
      onNavClick()
      setIsGlitching(false)
    }, 400)
  }

  // Keyboard navigation support
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <li className="navbar-item">
      <button
        ref={linkRef}
        className={`navbar-link ${isActive ? 'navbar-link--active' : ''} ${isHovered ? 'navbar-link--hovered' : ''} ${isGlitching ? 'navbar-link--glitching' : ''}`}
        onClick={handleClick}
        onMouseEnter={() => onHover(item.id)}
        onMouseLeave={() => onHover(null)}
        onKeyDown={handleKeyDown}
        disabled={isLocked}
        aria-current={isActive ? 'page' : undefined}
        tabIndex={0}
      >
        <span className="link-text">{item.label}</span>
        {/* Evidence Red Thread */}
        <div ref={threadRef} className="nav-thread" />
        {/* Active Marker - Forensic Style */}
        {isActive && <ActiveMarker />}
      </button>
    </li>
  )
}

// ============================================
// MAIN SLASH NAVBAR COMPONENT
// Integrated with React Router and NavigationContext
// ============================================
const SlashNavbar = ({ ambientGlow = true, isLocked = false }) => {
  // Router hooks
  const navigate = useNavigate()
  const location = useLocation()

  // Local state for navigation control
  const [hoveredItem, setHoveredItem] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const navRef = useRef(null)
  const itemsRef = useRef([])

  // Scroll behavior - compact mode
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP Entrance Choreography
  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(navRef.current, {
        y: -60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      });

      tl.from(".navbar-item", {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.8");
    }, navRef);

    return () => ctx.revert();
  }, [])

  // Micro-Distortion Logic
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const randomIdx = Math.floor(Math.random() * NAV_ITEMS.length);
      const items = document.querySelectorAll('.navbar-item');
      if (items[randomIdx]) {
        items[randomIdx].classList.add('nav-glitch-active');
        setTimeout(() => items[randomIdx].classList.remove('nav-glitch-active'), 200);
      }
    }, 45000); // Every 45s avg

    return () => clearInterval(glitchInterval);
  }, []);

  // Determine current active section from route
  const getActiveFromPath = (pathname) => {
    if (pathname === '/') return 'home'
    const segment = pathname.split('/').filter(Boolean).pop() || 'home'
    return segment
  }

  const activeSection = getActiveFromPath(location.pathname)

  // Handle navigation click without slash animation
  const handleNavClick = useCallback((path) => {
    navigate(path)
  }, [navigate])

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev)
  }, [])

  // Close mobile menu
  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <>
      {/* Fixed navbar */}
      <nav
        ref={navRef}
        className={`slash-navbar ${ambientGlow ? 'slash-navbar--ambient-glow' : ''} ${isScrolled ? 'slash-navbar--scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Forensic Scan Line Overlay */}
        <div className="nav-scan-line" />
        <div className="nav-grain-overlay" />

        {/* Physical Structural Depth: Nail Heads */}
        <div className="navbar-nail navbar-nail--tl"></div>
        <div className="navbar-nail navbar-nail--tr"></div>

        <div className="navbar-brand">
          <div className="brand-header">
            <span className="brand-main">PRISMA 2026</span>
            <span className="brand-uni">SRM UNIVERSITY DELHI-NCR</span>
          </div>
          <div className="brand-meta">
            <span className="case-id">CASE ID: #PR-2026-X</span>
            <span className="clearance-level">CLEARANCE: <span className="restricted-glow">RESTRICTED</span></span>
          </div>
        </div>

        <div className="case-index-divider" aria-hidden="true" />

        <div className="case-index-label">CASE INTERFACE</div>

        {/* Mobile menu toggle button */}
        <button
          className={`hamburger-toggle ${isMobileMenuOpen ? 'hamburger-toggle--open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* Access Status Indicator with Live Clock */}
        <div className="navbar-status">
          <div className="status-item">
            <span className="status-dot-pulse"></span>
            <span className="status-text--gold">MONITORING ACTIVE</span>
            <LiveClock />
          </div>
        </div>

        <ul className={`navbar-menu ${isMobileMenuOpen ? 'navbar-menu--open' : ''}`} role="menubar">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              isLocked={isLocked}
              onClick={handleNavClick}
              onHover={setHoveredItem}
              isHovered={hoveredItem === item.id}
              onNavClick={closeMobileMenu}
            />
          ))}
        </ul>

        {/* Ambient glow bar */}
        <div className="ambient-glow-bar" aria-hidden="true" />
      </nav>
    </>
  )
}

export default SlashNavbar
