-- ─── Add AI Features to Issues Table ──────────────────────────────────
-- Run this in Supabase Dashboard → SQL Editor or via script

ALTER TABLE public.issues
  ADD COLUMN IF NOT EXISTS ai_title TEXT,
  ADD COLUMN IF NOT EXISTS ai_summary TEXT,
  ADD COLUMN IF NOT EXISTS ai_description TEXT,
  ADD COLUMN IF NOT EXISTS ai_category TEXT,
  ADD COLUMN IF NOT EXISTS ai_priority TEXT,
  ADD COLUMN IF NOT EXISTS ai_keywords JSONB,
  ADD COLUMN IF NOT EXISTS ai_missing_information JSONB,
  ADD COLUMN IF NOT EXISTS ai_status TEXT DEFAULT 'Pending',
  ADD COLUMN IF NOT EXISTS ai_processed_at TIMESTAMPTZ;

-- You can optionally create an index on ai_status if queries will filter by it often.
CREATE INDEX IF NOT EXISTS idx_issues_ai_status ON public.issues(ai_status);
