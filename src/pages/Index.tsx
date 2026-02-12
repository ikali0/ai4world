import React, { useState } from 'react';
import { Globe2, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import MethodologyPage from '@/components/MethodologyPage';
import SectorDetailPage from '@/components/SectorDetailPage';
import HeroSection from '@/components/HeroSection';
import SectorGrid from '@/components/SectorGrid';
import RegionalFilter from '@/components/RegionalFilter';
import OpportunityHeatmap from '@/components/OpportunityHeatmap';
import QuadrantMatrix from '@/components/QuadrantMatrix';
import RiskGapIndex from '@/components/RiskGapIndex';
import FooterSection from '@/components/FooterSection';
import ViewModeSwitcher from '@/components/ViewModeSwitcher';
import { SECTOR_DETAILS } from '@/lib/sectorDetails';
import { ViewMode, VIEW_MODES } from '@/types/view-modes';

type ViewType = 'home' | 'methodology' | string;

const Index: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('public');

  const navigate = (view: ViewType) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const currentConfig = VIEW_MODES[viewMode];

  if (currentView === 'methodology') return <MethodologyPage onBack={() => setCurrentView('home')} />;
  if (currentView !== 'home' && SECTOR_DETAILS[currentView]) {
    return <SectorDetailPage sector={SECTOR_DETAILS[currentView]} onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Subtle grid background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-20 pt-4 pb-3 px-4 sm:pt-6 sm:pb-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={() => navigate('home')}>
            <Globe2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            <div>
              <div className="text-foreground font-semibold text-xs sm:text-sm tracking-wide">AI Atlas</div>
              
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={() => scrollToSection('sectors')} className="text-xs transition-colors uppercase tracking-widest text-accent-foreground hover:text-primary">
              Sectors
            </button>
            <button onClick={() => scrollToSection('regions')} className="text-xs transition-colors uppercase tracking-widest text-accent-foreground hover:text-primary">
              Regions
            </button>
            <button onClick={() => scrollToSection('opportunities')} className="text-xs transition-colors uppercase tracking-widest text-accent-foreground hover:text-primary">
              Opportunities
            </button>
            <button onClick={() => scrollToSection('risks')} className="text-xs transition-colors uppercase tracking-widest text-accent-foreground hover:text-primary">
              Risks
            </button>
            <button onClick={() => navigate('methodology')} className="text-xs transition-colors uppercase tracking-widest text-accent-foreground hover:text-primary">
              Methodology
            </button>
            <Button size="sm" variant="outline" className="text-xs">
              Partner With Us
            </Button>
          </div>

          {/* Mobile hamburger */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-card border-border">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-6 mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <Globe2 className="w-5 h-5 text-primary" />
                  <span className="font-semibold text-sm text-foreground">Atlas</span>
                </div>
                <button onClick={() => navigate('home')} className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/30">
                  Home
                </button>

                {/* Section scroll links */}
                <div className="space-y-1">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-2">Jump to Section</p>
                  <button onClick={() => scrollToSection('sectors')} className="block w-full text-left text-sm text-foreground hover:text-primary transition-colors py-1.5">
                    Sectors
                  </button>
                  <button onClick={() => scrollToSection('regions')} className="block w-full text-left text-sm text-foreground hover:text-primary transition-colors py-1.5">
                    Regions
                  </button>
                  <button onClick={() => scrollToSection('opportunities')} className="block w-full text-left text-sm text-foreground hover:text-primary transition-colors py-1.5">
                    Opportunities
                  </button>
                  <button onClick={() => scrollToSection('risks')} className="block w-full text-left text-sm text-foreground hover:text-primary transition-colors py-1.5">
                    Risks
                  </button>
                </div>

                <button onClick={() => navigate('methodology')} className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/30">
                  Methodology
                </button>
                <button className="text-left text-sm font-medium text-foreground hover:text-primary transition-colors py-2 border-b border-border/30">
                  About
                </button>
                <Button size="sm" className="mt-4 w-full">
                  Partner With Us
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* View Mode Switcher */}
      <ViewModeSwitcher currentMode={viewMode} onModeChange={setViewMode} />

      <HeroSection onSectorClick={(id) => setCurrentView(id)} viewMode={viewMode} />

      <div id="sectors" className="scroll-mt-24">
        <SectorGrid onSectorClick={(id) => setCurrentView(id)} />
      </div>

      {currentConfig.sections.regions &&
      <div id="regions" className="scroll-mt-24">
          <RegionalFilter />
        </div>
      }

      {currentConfig.sections.quadrant &&
      <div id="opportunities" className="scroll-mt-24">
          <QuadrantMatrix onSectorClick={(id) => setCurrentView(id)} />
        </div>
      }

      {currentConfig.sections.heatmap &&
      <div id={currentConfig.sections.quadrant ? undefined : 'opportunities'} className="scroll-mt-24">
          <OpportunityHeatmap onSectorClick={(id) => setCurrentView(id)} />
        </div>
      }

      {currentConfig.sections.risks &&
      <div id="risks" className="scroll-mt-24">
          <RiskGapIndex />
        </div>
      }

      <FooterSection onMethodology={() => setCurrentView('methodology')} />
    </div>);

};

export default Index;