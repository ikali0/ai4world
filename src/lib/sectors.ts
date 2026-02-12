import React from 'react';

export interface SectorData {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  glowColor: string;
  stabilityScore: number;
  aiMaturityLevel: string;
  investmentGap: 'Low' | 'Medium' | 'High' | 'Critical';
  urgency: 'Low' | 'Medium' | 'High' | 'Very High';
  capital: 'Low' | 'Medium' | 'High';
  opportunity: 'Emerging' | 'Strong' | 'Competitive' | 'Saturated';
  enabled: boolean;
}

export const getGapColor = (gap: string) => {
  switch (gap) {
    case 'Low': return 'text-status-success';
    case 'Medium': return 'text-status-warning';
    case 'High': return 'text-sector-energy';
    case 'Critical': return 'text-destructive';
    default: return 'text-muted-foreground';
  }
};

export const getStabilityColor = (score: number) => {
  if (score >= 70) return 'text-status-success';
  if (score >= 50) return 'text-status-warning';
  return 'text-destructive';
};
