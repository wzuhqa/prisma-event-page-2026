import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Scissors, Gamepad2, Camera, Music, Mic, Theater, BookOpen, Sparkles, Palette, ArrowRight } from 'lucide-react'
import eventsData from '../../data/events.json'

// Import luxury easing system
import { ELEGANT_ENTER, LUXURY_EASE } from '../../utils/luxuryEasing'

const iconMap = {
  Scissors, Gamepad2, Camera, Music, Mic, Theater, BookOpen, Sparkles, Palette
}

const EventHighlights = () => {
  const categories = eventsData.categories.slice(0, 6) // Show first 6

  return (
    <section className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          // Elegant section reveal
          transition={{ 
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]  // ELEGANT_ENTER
          }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs tracking-[4px] text-gold uppercase mb-4 block">
            Evidence Room
          </span>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-chalk">Case</span>{' '}
            <span className="text-gradient-blood">Files</span>
          </h2>
          <p className="text-fog-light text-lg max-w-2xl mx-auto">
            Explore 40+ exhilarating events at PRISMA 2026. Each case file holds a new challenge.
          </p>
        </motion.div>

        {/* Event grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.icon]
            const totalEvents = Object.values(category.events).flat().length

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                // Staggered reveal with elegant easing
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]  // ELEGANT_ENTER
                }}
              >
                <Link
                  to="/events"
                  className={`
                    group relative block p-6 rounded-2xl overflow-hidden
                    bg-gradient-to-br ${category.gradient}
                    border border-white/5 hover:border-white/10
                    transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-blood/10
                  `}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-4 group-hover:bg-white/20 transition-colors">
                      {IconComponent && <IconComponent size={24} className="text-white" />}
                    </div>

                    {/* Title */}
                    <h3 className="font-heading text-2xl font-bold text-white mb-1">
                      {category.name}
                    </h3>

                    {/* Event count */}
                    <p className="text-white/60 text-sm mb-3">
                      {totalEvents} events · {category.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-4">
                      {category.description}
                    </p>

                    {/* Action */}
                    <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors text-sm">
                      <span>Open Case File</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/events"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-blood/30 text-chalk hover:bg-blood/10 hover:border-blood/50 transition-all duration-300 font-medium"
          >
            View All Case Files
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default EventHighlights

