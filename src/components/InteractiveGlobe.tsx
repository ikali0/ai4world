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
  { id: 'healthcare', name: 'Healthcare', angle: 0, score: 62, color: 'hsl(192, 55%, 48%)' },
  { id: 'education', name: 'Education', angle: 60, score: 58, color: 'hsl(260, 45%, 55%)' },
  { id: 'energy', name: 'Energy', angle: 120, score: 48, color: 'hsl(25, 65%, 50%)' },
  { id: 'agriculture', name: 'Agriculture', angle: 180, score: 54, color: 'hsl(155, 45%, 42%)' },
  { id: 'labor', name: 'Labor', angle: 240, score: 51, color: 'hsl(40, 55%, 48%)' },
  { id: 'governance', name: 'Governance', angle: 300, score: 44, color: 'hsl(225, 50%, 55%)' },
];

const getScoreColor = (score: number) => {
  if (score >= 60) return '#4ade80';
  if (score >= 50) return '#d4a843';
  return '#e05555';
};

const InteractiveGlobe: React.FC<InteractiveGlobeProps> = ({ onSectorClick }) => {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const cx = 200;
  const cy = 200;
  const r = 140;

  return (
    <div className="relative w-full max-w-xl mx-auto aspect-square max-h-[450px]">
      {/* Subtle outer glow */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-primary/5 via-transparent to-primary/3 blur-2xl" />

      <svg viewBox="0 0 400 400" className="w-full h-full relative z-10">
        <defs>
          <radialGradient id="globe-gradient" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="hsl(192, 55%, 48%)" stopOpacity="0.08" />
            <stop offset="70%" stopColor="hsl(220, 20%, 15%)" stopOpacity="0.04" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </radialGradient>
          <filter id="glow-soft">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Globe body */}
        <circle cx={cx} cy={cy} r={r + 15} fill="none" stroke="hsl(215, 15%, 25%)" strokeOpacity="0.3" strokeWidth="0.5" />
        <circle cx={cx} cy={cy} r={r} fill="url(#globe-gradient)" stroke="hsl(192, 55%, 48%)" strokeOpacity="0.15" strokeWidth="1" />

        {/* Latitude lines */}
        {[-0.5, 0, 0.5].map((offset, i) => (
          <ellipse
            key={`lat-${i}`}
            cx={cx}
            cy={cy + offset * r * 0.8}
            rx={r * Math.cos(Math.asin(Math.abs(offset) * 0.8))}
            ry={r * 0.12 * (1 - Math.abs(offset) * 0.5)}
            fill="none"
            stroke="hsl(215, 15%, 30%)"
            strokeOpacity="0.15"
            strokeWidth="0.5"
            strokeDasharray="3 5"
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
            stroke="hsl(215, 15%, 30%)"
            strokeOpacity="0.1"
            strokeWidth="0.5"
            strokeDasharray="3 5"
            transform={`rotate(${rot} ${cx} ${cy})`}
          />
        ))}

        {/* Connection lines */}
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
              stroke="hsl(215, 15%, 30%)"
              strokeOpacity="0.12"
              strokeWidth="0.5"
              strokeDasharray="2 4"
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
          const labelR = r + 32;
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
              {/* Subtle pulse */}
              <circle cx={x} cy={y} r={isHovered ? 18 : 13} fill={sector.color} fillOpacity={isHovered ? 0.1 : 0.04}>
                <animate attributeName="r" values={isHovered ? "16;20;16" : "12;15;12"} dur="4s" repeatCount="indefinite" />
                <animate attributeName="fill-opacity" values={isHovered ? "0.12;0.04;0.12" : "0.06;0.02;0.06"} dur="4s" repeatCount="indefinite" />
              </circle>

              {/* Node */}
              <circle
                cx={x} cy={y} r={isHovered ? 8 : 6}
                fill={scoreColor}
                fillOpacity={isHovered ? 0.9 : 0.7}
                stroke={sector.color}
                strokeWidth={isHovered ? 2 : 1}
                filter="url(#glow-soft)"
                style={{ transition: 'all 0.3s ease' }}
              />

              {isHovered && (
                <text x={x} y={y + 1} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="6" fontWeight="600">
                  {sector.score}
                </text>
              )}

              {/* Label */}
              <text
                x={lx} y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isHovered ? 'hsl(210, 20%, 88%)' : 'hsl(215, 15%, 50%)'}
                fontSize={isHovered ? "10" : "9"}
                fontWeight={isHovered ? "600" : "400"}
                style={{ transition: 'all 0.2s ease' }}
              >
                {sector.name}
              </text>

              <text
                x={lx} y={ly + 12}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={scoreColor}
                fontSize="8"
                fontWeight="500"
                opacity="0.8"
              >
                {sector.score}/100
              </text>
            </g>
          );
        })}

        {/* Center indicator */}
        <circle cx={cx} cy={cy} r="3" fill="hsl(192, 55%, 48%)" fillOpacity="0.6" filter="url(#glow-soft)">
          <animate attributeName="fill-opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx} cy={cy} r="1.5" fill="hsl(192, 55%, 48%)" fillOpacity="0.9" />
      </svg>

      {/* Tooltip */}
      {hoveredSector && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-md border border-border/50 rounded-lg px-4 py-2 text-center z-20"
        >
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Click to explore</p>
          <p className="text-sm font-medium text-foreground">
            {GLOBE_SECTORS.find(s => s.id === hoveredSector)?.name} →
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default InteractiveGlobe;
