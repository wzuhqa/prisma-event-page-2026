import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Events = () => {
  const [showEntry, setShowEntry] = useState(true)
  const [expandedCategories, setExpandedCategories] = useState(new Set())
  const [keywordInput, setKeywordInput] = useState('')
  const [showIndexOverlay, setShowIndexOverlay] = useState(false)
  const [showStructureConfirmed, setShowStructureConfirmed] = useState(false)
  const [hasSeenSealed, setHasSeenSealed] = useState(false)
  const [flickerCategory, setFlickerCategory] = useState(null)
  const inputBufferRef = useRef('')
  const inputTimerRef = useRef(null)

  // Entry animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEntry(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Check if user has seen sealed record
  useEffect(() => {
    const sealed = localStorage.getItem('sealed_record_unlocked')
    if (sealed === 'true') {
      setHasSeenSealed(true)

      // Random flicker effect
      const flickerTimer = setTimeout(() => {
        const categories = ['FASHION', 'GAMING', 'PHOTOGRAPHY', 'DANCE', 'MUSIC', 'DRAMA', 'LITERARY', 'ANIME', 'ARTS']
        const randomCategory = categories[Math.floor(Math.random() * categories.length)]
        setFlickerCategory(randomCategory)

        setTimeout(() => setFlickerCategory(null), 3000)
      }, 3000 + Math.random() * 5000)

      return () => clearTimeout(flickerTimer)
    }
  }, [])

  // Check if all categories are expanded
  useEffect(() => {
    if (expandedCategories.size === 9) {
      const timer = setTimeout(() => {
        setShowStructureConfirmed(true)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setShowStructureConfirmed(false)
    }
  }, [expandedCategories])

  // Keyboard listener for "index" keyword
  useEffect(() => {
    const handleKeyPress = (e) => {
      inputBufferRef.current += e.key.toLowerCase()

      if (inputTimerRef.current) {
        clearTimeout(inputTimerRef.current)
      }

      inputTimerRef.current = setTimeout(() => {
        inputBufferRef.current = ''
      }, 2000)

      if (inputBufferRef.current.includes('index')) {
        setShowIndexOverlay(true)
        inputBufferRef.current = ''

        setTimeout(() => {
          setShowIndexOverlay(false)
        }, 3000)
      }
    }

    window.addEventListener('keypress', handleKeyPress)
    return () => {
      window.removeEventListener('keypress', handleKeyPress)
      if (inputTimerRef.current) {
        clearTimeout(inputTimerRef.current)
      }
    }
  }, [])

  const toggleCategory = (categoryName) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev)
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName)
      } else {
        newSet.add(categoryName)
      }
      return newSet
    })
  }

  const categories = [
    {
      name: 'FASHION',
      tagline: 'Visual identity deployment.',
      events: {
        solo: ['Mr & Miss Prisma (Only for SRM students)'],
        group: ['Fashion show (open to all universities and colleges)']
      }
    },
    {
      name: 'GAMING',
      tagline: 'Simulated combat trials.',
      events: {
        mobile: ['BGMI', 'Bullet Echo', 'Cookie Run', 'Road to Valor', 'Real Cricket'],
        pc: ['Valorant', 'Marvel Rivals', 'The Finals'],
        console: ['Tekken 8', 'FIFA 2024']
      }
    },
    {
      name: 'PHOTOGRAPHY',
      tagline: 'Observation and documentation.',
      events: {
        solo: ['Epix : The Street Portrait Photography', 'Chitra Kala : The ON-Spot Photography'],
        group: ['Chalchitra', 'Short Film Competition']
      }
    },
    {
      name: 'DANCE',
      tagline: 'Kinetic expression analysis.',
      events: {
        solo: ['Fierce Feet', 'Nrityanjali: Classical', 'Street Battle : All Forms'],
        duo: ['Stellar Stomp'],
        group: ['Whimsical Walt : Western Group Dance', 'Sanskriti : Folk Group Dance']
      }
    },
    {
      name: 'MUSIC',
      tagline: 'Acoustic identity broadcast.',
      events: {
        solo: ['Instrumental', 'Vocal', 'Rap Battle', 'Music Production Challenge'],
        group: ['Battle of Bands']
      }
    },
    {
      name: 'DRAMA',
      tagline: 'Narrative reconstruction.',
      events: {
        solo: ['Range Ae Aekal : Monoacting'],
        group: ['Samaaj ka Aaina : Nukkad Naatak']
      }
    },
    {
      name: 'LITERARY',
      tagline: 'Cognitive articulation trials.',
      events: {
        solo: ['Poet\'s Ode', 'Spell Bee', 'Haiku Hoopla', 'Pilot Twist Contest', 'Kavi Kehte', 'Slam Poetry'],
        group: ['Gaathaaven: The Epics Quiz']
      }
    },
    {
      name: 'ANIME',
      tagline: 'Alternate identity simulation.',
      events: {
        solo: ['Guess the Opening'],
        duo: ['Dub it Your Way'],
        group: ['Anime Quiz']
      }
    },
    {
      name: 'ARTS',
      tagline: 'Visual fabrication unit.',
      events: {
        solo: ['Tote Bag Painting', 'T-Shirt Painting', 'Still Life', 'Card Making'],
        duo: ['Shoe Painting', 'Face Painting', 'Tattoo Painting'],
        group: ['Wall Painting']
      }
    }
  ]

  return (
    <div className="events-page">
      {/* Entry Sequence */}
      <AnimatePresence>
        {showEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="entry-sequence"
          >
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="entry-slash"
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="entry-text"
            >
              <div className="entry-line">PROGRAM INDEX ACCESSED</div>
              <div className="entry-case">PRISMA 2K26</div>
              <div className="entry-status">STATUS: ACTIVE</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Film grain overlay */}
      <div className="film-grain" />

      {/* Vignette */}
      <div className="vignette" />

      {/* Main content */}
      <div className="events-container">
        {/* Header */}
        <div className="events-header">
          <h1 className="events-title">PROGRAM INDEX</h1>
          <div className="events-subtitle">PRISMA 2K26 // ACTIVE OPERATIONS</div>
          <div className="events-subtext">All categories are monitored.</div>
        </div>

        {/* Categories */}
        <div className="categories-grid">
          {categories.map((category, index) => (
            <CategoryFolder
              key={category.name}
              category={category}
              isExpanded={expandedCategories.has(category.name)}
              onToggle={() => toggleCategory(category.name)}
              index={index}
              isFlickering={flickerCategory === category.name}
              allExpanded={expandedCategories.size === 9}
            />
          ))}
        </div>

        {/* Structure confirmed message */}
        <AnimatePresence>
          {showStructureConfirmed && (
            <motion.div
              className="structure-confirmed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              Program structure confirmed.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer text */}
        <div className="events-footer">
          Every program has an architect.
        </div>
      </div>

      {/* Index keyword overlay */}
      <AnimatePresence>
        {showIndexOverlay && (
          <motion.div
            className="index-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="index-overlay-text">STRUCTURE ACKNOWLEDGED</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heartbeat pulse for open folders */}
      {expandedCategories.size > 0 && <div className="heartbeat-pulse" />}
    </div>
  )
}

const CategoryFolder = ({ category, isExpanded, onToggle, index, isFlickering, allExpanded }) => {
  const [showArchitect, setShowArchitect] = useState(false)
  const [metadata, setMetadata] = useState(`${Object.keys(category.events).length} operational units`)

  const handleHover = () => {
    // 5% chance to show architect approval
    if (Math.random() < 0.05) {
      setShowArchitect(true)
      setMetadata('Architect approval: AK-01')

      setTimeout(() => {
        setShowArchitect(false)
        setMetadata(`${Object.keys(category.events).length} operational units`)
      }, 2000)
    }
  }

  return (
    <div
      className={`category-folder ${isExpanded ? 'expanded' : ''}`}
      onMouseEnter={handleHover}
    >
      {/* Folder header */}
      <button
        className="folder-header"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-label={`${category.name} category`}
      >
        <div className="folder-header-content">
          <div className="folder-title-row">
            <span className="red-indicator" />
            <h2 className={`folder-title ${isFlickering ? 'flickering' : ''}`}>
              {isFlickering ? (
                <FlickeringText original={category.name} alternate="EXPERIMENTS" />
              ) : (
                category.name
              )}
            </h2>
          </div>
          <div className="folder-metadata">{metadata}</div>
        </div>
        <div
          className="folder-arrow"
          style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
        >
          ▶
        </div>
      </button>

      {/* Folder content */}
      {isExpanded && (
        <div className="folder-content">
          <div className="folder-tagline">{category.tagline}</div>

          <div className="events-list">
            {Object.entries(category.events).map(([type, events]) => (
              <div key={type} className="event-type-group">
                <div className="event-type-label">{type}</div>
                <div className="event-items">
                  {events.map((event, idx) => (
                    <div
                      key={idx}
                      className="event-item"
                    >
                      <span className="event-bullet">›</span>
                      <span className="event-name">{event}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const FlickeringText = ({ original, alternate }) => {
  const [text, setText] = useState(original)

  useEffect(() => {
    const sequence = [
      { text: original, duration: 200 },
      { text: alternate, duration: 300 },
      { text: original, duration: 200 },
      { text: alternate, duration: 400 },
      { text: original, duration: 0 }
    ]

    let currentIndex = 0

    const flicker = () => {
      if (currentIndex < sequence.length) {
        setText(sequence[currentIndex].text)

        if (sequence[currentIndex].duration > 0) {
          setTimeout(() => {
            currentIndex++
            flicker()
          }, sequence[currentIndex].duration)
        }
      }
    }

    flicker()
  }, [original, alternate])

  return <>{text}</>
}

export default Events
