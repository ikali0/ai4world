import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Activity, AlertCircle, Target } from 'lucide-react';

interface HealthcarePageProps {
  onBack: () => void;
}

const HealthcarePage: React.FC<HealthcarePageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <Button onClick={onBack} variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
          ← Back to Overview
        </Button>

        <div className="mb-12">
          <Badge className="bg-sector-healthcare/10 text-sector-healthcare border-sector-healthcare/20 px-3 py-1 text-xs mb-4">
            HEALTHCARE SECTOR
          </Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sector-healthcare to-primary bg-clip-text text-transparent">
            Healthcare AI Readiness Analysis
          </h1>
          <p className="text-muted-foreground text-lg max-w-3xl">
            Comprehensive assessment of artificial intelligence adoption, system stability, and opportunity gaps in global healthcare infrastructure.
          </p>
        </div>

        {/* Stability Score */}
        <Card className="p-8 bg-card/60 backdrop-blur-md border-border/50 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Activity className="w-8 h-8 text-sector-healthcare" />
            <div>
              <h2 className="text-2xl font-bold text-foreground">Sector Stability Score</h2>
              <p className="text-muted-foreground text-sm">Overall system readiness and resilience index</p>
            </div>
          </div>
          <div className="flex items-end gap-8 mb-4">
            <div className="text-7xl font-bold text-status-warning">62</div>
            <div className="text-3xl text-muted-foreground mb-2">/100</div>
          </div>
          <Progress value={62} className="h-3 bg-secondary mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { label: 'Infrastructure', score: '58/100' },
              { label: 'AI Deployment', score: '68/100' },
              { label: 'Policy Framework', score: '59/100' },
            ].map((item) => (
              <div key={item.label} className="p-4 bg-secondary/50 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{item.label}</div>
                <div className="text-2xl font-bold text-foreground">{item.score}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Critical Gaps */}
        <Card className="p-8 bg-card/60 backdrop-blur-md border-border/50 mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
            <AlertCircle className="w-7 h-7 text-sector-energy" />
            Critical System Gaps
          </h2>
          <div className="space-y-4">
            {[
              { title: 'Rural Diagnostics Coverage', priority: 'High Priority', color: 'sector-energy', desc: 'Limited AI-powered diagnostic tools in rural and underserved regions.' },
              { title: 'Predictive Triage Systems', priority: 'Critical', color: 'destructive', desc: 'Emergency departments lack real-time AI triage capabilities.' },
              { title: 'AI Regulatory Clarity', priority: 'Medium Priority', color: 'status-warning', desc: 'Inconsistent approval frameworks for medical AI systems across jurisdictions.' },
            ].map((gap) => (
              <div key={gap.title} className={`p-4 bg-secondary/50 rounded-lg border-l-4 border-${gap.color}`}>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-foreground">{gap.title}</h3>
                  <Badge className={`bg-${gap.color}/20 text-${gap.color} border-${gap.color}/30`}>{gap.priority}</Badge>
                </div>
                <p className="text-muted-foreground text-sm">{gap.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Opportunity Signal */}
        <Card className="p-8 bg-gradient-to-br from-sector-governance/20 via-primary/20 to-sector-healthcare/20 backdrop-blur-md border-sector-governance/30">
          <div className="flex items-center gap-4 mb-6">
            <Target className="w-8 h-8 text-sector-governance" />
            <div>
              <h2 className="text-2xl font-bold text-foreground">Opportunity Signal</h2>
              <p className="text-muted-foreground text-sm">Investment and deployment recommendation</p>
            </div>
          </div>
          <div className="p-6 bg-background/30 rounded-lg mb-6">
            <p className="text-xl text-foreground font-medium mb-2">
              High system strain + moderate capital inflow = <span className="text-sector-governance font-bold">strong early-stage opportunity</span>
            </p>
            <p className="text-muted-foreground">
              Healthcare presents a compelling entry point for AI infrastructure providers with clear use cases and measurable ROI potential.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Market Readiness</div>
              <Badge className="bg-status-success/20 text-status-success border-status-success/30 text-sm px-3 py-1">Strong Demand</Badge>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Competitive Landscape</div>
              <Badge className="bg-primary/20 text-primary border-primary/30 text-sm px-3 py-1">Moderately Competitive</Badge>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Avg. Time to ROI</div>
              <div className="text-foreground font-semibold">18-24 months</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Est. TAM</div>
              <div className="text-foreground font-semibold">$84B by 2028</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default HealthcarePage;
