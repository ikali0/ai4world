import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  Activity, Zap, GraduationCap, Sprout, Users, Building2,
  ArrowRight, Target, Globe2,
} from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';
import MethodologyPage from '@/components/MethodologyPage';
import SectorDetailPage from '@/components/SectorDetailPage';
import { SECTOR_DETAILS } from '@/lib/sectorDetails';
import { type SectorData, getGapColor, getStabilityColor } from '@/lib/sectors';

type ViewType = 'home' | 'methodology' | string;

const Index: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);

  const sectors: SectorData[] = [
    { id: 'healthcare', name: 'Healthcare', icon: <Activity className="w-6 h-6" />, color: 'from-[hsl(var(--sector-healthcare))] to-primary', glowColor: 'shadow-[hsl(var(--sector-healthcare))]/50', stabilityScore: 62, aiMaturityLevel: 'Moderate', investmentGap: 'Medium', urgency: 'High', capital: 'Medium', opportunity: 'Strong', enabled: true },
    { id: 'education', name: 'Education', icon: <GraduationCap className="w-6 h-6" />, color: 'from-sector-education to-[hsl(330,81%,56%)]', glowColor: 'shadow-sector-education/50', stabilityScore: 58, aiMaturityLevel: 'Early', investmentGap: 'High', urgency: 'Medium', capital: 'Low', opportunity: 'Emerging', enabled: true },
    { id: 'energy', name: 'Energy & Climate', icon: <Zap className="w-6 h-6" />, color: 'from-sector-energy to-destructive', glowColor: 'shadow-sector-energy/50', stabilityScore: 48, aiMaturityLevel: 'Early', investmentGap: 'Critical', urgency: 'Very High', capital: 'High', opportunity: 'Competitive', enabled: true },
    { id: 'agriculture', name: 'Agriculture', icon: <Sprout className="w-6 h-6" />, color: 'from-sector-agriculture to-[hsl(160,71%,45%)]', glowColor: 'shadow-sector-agriculture/50', stabilityScore: 54, aiMaturityLevel: 'Early', investmentGap: 'High', urgency: 'High', capital: 'Low', opportunity: 'Emerging', enabled: true },
    { id: 'labor', name: 'Labor & Economy', icon: <Users className="w-6 h-6" />, color: 'from-sector-labor to-[hsl(35,93%,47%)]', glowColor: 'shadow-sector-labor/50', stabilityScore: 51, aiMaturityLevel: 'Nascent', investmentGap: 'Medium', urgency: 'Medium', capital: 'Medium', opportunity: 'Emerging', enabled: true },
    { id: 'governance', name: 'Governance', icon: <Building2 className="w-6 h-6" />, color: 'from-sector-governance to-sector-education', glowColor: 'shadow-sector-governance/50', stabilityScore: 44, aiMaturityLevel: 'Nascent', investmentGap: 'Critical', urgency: 'High', capital: 'Low', opportunity: 'Strong', enabled: true },
  ];

  if (currentView === 'methodology') return <MethodologyPage onBack={() => setCurrentView('home')} />;
  if (currentView !== 'home' && SECTOR_DETAILS[currentView]) {
    return <SectorDetailPage sector={SECTOR_DETAILS[currentView]} onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      {/* Navigation */}
      <nav className="relative z-20 pt-6 pb-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe2 className="w-8 h-8 text-primary" />
            <div>
              <div className="text-foreground font-bold text-lg">AI Systems Atlas</div>
              <div className="text-muted-foreground text-xs">Global Intelligence Platform</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentView('methodology')} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              Methodology
            </button>
            <button className="text-muted-foreground hover:text-foreground text-sm transition-colors">
              About
            </button>
            <Button size="sm">
              Partner With Us
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative z-10 pt-20 pb-12 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-xs font-medium mb-6">
            GLOBAL AI READINESS INDEX
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-sector-education to-[hsl(330,81%,56%)] bg-clip-text text-transparent tracking-tight leading-tight"
        >
          Mapping Global AI Readiness<br />Across Critical Systems
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          Measuring adoption, gaps, and system stability across healthcare, education, energy, and governance.
        </motion.p>

        {/* Live Counters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
        >
          {[
            { value: 24, label: 'Countries Tracked' },
            { value: 6, label: 'Sectors Analyzed' },
            { value: 312, label: 'AI Deployments' },
            { value: 87, label: 'Opportunity Gaps' },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }} whileHover={{ scale: 1.05, y: -5 }}>
              <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  <AnimatedCounter value={item.value} />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Globe Visual */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 1.1 }} className="relative max-w-3xl mx-auto h-64 mb-12">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/20 via-sector-education/20 to-[hsl(330,81%,56%)]/20 backdrop-blur-sm border border-primary/30">
            <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }} transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }} className="absolute inset-0 flex items-center justify-center">
              <Globe2 className="w-32 h-32 text-primary/30" />
            </motion.div>
            <div className="absolute inset-0 rounded-lg overflow-hidden opacity-30">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-transparent via-primary to-transparent" />
              <div className="absolute top-0 bottom-0 left-1/4 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
              <div className="absolute top-0 bottom-0 left-3/4 w-px bg-gradient-to-b from-transparent via-primary/50 to-transparent" />
            </div>
          </div>
        </motion.div>
      </header>

      {/* Sector Grid */}
      <section className="relative z-10 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Sector Overview</h2>
            <p className="text-muted-foreground text-lg">AI readiness and opportunity analysis across critical systems</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector, index) => (
              <motion.div key={sector.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }} whileHover={{ scale: 1.02 }}>
                <Card
                  className={`relative p-6 cursor-pointer bg-card/60 backdrop-blur-md border-border/50 transition-all duration-300 hover:shadow-2xl hover:border-muted ${!sector.enabled ? 'opacity-60' : ''}`}
                  onMouseEnter={() => setHoveredSector(sector.id)}
                  onMouseLeave={() => setHoveredSector(null)}
                  onClick={() => sector.enabled && setCurrentView(sector.id)}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${sector.color} text-foreground`}>
                        {sector.icon}
                      </div>
                      {!sector.enabled && (
                        <Badge variant="secondary" className="text-[10px]">Coming Soon</Badge>
                      )}
                    </div>

                    <h3 className="text-lg font-bold mb-4 text-foreground">{sector.name}</h3>

                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-muted-foreground uppercase tracking-wider">Stability Score</span>
                          <span className={`text-2xl font-bold ${getStabilityColor(sector.stabilityScore)}`}>
                            {sector.stabilityScore}/100
                          </span>
                        </div>
                        <Progress value={sector.stabilityScore} className="h-2 bg-secondary" />
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border/50">
                        <span className="text-xs text-muted-foreground">AI Maturity</span>
                        <span className="text-sm font-semibold text-foreground">{sector.aiMaturityLevel}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Investment Gap</span>
                        <Badge variant="secondary" className={`${getGapColor(sector.investmentGap)} text-xs`}>
                          {sector.investmentGap}
                        </Badge>
                      </div>
                    </div>

                    {sector.enabled && (
                      <Button className="w-full mt-4" variant="secondary">
                        View Analysis
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Heatmap Table */}
      <section className="relative z-10 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Where AI Is Needed Most</h2>
            <p className="text-muted-foreground text-lg">Opportunity analysis by urgency and capital availability</p>
          </div>

          <Card className="p-8 bg-card/60 backdrop-blur-md border-border/50">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Sector</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Urgency</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Capital</th>
                    <th className="text-center py-4 px-4 text-sm font-semibold text-muted-foreground uppercase tracking-wider">Opportunity</th>
                  </tr>
                </thead>
                <tbody>
                  {sectors.map((sector, idx) => (
                    <tr key={sector.id} className={`border-b border-border/50 ${idx % 2 === 0 ? 'bg-card/30' : ''}`}>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded bg-gradient-to-br ${sector.color} [&>svg]:w-4 [&>svg]:h-4`}>
                            {sector.icon}
                          </div>
                          <span className="text-foreground font-medium">{sector.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline" className={`
                          ${sector.urgency === 'Very High' ? 'bg-destructive/20 text-destructive border-destructive/30' : ''}
                          ${sector.urgency === 'High' ? 'bg-sector-energy/20 text-sector-energy border-sector-energy/30' : ''}
                          ${sector.urgency === 'Medium' ? 'bg-status-warning/20 text-status-warning border-status-warning/30' : ''}
                          ${sector.urgency === 'Low' ? 'bg-status-success/20 text-status-success border-status-success/30' : ''}
                        `}>{sector.urgency}</Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline" className={`
                          ${sector.capital === 'High' ? 'bg-status-success/20 text-status-success border-status-success/30' : ''}
                          ${sector.capital === 'Medium' ? 'bg-primary/20 text-primary border-primary/30' : ''}
                          ${sector.capital === 'Low' ? 'bg-muted text-muted-foreground border-border' : ''}
                        `}>{sector.capital}</Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge variant="outline" className={`
                          ${sector.opportunity === 'Strong' ? 'bg-sector-education/20 text-sector-education border-sector-education/30' : ''}
                          ${sector.opportunity === 'Competitive' ? 'bg-sector-governance/20 text-sector-governance border-sector-governance/30' : ''}
                          ${sector.opportunity === 'Emerging' ? 'bg-sector-healthcare/20 text-sector-healthcare border-sector-healthcare/30' : ''}
                          ${sector.opportunity === 'Saturated' ? 'bg-muted text-muted-foreground border-border' : ''}
                        `}>{sector.opportunity}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="relative z-10 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-12 bg-gradient-to-br from-primary/20 via-sector-education/20 to-[hsl(330,81%,56%)]/20 backdrop-blur-md border-primary/30">
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-4">Partner With Us</h2>
            <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
              We're building the definitive intelligence platform for AI readiness and system stability. Join us as a data partner, researcher, or institutional collaborator.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg">Request Partnership</Button>
              <Button size="lg" variant="outline">Download Report</Button>
            </div>
          </Card>

          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-center gap-6 mb-4">
              <button onClick={() => setCurrentView('methodology')} className="text-muted-foreground hover:text-foreground text-sm transition-colors">Methodology</button>
              <span className="text-border">•</span>
              <button className="text-muted-foreground hover:text-foreground text-sm transition-colors">About</button>
              <span className="text-border">•</span>
              <button className="text-muted-foreground hover:text-foreground text-sm transition-colors">Contact</button>
            </div>
            <p className="text-muted-foreground/60 text-xs">
              Data updated every 24 hours • Last sync: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
            </p>
            <p className="text-muted-foreground/40 text-xs mt-2">
              © 2025 AI Systems Atlas • Global Intelligence Platform
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
