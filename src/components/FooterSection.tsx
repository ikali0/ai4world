import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, FileDown, Globe2 } from 'lucide-react';

interface FooterSectionProps {
  onMethodology: () => void;
}

const FooterSection: React.FC<FooterSectionProps> = ({ onMethodology }) => {
  return (
    <footer className="relative z-10 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="p-12 bg-gradient-to-br from-primary/8 via-card to-secondary/30 backdrop-blur-md border-primary/20">
          <Target className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-3">Institutional Partnerships</h2>
          <p className="text-muted-foreground text-base mb-6 max-w-2xl mx-auto font-light">
            We're building the definitive intelligence platform for AI readiness and system stability.
            Join as a data partner, researcher, or institutional collaborator.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg">Request Partnership</Button>
            <Button size="lg" variant="outline">
              <FileDown className="w-4 h-4 mr-2" />
              Download Annual Report
            </Button>
          </div>
        </Card>

        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Globe2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">AI Sector Intelligence Atlas</span>
          </div>
          <div className="flex items-center justify-center gap-6 mb-4">
            <button onClick={onMethodology} className="text-xs transition-colors uppercase tracking-widest text-destructive">Methodology</button>
            <span className="text-border/50">•</span>
            <button className="text-xs transition-colors uppercase tracking-widest text-destructive-foreground">Data Sources</button>
            <span className="text-border/50">•</span>
            <button className="text-xs transition-colors uppercase tracking-widest text-sector-education">API Access</button>
            <span className="text-border/50">•</span>
            <button className="text-xs transition-colors uppercase tracking-widest text-status-warning">Contact</button>
          </div>
          <p className="text-xs text-destructive-foreground text-center">
            Data updated every 24 hours • Last sync: {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
          </p>
          <p className="text-xs mt-2 text-primary">
            © 2026 AI Atlas • Global Intelligence Platform
          </p>
        </div>
      </div>
    </footer>);

};

export default FooterSection;