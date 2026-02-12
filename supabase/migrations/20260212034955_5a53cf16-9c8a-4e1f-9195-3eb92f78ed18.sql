
-- 1. Add RLS policy on opportunity_scores view
-- Views need to be secured via the underlying table or by creating policies on the view
-- Enable RLS on the opportunity_scores view
ALTER VIEW public.opportunity_scores SET (security_invoker = on);

-- 2. Add admin-only write policies to all tables using has_role pattern

-- First create the app_role enum and user_roles table for proper role management
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles without recursive RLS
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Policy: only admins can read user_roles
CREATE POLICY "Admins can read user_roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR auth.uid() = user_id);

-- Policy: only admins can manage user_roles
CREATE POLICY "Admins can manage user_roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- === REGIONS: admin write policies ===
CREATE POLICY "Admin insert regions"
ON public.regions FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin update regions"
ON public.regions FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin delete regions"
ON public.regions FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- === SECTORS: admin write policies ===
CREATE POLICY "Admin insert sectors"
ON public.sectors FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin update sectors"
ON public.sectors FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin delete sectors"
ON public.sectors FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- === SECTOR_METRICS: admin write policies ===
CREATE POLICY "Admin insert sector_metrics"
ON public.sector_metrics FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin update sector_metrics"
ON public.sector_metrics FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin delete sector_metrics"
ON public.sector_metrics FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- === INVESTMENT_FLOWS: admin write policies ===
CREATE POLICY "Admin insert investment_flows"
ON public.investment_flows FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin update investment_flows"
ON public.investment_flows FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin delete investment_flows"
ON public.investment_flows FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- === GLOBAL_SUMMARY: admin write policies ===
CREATE POLICY "Admin insert global_summary"
ON public.global_summary FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin update global_summary"
ON public.global_summary FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin delete global_summary"
ON public.global_summary FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));
