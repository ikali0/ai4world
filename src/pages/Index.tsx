import React, { useState } from 'react';
import {
  Activity, Zap, GraduationCap, Sprout, Users, Building2,
  Globe2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import MethodologyPage from '@/components/MethodologyPage';
import SectorDetailPage from '@/components/SectorDetailPage';
import HeroSection from '@/components/HeroSection';
import SectorGrid from '@/components/SectorGrid';
import RegionalFilter from '@/components/RegionalFilter';
import OpportunityHeatmap from '@/components/OpportunityHeatmap';
import QuadrantMatrix from '@/components/QuadrantMatrix';
import RiskGapIndex from '@/components/RiskGapIndex';
import FooterSection from '@/components/FooterSection';
import { SECTOR_DETAILS } from '@/lib/sectorDetails';
import { type SectorData } from '@/lib/sectors';

type ViewType = 'home' | 'methodology' | string;

const Index: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const sectors: SectorData[] = [
    { id: 'healthcare', name: 'Healthcare', icon: <Activity className="w-6 h-6" />, color: 'from-sector-healthcare to-primary', glowColor: 'shadow-sector-healthcare/50', stabilityScore: 62, aiMaturityLevel: 'Moderate', investmentGap: 'Medium', urgency: 'High', capital: 'Medium', opportunity: 'Strong', enabled: true },
    { id: 'education', name: 'Education', icon: <GraduationCap className="w-6 h-6" />, color: 'from-sector-education to-[hsl(300,35%,45%)]', glowColor: 'shadow-sector-education/50', stabilityScore: 58, aiMaturityLevel: 'Early', investmentGap: 'High', urgency: 'Medium', capital: 'Low', opportunity: 'Emerging', enabled: true },
    { id: 'energy', name: 'Energy & Climate', icon: <Zap className="w-6 h-6" />, color: 'from-sector-energy to-destructive', glowColor: 'shadow-sector-energy/50', stabilityScore: 48, aiMaturityLevel: 'Early', investmentGap: 'Critical', urgency: 'Very High', capital: 'High', opportunity: 'Competitive', enabled: true },
    { id: 'agriculture', name: 'Agriculture', icon: <Sprout className="w-6 h-6" />, color: 'from-sector-agriculture to-[hsl(160,40%,38%)]', glowColor: 'shadow-sector-agriculture/50', stabilityScore: 54, aiMaturityLevel: 'Early', investmentGap: 'High', urgency: 'High', capital: 'Low', opportunity: 'Emerging', enabled: true },
    { id: 'labor', name: 'Labor & Economy', icon: <Users className="w-6 h-6" />, color: 'from-sector-labor to-[hsl(30,50%,42%)]', glowColor: 'shadow-sector-labor/50', stabilityScore: 51, aiMaturityLevel: 'Nascent', investmentGap: 'Medium', urgency: 'Medium', capital: 'Medium', opportunity: 'Emerging', enabled: true },
    { id: 'governance', name: 'Governance', icon: <Building2 className="w-6 h-6" />, color: 'from-sector-governance to-sector-education', glowColor: 'shadow-sector-governance/50', stabilityScore: 44, aiMaturityLevel: 'Nascent', investmentGap: 'Critical', urgency: 'High', capital: 'Low', opportunity: 'Strong', enabled: true },
  ];

  if (currentView === 'methodology') return <MethodologyPage onBack={() => setCurrentView('home')} />;
  if (currentView !== 'home' && SECTOR_DETAILS[currentView]) {
    return <SectorDetailPage sector={SECTOR_DETAILS[currentView]} onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-20 pt-6 pb-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('home')}>
            <Globe2 className="w-6 h-6 text-primary" />
            <div>
              <div className="text-foreground font-semibold text-sm tracking-wide">AI Sector Intelligence Atlas</div>
              <div className="text-muted-foreground text-[10px] uppercase tracking-widest">Global Systems Monitor</div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentView('methodology')} className="text-muted-foreground hover:text-foreground text-xs transition-colors uppercase tracking-widest">
              Methodology
            </button>
            <button className="text-muted-foreground hover:text-foreground text-xs transition-colors uppercase tracking-widest">
              About
            </button>
            <Button size="sm" variant="outline" className="text-xs">
              Partner With Us
            </Button>
          </div>
        </div>
      </nav>

      <HeroSection onSectorClick={(id) => setCurrentView(id)} />
      <SectorGrid sectors={sectors} onSectorClick={(id) => setCurrentView(id)} />
      <RegionalFilter />
      <QuadrantMatrix onSectorClick={(id) => setCurrentView(id)} />
      <OpportunityHeatmap onSectorClick={(id) => setCurrentView(id)} />
      <RiskGapIndex />
      <FooterSection onMethodology={() => setCurrentView('methodology')} />
    </div>
  );
};

export default Index;
