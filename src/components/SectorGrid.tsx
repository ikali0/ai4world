import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight, Activity, GraduationCap, Zap, Sprout, Users, Building2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getGapColor, getStabilityColor } from '@/lib/sectors';
import { useSectors, useSectorMetrics, aggregateSectorMetrics } from '@/hooks/use-dashboard-data';

const SECTOR_ICONS: Record<string, React.ReactNode> = {
  'Healthcare': <Activity className="w-6 h-6" />,
  'Education': <GraduationCap className="w-6 h-6" />,
  'Energy & Climate': <Zap className="w-6 h-6" />,
  'Agriculture': <Sprout className="w-6 h-6" />,
  'Labor & Economy': <Users className="w-6 h-6" />,
  'Governance': <Building2 className="w-6 h-6" />
};

const SECTOR_COLORS: Record<string, string> = {
  'Healthcare': 'from-sector-healthcare to-primary',
  'Education': 'from-sector-education to-[hsl(300,35%,45%)]',
  'Energy & Climate': 'from-sector-energy to-destructive',
  'Agriculture': 'from-sector-agriculture to-[hsl(160,40%,38%)]',
  'Labor & Economy': 'from-sector-labor to-[hsl(30,50%,42%)]',
  'Governance': 'from-sector-governance to-sector-education'
};

const SECTOR_ROUTE_IDS: Record<string, string> = {
  'Healthcare': 'healthcare',
  'Education': 'education',
  'Energy & Climate': 'energy',
  'Agriculture': 'agriculture',
  'Labor & Economy': 'labor',
  'Governance': 'governance'
};

const getMaturityLabel = (score: number) => {
  if (score >= 70) return 'Advanced';
  if (score >= 50) return 'Moderate';
  if (score >= 30) return 'Early';
  return 'Nascent';
};

const getGapLabel = (capitalInflow: number, unmetNeed: number): 'Low' | 'Medium' | 'High' | 'Critical' => {
  const ratio = capitalInflow > 0 ? unmetNeed / (capitalInflow / 1e9) : 100;
  if (ratio > 10) return 'Critical';
  if (ratio > 5) return 'High';
  if (ratio > 2) return 'Medium';
  return 'Low';
};

interface SectorGridProps {
  onSectorClick: (id: string) => void;
}

const SectorGrid: React.FC<SectorGridProps> = ({ onSectorClick }) => {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const { data: sectors, isLoading: ls } = useSectors();
  const { data: metrics, isLoading: lm } = useSectorMetrics();

  const gridData = useMemo(() => {
    if (!sectors || !metrics) return [];
    return sectors.map((s) => {
      const agg = aggregateSectorMetrics(metrics, s.id);
      const routeId = SECTOR_ROUTE_IDS[s.name] ?? s.id;
      return {
        id: routeId,
        name: s.name,
        icon: SECTOR_ICONS[s.name] ?? <Activity className="w-6 h-6" />,
        color: SECTOR_COLORS[s.name] ?? 'from-primary to-accent',
        stabilityScore: agg?.stabilityScore ?? 50,
        aiMaturityLevel: getMaturityLabel(agg?.stabilityScore ?? 50),
        investmentGap: getGapLabel(agg?.capitalInflow ?? 0, agg?.unmetNeedIndex ?? 50),
        enabled: true
      };
    });
  }, [sectors, metrics]);

  if (ls || lm) {
    return (
      <section className="relative z-10 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-52" />)}
          </div>
        </div>
      </section>);

  }

  return (
    <section className="relative z-10 px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Sector Overview</h2>
          <p className="text-muted-foreground text-base font-light">AI readiness and system stability across critical infrastructure</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {gridData.map((sector, index) =>
          <motion.div key={sector.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.08 }}>
              <Card
              className={`relative p-6 cursor-pointer bg-card/60 backdrop-blur-md border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg ${hoveredSector === sector.id ? 'border-primary/30' : ''}`}
              onMouseEnter={() => setHoveredSector(sector.id)}
              onMouseLeave={() => setHoveredSector(null)}
              onClick={() => onSectorClick(sector.id)}>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${sector.color} text-foreground`}>
                      {sector.icon}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-4 text-foreground">{sector.name}</h3>

                  <div className="space-y-2">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Stability Score</span>
                        <span className={`text-xl font-bold ${getStabilityColor(sector.stabilityScore)}`}>
                          {sector.stabilityScore}/100
                        </span>
                      </div>
                      <Progress value={sector.stabilityScore} className="h-1.5 bg-secondary" />
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border/50">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">AI Maturity</span>
                      <span className="text-sm font-medium text-foreground">{sector.aiMaturityLevel}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Investment Gap</span>
                      <Badge variant="secondary" className={`${getGapColor(sector.investmentGap)} text-xs`}>
                        {sector.investmentGap}
                      </Badge>
                    </div>
                  </div>

                  <Button className="w-full mt-4" variant="secondary" size="sm">
                    View Analysis
                    <ArrowRight className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default SectorGrid;