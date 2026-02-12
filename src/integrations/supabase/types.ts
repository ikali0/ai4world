export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      global_summary: {
        Row: {
          global_readiness_score: number | null
          global_unmet_need_index: number | null
          id: string
          last_sync: string | null
          opportunity_gap_index: number | null
          total_ai_deployments: number | null
          total_capital_inflow: number | null
        }
        Insert: {
          global_readiness_score?: number | null
          global_unmet_need_index?: number | null
          id?: string
          last_sync?: string | null
          opportunity_gap_index?: number | null
          total_ai_deployments?: number | null
          total_capital_inflow?: number | null
        }
        Update: {
          global_readiness_score?: number | null
          global_unmet_need_index?: number | null
          id?: string
          last_sync?: string | null
          opportunity_gap_index?: number | null
          total_ai_deployments?: number | null
          total_capital_inflow?: number | null
        }
        Relationships: []
      }
      investment_flows: {
        Row: {
          amount_usd: number | null
          created_at: string | null
          deal_count: number | null
          id: string
          region_id: string | null
          sector_id: string | null
          stage: string | null
          year: number | null
        }
        Insert: {
          amount_usd?: number | null
          created_at?: string | null
          deal_count?: number | null
          id?: string
          region_id?: string | null
          sector_id?: string | null
          stage?: string | null
          year?: number | null
        }
        Update: {
          amount_usd?: number | null
          created_at?: string | null
          deal_count?: number | null
          id?: string
          region_id?: string | null
          sector_id?: string | null
          stage?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "investment_flows_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investment_flows_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      regions: {
        Row: {
          ai_policy_maturity: number | null
          created_at: string | null
          gdp_usd: number | null
          id: string
          income_level: string | null
          iso_code: string
          name: string
          population: number | null
          regulatory_index: number | null
        }
        Insert: {
          ai_policy_maturity?: number | null
          created_at?: string | null
          gdp_usd?: number | null
          id?: string
          income_level?: string | null
          iso_code: string
          name: string
          population?: number | null
          regulatory_index?: number | null
        }
        Update: {
          ai_policy_maturity?: number | null
          created_at?: string | null
          gdp_usd?: number | null
          id?: string
          income_level?: string | null
          iso_code?: string
          name?: string
          population?: number | null
          regulatory_index?: number | null
        }
        Relationships: []
      }
      sector_metrics: {
        Row: {
          ai_adoption_rate: number | null
          ai_deployments: number | null
          ai_maturity_score: number | null
          capital_growth_rate: number | null
          capital_inflow_usd: number | null
          confidence_score: number | null
          id: string
          infrastructure_gap: number | null
          last_updated: string | null
          policy_readiness_score: number | null
          region_id: string | null
          regulatory_friction_index: number | null
          sector_id: string | null
          talent_density_index: number | null
          unmet_need_index: number | null
          workforce_readiness: number | null
          year: number
        }
        Insert: {
          ai_adoption_rate?: number | null
          ai_deployments?: number | null
          ai_maturity_score?: number | null
          capital_growth_rate?: number | null
          capital_inflow_usd?: number | null
          confidence_score?: number | null
          id?: string
          infrastructure_gap?: number | null
          last_updated?: string | null
          policy_readiness_score?: number | null
          region_id?: string | null
          regulatory_friction_index?: number | null
          sector_id?: string | null
          talent_density_index?: number | null
          unmet_need_index?: number | null
          workforce_readiness?: number | null
          year: number
        }
        Update: {
          ai_adoption_rate?: number | null
          ai_deployments?: number | null
          ai_maturity_score?: number | null
          capital_growth_rate?: number | null
          capital_inflow_usd?: number | null
          confidence_score?: number | null
          id?: string
          infrastructure_gap?: number | null
          last_updated?: string | null
          policy_readiness_score?: number | null
          region_id?: string | null
          regulatory_friction_index?: number | null
          sector_id?: string | null
          talent_density_index?: number | null
          unmet_need_index?: number | null
          workforce_readiness?: number | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "sector_metrics_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sector_metrics_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
      sectors: {
        Row: {
          baseline_system_risk: number | null
          created_at: string | null
          description: string | null
          global_priority_weight: number | null
          id: string
          name: string
        }
        Insert: {
          baseline_system_risk?: number | null
          created_at?: string | null
          description?: string | null
          global_priority_weight?: number | null
          id?: string
          name: string
        }
        Update: {
          baseline_system_risk?: number | null
          created_at?: string | null
          description?: string | null
          global_priority_weight?: number | null
          id?: string
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      opportunity_scores: {
        Row: {
          adjusted_opportunity_score: number | null
          region_id: string | null
          sector_id: string | null
          year: number | null
        }
        Insert: {
          adjusted_opportunity_score?: never
          region_id?: string | null
          sector_id?: string | null
          year?: number | null
        }
        Update: {
          adjusted_opportunity_score?: never
          region_id?: string | null
          sector_id?: string | null
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sector_metrics_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sector_metrics_sector_id_fkey"
            columns: ["sector_id"]
            isOneToOne: false
            referencedRelation: "sectors"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
