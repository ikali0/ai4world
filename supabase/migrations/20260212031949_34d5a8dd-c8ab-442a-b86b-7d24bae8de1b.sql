
-- Regions table
CREATE TABLE public.regions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  iso_code text UNIQUE NOT NULL,
  income_level text,
  population bigint,
  gdp_usd numeric,
  regulatory_index numeric,
  ai_policy_maturity numeric,
  created_at timestamptz DEFAULT now()
);

-- Sectors table
CREATE TABLE public.sectors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  baseline_system_risk numeric,
  global_priority_weight numeric,
  created_at timestamptz DEFAULT now()
);

-- Sector Metrics (core intelligence table)
CREATE TABLE public.sector_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region_id uuid REFERENCES public.regions(id) ON DELETE CASCADE,
  sector_id uuid REFERENCES public.sectors(id) ON DELETE CASCADE,
  year int NOT NULL,
  ai_deployments bigint,
  ai_adoption_rate numeric,
  ai_maturity_score numeric,
  unmet_need_index numeric,
  infrastructure_gap numeric,
  workforce_readiness numeric,
  capital_inflow_usd numeric,
  capital_growth_rate numeric,
  talent_density_index numeric,
  regulatory_friction_index numeric,
  policy_readiness_score numeric,
  confidence_score numeric,
  last_updated timestamptz DEFAULT now(),
  UNIQUE(region_id, sector_id, year)
);

-- Investment Flows
CREATE TABLE public.investment_flows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region_id uuid REFERENCES public.regions(id) ON DELETE CASCADE,
  sector_id uuid REFERENCES public.sectors(id) ON DELETE CASCADE,
  stage text,
  amount_usd numeric,
  deal_count int,
  year int,
  created_at timestamptz DEFAULT now()
);

-- Global Summary (public homepage aggregates)
CREATE TABLE public.global_summary (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_ai_deployments bigint,
  global_readiness_score numeric,
  total_capital_inflow numeric,
  global_unmet_need_index numeric,
  opportunity_gap_index numeric,
  last_sync timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sector_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_flows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.global_summary ENABLE ROW LEVEL SECURITY;

-- Public read policies (open index - anon + authenticated)
CREATE POLICY "Public read regions" ON public.regions FOR SELECT USING (true);
CREATE POLICY "Public read sectors" ON public.sectors FOR SELECT USING (true);
CREATE POLICY "Public read global summary" ON public.global_summary FOR SELECT USING (true);

-- Sector metrics: public can read all for now (no auth system yet)
CREATE POLICY "Public read sector metrics" ON public.sector_metrics FOR SELECT USING (true);

-- Investment flows: public read
CREATE POLICY "Public read investment flows" ON public.investment_flows FOR SELECT USING (true);

-- Opportunity scores view
CREATE VIEW public.opportunity_scores WITH (security_invoker = on) AS
SELECT
  sm.region_id,
  sm.sector_id,
  sm.year,
  (
    (0.35 * COALESCE(sm.unmet_need_index, 0) / 100)
    + (0.25 * (1 - COALESCE(sm.ai_maturity_score, 0) / 100))
    + (0.15 * (1 - LEAST(COALESCE(sm.capital_inflow_usd, 0) / 1000000000, 1)))
    + (0.15 * (1 - COALESCE(sm.regulatory_friction_index, 0) / 100))
    + (0.10 * (1 - COALESCE(sm.workforce_readiness, 0) / 100))
  )
  * COALESCE(sm.policy_readiness_score, 50) / 100
  * COALESCE(sm.confidence_score, 50) / 100
  AS adjusted_opportunity_score
FROM public.sector_metrics sm;
