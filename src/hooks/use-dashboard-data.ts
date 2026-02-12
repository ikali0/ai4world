import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export function useSectors() {
  return useQuery({
    queryKey: ['sectors'],
    queryFn: async () => {
      const { data, error } = await supabase.from('sectors').select('*').order('name');
      if (error) throw error;
      return data;
    },
  });
}

export function useRegions() {
  return useQuery({
    queryKey: ['regions'],
    queryFn: async () => {
      const { data, error } = await supabase.from('regions').select('*').order('name');
      if (error) throw error;
      return data;
    },
  });
}

export function useSectorMetrics(year = 2024) {
  return useQuery({
    queryKey: ['sector-metrics', year],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sector_metrics')
        .select('*, sectors(name), regions(name)')
        .eq('year', year);
      if (error) throw error;
      return data;
    },
  });
}

export function useGlobalSummary() {
  return useQuery({
    queryKey: ['global-summary'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('global_summary')
        .select('*')
        .order('last_sync', { ascending: false })
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
}

export function useInvestmentFlows(year = 2024) {
  return useQuery({
    queryKey: ['investment-flows', year],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('investment_flows')
        .select('*, sectors(name), regions(name)')
        .eq('year', year);
      if (error) throw error;
      return data;
    },
  });
}

// Aggregate sector metrics across all regions for a given sector
export function aggregateSectorMetrics(
  metrics: Awaited<ReturnType<typeof useSectorMetrics>>['data'],
  sectorId: string
) {
  if (!metrics) return null;
  const filtered = metrics.filter((m) => m.sector_id === sectorId);
  if (filtered.length === 0) return null;

  const avg = (key: keyof typeof filtered[0]) => {
    const vals = filtered.map((m) => m[key] as number | null).filter((v): v is number => v != null);
    return vals.length > 0 ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
  };

  return {
    stabilityScore: avg('ai_maturity_score'),
    aiAdoptionRate: avg('ai_adoption_rate'),
    unmetNeedIndex: avg('unmet_need_index'),
    infrastructureGap: avg('infrastructure_gap'),
    workforceReadiness: avg('workforce_readiness'),
    policyReadiness: avg('policy_readiness_score'),
    capitalInflow: filtered.reduce((s, m) => s + (m.capital_inflow_usd ?? 0), 0),
    regulatoryFriction: avg('regulatory_friction_index'),
    talentDensity: avg('talent_density_index'),
    totalDeployments: filtered.reduce((s, m) => s + (m.ai_deployments ?? 0), 0),
  };
}
