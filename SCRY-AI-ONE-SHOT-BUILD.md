r# SCRY AI — ONE-SHOT BUILD SPEC

> **Product:** Scry AI  
> **Track:** Bitget AI Base Camp Hackathon S2 — AI Trading Desk  
> **Positioning:** AI research for 24/7 tokenized US-stock markets. The AI investigates; the human makes and records the final decision.  
> **Primary line:** **See what moved while you slept.**  
> **Secondary line:** Evidence before execution.

---

## 0. Instruction to Codex

Build this product end to end in the current repository. Treat this document as the source of truth. Inspect the repository first, preserve useful existing work, then implement the complete MVP without repeatedly asking for routine decisions.

Before coding, ask once for any credentials that are not already present. Accept whichever credentials are available and continue using the fallback behavior defined below. Never print secrets, commit `.env` files, or expose server-only credentials to the browser.

Prioritize a polished, runnable product and a strong judge-facing demo. Do not spend the sprint building a large test suite. Run the production build, TypeScript checks, linting, and a small number of meaningful smoke checks for the critical research and redirect flows. Fix all blocking errors.

Do not stop after scaffolding. Implement the application, database schema, data adapters, AI workflow, responsive interface, demo fixtures, documentation, and final verification in one continuous pass.

---

## 1. Product thesis

Tokenized US stocks can continue trading outside the traditional equity session. Prices move while traders sleep, but the information needed to understand those moves is fragmented across market data, company news, macro events, filings, related assets, and on-chain markets.

Scry AI is an AI research desk that investigates those movements and turns them into inspectable decision briefs. It gathers current evidence, separates facts from inference, develops competing bull and bear explanations, identifies invalidation conditions, and lets the user record their own decision. If the user wants to act, Scry AI redirects them to the relevant Bitget market.

Scry AI never connects a wallet, holds funds, submits an order, or claims to make the decision for the user.

The product must visibly embody this loop:

1. A meaningful stock movement is detected or selected.
2. Scry AI gathers market, news, company, macro, and tokenized-market evidence.
3. Independent research roles construct the bull case, bear case, catalysts, risks, and confidence assessment.
4. Every material claim is attached to a source and timestamp.
5. The human chooses **Bullish**, **Bearish**, **No Trade**, or **Watch**.
6. Scry AI records the decision and the evidence available at that moment.
7. The user may continue to Bitget through an external **Trade on Bitget ↗** link.

This human decision boundary must be obvious in the UI and README.

---

## 2. Brand

### Name

**Scry AI**

The name combines the idea of a lens with the overnight market. It should feel like a serious instrument rather than a generic AI assistant.

### Voice

Calm, precise, concise, and evidence-led. Avoid hype such as “guaranteed,” “winning trade,” “sure signal,” or “AI knows.” Prefer language such as “evidence supports,” “evidence conflicts,” “data unavailable,” and “this would invalidate the thesis.”

### Logo treatment

Use a typographic wordmark for the MVP. Set **SCRY AI** in uppercase or small caps with a restrained optical mark: a narrow circular lens intersected by one candlestick. Build it as an inline SVG. Keep it flat and legible at 20px. Do not generate a mascot.

### Visual direction

Build a modern research terminal with the discipline of an editorial newsroom.

- Background: graphite black (`#0B0D0F`) with slightly elevated panels (`#111417`).
- Primary text: warm white (`#F2F0E9`).
- Secondary text: cool gray (`#8E979F`).
- Accent: Bitget-adjacent turquoise (`#20E8B1` or a visually close accessible value).
- Positive: restrained green. Negative: restrained coral red. Warning: amber.
- Use a clean grotesk sans-serif for prose and a monospaced font for prices, percentages, timestamps, ticker symbols, and evidence IDs.
- Thin 1px borders. Sharp or lightly rounded corners, never oversized bubbly cards.
- No decorative gradients, glassmorphism, giant glow effects, floating blobs, stock-photo traders, excessive pills, or generic AI sparkle icons.
- Dense information is welcome, but typography and spacing must make the hierarchy immediately readable.
- Motion should communicate state: panel transitions, live-data pulse, research-stage progression, chart-to-news linking. Respect reduced-motion settings.

Suggested fonts: Geist Sans and Geist Mono, or suitable locally packaged equivalents.

---

## 3. Product structure

Build these routes:

| Route | Purpose |
|---|---|
| `/` | Live research desk and default landing experience |
| `/stocks/[ticker]` | Deep-linkable stock workspace |
| `/briefs/[id]` | Shareable saved research brief |
| `/decisions` | Anonymous session decision journal |
| `/methodology` | Data sources, confidence model, limitations, and human-control explanation |
| `/api/health` | Provider availability without exposing secrets |

The public demo must open directly into the working desk without login. Do not place a marketing landing page in front of the product.

---

## 4. Main desktop layout

Use a persistent application shell.

### Top bar

- Scry AI wordmark
- Global ticker/company search
- Navigation: Desk, Decisions, Methodology
- Market-session indicator: US session status plus tokenized-market availability
- Freshness timestamp
- Compact settings/menu button

### Opening briefing strip

At the top of the desk, show:

**Good evening. Here’s what moved while Wall Street was closed.**

Change the greeting based on local time. If the current data does not support an “overnight” comparison, use **Here’s what is moving now** and never fabricate the claim.

Below it, show a horizontally scrollable strip of selected market movers with ticker, price, change, tokenized symbol/provider, session state, and a tiny sparkline. Clicking a mover selects it.

### Three-column desk

#### Left rail — Discover

Width approximately 260–300px.

- User watchlist stored locally
- Tabs or compact sections for:
  - Tokenized movers
  - Unusual volume
  - Earnings approaching
  - Weekend/overnight divergence
- Each row includes symbol, company, live price, percentage movement, freshness and a small provider mark.
- Search should support ticker and company name.
- Include a clear data-state label: Live, Delayed, Snapshot, or Unavailable.

#### Centre — Evidence workspace

This is the dominant area.

- Selected stock header: company, ticker, tokenized ticker, current price, change, traditional close, difference from close, market status and last update.
- Interactive candlestick/line chart using Lightweight Charts or an equivalent production-quality chart library.
- Time ranges: 1H, 1D, 1W, 1M, 3M, 1Y where supported.
- Toggle between underlying stock reference price and tokenized-market price when both exist.
- Annotate the chart with evidence events. Clicking an event opens the matching source entry.
- Below the chart, use tabs:
  - Timeline
  - Fundamentals
  - Related assets
  - Token details
- Timeline merges relevant news, filings, macro events, and material price moves chronologically.
- Fundamentals should show only verifiable available fields. Hide absent fields rather than inserting invented values.
- Related assets should show market context such as sector peers, Nasdaq, DXY, yields, BTC, or semiconductors when relevant.
- Token details should show provider, chain, token symbol, contract where available, market status, and a direct Bitget destination.

#### Right rail — AI research

Width approximately 380–440px and collapsible.

Default prompts:

- Why is this moving?
- What changed since the US market closed?
- Build the bull and bear cases.
- Which evidence contradicts the move?
- Compare with its closest peers.
- Prepare a decision brief.

The panel must support normal follow-up questions, but the flagship action is **Investigate move**.

While researching, display meaningful stages:

1. Gathering current market evidence
2. Reading relevant events and filings
3. Testing competing explanations
4. Checking contradictions and missing data
5. Preparing the decision brief

Stream progress and partial results when the model/provider supports it.

---

## 5. Signature feature: the Movement Investigation

The product needs a distinct capability beyond generic stock chat. Implement a structured movement investigation.

Input:

- Selected ticker
- Investigation window
- User question or hypothesis
- Optional comparison tickers

Output:

### What happened

A factual description of the move, including time window, magnitude, volume/volatility context, traditional-session status, tokenized-market status and data freshness.

### Most likely drivers

Ranked explanations. Each driver contains:

- Claim
- Supporting evidence IDs
- Contradicting evidence IDs
- Confidence: Low / Medium / High
- Whether it is fact, reported interpretation, or Scry AI inference

### Bull case

The strongest evidence supporting continued upside. Do not repeat the driver list mechanically.

### Bear case

The strongest evidence supporting reversal or downside.

### What the market may be missing

One to three non-obvious relationships or unresolved questions. State inference clearly.

### Invalidation map

Concrete conditions that would weaken each thesis, such as a price level, failed peer confirmation, official denial, macro release, liquidity deterioration, or return of the underlying market.

### Evidence quality

Assess freshness, source diversity, missing information and disagreement. Confidence must fall when inputs are stale, sparse, or contradictory.

### Human decision

Buttons:

- Bullish
- Bearish
- No Trade
- Watch

Optional fields:

- Reason
- Intended horizon
- Entry idea
- Invalidation level
- Target

These values are a decision journal, not an order ticket.

### External execution

After the decision is recorded, show a secondary button:

**Trade on Bitget ↗**

The button must open a new tab and display an external-link icon. Use a verified Bitget URL for the exact asset when one is available. Otherwise, open the official Bitget stock or Onchain stock marketplace and copy/show the ticker the user should search. Never invent unsupported deep-link parameters.

Show a short boundary line near the button:

> Scry AI prepares the research. You review and execute on Bitget.

Do not connect wallets. Do not request exchange API keys from end users. Do not embed a swap or order form.

---

## 6. Evidence system

Evidence is the product’s trust layer.

Every evidence item must include:

- Stable evidence ID such as `E-001`
- Title
- Source/provider
- Direct URL when available
- Published timestamp
- Retrieved timestamp
- Evidence category: market, news, filing, macro, company, peer, on-chain
- Short excerpt or normalized data statement
- Freshness status

AI claims must reference evidence IDs. The UI renders them as clickable citations. Clicking an ID focuses the corresponding timeline item or opens a source drawer. Never allow the model to invent source URLs. URLs must originate from retrieved provider results.

Separate these visibly:

- **Fact:** directly supported by retrieved data
- **Reported:** an attributed source’s interpretation
- **Inference:** Scry AI synthesis from multiple facts
- **Unknown:** data is insufficient

Discard malformed citations during server-side validation and mark unsupported output accordingly.

---

## 7. AI research architecture

Use a server-side orchestration pipeline with structured outputs. It can be implemented as parallel model calls or a carefully staged single-model workflow depending on rate limits, but the UI and stored run record must preserve the roles.

### Research roles

1. **Market analyst** — price action, volume, volatility, technical context and divergence from the last traditional close.
2. **Event analyst** — company news, filings, earnings and macro events within the relevant time window.
3. **Bull researcher** — strongest evidence-backed continuation/upside case.
4. **Bear researcher** — strongest evidence-backed reversal/downside case and contradictions.
5. **Editor** — reconciles the work into one brief, reduces confidence for missing or conflicting evidence, and never creates new facts.

Do not market these as five cartoon agents. Present one coherent Scry AI research process.

### Model behavior

- Prefer the hackathon-provided Qwen endpoint when credentials are supplied.
- Keep a provider adapter so another OpenAI-compatible model or Gemini can be used through environment configuration.
- Require JSON-schema-compatible structured output.
- Set conservative temperature for factual synthesis.
- Pass normalized evidence objects to the model, not raw unbounded pages.
- The final editor may cite only evidence IDs present in the current run.
- Store model name, run time and prompt version with each brief.
- If the AI provider fails, preserve the evidence workspace and return a clear retry state.

### Suggested output shape

```ts
type ResearchBrief = {
  ticker: string;
  generatedAt: string;
  question: string;
  window: string;
  move: {
    summary: string;
    changePct: number | null;
    referenceClose: number | null;
    currentPrice: number | null;
    sessionStatus: string;
  };
  drivers: Array<{
    claim: string;
    support: string[];
    contradictions: string[];
    confidence: "low" | "medium" | "high";
    statementType: "fact" | "reported" | "inference";
  }>;
  bullCase: ThesisBlock;
  bearCase: ThesisBlock;
  marketMayBeMissing: ThesisBlock[];
  invalidations: Array<{
    condition: string;
    affects: "bull" | "bear" | "both";
    evidenceIds: string[];
  }>;
  evidenceQuality: {
    score: number;
    label: "weak" | "mixed" | "strong";
    explanation: string;
    missing: string[];
  };
  evidence: EvidenceItem[];
};
```

Validate all model output on the server with Zod or an equivalent schema validator.

---

## 8. Data providers and fallback policy

Create provider interfaces so data sources can be exchanged without changing UI components.

### Bitget data

When Bitget Wallet API credentials are available, use the official RWA Market Data endpoints server-side for:

- Stock catalogue and token contract mappings
- Tokenized stock details
- Current RWA price/status
- Transaction history where useful
- RWA K-line data where available

The documented base URL and credentials must live only on the server. Cache catalogue responses and short-cache prices. Never expose the Bitget API secret.

Scry AI does not call Bitget’s transaction-building endpoints because execution is an external redirect.

### Underlying equity data

Implement one primary provider adapter using the supplied key. Suitable providers include Finnhub, Polygon, Twelve Data, Alpha Vantage, or another lawful provider available to the builder. Required capabilities:

- Quote
- Historical candles
- Previous official close
- Company profile
- Market session status

Respect attribution and rate limits. Cache server-side.

### News and filings

- Use a supplied news provider for current company and macro news.
- Use SEC EDGAR public data for US filings where applicable, with a proper user-agent string.
- Keep source URLs and publication timestamps.
- Deduplicate syndicated stories by normalized title/event similarity.
- Prefer original company, regulator and exchange sources over rewritten coverage when both exist.

### Macro and related-market context

Use FRED or another supplied data provider for rates and macro series where useful. Only fetch context relevant to the selected ticker and question.

### Honest demo mode

If one or more provider credentials are absent, the application must remain runnable using committed, timestamped sample fixtures for a small set of showcase tickers such as NVDA, TSLA, AAPL and COIN.

Demo fixtures must be visibly labeled **Snapshot demo data** with their capture date. They must never masquerade as live data. Include the raw fixture files in the public repository so judges can reproduce the flow.

Do not generate random prices in production or demo mode.

---

## 9. Bitget redirect strategy

Create a `BitgetLinkResolver` module.

Resolution order:

1. Exact verified Bitget URL stored with the returned Bitget asset mapping.
2. Maintained local mapping for the showcase tickers, with source/comment explaining where each URL was verified.
3. Official Bitget Onchain stock/RWA marketplace URL plus a visible ticker-to-search handoff.

Before shipping, manually verify every showcase redirect in a browser. Remove any route that produces a 404, wrong asset, or forced unrelated destination.

Track the following event without personal data:

```text
bitget_redirect_clicked
- ticker
- tokenized_symbol
- source_page
- brief_id if present
- timestamp
```

Never imply that the click confirms a completed trade.

---

## 10. Decision journal and database

The public demo requires no account. Generate a random anonymous browser ID and store it locally. If Supabase is configured, persist research runs and decisions through server routes; otherwise use local storage for the current browser.

Suggested tables:

### `research_runs`

- `id` UUID primary key
- `anonymous_session_id` text
- `ticker` text
- `question` text
- `window` text
- `status` text
- `model` text nullable
- `prompt_version` text
- `data_mode` text: live/delayed/snapshot
- `brief_json` jsonb
- `created_at` timestamptz
- `completed_at` timestamptz nullable

### `decisions`

- `id` UUID primary key
- `research_run_id` UUID nullable
- `anonymous_session_id` text
- `ticker` text
- `stance` text: bullish/bearish/no_trade/watch
- `reason` text nullable
- `horizon` text nullable
- `entry_idea` numeric nullable
- `invalidation_level` numeric nullable
- `target` numeric nullable
- `price_at_decision` numeric nullable
- `created_at` timestamptz

### `usage_events`

- `id` bigint generated primary key
- `anonymous_session_id` text
- `event_name` text
- `ticker` text nullable
- `metadata` jsonb
- `created_at` timestamptz

Do not collect names, emails, wallet addresses, exchange credentials, or financial balances.

Add the SQL migration to the repository. Validate and rate-limit write endpoints. Public brief URLs must use opaque UUIDs and contain only research content intended for sharing.

---

## 11. Responsive behavior

### Desktop

Use the full three-column desk.

### Tablet

Keep the discovery rail narrow. The AI panel may open as a resizable overlay.

### Mobile

Use four primary tabs:

- Discover
- Chart
- Evidence
- Research

Keep selected ticker and current price in a sticky header. Decision recording and Bitget redirect must remain usable without horizontal overflow. Do not attempt to squeeze the desktop terminal into a tiny viewport.

---

## 12. Required states

Design every important state explicitly:

- Initial load
- Live data
- Delayed data
- Snapshot demo data
- Empty watchlist
- Search with no result
- Provider unavailable
- Partial evidence available
- AI researching
- AI rate-limited
- Research complete
- Research failed with retry
- Decision saved
- External Bitget link unavailable for exact asset

Use skeletons for predictable loading. Use precise inline error messages rather than generic toasts alone.

---

## 13. Recommended technical stack

- Next.js with App Router
- TypeScript in strict mode
- Tailwind CSS
- Accessible component primitives such as Radix/shadcn, visually restyled to match Scry AI
- TanStack Query for client data fetching and caching
- Lightweight Charts for financial charts
- Zod for runtime validation
- Supabase Postgres for optional persistence and usage logs
- Vercel-compatible server routes
- OpenAI-compatible AI client abstraction with Qwen as preferred configuration
- Vitest only for a few important pure functions if necessary

Keep secrets and signed upstream calls in server-only modules. Do not import server modules into client components.

Suggested directory structure:

```text
app/
  page.tsx
  stocks/[ticker]/page.tsx
  briefs/[id]/page.tsx
  decisions/page.tsx
  methodology/page.tsx
  api/
components/
  desk/
  chart/
  research/
  evidence/
  decisions/
lib/
  ai/
  bitget/
  market-data/
  news/
  filings/
  evidence/
  research/
  storage/
  analytics/
fixtures/
supabase/migrations/
public/
```

---

## 14. API routes

Implement clean internal APIs with validated request and response shapes:

| Endpoint | Function |
|---|---|
| `GET /api/markets/movers` | Curated live or snapshot mover list |
| `GET /api/stocks/search?q=` | Unified stock/token search |
| `GET /api/stocks/[ticker]/overview` | Quote, session, token mapping and company summary |
| `GET /api/stocks/[ticker]/candles` | Normalized underlying/tokenized candles |
| `GET /api/stocks/[ticker]/timeline` | News, filings, macro and movement events |
| `POST /api/research` | Start/complete a structured investigation |
| `GET /api/research/[id]` | Load a saved research brief |
| `POST /api/decisions` | Save a human decision |
| `GET /api/decisions` | Load current anonymous session journal |
| `POST /api/events` | Record minimal usage events |
| `GET /api/health` | Provider readiness and data-mode summary |

Apply caching appropriate to each source. Prevent model and provider abuse using basic IP/session rate limiting. Sanitize free-text input and enforce reasonable length limits.

---

## 15. Methodology and confidence

The `/methodology` page is part of the product, not legal filler. Explain:

- Which sources Scry AI reads
- How retrieval timestamps and market sessions work
- How tokenized price and underlying reference price differ
- How bull and bear cases are produced
- How citations are validated
- Why confidence decreases with stale, sparse, correlated, or contradictory evidence
- What Scry AI means by Fact, Reported, Inference and Unknown
- That users make the final decision and execute externally on Bitget

Use a straightforward confidence calculation as a guardrail around the model’s qualitative label. For example, combine freshness, primary-source share, source diversity, evidence quantity and contradiction penalty. Document the calculation. Do not claim statistical certainty.

---

## 16. Accessibility and product quality

- Meet WCAG AA contrast for primary text and interactive controls.
- Full keyboard navigation for search, stock selection, chart controls, evidence citations and research prompts.
- Visible focus rings.
- Accessible labels on icon buttons.
- Do not rely on red/green alone to convey direction.
- Format times with the user’s timezone while preserving source timezone in details.
- Format numbers consistently and show when data is rounded.
- Keep all external links visibly external.

---

## 17. Demo scenario

Ship a deterministic showcase scenario that works even when live APIs are unavailable.

Suggested narrative:

1. Open Scry AI and see **While you were sleeping** movers.
2. Select NVDA or another supported tokenized stock showing a meaningful snapshot move.
3. The chart displays the traditional close, tokenized-market movement and linked evidence events.
4. Click **Investigate move**.
5. Scry AI assembles facts, tests multiple explanations and reveals one contradiction that a simple bullish summary would miss.
6. Open a citation to prove the claim came from real evidence.
7. Record **Watch** or another human decision with an invalidation condition.
8. Open the saved decision journal.
9. Click **Trade on Bitget ↗** and land on the verified Bitget destination.

The sample facts must come from committed source snapshots and include their collection timestamps. Do not write a fictional news event purely for drama.

---

## 18. README and submission assets

Write a complete public README containing:

1. One-sentence pitch
2. The problem
3. Product thesis
4. Why tokenized stocks create a new research problem
5. What Scry AI does
6. Human-in-the-loop boundary
7. Architecture diagram
8. Data sources and provider modes
9. Setup instructions
10. Environment variables
11. Running locally
12. Demo walkthrough
13. Reproducible sample inputs and outputs
14. Known limitations
15. Bitget integration and redirect behavior
16. Hackathon track alignment

Also create:

- `docs/ARCHITECTURE.md`
- `docs/METHODOLOGY.md`
- `docs/DEMO-SCRIPT.md` for a maximum three-minute video
- `docs/SUBMISSION.md` with a concise project description and required links/placeholders
- `samples/` containing at least one reproducible research input and output

The architecture diagram should show data retrieval, evidence normalization, research roles, editor, decision journal and Bitget handoff.

---

## 19. Environment variables

Create `.env.example` with comments and no real credentials.

```bash
# Preferred hackathon AI provider
AI_PROVIDER=qwen
AI_BASE_URL=
AI_API_KEY=
AI_MODEL=

# Bitget Wallet developer API, server-side only
BITGET_WALLET_API_KEY=
BITGET_WALLET_API_SECRET=
BITGET_RWA_MARKETPLACE_URL=

# Primary US-equity market-data provider
MARKET_DATA_PROVIDER=
MARKET_DATA_API_KEY=

# News provider
NEWS_PROVIDER=
NEWS_API_KEY=

# Optional macro provider
FRED_API_KEY=

# SEC requires a descriptive user agent
SEC_USER_AGENT="Scry AI contact@example.com"

# Optional persistence
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Public deployment metadata
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DATA_MODE=auto
```

If the actual Bitget/Qwen hackathon credentials use different variable names or base URLs, support them cleanly and document the final names.

---

## 20. What the project owner must provide

Ask for these once at the beginning. The build must still proceed in honest snapshot mode if optional credentials are unavailable.

### Required for the strongest submission

1. **Bitget Wallet Developer API key and secret**  
   Apply through the official Bitget Wallet developer portal. These allow live RWA catalogue, price, contract and chart data. They are server-side credentials.

2. **Qwen hackathon API key, base URL and model ID**  
   Use the Bitget-issued Qwen credits if provided for S2.

3. **One US-stock market-data API key**  
   Prefer Finnhub, Polygon, Twelve Data, Alpha Vantage, or the provider named by the hackathon. Free-tier support is acceptable for the MVP.

4. **One news API key**  
   Use Finnhub company news if already covered by the market-data plan, or another provider with usable attribution.

5. **Supabase project credentials**  
   Project URL, anon key and service-role key for anonymous decision records and verifiable usage logs.

6. **GitHub repository access and Vercel project access**  
   Needed to publish the public repository and deployed demo.

### Helpful but optional

- FRED API key for richer macro context
- Bitget UID for submission metadata
- Confirmed Bitget registration email/track name
- Final deployment domain
- Social handles and repository URL for submission documents
- A verified Bitget URL for each showcase stock if exact deep links are not returned by an API

### Never provide

- Personal wallet private key or seed phrase
- Bitget account password
- Personal trading API keys with withdrawal permissions
- Real funds for development

---

## 21. Definition of done

The build is complete when:

- The public app opens directly into a polished, responsive research desk.
- Users can discover and select tokenized US stocks.
- Charts, market status, news/evidence timeline and token information render from live or clearly labeled snapshot data.
- **Investigate move** produces a structured, cited bull/bear research brief.
- Unsupported citations cannot silently pass validation.
- Users can record a human decision and view it in the journal.
- **Trade on Bitget ↗** redirects externally without asking for a wallet connection.
- The exact redirect works for the showcase asset or falls back honestly to the official Bitget marketplace.
- The app has no login requirement for judges.
- Sample inputs and outputs are reproducible.
- Usage events provide a verifiable run record without collecting personal information.
- README and submission documents accurately describe what is live, delayed, snapshot-based, or incomplete.
- Production build, TypeScript and lint checks pass.
- No secret appears in source control or client bundles.

At the end, report:

1. What was built
2. The deployed/local URL
3. Which providers are live and which are in snapshot mode
4. Required manual setup still outstanding
5. Build/type/lint results
6. Exact three-minute demo path

---

## 22. Final product framing

Use this sentence consistently:

> **Scry AI is an AI research desk for tokenized US stocks that investigates what moved, tests competing explanations, and gives the human trader an evidence-backed brief before they decide and execute on Bitget.**

The judge should understand the product within ten seconds:

> **See what moved while you slept. Understand why. Decide for yourself.**
