import React from 'react';
import { motion } from 'framer-motion';
import { Globe, BarChart3, TrendingUp, Building2 } from 'lucide-react';
import { ViewMode, VIEW_MODES } from '@/types/view-modes';

interface ViewModeSwitcherProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

const ICONS: Record<ViewMode, React.ElementType> = {
  public: Globe,
  insights: BarChart3,
  opportunity: TrendingUp,
  policy: Building2
};

const ViewModeSwitcher: React.FC<ViewModeSwitcherProps> = ({ currentMode, onModeChange }) => {
  return (
    <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="overflow-x-auto scrollbar-hide flex items-center justify-center gap-[4px]">
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest whitespace-nowrap mr-2 hidden sm:inline">
            Intelligence Layer
          </span>
          {(Object.keys(VIEW_MODES) as ViewMode[]).map((mode) => {
            const config = VIEW_MODES[mode];
            const Icon = ICONS[mode];
            const isActive = currentMode === mode;

            return (
              <motion.button
                key={mode}
                onClick={() => onModeChange(mode)}
                className={`relative px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                isActive ?
                'text-primary-foreground' :
                'text-muted-foreground hover:text-foreground'}`
                }
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}>

                {isActive &&
                <motion.div
                  layoutId="active-mode"
                  className="absolute inset-0 bg-primary rounded-md"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }} />

                }
                <span className="relative z-10 flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{config.label}</span>
                  <span className="sm:hidden">{config.label.split(' ')[0]}</span>
                </span>
              </motion.button>);

          })}
        </div>
      </div>
    </div>);

};

export default ViewModeSwitcher;