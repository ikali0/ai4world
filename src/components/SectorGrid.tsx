import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { type SectorData, getGapColor, getStabilityColor } from '@/lib/sectors';

interface SectorGridProps {
  sectors: SectorData[];
  onSectorClick: (id: string) => void;
}

const SectorGrid: React.FC<SectorGridProps> = ({ sectors, onSectorClick }) => {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  return (
    <section className="relative z-10 px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Sector Overview</h2>
          <p className="text-muted-foreground text-base font-light">AI readiness and system stability across critical infrastructure</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {sectors.map((sector, index) =>
          <motion.div key={sector.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.08 }}>
              <Card
              className={`relative p-6 cursor-pointer bg-card/60 backdrop-blur-md border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg ${hoveredSector === sector.id ? 'border-primary/30' : ''}`}
              onMouseEnter={() => setHoveredSector(sector.id)}
              onMouseLeave={() => setHoveredSector(null)}
              onClick={() => sector.enabled && onSectorClick(sector.id)}>

                <div className="relative z-9=8">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${sector.color} text-foreground`}>
                      {sector.icon}
                    </div>
                    {!sector.enabled &&
                  <Badge variant="secondary" className="text-[10px]">Coming Soon</Badge>
                  }
                  </div>

                  <h3 className="text-lg font-semibold mb-4 text-foreground">{sector.name}</h3>

                  <div className="space-y-3">
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

                  {sector.enabled &&
                <Button className="w-full mt-4" variant="secondary" size="sm">
                      View Analysis
                      <ArrowRight className="w-3 h-3 ml-2" />
                    </Button>
                }
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};

export default SectorGrid;