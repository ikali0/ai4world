import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Globe2, X } from 'lucide-react';

interface Region {
  id: string;
  name: string;
  aiAdoption: number;
  capitalInflow: string;
  regulatoryMaturity: number;
  workforceReadiness: number;
  sectorStrengths: string[];
}

const REGIONS: Region[] = [
  { id: 'north-america', name: 'North America', aiAdoption: 78, capitalInflow: '$68.4B', regulatoryMaturity: 72, workforceReadiness: 81, sectorStrengths: ['Healthcare', 'Finance'] },
  { id: 'europe', name: 'Europe', aiAdoption: 65, capitalInflow: '$42.1B', regulatoryMaturity: 84, workforceReadiness: 69, sectorStrengths: ['Governance', 'Energy'] },
  { id: 'asia-pacific', name: 'Asia-Pacific', aiAdoption: 72, capitalInflow: '$51.8B', regulatoryMaturity: 55, workforceReadiness: 74, sectorStrengths: ['Education', 'Manufacturing'] },
  { id: 'middle-east', name: 'Middle East & Africa', aiAdoption: 34, capitalInflow: '$12.3B', regulatoryMaturity: 38, workforceReadiness: 41, sectorStrengths: ['Energy', 'Agriculture'] },
  { id: 'latin-america', name: 'Latin America', aiAdoption: 42, capitalInflow: '$9.6B', regulatoryMaturity: 44, workforceReadiness: 48, sectorStrengths: ['Agriculture', 'Labor'] },
];

const RegionalFilter: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const active = REGIONS.find(r => r.id === selectedRegion);

  return (
    <section className="relative z-10 px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Globe2 className="w-5 h-5 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Regional Intelligence</h2>
          </div>
          <p className="text-muted-foreground text-base font-light">Filter by region to see localized AI readiness and deployment data</p>
        </div>

        {/* Region buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {REGIONS.map((region) => (
            <Button
              key={region.id}
              variant={selectedRegion === region.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedRegion(selectedRegion === region.id ? null : region.id)}
              className="text-xs"
            >
              {region.name}
            </Button>
          ))}
          {selectedRegion && (
            <Button variant="ghost" size="sm" onClick={() => setSelectedRegion(null)} className="text-xs text-muted-foreground">
              <X className="w-3 h-3 mr-1" /> Clear
            </Button>
          )}
        </div>

        {/* Region detail */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8 bg-card/60 backdrop-blur-md border-border/50">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-foreground">{active.name}</h3>
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">{active.capitalInflow} Capital Inflow</Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {[
                    { label: 'AI Adoption Rate', value: active.aiAdoption },
                    { label: 'Regulatory Maturity', value: active.regulatoryMaturity },
                    { label: 'Workforce Readiness', value: active.workforceReadiness },
                  ].map((metric) => (
                    <div key={metric.label}>
                      <div className="flex justify-between mb-2">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{metric.label}</span>
                        <span className="text-sm font-bold text-foreground">{metric.value}%</span>
                      </div>
                      <Progress value={metric.value} className="h-1.5 bg-secondary" />
                    </div>
                  ))}
                </div>

                <div>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Leading Sectors</span>
                  <div className="flex gap-2 mt-2">
                    {active.sectorStrengths.map(s => (
                      <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global overview when no region selected */}
        {!selectedRegion && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {REGIONS.map((region) => (
                <Card
                  key={region.id}
                  className="p-4 bg-card/40 backdrop-blur-md border-border/30 cursor-pointer hover:border-primary/30 transition-all"
                  onClick={() => setSelectedRegion(region.id)}
                >
                  <div className="text-sm font-semibold text-foreground mb-2">{region.name}</div>
                  <div className="text-2xl font-bold text-primary mb-1">{region.aiAdoption}%</div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest">AI Adoption</div>
                  <Progress value={region.aiAdoption} className="h-1 bg-secondary mt-2" />
                </Card>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RegionalFilter;
