import React, { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingDown, ShieldAlert } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useSectors, useSectorMetrics, aggregateSectorMetrics } from '@/hooks/use-dashboard-data';

const SECTOR_RISK_FACTORS: Record<string, string> = {
  'Governance': 'Policy framework gaps in 120+ nations',
  'Energy & Climate': 'Grid modernization lag vs climate timeline',
  'Agriculture': 'Smallholder access below 5% globally',
  'Labor & Economy': 'Reskilling programs reaching 12% of displaced',
  'Education': 'Digital equity improving but uneven',
  'Healthcare': 'Rural diagnostics remain under-served'
};

const getRiskLabel = (score: number): 'Critical' | 'Elevated' | 'Moderate' | 'Low' => {
  if (score < 30) return 'Critical';
  if (score < 50) return 'Elevated';
  if (score < 70) return 'Moderate';
  return 'Low';
};

const getTrend = (growthRate: number): 'Worsening' | 'Stable' | 'Improving' => {
  if (growthRate < 0) return 'Worsening';
  if (growthRate < 5) return 'Stable';
  return 'Improving';
};

const getRiskStyle = (risk: string) => {
  switch (risk) {
    case 'Critical':return 'bg-destructive/15 text-destructive border-destructive/20';
    case 'Elevated':return 'bg-sector-energy/15 text-sector-energy border-sector-energy/20';
    case 'Moderate':return 'bg-status-warning/15 text-status-warning border-status-warning/20';
    default:return 'bg-status-success/15 text-status-success border-status-success/20';
  }
};

const getTrendIcon = (trend: string) => {
  if (trend === 'Worsening') return <TrendingDown className="w-3 h-3 text-destructive" />;
  if (trend === 'Improving') return <TrendingDown className="w-3 h-3 text-status-success rotate-180" />;
  return <span className="w-3 h-3 inline-block text-muted-foreground">—</span>;
};

const RiskGapIndex: React.FC = () => {
  const { data: sectors, isLoading: ls } = useSectors();
  const { data: metrics, isLoading: lm } = useSectorMetrics();

  const riskData = useMemo(() => {
    if (!sectors || !metrics) return [];
    return sectors.map((s) => {
      const agg = aggregateSectorMetrics(metrics, s.id);
      // Resilience = stability (maturity) score
      const resilience = agg?.stabilityScore ?? 50;
      // Use baseline_system_risk from sectors table as a weight
      const adjustedScore = Math.round(resilience * (1 - (s.baseline_system_risk ?? 50) / 200));
      // Avg capital growth rate across regions for trend
      const regionMetrics = metrics.filter((m) => m.sector_id === s.id);
      const avgGrowth = regionMetrics.length ?
      regionMetrics.reduce((sum, m) => sum + (m.capital_growth_rate ?? 0), 0) / regionMetrics.length :
      0;
      return {
        sector: s.name,
        risk: getRiskLabel(adjustedScore),
        score: adjustedScore,
        trend: getTrend(avgGrowth),
        factor: SECTOR_RISK_FACTORS[s.name] ?? 'Systemic vulnerabilities detected'
      };
    }).sort((a, b) => a.score - b.score);
  }, [sectors, metrics]);

  if (ls || lm) {
    return (
      <section className="relative z-10 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </section>);

  }

  return (
    <section className="relative z-10 px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <ShieldAlert className="w-5 h-5 text-sector-energy" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Risk & Gap Index</h2>
          </div>
          <p className="text-muted-foreground text-base font-light">System-level vulnerabilities ranked by severity and trajectory</p>
        </div>

        <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50">
          <div className="space-y-3">
            {riskData.map((item) =>
            <div key={item.sector} className="p-4 bg-secondary/30 rounded-lg flex items-center justify-center gap-[14px]">
                <AlertTriangle className={`w-4 h-4 shrink-0 ${item.risk === 'Critical' ? 'text-destructive' : item.risk === 'Elevated' ? 'text-sector-energy' : 'text-status-warning'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-semibold text-foreground">{item.sector}</span>
                    <Badge variant="outline" className={`text-[10px] ${getRiskStyle(item.risk)}`}>{item.risk}</Badge>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      {getTrendIcon(item.trend)} {item.trend}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.factor}</p>
                </div>
                <div className="w-32 shrink-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] text-muted-foreground">Resilience</span>
                    <span className="text-xs font-bold text-foreground">{item.score}%</span>
                  </div>
                  <Progress value={item.score} className="h-1 bg-secondary" />
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>);

};

export default RiskGapIndex;