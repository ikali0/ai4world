import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, TrendingDown, ShieldAlert } from 'lucide-react';

interface RiskIndicator {
  sector: string;
  risk: 'Critical' | 'Elevated' | 'Moderate' | 'Low';
  score: number;
  trend: 'Worsening' | 'Stable' | 'Improving';
  factor: string;
}

const RISK_DATA: RiskIndicator[] = [
{ sector: 'Governance', risk: 'Critical', score: 18, trend: 'Worsening', factor: 'Policy framework gaps in 120+ nations' },
{ sector: 'Energy & Climate', risk: 'Critical', score: 24, trend: 'Stable', factor: 'Grid modernization lag vs climate timeline' },
{ sector: 'Agriculture', risk: 'Elevated', score: 38, trend: 'Improving', factor: 'Smallholder access below 5% globally' },
{ sector: 'Labor & Economy', risk: 'Elevated', score: 42, trend: 'Worsening', factor: 'Reskilling programs reaching 12% of displaced' },
{ sector: 'Education', risk: 'Moderate', score: 51, trend: 'Improving', factor: 'Digital equity improving but uneven' },
{ sector: 'Healthcare', risk: 'Moderate', score: 58, trend: 'Improving', factor: 'Rural diagnostics remain under-served' }];


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
  return (
    <section className="relative z-10 px-4 py-[56px]">
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
            {RISK_DATA.map((item) =>
            <div key={item.sector} className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg border-primary border border-dashed">
                <AlertTriangle className={`w-4 h-4 shrink-0 ${item.risk === 'Critical' ? 'text-destructive' : item.risk === 'Elevated' ? 'text-sector-energy' : 'text-status-warning'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-sm font-semibold text-foreground">{item.sector}</span>
                    <Badge variant="outline" className={`text-[10px] ${getRiskStyle(item.risk)}`}>{item.risk}</Badge>
                    <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                      {getTrendIcon(item.trend)} {item.trend}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-950">{item.factor}</p>
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