import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { AlertCircle, Target, TrendingUp } from 'lucide-react';
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
    case 'Critical': return 'bg-destructive/20 text-destructive-foreground border-destructive/30';
    case 'High Priority': return 'bg-sector-energy/20 text-sector-energy border-sector-energy/30';
    case 'Medium Priority': return 'bg-status-warning/20 text-status-warning border-status-warning/30';
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
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <Button onClick={onBack} variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
          ← Back to Overview
        </Button>

        <div className="mb-12">
          <Badge className={`bg-${sector.themeColor}/10 text-${sector.themeColor} border-${sector.themeColor}/20 px-3 py-1 text-xs mb-4`}>
            {sector.name.toUpperCase()} SECTOR
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {sector.name} AI Readiness Analysis
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">{sector.tagline}</p>
        </div>

        {/* Stability Score */}
        <Card className="p-8 bg-card/60 backdrop-blur-md border-border/50 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <TrendingUp className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-2xl font-bold text-foreground">Sector Stability Score</h2>
              <p className="text-muted-foreground text-sm">Overall system readiness and resilience index</p>
            </div>
          </div>
          <div className="flex items-end gap-8 mb-4">
            <div className={`text-7xl font-bold ${sector.stabilityScore >= 60 ? 'text-status-success' : sector.stabilityScore >= 45 ? 'text-status-warning' : 'text-destructive-foreground'}`}>
              {sector.stabilityScore}
            </div>
            <div className="text-3xl text-muted-foreground mb-2">/100</div>
          </div>
          <Progress value={sector.stabilityScore} className="h-3 bg-secondary mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { label: 'Infrastructure', score: sector.infrastructure },
              { label: 'AI Deployment', score: sector.aiDeployment },
              { label: 'Policy Framework', score: sector.policyFramework },
            ].map((item) => (
              <div key={item.label} className="p-4 bg-secondary/50 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{item.label}</div>
                <div className="text-2xl font-bold text-foreground">{item.score}/100</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50">
            <h3 className="text-lg font-bold text-foreground mb-4">Deployments Over Time</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={sector.history}>
                <defs>
                  <linearGradient id={`grad-${sector.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Area type="monotone" dataKey="deployments" stroke="hsl(var(--primary))" fill={`url(#grad-${sector.id})`} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50">
            <h3 className="text-lg font-bold text-foreground mb-4">Investment Flow ($B)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={sector.history}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="investment" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50 lg:col-span-2">
            <h3 className="text-lg font-bold text-foreground mb-4">Readiness Index Trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={sector.history}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', color: 'hsl(var(--foreground))' }}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Line type="monotone" dataKey="readiness" stroke="hsl(var(--ring))" strokeWidth={2} dot={{ fill: 'hsl(var(--ring))', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Critical Gaps */}
        <Card className="p-8 bg-card/60 backdrop-blur-md border-border/50 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <AlertCircle className="w-7 h-7 text-sector-energy" />
            Critical System Gaps
          </h2>
          <div className="space-y-4">
            {sector.gaps.map((gap) => (
              <div key={gap.title} className={`p-4 bg-secondary/50 rounded-lg border-l-4 ${getPriorityBorder(gap.priority)}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{gap.title}</h3>
                  <Badge className={getPriorityStyle(gap.priority)}>{gap.priority}</Badge>
                </div>
                <p className="text-muted-foreground text-sm">{gap.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Opportunity Signal */}
        <Card className="p-8 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/30 backdrop-blur-md border-primary/30">
          <div className="flex items-center gap-4 mb-6">
            <Target className="w-8 h-8 text-primary" />
            <div>
              <h2 className="text-2xl font-bold text-foreground">Opportunity Signal</h2>
              <p className="text-muted-foreground text-sm">Investment and deployment recommendation</p>
            </div>
          </div>
          <div className="p-6 bg-background/30 rounded-lg mb-6">
            <p className="text-xl text-foreground font-medium mb-2">
              {sector.opportunity.summary}
            </p>
            <p className="text-muted-foreground">{sector.opportunity.detail}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Market Readiness</div>
              <Badge className="bg-status-success/20 text-status-success border-status-success/30 text-sm px-3 py-1">{sector.opportunity.readiness}</Badge>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Competitive Landscape</div>
              <Badge className="bg-primary/20 text-primary border-primary/30 text-sm px-3 py-1">{sector.opportunity.competition}</Badge>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Avg. Time to ROI</div>
              <div className="text-foreground font-semibold">{sector.opportunity.roi}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Est. TAM</div>
              <div className="text-foreground font-semibold">{sector.opportunity.tam}</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SectorDetailPage;
