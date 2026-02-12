import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb } from 'lucide-react';

interface QuadrantItem {
  id: string;
  name: string;
  need: number; // 0-100
  capital: number; // 0-100
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
    <section className="relative z-10 px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Opportunity Quadrant</h2>
          </div>
          <p className="text-muted-foreground text-base font-light">High Need / Low Capital = strongest opportunity for founders and investors</p>
        </div>

        <Card className="p-6 bg-card/60 backdrop-blur-md border-border/50">
          {/* Quadrant chart */}
          <div className="relative w-full max-w-2xl mx-auto aspect-square">
            {/* Axes */}
            <div className="absolute inset-0 border-l border-b border-border/40" />
            {/* Midlines */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border/20" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border/20" />

            {/* Quadrant labels */}
            <div className="absolute top-2 left-2 text-[9px] text-muted-foreground/50 uppercase tracking-widest">High Need / Low Capital</div>
            <div className="absolute top-2 right-2 text-[9px] text-muted-foreground/50 uppercase tracking-widest text-right">High Need / High Capital</div>
            <div className="absolute bottom-2 left-2 text-[9px] text-muted-foreground/50 uppercase tracking-widest">Low Need / Low Capital</div>
            <div className="absolute bottom-2 right-2 text-[9px] text-muted-foreground/50 uppercase tracking-widest text-right">Low Need / High Capital</div>

            {/* Strongest opportunity highlight */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-primary/5 rounded-tl-lg" />

            {/* Axis labels */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-muted-foreground uppercase tracking-widest">Capital Inflow →</div>
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] text-muted-foreground uppercase tracking-widest">Unmet Need →</div>

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
                  onClick={() => onSectorClick(item.id)}
                  whileHover={{ scale: 1.3 }}
                >
                  <div
                    className="rounded-full border-2 transition-all duration-200"
                    style={{
                      width: isHovered ? 40 : 28,
                      height: isHovered ? 40 : 28,
                      backgroundColor: item.color,
                      borderColor: isHovered ? 'white' : item.color,
                      opacity: isHovered ? 1 : 0.8,
                      boxShadow: isHovered ? `0 0 20px ${item.color}40` : 'none',
                    }}
                  />
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg px-3 py-2 whitespace-nowrap z-20"
                    >
                      <div className="text-xs font-semibold text-foreground">{item.name}</div>
                      <div className="text-[10px] text-muted-foreground">Need: {item.need}% • Capital: {item.capital}%</div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            {QUADRANT_DATA.map((item) => (
              <button
                key={item.id}
                className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => onSectorClick(item.id)}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
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
