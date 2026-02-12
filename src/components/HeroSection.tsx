import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import AnimatedCounter from '@/components/AnimatedCounter';
import { Card } from '@/components/ui/card';
import InteractiveGlobe from '@/components/InteractiveGlobe';

interface HeroSectionProps {
  onSectorClick: (id: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSectorClick }) => {
  return (
    <header className="relative z-10 pt-16 pb-12 text-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-xs font-medium tracking-widest mb-6">
          GLOBAL AI SYSTEMS INTELLIGENCE
        </Badge>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
        className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-muted-foreground bg-clip-text text-transparent tracking-tight leading-tight">

        AI Sector Intelligence Atlas
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
        className="text-lg max-w-3xl mx-auto mb-12 leading-relaxed font-light text-secondary-foreground md:text-sm">

        Mapping artificial intelligence readiness, deployment impact, and system stability across critical global infrastructure.
      
      </motion.p>

      {/* Live Counters */}
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">

        {[
        { value: 156, label: 'Countries Tracked' },
        { value: 6, label: 'Sectors Analyzed' },
        { value: 48932, label: 'AI Systems Indexed' },
        { value: 54, label: 'Global Readiness Score', suffix: '/100' }].
        map((item, i) =>
        <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}>
            <Card className="p-5 bg-card/60 backdrop-blur-md border-border/50 hover:border-border transition-colors">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                <AnimatedCounter value={item.value} />
                {item.suffix && <span className="text-muted-foreground text-lg">{item.suffix}</span>}
              </div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.label}</div>
            </Card>
          </motion.div>
        )}
      </motion.div>

      {/* Interactive Globe */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 1 }} className="mb-8">
        <InteractiveGlobe onSectorClick={onSectorClick} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="text-xs mt-4 text-secondary-foreground my-[10px]">

        Last updated: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()} • Data refreshed every 24 hours
      </motion.p>
    </header>);

};

export default HeroSection;