# PRD — Portfolio Revamp: "Recruiter-Ready"

**Owner:** Rafid Al Khairy
**Status:** Draft
**Last updated:** 2026-06-21
**Repo:** `rafid-portofolio` (Next.js 14 App Router · TypeScript · Tailwind · Radix · framer-motion · Resend)

---

## 1. Background & Problem

The portfolio is technically solid (theming, serverless contact API, blog CMS) but several
credibility-killers and polish gaps make it read as "junior/template" to recruiters and
reviewing engineers. A 5-lens review (content, UI, UX, HR-screen, code-quality) surfaced 49
findings. The most damaging ones are factual contradictions and a broken primary CTA — these
silently disqualify the candidate before strengths are seen.

## 2. Goal

Make the portfolio convert "maybe" → "bring them in for an interview" by:

1. Removing every credibility-killer (broken links, contradictory data, unprofessional details).
2. Tightening positioning to **one** clear role: **Backend / DevOps Engineer**.
3. Turning real production work (PT. Indominco Mandiri) into evidence of impact.
4. Cleaning the public repo so a reviewing dev sees a finished product, not a sandbox.

## 3. Non-Goals

- Full visual redesign / rebrand.
- New feature development (e.g. a CMS, i18n, comments).
- Backend rewrite. (The connection-limiter feature is *removed*, not rebuilt — see W3.1.)

## 4. Success Metrics

| Metric | Now | Target |
|---|---|---|
| Broken/placeholder links (CV, "Cache", live demos) | ≥3 | 0 |
| Data contradictions across pages (dates, email, skills) | ≥3 | 0 |
| Projects with a live demo OR proof-of-running (video/Swagger/diagram) | 0/5 | 5/5 |
| Largest image asset | 19 MB | < 300 KB |
| Lighthouse Performance (mobile) | unmeasured | ≥ 90 |
| `npm run build` + `npm test` pass clean | test fails | both green |
| Console a11y warnings on load | ≥1 (Radix SheetTitle) | 0 |

---

## 5. Workstreams

Priority: **P0** = credibility-killer, ship today · **P1** = quick win (<1h) · **P2** = high interview impact · **P3** = polish.

### P0 — Credibility killers (ship first, ~2h total)

**W0.1 — Working "Download CV"**
- Problem: [hero.tsx:104](src/section/hero.tsx#L104) links to `/assets/resume.pdf`; file does **not** exist in `public/assets/` → 404 on the #1 recruiter action.
- Do: drop the real PDF at `public/assets/resume.pdf` (served as `/assets/resume.pdf`); set a friendly download name: `<a href="/assets/resume.pdf" download="Rafid-Al-Khairy-CV.pdf">`. Add a download/print button on [resume page](src/app/resume/page.tsx).
- Status: **blocked on Rafid providing the PDF.**
- Accept: clicking "Download CV" downloads a valid, current PDF on desktop + mobile.

**W0.2 — Fix Bangkit date contradiction**
- Problem: [experience.tsx:71](src/data/experience.tsx#L71) says `"2015 - 2016"` (impossible — Bangkit launched ~2020); [resume.tsx:93](src/data/resume.tsx#L93) says `"Aug 2023 - Jan 2024"`. Cross-checked against LinkedIn, a mismatch reads as fabrication.
- Do: set both to `"Aug 2023 - Jan 2024"`.
- Accept: every surface (experience section, education, resume) shows one consistent Bangkit period that matches LinkedIn.

**W0.3 — Professional email everywhere**
- Problem: `drome.emord@gmail.com` (scrambled handle) appears in [contact.tsx:18](src/data/contact.tsx#L18), [contact.tsx:31](src/data/contact.tsx#L31), [resume.tsx:58](src/data/resume.tsx#L58), and hardcoded as the recipient in [send-email/route.ts:44](src/app/api/send-email/route.ts#L44).
- Status: **blocked — Rafid has no professional email yet.** Create a Gmail first; preferred `rafid.alkhairy@gmail.com` (fallback `rafidalkhairy@gmail.com`). No numbers/handles.
- Do: replace with the new name-based address in the 3 data files; move the recipient in the API route to an env var (`CONTACT_TO_EMAIL`), document in `.env.example`.
- Accept: no `drome.emord` anywhere in repo; contact form still delivers to the new address.

**W0.4 — Rewrite hero value prop + lead with real positioning**
- Problem: [hero.tsx:90-92](src/section/hero.tsx#L90-L92) is buzzword copy ("Crafting innovative solutions… build something amazing together"). Rotating roles include "Enthusiast" titles ([hero.tsx:12-13](src/section/hero.tsx#L12-L13)).
- Do: replace tagline with a concrete one, e.g. *"Backend & DevOps engineer building production Node.js / PostgreSQL systems serving 1,000+ users — REST APIs, CI/CD, cloud infra."* Trim roles array to defensible titles (`Software Engineer`, `Backend Engineer`, `DevOps Engineer`); drop "Enthusiast".
- Accept: hero states what he builds + for whom in one sentence; no "Enthusiast"; titles match site metadata.

**W0.5 — Correct the employment timeline (IMM = internship; add current ERP role)**
- Problem: [experience.tsx:21](src/data/experience.tsx#L21) lists PT. Indominco Mandiri as `"Jun 2024 - Present"`, but IMM was an **internship that has ended**, and Rafid's **current job (ERP developer) is missing entirely**. An out-of-date "Present" + a missing current role is a timeline gap recruiters flag immediately.
- Status: **blocked on dates** — need (a) IMM internship start–end, (b) ERP company name + start date + whether it can be shown publicly (NDA check).
- Do: set IMM to its real internship period and label the position "Backend & DevOps Engineer (Internship)"; add the current ERP role as the top/most-recent experience item (mark "Present").
- Accept: experience section reads as a continuous, accurate timeline matching LinkedIn; current role is visible and most-recent.

### P1 — Quick wins (<1h each)

**W1.1 — Copy/grammar pass**
- [hero.tsx:97](src/section/hero.tsx#L97) `"Lets connect with me"` → `"Let's connect."`
- `src/section/project.tsx` (~line 74) `"My code not perfect, but its mine"` → `"My code isn't perfect, but it's mine."` *(verify exact line)*
- Accept: no visible typos/grammar errors in headline copy.

**W1.2 — Reconcile & trim the skills wall (single source of truth)**
- Problem: two divergent skill lists — [section/skills.tsx](src/section/skills.tsx) renders **emoji** as logos (🟨 JS, ☁️ for *both* AWS and GCP) and includes a fake `"Cache"` skill with a dead `url: "#"` ([skills.tsx:34](src/section/skills.tsx#L34)) plus Vue/Nuxt/Flutter/Dart that contradict the backend focus; [data/resume.tsx:124-201](src/data/resume.tsx#L124-L201) uses real `react-icons` SVGs with a *different* set.
- Do: pick **one** source, render real brand icons (`react-icons/si`, already imported in resume.tsx). Group: Backend · DevOps & Cloud · Frontend · Tools. Delete "Cache" and anything undefendable in an interview.
- Accept: one skills list site-wide, real icons, ≤ ~15 grouped skills, no dead links.

**W1.3 — SEO / share basics**
- Problem: [layout.tsx:20-37](src/app/layout.tsx#L20-L37) has no `metadataBase`, no OG image, no Twitter card; no `sitemap.ts` / `robots.ts`; no per-page titles.
- Do: add `metadataBase`, an `opengraph-image` (1200×630), `twitter` card, `app/sitemap.ts`, `app/robots.ts`, and per-route titles (`Projects | Rafid Al Khairy`, etc.). (Favicon: `app/favicon.ico` exists.)
- Accept: link unfurls with name + image in LinkedIn/Slack; sitemap/robots resolve.

**W1.4 — Repo cleanup (delete junk)**
- Do: remove `fix-cache-issues.bat`, `test-connection-limit.js`, `NOTES.md` (keep gitignored locally), and `CONNECTION_LIMITING.md`. Delete the unused [src/data/work.tsx](src/data/work.tsx) (near-duplicate of [project.tsx](src/data/project.tsx) with conflicting copy/image paths).
- Accept: repo root = config files only; one project data source.

**W1.5 — Reframe contact CTA toward employment**
- Problem: `Freelance: Available` ([resume.tsx:61-62](src/data/resume.tsx#L61-L62)) and "collaborate/project ideas" copy signal "not for full-time."
- Do: add "Open to Backend / DevOps roles — [Download Resume] · [Email]"; soften or drop freelance framing.
- Accept: a full-time recruiter reads the contact area as "open to hire."

**W1.6 — Accessible names on icon-only controls**
- Problem: no `aria-label` on MobileNav trigger / AssistTouch toggle / project overlay links; Radix `Sheet` missing `SheetTitle` → runtime console a11y warning ([MobileNav.tsx](src/components/MobileNav.tsx)).
- Do: add `aria-label`s and an sr-only `<SheetTitle>`.
- Accept: zero a11y console warnings on load; icon buttons have names.

### P2 — High interview impact

**W2.0 — Restructure the project list (5 projects, grouped by status)**
- New inventory (replaces the 3 hardcoded entries in [project.tsx](src/data/project.tsx)):
  | Project | Source | Status |
  |---|---|---|
  | PT. Indominco Mandiri backend | internship | shipped (prod, 1,000+ users) |
  | Mobile Chat App | campus | shipped |
  | Middle Man | personal | ongoing |
  | Asset Management | personal | ongoing |
  | ERP (current job) | employment | active — pending NDA/publish check |
- Do: add a `status: 'shipped' | 'ongoing'` field to the `Project` type; group/badge ongoing projects honestly as "In progress" rather than implying they're done. Confirm what can be shown for the ERP role before listing it.
- Accept: all listed projects have an accurate status; nothing unfinished is presented as finished.

**W2.1 — Top 2 projects as case studies** *(2–4h)*
- Problem: every project in [project.tsx](src/data/project.tsx) is a one-paragraph feature list; only IMM has a metric.
- Do: rewrite the 2 strongest (default: **IMM** + **current ERP role**, or IMM + Mobile Chat if ERP is NDA-blocked) as **Problem → Approach → Result** with ≥1 quantified outcome each (users, req/s, latency, % faster query, time saved). Lead with IMM (1,000+ users / 50,000+ records). Reserve a "Featured" badge for 1–2 best, not all.
- Accept: top 2 projects each show a problem, the approach, and a number.

**W2.2 — Live demo / proof-of-running for every project** *(2–5h)*
- Problem: the `live?` field exists in the `Project` type but **no project sets it** ([project.tsx](src/data/project.tsx)) → "View Live" never renders.
- Do: deploy deployable projects and set `live`; for backend-only repos link a public Swagger/Postman collection, a 60–90s demo video, or an architecture diagram.
- Accept: each project card links to something a reviewer can open and see working.

**W2.3 — Remove the broken connection-limiting feature** *(1–2h)*
- Problem: the anti-DDoS feature (`middleware.ts` + [connection-limiter.ts](src/lib/connection-limiter.ts)) relies on a module-level in-memory `Map` that resets per-instance on Vercel serverless; [ConnectionTracker.tsx](src/components/ConnectionTracker.tsx) reads a `meta[name="client-ip"]` tag that is never rendered, so release never matches. `npm test` **fails** — `jest`/`ts-jest` are not in `devDependencies` and `__tests__/connection-limiter.test.ts` is empty — yet docs advertise a "comprehensive test suite." A `debug-connections` API route ships to prod and mutates server state.
- Do (after confirming the above): delete `middleware.ts`, `src/lib/connection-limiter.ts`, `ConnectionTracker.tsx`, `ConnectionStatus.tsx`, the 3 connection API routes (incl. [debug-connections](src/app/api/debug-connections/route.ts)), [server-capacity page](src/app/server-capacity/page.tsx), `CONNECTION_LIMITING.md`, the empty test + jest config, and all testing claims. Remove the now-dangling imports/renders in [layout.tsx:10-11,51-52](src/app/layout.tsx#L10-L11).
- Accept: feature gone; `npm run build` passes; no dead imports; `npm test` removed or green.

**W2.4 — Real README** *(1h)*
- Problem: `README.md` is verbatim create-next-app boilerplate.
- Do: one-line description, screenshot/GIF, live link, tech stack, key features, local setup referencing `.env.example`.
- Accept: README sells the project; a stranger can run it locally from the README alone.

**W2.5 — Compress images + speed up intro** *(1–2h)*
- Problem: `public/assets/projects/project1.png` **19 MB**, `project3.png` 8.9 MB, `project-meraih.png` 8.4 MB, hero portrait `photo3.png` 4.5 MB loaded at `quality={100}` ([Photo.tsx](src/components/Photo.tsx)). Intro overlay ([StairTransition.tsx](src/components/StairTransition.tsx) / [PageTransition.tsx](src/components/PageTransition.tsx)) covers the screen ~1.2s; hero photo appears ~2.4s. No `prefers-reduced-motion` anywhere.
- Do: convert all to WebP/AVIF (< 300 KB); set portrait `quality={80}`; add `images.formats: ['image/avif','image/webp']` to `next.config.mjs`; cut overlay delay to ~0.2–0.3s and photo reveal to < 0.6s; honor `prefers-reduced-motion`.
- Accept: largest asset < 300 KB; Lighthouse mobile Performance ≥ 90; first meaningful paint < ~0.5s.

### P3 — Polish (after P0–P2)

- **W3.1** Project cards keyboard-accessible — [projects/page.tsx](src/app/projects/page.tsx) puts `onClick` on a `motion.div` with no `role`/`tabIndex`/`onKeyDown`; reuse Radix `Dialog` (focus trap + Escape).
- **W3.2** Contact form: replace placeholder-as-label with real `<label>`s, add inline per-field validation + `aria-live`/`role="status"`.
- **W3.3** Typography: pair JetBrains Mono (headings/code/stats) with a proportional sans (Inter/Geist) for body prose in [globals.css](src/app/globals.css).
- **W3.4** Replace stock quotes (Mandela, Jobs, "Code is poetry") with ≥1 concrete line about the IMM work per section.
- **W3.5** One source of truth for navigation — DesktopNav / MobileNav / AssistTouch each re-implement the section list and disagree; consider dropping AssistTouch.
- **W3.6** Fix light mode in [section/project.tsx](src/section/project.tsx) (hardcoded `text-white`/`bg-black`, ignores theme) — or make it an intentional dark band.
- **W3.7** Homepage `h1` — hero ships an `h2` ([hero.tsx:68](src/section/hero.tsx#L68)); name should be the `h1`; one `h1` per route.
- **W3.8** Remove dead `service` field from `ContactFormData` ([send-email/route.ts:17,46](src/app/api/send-email/route.ts#L17)) — form no longer sends it (commit c3a73dc).
- **W3.9** Testimonials (IMM manager, Bangkit mentor) + a link to the real Bangkit certificate.
- **W3.10** Polish [not-found.tsx](src/app/not-found.tsx) (min-h-screen, accent token instead of raw `text-blue-500`, nav links) + add `app/error.tsx`.
- **W3.11** Publish ≥1 real blog post or hide the Blog nav — empty blog (`blog.ts` returns `[]` when env unset) reads worse than none.

---

## 6. Milestones / Sequencing

| Milestone | Contents | Target |
|---|---|---|
| **M1 — Stop the bleeding** | W0.1–W0.4, W1.1 | Today (~2h) |
| **M2 — Clean & consistent** | W1.2–W1.6 | This week |
| **M3 — Prove the work** | W2.1–W2.5 | Before sending link to any recruiter |
| **M4 — Polish** | W3.x | Ongoing |

## 7. Risks & Notes

- **Deleting the connection-limiter (W2.3):** confirm it's actually inert in prod before deleting; it touches `middleware.ts` and `layout.tsx`, so re-run `npm run build` after.
- **Secrets:** good hygiene already — `.env` is gitignored and was never committed. Action: confirm the Google `AIza…` key in local `.env` is API-restricted.
- **Resume PDF (W0.1)** is the only blocker requiring an external artifact (the actual CV).

## 8. Decisions & Open Questions

**Decided:**
- Blog: **keep it** — commit to ≥1 real post (W3.11 = write a post, not hide).
- Email: create a name-based Gmail; preferred `rafid.alkhairy@gmail.com`. *(account not created yet — blocks W0.3)*
- Projects: 5-project inventory per W2.0; default case studies = IMM + current ERP role.
- Resume PDF location: `public/assets/resume.pdf`, downloaded as `Rafid-Al-Khairy-CV.pdf`.

**Still open (blockers for P0):**
1. IMM internship period — exact **start–end** months?
2. Current ERP job — **company name + start month**, and is it OK to show publicly (NDA)?
3. "Middle Man" & "Asset Management" — any repo / live URL / screenshot to link, or list as "In progress"?
