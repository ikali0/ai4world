import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, FileText, CheckCircle2, TrendingUp } from 'lucide-react';

interface MethodologyPageProps {
  onBack: () => void;
}

const MethodologyPage: React.FC<MethodologyPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear_gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12">
        <Button onClick={onBack} variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
          ← Back to Overview
        </Button>

        <div className="mb-12">
          <Badge className="bg-sector-governance/10 text-sector-governance border-sector-governance/20 px-3 py-1 text-xs mb-4">
            TRANSPARENCY & METHODOLOGY
          </Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sector-governance to-sector-education bg-clip-text text-transparent">
            Data Methodology
          </h1>
          <p className="text-muted-foreground text-lg">
            Our framework for measuring AI readiness, system stability, and opportunity gaps across critical sectors.
          </p>
        </div>

        <div className="space-y-8">
          <Card className="p-8 bg-card/60 backdrop-blur-md border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-sector-governance" />
              <h2 className="text-2xl font-bold text-foreground">Data Sources</h2>
            </div>
            <div className="space-y-3 text-secondary-foreground">
              <p>• World Bank Development Indicators</p>
              <p>• OECD Digital Economy Outlook</p>
              <p>• UNESCO Institute for Statistics</p>
              <p>• WHO Global Health Observatory</p>
              <p>• IEA Energy Statistics</p>
              <p>• Public AI deployment databases (PapersWithCode, AI Index)</p>
              <p>• Government policy documents and regulatory frameworks</p>
            </div>
          </Card>

          <Card className="p-8 bg-card/60 backdrop-blur-md border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-sector-education" />
              <h2 className="text-2xl font-bold text-foreground">Scoring Framework</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Stability Score (0-100)</h3>
                <p className="text-muted-foreground text-sm mb-2">Weighted composite index measuring:</p>
                <ul className="text-sm space-y-1 ml-4 text-secondary-foreground">
                  <li>• Infrastructure readiness (30%)</li>
                  <li>• AI deployment maturity (35%)</li>
                  <li>• Policy and regulatory framework (20%)</li>
                  <li>• Workforce capability (15%)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">AI Maturity Levels</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                  { level: 'Advanced (75-100)', color: 'text-status-success', desc: 'Widespread deployment, strong infrastructure' },
                  { level: 'Moderate (50-74)', color: 'text-primary', desc: 'Growing adoption, adequate infrastructure' },
                  { level: 'Early (25-49)', color: 'text-status-warning', desc: 'Pilot programs, developing infrastructure' },
                  { level: 'Nascent (0-24)', color: 'text-destructive', desc: 'Minimal deployment, limited infrastructure' }].
                  map((item) =>
                  <div key={item.level} className="p-3 bg-secondary/50 rounded">
                      <div className={`font-semibold ${item.color} text-sm`}>{item.level}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-card/60 backdrop-blur-md border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-status-success" />
              <h2 className="text-2xl font-bold text-foreground">Assumptions & Limitations</h2>
            </div>
            <div className="space-y-3 text-muted-foreground text-sm">
              <p>• Data reflects documented AI deployments; actual implementation may vary</p>
              <p>• Stability scores are relative within each sector, not across sectors</p>
              <p>• Investment figures aggregated from public disclosures</p>
              <p>• Policy readiness based on published frameworks</p>
              <p>• Current coverage: 24 countries representing ~70% of global GDP</p>
            </div>
          </Card>

          <Card className="p-8 bg-card/60 backdrop-blur-md border-border/50">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-sector-healthcare" />
              <h2 className="text-2xl font-bold text-foreground">Update Frequency</h2>
            </div>
            <p className="text-muted-foreground">
              Data is refreshed every 24 hours from primary sources. Major methodology updates are published quarterly with full transparency reports.
            </p>
          </Card>
        </div>
      </div>
    </div>);

};

export default MethodologyPage;