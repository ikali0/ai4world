import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface QuadrantItem {
  id: string;
  name: string;
  need: number;
  capital: number;
  color: string;
}

const QUADRANT_DATA: QuadrantItem[] = [
  { id: 'healthcare', name: 'Healthcare', need: 78, capital: 65, color: 'hsl(192, 55%, 48%)' },
  { id: 'education', name: 'Education', need: 88, capital: 35, color: 'hsl(260, 45%, 55%)' },
  { id: 'energy', name: 'Energy', need: 85, capital: 72, color: 'hsl(25, 65%, 50%)' },
  { id: 'agriculture', name: 'Agriculture', need: 91, capital: 28, color: 'hsl(155, 45%, 42%)' },
  { id: 'labor', name: 'Labor', need: 72, capital: 48, color: 'hsl(40, 55%, 48%)' },
  { id: 'governance', name: 'Governance', need: 94, capital: 22, color: 'hsl(225, 50%, 55%)' },
];

interface QuadrantMatrixProps {
  onSectorClick: (id: string) => void;
}

const QuadrantMatrix: React.FC<QuadrantMatrixProps> = ({ onSectorClick }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="relative z-10 px-4 py-12 md:py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">Opportunity Quadrant</h2>
          </div>
          <p className="text-muted-foreground text-sm md:text-base font-light max-w-lg mx-auto">
            High Need / Low Capital = strongest opportunity for founders and investors
          </p>
        </div>

        <Card className="p-4 md:p-6 bg-card/80 backdrop-blur-md border-border/50">
          {/* Quadrant chart */}
          <div className="relative w-full max-w-2xl mx-auto" style={{ paddingBottom: '100%' }}>
            <div className="absolute inset-0">
              {/* Background quadrant zones */}
              <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-tl-lg border-r border-b border-border/10" />
              <div className="absolute top-0 right-0 w-1/2 h-1/2 border-b border-border/10" />
              <div className="absolute bottom-0 left-0 w-1/2 h-1/2 border-r border-border/10" />
              <div className="absolute bottom-0 right-0 w-1/2 h-1/2" />

              {/* Axes */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border/40" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-border/40" />

              {/* Quadrant labels — hidden on very small screens */}
              <span className="hidden sm:block absolute top-2 left-2 text-[8px] md:text-[9px] text-primary/60 uppercase tracking-widest leading-tight">
                High Need<br />Low Capital
              </span>
              <span className="hidden sm:block absolute top-2 right-2 text-[8px] md:text-[9px] text-muted-foreground/40 uppercase tracking-widest text-right leading-tight">
                High Need<br />High Capital
              </span>
              <span className="hidden sm:block absolute bottom-2 left-2 text-[8px] md:text-[9px] text-muted-foreground/30 uppercase tracking-widest leading-tight">
                Low Need<br />Low Capital
              </span>
              <span className="hidden sm:block absolute bottom-2 right-2 text-[8px] md:text-[9px] text-muted-foreground/30 uppercase tracking-widest text-right leading-tight">
                Low Need<br />High Capital
              </span>

              {/* Axis labels */}
              <div className="absolute -bottom-5 md:-bottom-6 left-1/2 -translate-x-1/2 text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                Capital Inflow →
              </div>
              <div className="absolute -left-5 md:-left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] md:text-[10px] text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                Unmet Need →
              </div>

              {/* Data points */}
              {QUADRANT_DATA.map((item) => {
                const x = (item.capital / 100) * 100;
                const y = (1 - item.need / 100) * 100;
                const isHovered = hovered === item.id;
                return (
                  <motion.div
                    key={item.id}
                    className="absolute cursor-pointer"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                    onMouseEnter={() => setHovered(item.id)}
                    onMouseLeave={() => setHovered(null)}
                    onTouchStart={() => setHovered(item.id)}
                    onClick={() => onSectorClick(item.id)}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div
                      className="rounded-full border-2 transition-all duration-200"
                      style={{
                        width: isHovered ? 36 : 24,
                        height: isHovered ? 36 : 24,
                        backgroundColor: item.color,
                        borderColor: isHovered ? 'hsl(var(--foreground))' : `${item.color}80`,
                        opacity: isHovered ? 1 : 0.85,
                        boxShadow: isHovered ? `0 0 18px ${item.color}50, 0 0 6px ${item.color}30` : `0 0 8px ${item.color}20`,
                      }}
                    />
                    {/* Label — always visible on mobile, hover on desktop */}
                    <div
                      className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur border border-border/60 rounded-md px-2 py-1 whitespace-nowrap z-20 transition-opacity duration-150 ${
                        isHovered ? 'opacity-100' : 'opacity-0 sm:opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="text-[10px] font-semibold text-foreground">{item.name}</div>
                      <div className="text-[9px] text-muted-foreground">Need {item.need}% · Cap {item.capital}%</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-8 md:mt-10">
            {QUADRANT_DATA.map((item) => (
              <button
                key={item.id}
                className="flex items-center gap-1.5 text-[10px] md:text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => onSectorClick(item.id)}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full ring-1 ring-border/30"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default QuadrantMatrix;
