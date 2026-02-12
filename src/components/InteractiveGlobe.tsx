import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GlobeSector {
  id: string;
  name: string;
  angle: number;
  score: number;
  color: string;
}

interface InteractiveGlobeProps {
  onSectorClick: (sectorId: string) => void;
}

const GLOBE_SECTORS: GlobeSector[] = [
  { id: 'healthcare', name: 'Healthcare', angle: 0, score: 62, color: 'hsl(199, 89%, 48%)' },
  { id: 'education', name: 'Education', angle: 60, score: 58, color: 'hsl(271, 81%, 56%)' },
  { id: 'energy', name: 'Energy', angle: 120, score: 48, color: 'hsl(25, 95%, 53%)' },
  { id: 'agriculture', name: 'Agriculture', angle: 180, score: 54, color: 'hsl(142, 71%, 45%)' },
  { id: 'labor', name: 'Labor', angle: 240, score: 51, color: 'hsl(45, 93%, 47%)' },
  { id: 'governance', name: 'Governance', angle: 300, score: 44, color: 'hsl(239, 84%, 67%)' },
];

const getScoreColor = (score: number) => {
  if (score >= 60) return '#22c55e';
  if (score >= 50) return '#eab308';
  return '#ef4444';
};

const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({ onSectorClick }) => {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const cx = 200;
  const cy = 200;
  const r = 140;

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square max-h-[500px]">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 via-transparent to-accent/10 blur-3xl animate-pulse-glow" />

      <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
        <defs>
          <radialGradient id="globe-gradient" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="hsl(199, 89%, 48%)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="hsl(271, 81%, 56%)" stopOpacity="0.08" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-strong">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Globe body */}
        <circle cx={cx} cy={cy} r={r + 20} fill="none" stroke="hsl(199, 89%, 48%)" strokeOpacity="0.08" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={r} fill="url(#globe-gradient)" stroke="hsl(199, 89%, 48%)" strokeOpacity="0.2" strokeWidth="1.5" />

        {/* Latitude lines */}
        {[-0.5, 0, 0.5].map((offset, i) => (
          <ellipse
            key={`lat-${i}`}
            cx={cx}
            cy={cy + offset * r * 0.8}
            rx={r * Math.cos(Math.asin(Math.abs(offset) * 0.8))}
            ry={r * 0.15 * (1 - Math.abs(offset) * 0.5)}
            fill="none"
            stroke="hsl(199, 89%, 48%)"
            strokeOpacity="0.12"
            strokeWidth="0.8"
            strokeDasharray="4 6"
          />
        ))}

        {/* Longitude lines */}
        {[0, 45, 90, 135].map((rot, i) => (
          <ellipse
            key={`lon-${i}`}
            cx={cx}
            cy={cy}
            rx={r * Math.cos((rot * Math.PI) / 180) || 1}
            ry={r}
            fill="none"
            stroke="hsl(199, 89%, 48%)"
            strokeOpacity="0.1"
            strokeWidth="0.8"
            strokeDasharray="4 6"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        ))}

        {/* Connection lines between sectors */}
        {GLOBE_SECTORS.map((sector, i) => {
          const next = GLOBE_SECTORS[(i + 1) % GLOBE_SECTORS.length];
          const x1 = cx + Math.cos((sector.angle - 90) * Math.PI / 180) * (r - 10);
          const y1 = cy + Math.sin((sector.angle - 90) * Math.PI / 180) * (r - 10);
          const x2 = cx + Math.cos((next.angle - 90) * Math.PI / 180) * (r - 10);
          const y2 = cy + Math.sin((next.angle - 90) * Math.PI / 180) * (r - 10);
          return (
            <line
              key={`conn-${i}`}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="hsl(199, 89%, 48%)"
              strokeOpacity="0.15"
              strokeWidth="0.8"
              strokeDasharray="3 5"
            />
          );
        })}

        {/* Sector nodes */}
        {GLOBE_SECTORS.map((sector) => {
          const nodeR = r - 10;
          const x = cx + Math.cos((sector.angle - 90) * Math.PI / 180) * nodeR;
          const y = cy + Math.sin((sector.angle - 90) * Math.PI / 180) * nodeR;
          const isHovered = hoveredSector === sector.id;
          const scoreColor = getScoreColor(sector.score);
          const labelR = r + 38;
          const lx = cx + Math.cos((sector.angle - 90) * Math.PI / 180) * labelR;
          const ly = cy + Math.sin((sector.angle - 90) * Math.PI / 180) * labelR;

          return (
            <g
              key={sector.id}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredSector(sector.id)}
              onMouseLeave={() => setHoveredSector(null)}
              onClick={() => onSectorClick(sector.id)}
            >
              {/* Pulse ring */}
              <circle cx={x} cy={y} r={isHovered ? 22 : 16} fill={sector.color} fillOpacity={isHovered ? 0.15 : 0.08} filter="url(#glow)">
                <animate attributeName="r" values={isHovered ? "18;24;18" : "14;18;14"} dur="3s" repeatCount="indefinite" />
                <animate attributeName="fill-opacity" values={isHovered ? "0.2;0.08;0.2" : "0.1;0.04;0.1"} dur="3s" repeatCount="indefinite" />
              </circle>

              {/* Main node */}
              <circle
                cx={x} cy={y} r={isHovered ? 10 : 7}
                fill={scoreColor}
                fillOpacity={isHovered ? 1 : 0.85}
                stroke={sector.color}
                strokeWidth={isHovered ? 2.5 : 1.5}
                filter={isHovered ? "url(#glow-strong)" : "url(#glow)"}
                style={{ transition: 'all 0.3s ease' }}
              />

              {/* Score text inside node */}
              {isHovered && (
                <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="7" fontWeight="bold">
                  {sector.score}
                </text>
              )}

              {/* Label */}
              <text
                x={lx} y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isHovered ? 'white' : 'hsl(199, 89%, 70%)'}
                fontSize={isHovered ? "11" : "10"}
                fontWeight={isHovered ? "600" : "400"}
                style={{ transition: 'all 0.2s ease' }}
              >
                {sector.name}
              </text>

              {/* Score label below name */}
              <text
                x={lx} y={ly + 13}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={scoreColor}
                fontSize="9"
                fontWeight="600"
              >
                {sector.score}/100
              </text>
            </g>
          );
        })}

        {/* Center pulse */}
        <circle cx={cx} cy={cy} r="4" fill="white" fillOpacity="0.9" filter="url(#glow)">
          <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="fill-opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx} cy={cy} r="2" fill="white" />
      </svg>

      {/* Hover tooltip */}
      {hoveredSector && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-md border border-border/50 rounded-lg px-4 py-2 text-center z-20"
        >
          <p className="text-xs text-muted-foreground">Click to explore</p>
          <p className="text-sm font-semibold text-foreground">
            {GLOBE_SECTORS.find(s => s.id === hoveredSector)?.name} Sector Analysis →
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveGlobe;
