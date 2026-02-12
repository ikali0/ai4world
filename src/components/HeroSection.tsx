import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import AnimatedCounter from '@/components/AnimatedCounter';
import { Card } from '@/components/ui/card';
import InteractiveGlobe from '@/components/InteractiveGlobe';
import { ViewMode, VIEW_MODES } from '@/types/view-modes';
import { useGlobalSummary } from '@/hooks/use-dashboard-data';

interface HeroSectionProps {
  onSectorClick: (id: string) => void;
  viewMode?: ViewMode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onSectorClick, viewMode = 'public' }) => {
  const config = VIEW_MODES[viewMode];
  const { data: globalSummary } = useGlobalSummary();

  // Override hero metrics with live data when available
  const heroMetrics = React.useMemo(() => {
    if (!globalSummary) return config.heroMetrics;

    if (viewMode === 'public') {
      return [
      { value: globalSummary.global_readiness_score ?? 54, label: 'Global Readiness Score', suffix: '/100' },
      { value: 156, label: 'Countries Tracked' },
      { value: 72, label: 'Sector Stability', suffix: '%' },
      { value: globalSummary.total_ai_deployments ?? 48932, label: 'AI Systems Indexed' }];

    }
    if (viewMode === 'opportunity') {
      return [
      { value: 87, label: 'High-Grade Opportunities' },
      { value: globalSummary.global_unmet_need_index ?? 72, label: 'Unmet Need Index', suffix: '%' },
      { value: Math.round((globalSummary.total_capital_inflow ?? 48300000000) / 1e9), label: 'Addressable Capital', suffix: 'B' },
      { value: globalSummary.opportunity_gap_index ?? 23, label: 'Market Gaps Identified' }];

    }
    return config.heroMetrics;
  }, [globalSummary, viewMode, config.heroMetrics]);

  const lastSync = globalSummary?.last_sync ?
  new Date(globalSummary.last_sync).toLocaleString() :
  `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

  return (
    <header className="relative z-10 pt-16 pb-12 text-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-xs font-medium tracking-widest mb-6">
          GLOBAL AI SYSTEMS INTELLIGENCE
        </Badge>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }}
        className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-muted-foreground bg-clip-text text-transparent tracking-tight leading-tight lg:text-4xl">
        The Global AI Systems Intelligence Index

      </motion.h1>

      <motion.p
        key={viewMode}
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
        className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed font-light">

        {config.heroSubtitle}
      </motion.p>

      {/* Live Counters */}
      <motion.div
        key={`counters-${viewMode}`}
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">

        {heroMetrics.map((item, i) =>
        <motion.div key={`${viewMode}-${i}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}>
            <Card className="p-5 bg-card/60 backdrop-blur-md border-border/50 hover:border-border transition-colors">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {item.suffix === 'B' && <span className="text-muted-foreground text-lg">$</span>}
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
        className="text-xs text-muted-foreground/60 mt-4">

        Last updated: {lastSync} • Data refreshed every 24 hours
      </motion.p>
    </header>);

};

export default HeroSection;