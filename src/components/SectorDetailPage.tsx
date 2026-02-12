import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AlertCircle, Target, TrendingUp, Globe2, Users, MapPin } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
} from 'recharts';
import { type SectorDetail } from '@/lib/sectorDetails';

interface SectorDetailPageProps {
  sector: SectorDetail;
  onBack: () => void;
}

const getPriorityStyle = (priority: string) => {
  switch (priority) {
    case 'Critical': return 'bg-destructive/15 text-destructive border-destructive/20';
    case 'High Priority': return 'bg-sector-energy/15 text-sector-energy border-sector-energy/20';
    case 'Medium Priority': return 'bg-status-warning/15 text-status-warning border-status-warning/20';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getPriorityBorder = (priority: string) => {
  switch (priority) {
    case 'Critical': return 'border-l-destructive';
    case 'High Priority': return 'border-l-sector-energy';
    case 'Medium Priority': return 'border-l-status-warning';
    default: return 'border-l-muted';
  }
};

const SectorDetailPage: React.FC<SectorDetailPageProps> = ({ sector, onBack }) => {
  const latestDeployments = sector.history[sector.history.length - 1]?.deployments || 0;
  const prevDeployments = sector.history[sector.history.length - 2]?.deployments || 1;
  const growthRate = (((latestDeployments - prevDeployments) / prevDeployments) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <Button onClick={onBack} variant="ghost" size="sm" className="mb-6 text-muted-foreground hover:text-foreground text-xs uppercase tracking-widest">
          ← Back to Overview
        </Button>

        <div className="mb-10">
          <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1 text-[10px] uppercase tracking-widest mb-4">
            {sector.name} Sector
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            {sector.name} AI Readiness
          </h1>
          <p className="text-muted-foreground text-base max-w-3xl font-light">{sector.tagline}</p>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Deployments', value: latestDeployments.toLocaleString(), sub: `+${growthRate}% MoM` },
            { label: 'Investment Flow', value: `$${sector.history[sector.history.length - 1]?.investment}B`, sub: 'Current quarter' },
            { label: 'Stability Score', value: `${sector.stabilityScore}/100`, sub: sector.stabilityScore >= 60 ? 'Stable' : sector.stabilityScore >= 45 ? 'Moderate' : 'At Risk' },
            { label: 'Policy Framework', value: `${sector.policyFramework}/100`, sub: 'Regulatory clarity' },
          ].map((m) => (
            <Card key={m.label} className="p-4 bg-card/60 backdrop-blur-md border-border/50">
              <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{m.label}</div>
              <div className="text-2xl font-bold text-foreground">{m.value}</div>
              <div className="text-[10px] text-muted-foreground mt-1">{m.sub}</div>
            </Card>
          ))}
        </div>

        {/* Stability Breakdown */}
        <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" /> System Stability Breakdown
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Infrastructure', score: sector.infrastructure },
              { label: 'AI Deployment', score: sector.aiDeployment },
              { label: 'Policy Framework', score: sector.policyFramework },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between mb-2">
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{item.label}</span>
                  <span className="text-sm font-bold text-foreground">{item.score}/100</span>
                </div>
                <Progress value={item.score} className="h-1.5 bg-secondary" />
              </div>
            ))}
          </div>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Deployments Over Time</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={sector.history}>
                <defs>
                  <linearGradient id={`grad-${sector.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '6px', color: 'hsl(var(--foreground))', fontSize: '12px' }} />
                <Area type="monotone" dataKey="deployments" stroke="hsl(var(--primary))" fill={`url(#grad-${sector.id})`} strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Investment Flow ($B)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sector.history}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '6px', color: 'hsl(var(--foreground))', fontSize: '12px' }} />
                <Bar dataKey="investment" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} opacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50 lg:col-span-2">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">Readiness Index Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={sector.history}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeOpacity={0.5} />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '6px', color: 'hsl(var(--foreground))', fontSize: '12px' }} />
                <Line type="monotone" dataKey="readiness" stroke="hsl(var(--ring))" strokeWidth={1.5} dot={{ fill: 'hsl(var(--ring))', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Critical Gaps */}
        <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-5 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-sector-energy" /> Critical System Gaps
          </h2>
          <div className="space-y-3">
            {sector.gaps.map((gap) => (
              <div key={gap.title} className={`p-4 bg-secondary/30 rounded-lg border-l-4 ${getPriorityBorder(gap.priority)}`}>
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-sm font-semibold text-foreground">{gap.title}</h3>
                  <Badge variant="outline" className={`text-[10px] ${getPriorityStyle(gap.priority)}`}>{gap.priority}</Badge>
                </div>
                <p className="text-muted-foreground text-xs">{gap.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Opportunity Signal */}
        <Card className="p-6 bg-gradient-to-br from-primary/5 via-card to-secondary/20 backdrop-blur-md border-primary/15">
          <div className="flex items-center gap-3 mb-5">
            <Target className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">Opportunity Signal</h2>
              <p className="text-muted-foreground text-xs">Investment and deployment recommendation</p>
            </div>
          </div>
          <div className="p-4 bg-background/30 rounded-lg mb-5">
            <p className="text-base text-foreground font-medium mb-1">{sector.opportunity.summary}</p>
            <p className="text-sm text-muted-foreground">{sector.opportunity.detail}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Market Readiness', value: sector.opportunity.readiness },
              { label: 'Competition', value: sector.opportunity.competition },
              { label: 'Time to ROI', value: sector.opportunity.roi },
              { label: 'Est. TAM', value: sector.opportunity.tam },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">{item.label}</div>
                <div className="text-sm font-semibold text-foreground">{item.value}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SectorDetailPage;
