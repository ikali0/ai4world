export type ViewMode = 'public' | 'insights' | 'opportunity' | 'policy';

export interface ViewModeConfig {
  id: ViewMode;
  label: string;
  description: string;
  weights: {
    deployment: number;
    unmetNeed: number;
    maturity: number;
    capital: number;
    talent: number;
    regulatory: number;
    policy: number;
    confidence: number;
  };
  emphasis: {
    metrics: string[];
    tone: 'measured' | 'explanatory' | 'actionable' | 'analytical';
  };
  sections: {
    regions: boolean;
    quadrant: boolean;
    heatmap: boolean;
    risks: boolean;
  };
  heroMetrics: Array<{ value: number; label: string; suffix?: string }>;
  heroSubtitle: string;
}

export const VIEW_MODES: Record<ViewMode, ViewModeConfig> = {
  public: {
    id: 'public',
    label: 'Public View',
    description: 'Global credibility — institutional positioning',
    weights: { deployment: 0.25, unmetNeed: 0.15, maturity: 0.20, capital: 0.10, talent: 0.05, regulatory: 0.10, policy: 0.10, confidence: 0.05 },
    emphasis: { metrics: ['Global Readiness Score', 'Sector Stability', 'Risk Index'], tone: 'measured' },
    sections: { regions: true, quadrant: false, heatmap: false, risks: true },
    heroMetrics: [
      { value: 54, label: 'Global Readiness Score', suffix: '/100' },
      { value: 156, label: 'Countries Tracked' },
      { value: 72, label: 'Sector Stability', suffix: '%' },
      { value: 48932, label: 'AI Systems Indexed' },
    ],
    heroSubtitle: 'Mapping artificial intelligence readiness, deployment impact, and system stability across critical global infrastructure. A public intelligence portal for transparency and collaborative decision-making.',
  },
  insights: {
    id: 'insights',
    label: 'Insights View',
    description: 'Data journalism — explainer interface',
    weights: { deployment: 0.20, unmetNeed: 0.20, maturity: 0.15, capital: 0.10, talent: 0.10, regulatory: 0.10, policy: 0.10, confidence: 0.05 },
    emphasis: { metrics: ['Adoption Rate', 'Gap Analysis', 'Regional Stories'], tone: 'explanatory' },
    sections: { regions: true, quadrant: true, heatmap: false, risks: false },
    heroMetrics: [
      { value: 54, label: 'AI Adoption Rate', suffix: '%' },
      { value: 48, label: 'Infrastructure Gap', suffix: '%' },
      { value: 63, label: 'Workforce Readiness', suffix: '%' },
      { value: 41, label: 'Digital Equity Index', suffix: '/100' },
    ],
    heroSubtitle: 'Understanding how AI adoption unfolds across sectors — where progress is real, where gaps persist, and what the data reveals about workforce and infrastructure readiness.',
  },
  opportunity: {
    id: 'opportunity',
    label: 'Opportunity View',
    description: 'Venture intelligence — founder & VC scouting',
    weights: { deployment: 0.10, unmetNeed: 0.35, maturity: 0.25, capital: 0.15, talent: 0.10, regulatory: 0.05, policy: 0.00, confidence: 0.00 },
    emphasis: { metrics: ['Opportunity Score', 'Market Gaps', 'Talent Density'], tone: 'actionable' },
    sections: { regions: false, quadrant: true, heatmap: true, risks: false },
    heroMetrics: [
      { value: 87, label: 'High-Grade Opportunities' },
      { value: 72, label: 'Unmet Need Index', suffix: '%' },
      { value: 48, label: 'Addressable Capital', suffix: 'B' },
      { value: 23, label: 'Market Gaps Identified' },
    ],
    heroSubtitle: 'Identifying under-served AI markets, capital gaps, and high-potential sectors for founders, investors, and accelerators seeking defensible opportunity.',
  },
  policy: {
    id: 'policy',
    label: 'Policy View',
    description: 'Government advisory — strategic planning',
    weights: { deployment: 0.15, unmetNeed: 0.10, maturity: 0.10, capital: 0.05, talent: 0.15, regulatory: 0.20, policy: 0.20, confidence: 0.05 },
    emphasis: { metrics: ['Policy Readiness', 'Workforce Impact', 'Infrastructure Gap'], tone: 'analytical' },
    sections: { regions: true, quadrant: false, heatmap: false, risks: true },
    heroMetrics: [
      { value: 58, label: 'Policy Readiness', suffix: '%' },
      { value: 64, label: 'Workforce Impact Risk', suffix: '/100' },
      { value: 47, label: 'Regulatory Clarity', suffix: '%' },
      { value: 32, label: 'Infrastructure Investment', suffix: 'B' },
    ],
    heroSubtitle: 'Assessing AI policy maturity, workforce displacement risk, and regulatory clarity to support national planning and government advisory functions.',
  },
};
