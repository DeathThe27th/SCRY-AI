create table research_runs (
  id uuid primary key default gen_random_uuid(), anonymous_session_id text not null,
  ticker text not null, question text not null, window text not null, status text not null,
  model text, prompt_version text not null, data_mode text not null check (data_mode in ('live','delayed','snapshot')),
  brief_json jsonb not null, created_at timestamptz not null default now(), completed_at timestamptz
);
create table decisions (
  id uuid primary key default gen_random_uuid(), research_run_id uuid references research_runs(id),
  anonymous_session_id text not null, ticker text not null,
  stance text not null check (stance in ('bullish','bearish','no_trade','watch')),
  reason text, horizon text, entry_idea numeric, invalidation_level numeric, target numeric,
  price_at_decision numeric, created_at timestamptz not null default now()
);
create table usage_events (
  id bigint generated always as identity primary key, anonymous_session_id text not null,
  event_name text not null, ticker text, metadata jsonb not null default '{}', created_at timestamptz not null default now()
);
create index research_runs_session_idx on research_runs(anonymous_session_id, created_at desc);
create index decisions_session_idx on decisions(anonymous_session_id, created_at desc);
alter table research_runs enable row level security;
alter table decisions enable row level security;
alter table usage_events enable row level security;
-- Browser clients do not receive direct table access. Server routes use the service role after validation.
