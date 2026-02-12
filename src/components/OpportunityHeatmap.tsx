import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertCircle, Users, Shield, Zap } from 'lucide-react';

interface HeatmapSector {
  id: string;
  name: string;
  urgency: number;
  capitalInflow: number;
  unmetNeed: number;
  talentConcentration: 'Low' | 'Medium' | 'High';
  regulatoryFriction: 'Low' | 'Medium' | 'High' | 'Very High';
  opportunityScore: number;
}

interface OpportunityHeatmapProps {
  onSectorClick: (sectorId: string) => void;
}

const HEATMAP_DATA: HeatmapSector[] = [
{ id: 'healthcare', name: 'Healthcare', urgency: 82, capitalInflow: 65, unmetNeed: 78, talentConcentration: 'High', regulatoryFriction: 'High', opportunityScore: 84 },
{ id: 'education', name: 'Education', urgency: 68, capitalInflow: 35, unmetNeed: 88, talentConcentration: 'Low', regulatoryFriction: 'Medium', opportunityScore: 79 },
{ id: 'energy', name: 'Energy & Climate', urgency: 95, capitalInflow: 72, unmetNeed: 85, talentConcentration: 'Medium', regulatoryFriction: 'Very High', opportunityScore: 91 },
{ id: 'agriculture', name: 'Agriculture', urgency: 76, capitalInflow: 28, unmetNeed: 91, talentConcentration: 'Low', regulatoryFriction: 'Low', opportunityScore: 86 },
{ id: 'labor', name: 'Labor & Economy', urgency: 64, capitalInflow: 48, unmetNeed: 72, talentConcentration: 'Medium', regulatoryFriction: 'Medium', opportunityScore: 68 },
{ id: 'governance', name: 'Governance', urgency: 78, capitalInflow: 22, unmetNeed: 94, talentConcentration: 'Low', regulatoryFriction: 'Very High', opportunityScore: 82 }];


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

const getFrictionBadge = (level: string) => {
  switch (level) {
    case 'Very High':return 'bg-red-500/20 text-red-400 border-red-500/30';
    case 'High':return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case 'Medium':return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    default:return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
  }
};

const getTalentBadge = (level: string) => {
  switch (level) {
    case 'High':return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    case 'Medium':return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    default:return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  }
};

const OpportunityHeatmap: React.FC<OpportunityHeatmapProps> = ({ onSectorClick }) => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const sorted = [...HEATMAP_DATA].sort((a, b) => b.opportunityScore - a.opportunityScore);

  return (
    <section className="relative z-10 px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-xs font-medium mb-4">
            STARTUP & INVESTOR LENS
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Opportunity Heatmap
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Where AI is most needed AND least served — revealing gaps for founders, investors, and incubators.
          </p>
        </div>

        {/* Visual heatmap grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {sorted.slice(0, 3).map((sector, i) =>
          <motion.div
            key={sector.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            whileHover={{ scale: 1.02 }}>

              <Card
              className="p-6 bg-card/60 backdrop-blur-md border-border/50 cursor-pointer hover:border-primary/40 transition-all relative overflow-hidden"
              onClick={() => onSectorClick(sector.id)}>

                {/* Opportunity score bar at top */}
                <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" style={{ width: `${sector.opportunityScore}%` }} />

                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-foreground text-sm">{sector.name}</h3>
                  <div className={`text-2xl font-bold ${getHeatTextColor(sector.opportunityScore)}`}>
                    {sector.opportunityScore}
                  </div>
                </div>

                {/* Mini heatmap bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span className="flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Urgency</span>
                      <span>{sector.urgency}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${getHeatColor(sector.urgency)}`} style={{ width: `${sector.urgency}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Unmet Need</span>
                      <span>{sector.unmetNeed}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${getHeatColor(sector.unmetNeed)}`} style={{ width: `${sector.unmetNeed}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Capital Inflow</span>
                      <span>{sector.capitalInflow}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-500/60" style={{ width: `${sector.capitalInflow}%` }} />
                    </div>
                  </div>
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
          )}
        </div>

        {/* Full comparison table */}
        <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50">
          <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Full Opportunity Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sector</th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Urgency</th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Capital</th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Unmet Need</th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Talent</th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Reg. Friction</th>
                  <th className="text-center py-3 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Score</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((sector, idx) =>
                <tr
                  key={sector.id}
                  className={`border-b border-border/30 cursor-pointer transition-colors ${hoveredRow === sector.id ? 'bg-primary/5' : idx % 2 === 0 ? 'bg-card/30' : ''}`}
                  onMouseEnter={() => setHoveredRow(sector.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onClick={() => onSectorClick(sector.id)}>

                    <td className="py-3 px-3 text-foreground font-medium text-sm">{sector.name}</td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-sm font-semibold ${getHeatTextColor(sector.urgency)}`}>{sector.urgency}</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-sm font-semibold ${getHeatTextColor(100 - sector.capitalInflow)}`}>{sector.capitalInflow}</span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-sm font-semibold ${getHeatTextColor(sector.unmetNeed)}`}>{sector.unmetNeed}</span>
                    </td>
                    <td className="py-3 px-3 text-center text-primary">
                      <Badge variant="outline" className={`text-[10px] ${getTalentBadge(sector.talentConcentration)}`}>
                        {sector.talentConcentration}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-center text-primary">
                      <Badge variant="outline" className={`text-[10px] ${getFrictionBadge(sector.regulatoryFriction)}`}>
                        {sector.regulatoryFriction}
                      </Badge>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className={`text-lg font-bold ${getHeatTextColor(sector.opportunityScore)}`}>{sector.opportunityScore}</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </section>);

};

export default OpportunityHeatmap;