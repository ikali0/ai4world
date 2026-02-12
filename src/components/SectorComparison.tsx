import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftRight, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';
import {
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { useSectors, useSectorMetrics, aggregateSectorMetrics } from '@/hooks/use-dashboard-data';
import { SECTOR_DETAILS } from '@/lib/sectorDetails';

const SECTOR_COLORS_MAP: Record<string, string> = {
  'Healthcare': 'hsl(192, 55%, 48%)',
  'Education': 'hsl(260, 45%, 55%)',
  'Energy & Climate': 'hsl(25, 65%, 50%)',
  'Agriculture': 'hsl(155, 45%, 42%)',
  'Labor & Economy': 'hsl(40, 55%, 48%)',
  'Governance': 'hsl(225, 50%, 55%)',
};

const SECTOR_ROUTE_MAP: Record<string, string> = {
  'Healthcare': 'healthcare',
  'Education': 'education',
  'Energy & Climate': 'energy',
  'Agriculture': 'agriculture',
  'Labor & Economy': 'labor',
  'Governance': 'governance',
};

const SectorComparison: React.FC = () => {
  const [sectorA, setSectorA] = useState<string>('');
  const [sectorB, setSectorB] = useState<string>('');
  const { data: sectors, isLoading: ls } = useSectors();
  const { data: metrics, isLoading: lm } = useSectorMetrics();

  const agg = useMemo(() => {
    if (!sectors || !metrics || !sectorA || !sectorB) return null;
    const aData = aggregateSectorMetrics(metrics, sectorA);
    const bData = aggregateSectorMetrics(metrics, sectorB);
    if (!aData || !bData) return null;

    const sA = sectors.find((s) => s.id === sectorA);
    const sB = sectors.find((s) => s.id === sectorB);
    if (!sA || !sB) return null;

    const routeA = SECTOR_ROUTE_MAP[sA.name] ?? sA.id;
    const routeB = SECTOR_ROUTE_MAP[sB.name] ?? sB.id;
    const detailA = SECTOR_DETAILS[routeA];
    const detailB = SECTOR_DETAILS[routeB];

    return { aData, bData, sA, sB, detailA, detailB };
  }, [sectors, metrics, sectorA, sectorB]);

  const radarData = useMemo(() => {
    if (!agg) return [];
    return [
      { axis: 'Adoption', A: agg.aData.aiAdoptionRate, B: agg.bData.aiAdoptionRate },
      { axis: 'Maturity', A: agg.aData.stabilityScore, B: agg.bData.stabilityScore },
      { axis: 'Workforce', A: agg.aData.workforceReadiness, B: agg.bData.workforceReadiness },
      { axis: 'Policy', A: agg.aData.policyReadiness, B: agg.bData.policyReadiness },
      { axis: 'Talent', A: agg.aData.talentDensity, B: agg.bData.talentDensity },
    ];
  }, [agg]);

  const barData = useMemo(() => {
    if (!agg) return [];
    return [
      { metric: 'Deployments', A: agg.aData.totalDeployments, B: agg.bData.totalDeployments },
      { metric: 'Unmet Need', A: agg.aData.unmetNeedIndex, B: agg.bData.unmetNeedIndex },
      { metric: 'Infra Gap', A: agg.aData.infrastructureGap, B: agg.bData.infrastructureGap },
      { metric: 'Reg Friction', A: agg.aData.regulatoryFriction, B: agg.bData.regulatoryFriction },
    ];
  }, [agg]);

  if (ls || lm) {
    return (
      <section className="relative z-10 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />
          <Skeleton className="h-96 w-full" />
        </div>
      </section>
    );
  }

  const colorA = agg ? SECTOR_COLORS_MAP[agg.sA.name] ?? 'hsl(200, 40%, 50%)' : 'hsl(200, 40%, 50%)';
  const colorB = agg ? SECTOR_COLORS_MAP[agg.sB.name] ?? 'hsl(300, 40%, 50%)' : 'hsl(300, 40%, 50%)';

  const renderDelta = (a: number, b: number) => {
    const diff = a - b;
    if (diff > 0) return <span className="text-status-success text-xs flex items-center gap-0.5"><TrendingUp className="w-3 h-3" />+{diff}</span>;
    if (diff < 0) return <span className="text-destructive text-xs flex items-center gap-0.5"><TrendingDown className="w-3 h-3" />{diff}</span>;
    return <span className="text-muted-foreground text-xs">—</span>;
  };

  return (
    <section className="relative z-10 px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ArrowLeftRight className="w-5 h-5 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Sector Comparison</h2>
          </div>
          <p className="text-muted-foreground text-base font-light">Compare two sectors side-by-side across key dimensions</p>
        </div>

        {/* Selector */}
        <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 block">Sector A</label>
              <Select value={sectorA} onValueChange={setSectorA}>
                <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
                <SelectContent>
                  {sectors?.map((s) => (
                    <SelectItem key={s.id} value={s.id} disabled={s.id === sectorB}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-center">
              <ArrowLeftRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <label className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2 block">Sector B</label>
              <Select value={sectorB} onValueChange={setSectorB}>
                <SelectTrigger><SelectValue placeholder="Select sector" /></SelectTrigger>
                <SelectContent>
                  {sectors?.map((s) => (
                    <SelectItem key={s.id} value={s.id} disabled={s.id === sectorA}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {agg && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* Side-by-side metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Sector A */}
              <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50" style={{ borderTopColor: colorA, borderTopWidth: '3px' }}>
                <h3 className="text-lg font-bold text-foreground mb-4">{agg.sA.name}</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Maturity Score', value: agg.aData.stabilityScore },
                    { label: 'AI Adoption', value: agg.aData.aiAdoptionRate },
                    { label: 'Workforce Readiness', value: agg.aData.workforceReadiness },
                    { label: 'Policy Readiness', value: agg.aData.policyReadiness },
                    { label: 'Unmet Need', value: agg.aData.unmetNeedIndex },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{m.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">{m.value}%</span>
                          {renderDelta(m.value, (() => {
                            switch (m.label) {
                              case 'Maturity Score': return agg.bData.stabilityScore;
                              case 'AI Adoption': return agg.bData.aiAdoptionRate;
                              case 'Workforce Readiness': return agg.bData.workforceReadiness;
                              case 'Policy Readiness': return agg.bData.policyReadiness;
                              case 'Unmet Need': return agg.bData.unmetNeedIndex;
                              default: return 0;
                            }
                          })())}
                        </div>
                      </div>
                      <Progress value={m.value} className="h-1.5 bg-secondary" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Sector B */}
              <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50" style={{ borderTopColor: colorB, borderTopWidth: '3px' }}>
                <h3 className="text-lg font-bold text-foreground mb-4">{agg.sB.name}</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Maturity Score', value: agg.bData.stabilityScore },
                    { label: 'AI Adoption', value: agg.bData.aiAdoptionRate },
                    { label: 'Workforce Readiness', value: agg.bData.workforceReadiness },
                    { label: 'Policy Readiness', value: agg.bData.policyReadiness },
                    { label: 'Unmet Need', value: agg.bData.unmetNeedIndex },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{m.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-foreground">{m.value}%</span>
                          {renderDelta(m.value, (() => {
                            switch (m.label) {
                              case 'Maturity Score': return agg.aData.stabilityScore;
                              case 'AI Adoption': return agg.aData.aiAdoptionRate;
                              case 'Workforce Readiness': return agg.aData.workforceReadiness;
                              case 'Policy Readiness': return agg.aData.policyReadiness;
                              case 'Unmet Need': return agg.aData.unmetNeedIndex;
                              default: return 0;
                            }
                          })())}
                        </div>
                      </div>
                      <Progress value={m.value} className="h-1.5 bg-secondary" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Radar + Bar charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50">
                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Dimensional Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="hsl(var(--border))" strokeOpacity={0.4} />
                    <PolarAngleAxis dataKey="axis" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name={agg.sA.name} dataKey="A" stroke={colorA} fill={colorA} fillOpacity={0.15} strokeWidth={1.5} />
                    <Radar name={agg.sB.name} dataKey="B" stroke={colorB} fill={colorB} fillOpacity={0.15} strokeWidth={1.5} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50">
                <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Key Metrics</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <YAxis dataKey="metric" type="category" stroke="hsl(var(--muted-foreground))" fontSize={10} width={80} />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '6px', color: 'hsl(var(--foreground))', fontSize: '12px' }} />
                    <Bar dataKey="A" name={agg.sA.name} fill={colorA} opacity={0.8} radius={[0, 3, 3, 0]} />
                    <Bar dataKey="B" name={agg.sB.name} fill={colorB} opacity={0.8} radius={[0, 3, 3, 0]} />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </motion.div>
        )}

        {!agg && sectorA === '' && (
          <Card className="p-12 bg-card/40 backdrop-blur-md border-border/30 text-center">
            <BarChart3 className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">Select two sectors above to compare their AI readiness profiles</p>
          </Card>
        )}
      </div>
    </section>
  );
};

export default SectorComparison;
