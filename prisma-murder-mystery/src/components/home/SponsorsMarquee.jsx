import { motion } from 'framer-motion'

const sponsors = [
  'TechCorp', 'InnovateLabs', 'CodeForge', 'DataStream', 'CloudNine',
  'ByteWise', 'PixelPerfect', 'NeuralNet', 'CyberShield', 'QuantumLeap'
]

const SponsorsMarquee = () => {
  return (
    <section className="relative py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="font-mono text-xs tracking-[4px] text-gold uppercase">
            Investigation Partners
          </span>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="marquee-container">
        <div className="marquee-content">
          {[...sponsors, ...sponsors].map((sponsor, index) => (
            <div
              key={index}
              className="flex items-center justify-center mx-8 md:mx-12"
            >
              <div className="px-8 py-4 rounded-xl bg-noir-light/50 border border-white/5 hover:border-gold/20 transition-all duration-300 min-w-[150px]">
                <span className="font-heading text-lg text-fog-light/60 hover:text-gold transition-colors whitespace-nowrap">
                  {sponsor}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SponsorsMarquee

