-- Supabase Database Schema for ContractCheck
-- Table: contract_requests
-- Stores incoming contract pre-screening requests from the public landing page form.

CREATE TABLE IF NOT EXISTS public.contract_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(80) NOT NULL,
  email VARCHAR(254) NOT NULL,
  service VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contract_requests ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated visitors to submit requests
DROP POLICY IF EXISTS "Allow anon insert" ON public.contract_requests;
CREATE POLICY "Allow anon insert" ON public.contract_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow reading back the created record or authenticated verification
DROP POLICY IF EXISTS "Allow anon select" ON public.contract_requests;
CREATE POLICY "Allow anon select" ON public.contract_requests
  FOR SELECT
  TO anon, authenticated
  USING (true);
