import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Mail, MapPin, Phone } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const [isFlickering, setIsFlickering] = useState(false)

  // Psychological micro-flicker logic
  useEffect(() => {
    const triggerFlicker = () => {
      if (Math.random() < 0.05) { // 5% chance every check
        setIsFlickering(true)
        setTimeout(() => setIsFlickering(false), 80) // 1-2 frames
      }
    }

    const interval = setInterval(triggerFlicker, 45000) // Check every 45s as requested
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className={`footer-container ${isFlickering ? 'micro-flicker' : ''}`}>
      {/* Atmospheric Overlays */}
      <div className="footer-grain" />
      <div className="footer-stain" />

      {/* Pulsing top line */}
      <div className="footer-pulse-line" />

      {/* Crime tape top border - Enhanced visibility */}
      <div className="crime-tape w-full text-center text-[11px] tracking-[8px] py-2 bg-blood text-midnight font-black opacity-90 shadow-lg">
        ⚠ DO NOT CROSS — CRIME SCENE — DO NOT CROSS ⚠
      </div>

      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-4xl font-bold tracking-tighter text-blood mb-2">
              PRISMA
            </h3>
            <div className="footer-brand-text">
              <p className="opacity-60 italic font-serif text-sm">
                "Technical Excellence. Cultural Mystery. The annual fest of SRM University. Some secrets are meant to be found."
              </p>
            </div>
            <div className="flex gap-8 mt-10">
              <a href="https://instagram.com/prisma.srmuh" target="_blank" rel="noopener noreferrer"
                className="text-[#666] hover:text-[#b11226] transition-all duration-300 transform hover:scale-110">
                <Instagram size={20} />
              </a>
              <a href="mailto:prisma@srmuh.in"
                className="text-[#666] hover:text-[#b11226] transition-all duration-300 transform hover:scale-110">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">
              Case Files
            </h4>
            <ul className="space-y-[14px]">
              {['Home', 'Events', 'Team', 'Contact'].map(item => (
                <li key={item}>
                  <Link
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="footer-link"
                  >
                    <span className="text-blood/30">›</span>
                    <span className="link-text" data-text={item}>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Categories */}
          <div>
            <h4 className="footer-heading">
              Evidence Room
            </h4>
            <ul className="space-y-[14px]">
              {['Fashion', 'Gaming', 'Photography', 'Dance', 'Music'].map(item => (
                <li key={item}>
                  <Link
                    to="/events"
                    className="footer-link"
                  >
                    <span className="text-blood/30">›</span>
                    <span className="link-text" data-text={item}>{item}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer-heading">
              Headquarters
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 group">
                <MapPin size={16} className="text-blood shrink-0 mt-1" />
                <span className="text-[#888] text-sm leading-relaxed group-hover:text-[#aaa] transition-colors">
                  SRM University, Delhi-NCR, Sonepat, Haryana, 131029
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={16} className="text-blood shrink-0" />
                <a href="mailto:prisma@srmuh.in" className="footer-link">
                  <span className="link-text" data-text="prisma@srmuh.in">prisma@srmuh.in</span>
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={16} className="text-blood shrink-0" />
                <span className="text-[#888] text-sm font-mono tracking-widest">+91 XXXXXXXXXX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="flex flex-col gap-2">
            <p className="opacity-40">
              © 2026 PRISMA FILES. ALL RIGHTS RESERVED.
            </p>
            <div className="case-remains-open">
              Case remains open.
            </div>
          </div>
          <p className="flex items-center gap-3 opacity-40">
            LAST UPDATED: ██/██/2026 <span className="w-1.5 h-1.5 rounded-full bg-blood animate-pulse" /> SRM UNIVERSITY
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

