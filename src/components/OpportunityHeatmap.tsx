import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertCircle, Users, Shield, Zap } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useSectors, useSectorMetrics, aggregateSectorMetrics } from '@/hooks/use-dashboard-data';

const SECTOR_ROUTE_IDS: Record<string, string> = {
  'Healthcare': 'healthcare',
  'Education': 'education',
  'Energy & Climate': 'energy',
  'Agriculture': 'agriculture',
  'Labor & Economy': 'labor',
  'Governance': 'governance',
};

const getHeatColor = (value: number) => {
  if (value >= 85) return 'bg-red-500/80';
  if (value >= 70) return 'bg-orange-500/70';
  if (value >= 50) return 'bg-yellow-500/60';
  return 'bg-emerald-500/50';
};

const getHeatTextColor = (value: number) => {
  if (value >= 85) return 'text-red-300';
  if (value >= 70) return 'text-orange-300';
  if (value >= 50) return 'text-yellow-300';
  return 'text-emerald-300';
};

const getFrictionLabel = (v: number): string => {
  if (v >= 60) return 'Very High';
  if (v >= 45) return 'High';
  if (v >= 30) return 'Medium';
  return 'Low';
};

const getTalentLabel = (v: number): string => {
  if (v >= 70) return 'High';
  if (v >= 45) return 'Medium';
  return 'Low';
};

const getFrictionBadge = (level: string) => {
  switch (level) {
    case 'Very High': return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  }
};

const getTalentBadge = (level: string) => {
  switch (level) {
    case 'High': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'Medium': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

interface OpportunityHeatmapProps {
  onSectorClick: (sectorId: string) => void;
}

const OpportunityHeatmap: React.FC<OpportunityHeatmapProps> = ({ onSectorClick }) => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const { data: sectors, isLoading: ls } = useSectors();
  const { data: metrics, isLoading: lm } = useSectorMetrics();

  const heatmapData = useMemo(() => {
    if (!sectors || !metrics) return [];
    return sectors.map((s) => {
      const agg = aggregateSectorMetrics(metrics, s.id);
      const routeId = SECTOR_ROUTE_IDS[s.name] ?? s.id;
      const urgency = agg ? Math.round((agg.unmetNeedIndex * 0.6 + agg.infrastructureGap * 0.4)) : 50;
      const capitalNorm = agg ? Math.min(Math.round(agg.capitalInflow / 1e9 / 0.5), 100) : 50;
      const opportunityScore = agg
        ? Math.round(urgency * 0.3 + agg.unmetNeedIndex * 0.35 + (100 - capitalNorm) * 0.2 + (100 - agg.stabilityScore) * 0.15)
        : 50;
      return {
        id: routeId,
        name: s.name,
        urgency,
        capitalInflow: capitalNorm,
        unmetNeed: agg?.unmetNeedIndex ?? 50,
        talentConcentration: getTalentLabel(agg?.talentDensity ?? 50),
        regulatoryFriction: getFrictionLabel(agg?.regulatoryFriction ?? 50),
        opportunityScore,
      };
    }).sort((a, b) => b.opportunityScore - a.opportunityScore);
  }, [sectors, metrics]);

  if (ls || lm) {
    return (
      <section className="relative z-10 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6"><Skeleton className="h-64" /><Skeleton className="h-64" /><Skeleton className="h-64" /></div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative z-10 px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-xs font-medium mb-4">
            STARTUP & INVESTOR LENS
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Opportunity Heatmap</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Where AI is most needed AND least served — revealing gaps for founders, investors, and incubators.
          </p>
        </div>

        {/* Top 3 cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {heatmapData.slice(0, 3).map((sector, i) => (
            <motion.div key={sector.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} whileHover={{ scale: 1.02 }}>
              <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50 cursor-pointer hover:border-primary/40 transition-all relative overflow-hidden" onClick={() => onSectorClick(sector.id)}>
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" style={{ width: `${sector.opportunityScore}%` }} />
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-foreground">{sector.name}</h3>
                  <div className={`text-2xl font-bold ${getHeatTextColor(sector.opportunityScore)}`}>{sector.opportunityScore}</div>
                </div>
                <div className="space-y-3">
                  {[
                    { icon: <AlertCircle className="w-3 h-3" />, label: 'Urgency', value: sector.urgency },
                    { icon: <Zap className="w-3 h-3" />, label: 'Unmet Need', value: sector.unmetNeed },
                    { icon: <TrendingUp className="w-3 h-3" />, label: 'Capital Inflow', value: sector.capitalInflow },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span className="flex items-center gap-1">{bar.icon} {bar.label}</span>
                        <span>{bar.value}%</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${bar.label === 'Capital Inflow' ? 'bg-emerald-500/60' : getHeatColor(bar.value)}`} style={{ width: `${bar.value}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-4">
                  <Badge variant="outline" className={`text-[10px] ${getTalentBadge(sector.talentConcentration)}`}>
                    <Users className="w-3 h-3 mr-1" /> Talent: {sector.talentConcentration}
                  </Badge>
                  <Badge variant="outline" className={`text-[10px] ${getFrictionBadge(sector.regulatoryFriction)}`}>
                    <Shield className="w-3 h-3 mr-1" /> Reg: {sector.regulatoryFriction}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Full table */}
        <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> Full Opportunity Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {['Sector', 'Urgency', 'Capital', 'Unmet Need', 'Talent', 'Reg. Friction', 'Score'].map((h) => (
                    <th key={h} className={`py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider ${h === 'Sector' ? 'text-left' : 'text-center'}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {heatmapData.map((sector, idx) => (
                  <tr
                    key={sector.id}
                    className={`border-b border-border/30 cursor-pointer transition-colors ${hoveredRow === sector.id ? 'bg-primary/5' : idx % 2 === 0 ? 'bg-card/30' : ''}`}
                    onMouseEnter={() => setHoveredRow(sector.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => onSectorClick(sector.id)}
                  >
                    <td className="py-3 px-3 text-foreground font-medium text-sm">{sector.name}</td>
                    <td className="py-3 px-3 text-center"><span className={`text-sm font-semibold ${getHeatTextColor(sector.urgency)}`}>{sector.urgency}</span></td>
                    <td className="py-3 px-3 text-center"><span className={`text-sm font-semibold ${getHeatTextColor(100 - sector.capitalInflow)}`}>{sector.capitalInflow}</span></td>
                    <td className="py-3 px-3 text-center"><span className={`text-sm font-semibold ${getHeatTextColor(sector.unmetNeed)}`}>{sector.unmetNeed}</span></td>
                    <td className="py-3 px-3 text-center"><Badge variant="outline" className={`text-[10px] ${getTalentBadge(sector.talentConcentration)}`}>{sector.talentConcentration}</Badge></td>
                    <td className="py-3 px-3 text-center"><Badge variant="outline" className={`text-[10px] ${getFrictionBadge(sector.regulatoryFriction)}`}>{sector.regulatoryFriction}</Badge></td>
                    <td className="py-3 px-3 text-center"><span className={`text-lg font-bold ${getHeatTextColor(sector.opportunityScore)}`}>{sector.opportunityScore}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default OpportunityHeatmap;
