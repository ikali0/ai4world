import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Globe2, X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRegions, useSectorMetrics } from '@/hooks/use-dashboard-data';

const RegionalFilter: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const { data: regions, isLoading } = useRegions();
  const { data: metrics } = useSectorMetrics();

  // Compute per-region aggregates from sector_metrics
  const regionStats = React.useMemo(() => {
    if (!regions || !metrics) return {};
    const map: Record<string, { aiAdoption: number; capitalInflow: number; workforceReadiness: number; sectorStrengths: string[] }> = {};
    for (const region of regions) {
      const rm = metrics.filter((m) => m.region_id === region.id);
      if (rm.length === 0) {
        map[region.id] = { aiAdoption: 0, capitalInflow: 0, workforceReadiness: 0, sectorStrengths: [] };
        continue;
      }
      const avg = (key: string) => {
        const vals = rm.map((m) => (m as any)[key] as number | null).filter((v): v is number => v != null);
        return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
      };
      const totalCapital = rm.reduce((s, m) => s + (m.capital_inflow_usd ?? 0), 0);
      // Top 2 sectors by adoption
      const sorted = [...rm].sort((a, b) => (b.ai_adoption_rate ?? 0) - (a.ai_adoption_rate ?? 0));
      const strengths = sorted.slice(0, 2).map((m) => (m.sectors as any)?.name ?? 'Unknown');
      map[region.id] = {
        aiAdoption: avg('ai_adoption_rate'),
        capitalInflow: totalCapital,
        workforceReadiness: avg('workforce_readiness'),
        sectorStrengths: strengths,
      };
    }
    return map;
  }, [regions, metrics]);

  const formatCapital = (v: number) => {
    if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
    if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
    return `$${v}`;
  };

  if (isLoading) {
    return (
      <section className="relative z-10 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-28" />)}
          </div>
        </div>
      </section>
    );
  }

  if (!regions || regions.length === 0) return null;

  const active = regions.find((r) => r.id === selectedRegion);
  const activeStats = active ? regionStats[active.id] : null;

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
          {regions.map((region) => (
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
          {active && activeStats && (
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
                  <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                    {formatCapital(activeStats.capitalInflow)} Capital Inflow
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {[
                    { label: 'AI Adoption Rate', value: activeStats.aiAdoption },
                    { label: 'Regulatory Maturity', value: active.regulatory_index ?? 0 },
                    { label: 'Workforce Readiness', value: activeStats.workforceReadiness },
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
                    {activeStats.sectorStrengths.map((s) => (
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {regions.map((region) => {
                const stats = regionStats[region.id];
                return (
                  <Card
                    key={region.id}
                    className="p-4 bg-card/40 backdrop-blur-md border-border/30 cursor-pointer hover:border-primary/30 transition-all"
                    onClick={() => setSelectedRegion(region.id)}
                  >
                    <div className="text-sm font-semibold text-foreground mb-2">{region.name}</div>
                    <div className="text-2xl font-bold text-primary mb-1">{stats?.aiAdoption ?? 0}%</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">AI Adoption</div>
                    <Progress value={stats?.aiAdoption ?? 0} className="h-1 bg-secondary mt-2" />
                  </Card>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RegionalFilter;
