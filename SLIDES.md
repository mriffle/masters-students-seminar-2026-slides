# SLIDES

> Per-slide manifest for the seminar deck. Each entry specifies the slide's purpose, what it conveys, its key visual concept, and the source mapping back to the authoritative part documents in `docs/`. The slide builder should treat the part docs (`docs/part1_path.md`, `docs/part2_present.md`, `docs/part3_future.md`) as the source of truth for content, tone, and verbatim phrasings; this file is the structural manifest that defines slide order, scope, and visual intent.

---

## Talk Metadata

- **Title:** *There's no "right" path to a career in data science — and skills to focus on in the age of AI*
- **Speaker:** Michael Riffle, Senior Research Scientist
- **Audience:** Data Science Masters students, University of Washington (mostly 22–28, broadly anxious about AI displacement and career paths)
- **Total slides:** 31, across 3 parts (Part 1: 8 · Part 2: 11 · Part 3: 12)
- **Unifying thesis (never stated bluntly):** *Your process matters more than your path, and your fundamentals matter more than your tools.*

## Conventions

- Files in `src/slides/` use the pattern `NN-SlideName.tsx` where `NN` is a zero-padded 2-digit ordinal across the entire deck (`01` through `31`).
- The slide manifest in `src/slides/index.ts` orders slides by these numeric prefixes.
- All slides are **visual-first** per `SLIDE_STYLE.md` Section 1. Quote slides are still allowed — they use wordmark-scale typography as the visual — but every slide must have an SVG/visual element, never plain bullet text.
- **Color associations to maintain across the deck:**
  - `primary` (cyan) — the speaker's path / interest compass / fundamentals
  - `secondary` (magenta) — domain knowledge / TEI-REX / accent for emphasis
  - `tertiary` (violet) — supporting visuals / AI tooling
  - `success` (green) — the "right approach" / fit
  - `danger` (red) — the "wrong approach" / dead ends / what AI gets wrong
  - `amber` — intermediate / cautionary
- **Recurring motifs the deck should establish and reuse:**
  - **Compass / path** — used in 02 (compass plant) and called back in 31 (closing)
  - **Intersection / branching path** — used in 03–07 (Part 1 trajectory)
  - **TEI-REX visual vocabulary** — established in 19–21 (case study), called back in 23 (feature-selection harvest in Part 3). Same node shapes and colors must be re-used.
  - **Inversion / scale flip** — used in 22 (less valuable → more valuable)

---

## Part 1 — Where I've Been (8 slides)

> Establishes credibility through specificity. Plants the throughlines (interest, fit, intersections) that pay off in Parts 2 and 3. Source: `docs/part1_path.md`.

### 01 — Cover

- **File:** `src/slides/01-Cover.tsx`
- **Purpose:** Open the talk. Set expectations that this isn't a "here's how to plan a DS career" lecture.
- **Conveys:** Talk title, speaker name and role.
- **Visual:** Wordmark-scale title with per-segment coloring — *"no 'right' path"* in `primary` cyan (maps to Part 1's argument), *"skills…age of AI"* in `secondary` magenta (maps to Part 3's argument). Speaker line in muted text below. Optional subtle background motif: a faint constellation of branching paths, foreshadowing the trajectory visual used in slides 03–07.
- **Source:** `docs/part1_path.md` Slide 1.1.

### 02 — The Compass: Interesting

- **File:** `src/slides/02-Compass.tsx`
- **Purpose:** Plant the primary throughline before any biographical detail. Everything that follows is an instance of this principle. The talk's closing slide (31) returns here.
- **Conveys:** Verbatim quote — *"Something being interesting is THE primary motivator for me."* This has been continuously true from undergrad to today; it's the strategy, not a phase.
- **Visual:** A literal compass — but the needle points to **INTERESTING** rather than to a cardinal direction. Other compass labels (PRESTIGE, MONEY, PLAN, TITLE) are visible but faded, in `text-muted`. The needle and "INTERESTING" label glow in `primary`. This is the visual motif that closes the deck.
- **Source:** `docs/part1_path.md` Slide 1.2.

### 03 — The Side Obsession: MUDs

- **File:** `src/slides/03-MudObsession.tsx`
- **Purpose:** Set up the headline anecdote of Part 1. Make the audience feel the texture of the late-90s home-computing moment. (Merges old slides 1.3 + 1.4 — opens by acknowledging the engineering→biology pivot in passing, then lands on the MUD obsession as the real story.)
- **Conveys:** Came to UW as an engineer; pivoted to biology because he wanted to understand the world, not build systems. *Was supposed to be doing biology. Was actually obsessed with MUDs* (networked multi-user text games), coded in **LPC** (deliberately obscure name — that's the point). Late 90s era. The time investment looked unproductive.
- **Visual:** **Animated vintage MUD screenshot.** Centerpiece of the slide — a CRT-styled terminal panel with monospaced green text, animated to type out a real-feeling MUD session line by line (e.g., room descriptions, `> look`, `> attack orc`, status output). To the left, a small path diagram showing engineering → biology → side obsession (MUDs/LPC), with the side branch glowing to mark where the action is. Era cue with subtle scanlines/glow on the terminal.
- **Source:** `docs/part1_path.md` Slides 1.3 + 1.4 (merged).

### 04 — How a "Useless" Hobby Got Me Hired

- **File:** `src/slides/04-UselessHobby.tsx`
- **Purpose:** Headline anecdote #1 of the talk — the single most important story in Part 1. Bookends with slide 06 (Baker interview).
- **Conveys:** A Seattle startup happened to be using **Spinner**, a web server coded in **microLPC** — same family as the speaker's hobby language. Hired specifically because of the MUD obsession. Used MUD knowledge to bake persistence into webapps (rare at the time) and built **possibly the first web-based persistent chat-room system** — public/private/semi-private rooms, invitations. **Predated social networks by years.** Lesson, stated explicitly: the "useless" thing you're obsessed with is often where your edge comes from.
- **Visual:** Connection diagram showing the obscure-hobby node (LPC, glowing `primary`) linking via Spinner/microLPC to a stylized chat-room interface mock (rooms, users, lock icons for private). Below, a horizontal timeline marking "chat-rooms built" → years of empty space → "Friendster (2002), MySpace (2003), Facebook (2004)" appearing far later in muted text. The visual punchline is the gap.
- **Source:** `docs/part1_path.md` Slide 1.5.

### 05 — The Corporate Detour

- **File:** `src/slides/05-CorporateDetour.tsx`
- **Purpose:** Compress the corporate / entrepreneurship years into a single environmental-fit lesson. Plants the second throughline (fit, not performance).
- **Conveys:** Promotion-quit story verbatim — *"I asked for a promotion, was told that's not how they do things here, so I quit and started my own company."* Two companies (don't name). Discovered: corporate culture *"felt so fake and superficial"*; entrepreneurship required constant client hustle — *"I'm not an entrepreneur. I don't think like one."* Lesson: *"good at this"* and *"want to do this every day"* are different questions.
- **Visual:** Two side-by-side path branches the speaker tried and exited — labeled "Corporate" and "Entrepreneurship", drawn in dashed `danger`-tinted lines fading to muted gray. Each branch has a small node with the speaker's verbatim friction phrase. Below, a third path — solid, glowing — labeled simply "?" leading off-screen toward the next slide (foreshadow). A small pull-quote box anchors the verbatim promotion-quit line.
- **Source:** `docs/part1_path.md` Slide 1.6.

### 06 — Back to Science (and an Unexpected Interview)

- **File:** `src/slides/06-BackToScience.tsx`
- **Purpose:** Headline anecdote #2 of Part 1. Pairs explicitly with slide 04 — same lesson in a different domain. Establishes credibility for the rest of the talk.
- **Conveys:** Applied to UW for a **research tech** position. The group was part of a large research consortium that included **David Baker**. Baker personally interviewed him. The group had *just* been told by their advisory board to hire a **bioinformatics specialist**. Pivoted on the spot; took the bioinformatics role. Career in academic science research started there. **Credibility close:** 60+ publications since, across many labs and domains. **Picked up a CS Masters with a data science specialty along the way — earned while working.** (Audience implicitly handles the no-PhD math; David Baker = Nobel laureate, one mention only, no milking.) Lesson: same as slide 04 — biology + db/web consulting was the exact combination the moment needed; the intersection opens doors.
- **Visual:** Intersection diagram. Three lines converging on a single node labeled "the role": (1) the speaker's biology background, (2) database/web consulting experience, (3) the consortium's just-issued advisory-board directive. The first two are coming from the past (the speaker's own); the third is coming from the consortium. Where they meet, the door labeled "bioinformatics" opens. Credibility line beneath in mono: `60+ publications · CS Masters in DS (earned while working) · no PhD`.
- **Source:** `docs/part1_path.md` Slide 1.7.

### 07 — Why Academia Fit

- **File:** `src/slides/07-WhyAcademiaFit.tsx`
- **Purpose:** Answer the audience's natural follow-up ("so why are you still there?"). Bridge to Part 2 — preview the "frontier of multiple fields, no known way to do things" framing that Part 2 will demonstrate.
- **Conveys:** Lead reason: *constantly changing projects on the frontier of multiple fields; often no known way to do things, even from a data science perspective.* Secondary reasons (briefly, framed as *"things I didn't know to value at your age"*): schedule flexibility, low stress, relative job security. Honest note: this combination is rare and partly luck.
- **Visual:** Four-card grid. The lead card ("frontier projects") is large and glowing in `primary`, occupying ~50% of the visual area. The other three cards (flexibility, low stress, security) are smaller, muted, in a row beneath, each tagged with the line *"didn't know to value at your age."*
- **Source:** `docs/part1_path.md` Slide 1.8.

### 08 — Section 1 Takeaways

- **File:** `src/slides/08-Part1Takeaways.tsx`
- **Purpose:** Make the throughlines explicit before transitioning to Part 2. The audience needs them planted clearly so Parts 2 and 3 can harvest them.
- **Conveys:** Three throughlines, each tied to a story the audience just heard:
  1. **Follow what's interesting.** The MUD obsession wasn't wasted.
  2. **Pay attention to fit, not just performance.** Corporate and entrepreneurship taught me what I'm not.
  3. **Trust the intersections.** Biology + coding, then biology + consulting, opened every door that mattered.
- **Visual:** Three horizontal cards, each pairing the throughline (large) with a tiny callback icon to the relevant prior slide (the MUD terminal mark from 03/04, the dashed-branch motif from 05, the intersection diagram from 06). Soft transition tagline at bottom: *"Now let me show you what those intersections actually look like as a working data scientist."*
- **Source:** `docs/part1_path.md` Slide 1.9.

---

## Part 2 — Where Things Are Now (11 slides)

> Demonstrates the day-to-day. Frames the work as translation, judgment, and communication — not a tool tour. Anchored by the TEI-REX case study (slides 19–21), which is the load-bearing concrete example for Part 3. Source: `docs/part2_present.md`.

### 09 — Part 2 Frame: What I Actually Do

- **File:** `src/slides/09-Part2Frame.tsx`
- **Purpose:** Open Part 2 by stating the thesis up front. The rest of the section reads as evidence.
- **Conveys:** Section title direction: *"What I Actually Do"* or *"The Day-to-Day."* Headline: *"Most of this job is translation, judgment, and communication. The toolkit is smaller than you think."*
- **Visual:** Lightweight thesis slide. Headline at wordmark scale; small section number ("Part 2") in muted accent. A subtle visual hint of the upcoming three-way translation diagram — three faint nodes around a central glowing one — to foreshadow slide 10.
- **Source:** `docs/part2_present.md` Slide 2.1.

### 10 — The Three-Way Translation

- **File:** `src/slides/10-ThreeWayTranslation.tsx`
- **Purpose:** Make the "translator" framing concrete before any tools or techniques appear. The conceptual anchor of Part 2.
- **Conveys:** The three audiences the speaker translates between: **bench biologists** (have a question, don't always know how to ask it computationally), **hardcore statisticians** (can answer a clean question, don't have the domain context), **software engineers** (can build infrastructure, don't know what should be built). The data scientist sits at the intersection. *This is the part of the job that doesn't get taught in a Masters program.*
- **Visual:** Triangle diagram. Three nodes at the corners, each labeled with one of the audiences plus a one-line characterization. The data scientist is the glowing central node. Directional translation lines connect the central node to each corner. Each line has a subtle data-flow dot animation traveling outward (showing the translation work in motion).
- **Source:** `docs/part2_present.md` Slide 2.2.

### 11 — Four Modes of Work

- **File:** `src/slides/11-FourModes.tsx`
- **Purpose:** Show that "data scientist" is not one job. Establish scope before zooming in. Also surfaces domain breadth (merged from old slides 2.3 + 2.4).
- **Conveys:** Four modes:
  1. **Generalized web apps for data viz, sharing, analysis** — Limelight (proteomics), Proxl (cross-linking proteomics, structural).
  2. **Automated processing workflows with Nextflow** — reproducibility, provenance, transparency, accessibility.
  3. **Direct work on research problems** — across radiation exposure, Alzheimer's, Parkinson's, ocean/environmental proteomics, pharmacology, aging.
  4. **Open-source algorithms and software** — maintained on GitHub.
  - Tagline: *"The toolkit travels. The domain doesn't."*
- **Visual:** 2×2 card grid, each card carrying its mode title and a one-line description. Mode 3's card is taller — it expands to show the six scientific domains as a fan of small chips inside it (radiation, Alzheimer's, Parkinson's, ocean, pharmacology, aging), making domain breadth a visible payoff inside the modes structure rather than a separate slide. Tagline anchors the bottom.
- **Source:** `docs/part2_present.md` Slides 2.3 + 2.4 (merged).

### 12 — A Typical Week

- **File:** `src/slides/12-TypicalWeek.tsx`
- **Purpose:** Ground the audience in daily reality. Correct the assumption that the job is 90% coding.
- **Conveys:** Weekly time allocation — ~50% coding, ~20% writing/figures, ~10–20% meetings, ~10% reading, ~10%+ personal projects/hacking on ideas. **Two callouts:** (1) *Half the job isn't coding* — communication-as-deliverable is major. (2) *Personal-project time is deliberate, not a confession* — it's how you stay sharp and how the next project gets generated.
- **Visual:** Single ring/donut chart filling the slide center, with each segment in a different theme color and labeled. The "personal projects" wedge has a subtle glow. Two callout lines flanking the chart, one for each of the surprise-factor messages above.
- **Source:** `docs/part2_present.md` Slide 2.5.

### 13 — The Toolkit and What's Shifting

- **File:** `src/slides/13-Toolkit.tsx`
- **Purpose:** Show the tools, but frame the *shifts* as the interesting story. Pre-pivots toward Part 3.
- **Conveys:** Python (primary, vs R), VS Code (primary IDE; supports Jupyter natively now — no Anaconda needed), Jupyter Notebooks (still used, drifting away from), Claude Code CLI (used heavily and increasingly — recent shift), Obsidian (notes/knowledge management), Slack. Editorial frame: *"The interesting question isn't what's on this list. It's what changed in the last 2–3 years."*
- **Visual:** Two-column layout: left column "Stable" (Python, VS Code, Slack, Obsidian) drawn as steady boxes; right column "Shifting" with directional arrows — Jupyter waning (faded arrow), Claude Code rising (glowing arrow). Headline framing across the top: *"What changed in the last 2–3 years?"*
- **Source:** `docs/part2_present.md` Slide 2.6.

### 14 — Techniques Grouped by the Question They Answer

- **File:** `src/slides/14-TechniquesByQuestion.tsx`
- **Purpose:** Cover the technique landscape without it feeling like a list of nouns. Turn the inventory into a decision tree.
- **Conveys:** Four buckets, each labeled by a question:
  - **"What's different between two groups?"** → t-tests, Mann-Whitney, limma. Volcano plots. *Prereq rarely taught:* normalization (L1, median, MAD, VSN).
  - **"Which features actually matter?"** → boruta, OLS, classifier/regression-based importance. *Example:* finding proteins predictive of Alzheimer's.
  - **"Can I predict an outcome from features?"** → elastic-net regression, logistic regression, xgboost. *Beats:* regularization (L1/L2), cross-validation.
  - **"What does my data even look like?"** → bar/box plots, PCA, missingness, scale checks, metadata relationships.
- **Visual:** 2×2 quadrant grid. Each quadrant has the question as the headline (large, in `primary`), with the techniques inside as small monospaced chips. Each quadrant is its own small "card" with subtle border in a distinct accent color. The structure is the lesson — students should see decisions, not nouns.
- **Source:** `docs/part2_present.md` Slide 2.7.

### 15 — Simple Usually Wins

- **File:** `src/slides/15-SimpleWins.tsx`
- **Purpose:** Deliver the most quotable single message in Part 2. Students arrive primed to use sophisticated methods; this is the corrective.
- **Conveys:** Verbatim — *"Often, simple, canonical methods are enough. No need to explore more complex methods if simple ones work."* But sometimes they don't — then GAM, SVM, occasional deep learning (made easy with scikit-learn). **The real skill is knowing when the simple tool is enough and when it isn't.** Brief callout: visualization conventions (volcano plots, PCA, normalizations) are *cultural* in the field, and knowing your audience's conventions is part of the skill.
- **Visual:** A "tool selection" tree: a wide trunk labeled "Simple, canonical methods" carrying ~80% of the visual weight in glowing `primary`. A small narrower escalation branch ("when simple isn't enough") leads upward to GAM / SVM / occasional deep learning chips, in `tertiary`. The visual ratio mirrors the message. The verbatim quote is set as a wordmark-scale headline above the diagram.
- **Source:** `docs/part2_present.md` Slide 2.8.

### 16 — Case Study: TEI-REX (1/3) — The Setup

- **File:** `src/slides/16-TeirexSetup.tsx`
- **Purpose:** Open the centerpiece narrative. Establish stakes and the problem. The visual vocabulary established here will be re-used in slide 23 (Part 3 callback) — same colors and shapes.
- **Conveys:** Project: **TEI-REX**. Funder: **IARPA** (the U.S. intelligence research agency). Selection: top 4 teams in the country put in head-to-head competition. The problem: from a non-invasive surface skin sample, classify whether someone has been exposed to ionizing radiation — and if so, dose, type, and time since. *This is a hard problem.* State plainly.
- **Visual:** Diagram of the problem itself. Left: a stylized skin-swab sample (small node, `primary`). Middle: an arrow into a black-box classifier with a question mark. Right: three output question marks (dose? type? time?). The unknowns are emphasized — the audience should feel the difficulty before hearing methods. Header chip "TEI-REX" in `secondary` with "IARPA — top 4 teams" small below it.
- **Source:** `docs/part2_present.md` Slide 2.9.

### 17 — Case Study: TEI-REX (2/3) — The Pressure

- **File:** `src/slides/17-TeirexPressure.tsx`
- **Purpose:** Show the pressure dynamics. This is what separates research data science under deadlines from coursework. The "decide and pivot immediately" line is the load-bearing skill course projects don't teach.
- **Conveys:** Multi-phase structure: team gets time to develop methods → hundreds of blinded samples shipped → team classifies/regresses → results sent back and evaluated → only top teams advance. Each phase escalated: lower doses, more covariates (sex, genetic diversity). Verbatim: *"You didn't have much time to just try things out."* and *"You had to decide and pivot immediately if things weren't working."*
- **Visual:** A narrowing-funnel phase diagram. Four (or more) stacked horizontal bars, each labeled "Phase N", growing narrower (top to bottom) and tinted progressively darker `secondary`/`danger`. Each phase has a tiny mark for "samples shipped" and "teams remaining" — the latter shrinks visibly. Verbatim quotes set as pull-quotes in mono.
- **Source:** `docs/part2_present.md` Slide 2.10.

### 18 — Case Study: TEI-REX (3/3) — Outcome and Honest Friction

- **File:** `src/slides/18-TeirexOutcome.tsx`
- **Purpose:** Close the case study with an honest, mixed outcome (more credible than triumph). Also lands the friction texture from old slide 2.12 — TEI-REX is the canonical high-stakes/stressful project, and presenting was part of the work.
- **Conveys:** **The team was the only one to last to the end of the competition.** A masterclass — taught by necessity — in: feature finding, biomarker discovery, classification, regression, viz, report writing, presenting. **Honest outcome (do not sand down):** not perfect at very low doses; much better than randomly guessing; extremely good at higher doses; developed cutting-edge tools and methods. **Honest friction (woven in):** high-stakes projects are stressful; presenting is sometimes stressful and never gets fully comfortable.
- **Visual:** Two stacked elements. Top: a horizontal performance band — x-axis is radiation dose (low → high), y-axis is classification accuracy. The accuracy curve climbs from "better than random" at low doses to "excellent" at high doses, with honest uncertainty shading. Bottom: a slim friction strip — two muted chips ("high-stakes is stressful", "presenting never gets fully comfortable") set against a dim `amber` background, framed not as failure but as honest texture. Last-team-standing badge in `success` corner.
- **Source:** `docs/part2_present.md` Slides 2.11 + 2.12 (merged).

### 19 — Bridge: Dead Ends and Pattern Recognition

- **File:** `src/slides/19-DeadEndsBridge.tsx`
- **Purpose:** Plant the seed for Part 3. Make the connection between experience-based judgment and the AI era explicit so Part 3 opens with momentum.
- **Conveys:** Verbatim/near-verbatim — *"I'd waste a lot more time today if I didn't have the experience to recognize dead ends early."* The same pattern recognition that lets you recognize dead ends in your own work is what lets you recognize when AI is wrong. This is the experience that's hardest to acquire when AI does the typing for you. Soft transition: *"Which brings us to where things are going."*
- **Visual:** A branching path with multiple forks. Most branches are dim `danger`-dashed (dead ends, abandoned). One solid `primary` branch continues onward, glowing. A small magnifying-lens icon hovers near a fork, marking "the senior skill: recognizing this early." The path continues off-screen to the right, foreshadowing Part 3.
- **Source:** `docs/part2_present.md` Slide 2.13.

---

## Part 3 — Where Things Are Going (12 slides)

> The closing argument and call to action. AI inverts what's valuable in data science. The TEI-REX feature-selection callback (slide 23) ties Part 3 back to Part 2 with shared visual vocabulary. Source: `docs/part3_future.md`.

### 20 — Headline Quote

- **File:** `src/slides/20-HeadlineQuote.tsx`
- **Purpose:** Open Part 3 by landing the most quotable line in the talk early so it has time to echo. (Merges old slides 3.1 + 3.2 — the headline quote *is* the thesis; no separate title slide needed.)
- **Conveys:** Verbatim — **"Those who know what to ask for win now, not those who know how to do it."** Brief framing: the value of "knowing how to do it" is collapsing; the value of "knowing what to ask for" is rising.
- **Visual:** Single-quote slide. Wordmark-scale text filling the slide, with "ask for" and "do it" in contrasting accent colors (`primary` for ask, `text-muted` for do — the value flip is reinforced typographically). Discreet "Part 3" section marker top-left. Optional: a thin decorative scale/lever motif beneath the quote, balanced toward "ask for" — foreshadows the lever metaphor in slide 27.
- **Source:** `docs/part3_future.md` Slides 3.1 + 3.2 (merged).

### 21 — The Google Analogy

- **File:** `src/slides/21-GoogleAnalogy.tsx`
- **Purpose:** Make the abstract thesis concrete with an analogy every student already understands. A moment of recognition.
- **Conveys:** Verbatim/near-verbatim — *"Some people are extremely good at finding niche answers on Google. Some aren't. AI is exactly like this, but to the Nth degree."* The skill that separates the two groups is the same skill that becomes load-bearing in the AI era: knowing what to ask, evaluating the answer, having context to push back.
- **Visual:** Two parallel query trajectories. Left side: a vague query ("how to do statistics") branching into a chaotic, sprawling tree of low-quality results, ending in confusion (`danger`-tinted, dashed). Right side: a precise, well-framed query branching into a focused tree that converges on a useful answer (`success`, solid). Same person, two different framings, two outcomes. Below, tagline: *"AI is this — to the Nth degree."*
- **Source:** `docs/part3_future.md` Slide 3.3.

### 22 — The Inversion: From Syntax to Knowing What to Ask

- **File:** `src/slides/22-Inversion.tsx`
- **Purpose:** Land the structural argument: AI doesn't make data scientists obsolete; it inverts what's valuable. (Merges old slides 3.4 + 3.5 — the flip *is* the slide.)
- **Conveys:** What becomes less valuable: specific syntax in Python/R, memorizing library APIs, mechanical execution, "how do I do X" lookups. What becomes more valuable: **domain knowledge** (king), judgment, knowing what to ask, knowing how to evaluate AI's suggestions in the context of your data. "Domain" is broad: biology, FDA rules, CS, web dev, databases, viz.
- **Visual:** A literal inversion diagram — two stacked panels (or two horizontally-mirrored halves) showing the flip. Top/left ("FROM"): syntax, API lookups, mechanical execution shown as commodity-styled chips, fading. Bottom/right ("TO"): domain knowledge (large, glowing `secondary`), judgment, knowing what to ask, evaluation skills. An animated arrow or scale visibly "flipping" between them on slide entrance. The visual gravity should clearly invert.
- **Source:** `docs/part3_future.md` Slides 3.4 + 3.5 (merged).

### 23 — Concrete Example: TEI-REX Feature Selection

- **File:** `src/slides/23-TeirexFeatures.tsx`
- **Purpose:** The load-bearing concrete example for Part 3. Audience already knows TEI-REX from Part 2 — the speaker drops directly into "here's what made us win." Visual vocabulary must match slides 16–18.
- **Conveys:** The team's secret to success in TEI-REX: **choosing features based on biological pathway knowledge.** Regularization (a fundamentals tool every team had) can only do so much. Knowing **which proteins are involved in which biological pathways** — that's domain knowledge, and not every team had it. Had a **dramatic** effect on model quality. Generalizable lesson: AI doesn't have your domain. You do.
- **Visual:** Two parallel feature-selection paths shown side by side, both starting from the same input data (matching the TEI-REX visual style from slide 16). Path A: "Generic features (regularization only)" → mediocre model quality (modest accuracy band). Path B: "Pathway-informed features (regularization + domain knowledge)" → great model quality (strong accuracy band, glowing). The dramatic delta between the two outcomes is the visual punchline. Use the same skin-sample/classifier shapes from slide 16 to make the callback recognizable.
- **Source:** `docs/part3_future.md` Slide 3.6.

### 24 — Fundamentals: DS, CS, and Knowing Your Data

- **File:** `src/slides/24-Fundamentals.tsx`
- **Purpose:** Establish that fundamentals are not a "nice to have" — they are the precondition for using AI well. (Merges old slides 3.7 + 3.8 — knowing your data is a specific instance of fundamentals + domain knowledge.)
- **Conveys:** Three pillars:
  - **Data science fundamentals** — knowing what tests/methods/visualizations make sense when; knowing how methods *actually work*; evaluating whether AI's CV scheme, normalization, evaluation metrics fit *your data*.
  - **Computer science fundamentals** — AI produces amazingly inefficient code; you push back via complexity, vectorization, hash maps, GPU/CUDA paths.
  - **Knowing your data** — AI can scan metadata and make initial guesses, but you iterate with it and save off a metadata description (e.g., as a markdown doc). Understanding your data is more important now, not less.
- **Visual:** Three foundation pillars supporting a platform labeled "able to push back on AI." Each pillar is labeled and contains 2–3 concrete sub-bullets as small chips. Pillars are color-coded: DS in `primary`, CS in `tertiary`, knowing-your-data in `amber`. Above the platform, a small AI agent icon sits supported. Visual message: without these pillars, the platform collapses.
- **Source:** `docs/part3_future.md` Slides 3.7 + 3.8 (merged).

### 25 — Communication

- **File:** `src/slides/25-Communication.tsx`
- **Purpose:** Communication is a future-proof skill. The "did you actually understand this" framing is the most concrete reason this matters more, not less.
- **Conveys:** Communication is vital now and will be vital in the future. May get *more* important, not less. Why: when AI lowers the floor on producing output, the audience for your work becomes more skeptical. People will ask: *"Did you actually understand this, or did the AI write it?"* The ability to walk through your reasoning, defend your choices, and translate findings becomes more important precisely because AI lowers the floor on production.
- **Visual:** A speaker silhouette at a podium (or a presenter-figure), with a thought-bubble showing a clean reasoning chain (premise → analysis → conclusion). Audience faces in front, drawn with literal raised eyebrows / question-mark icons (skepticism). Headline pull-quote: *"Did you actually understand this, or did the AI write it?"* set in `secondary` to mark its weight.
- **Source:** `docs/part3_future.md` Slide 3.9.

### 26 — The Uncomfortable Truth

- **File:** `src/slides/26-UncomfortableTruth.tsx`
- **Purpose:** Land the deliberately uncomfortable claim directly, without softening. The next slide is the constructive flip — the discomfort needs its own slide to land.
- **Conveys:** Right now, **AI is most useful to senior people.** Why: they have the fundamentals, frame of reference, and domain knowledge to evaluate what AI gives them and to frame requests effectively. The harder corollary: **it's harder for junior people to gain that senior experience when AI is doing the entry-level tasks for them.** Be aware. Push on it.
- **Visual:** A weighted scale or tipped balance. On one side: a "senior" figure standing tall on a tall stack of `primary`-tinted blocks labeled "fundamentals, domain knowledge, frame of reference." On the other: a "junior" figure on a much shorter stack, with arrows showing entry-level tasks being siphoned away by an AI icon. The scale tips heavily toward the senior. No softening — the visual disparity is the point. Tone is honest, not despairing.
- **Source:** `docs/part3_future.md` Slide 3.10.

### 27 — The Optimistic Flip + How to Invest Your Time

- **File:** `src/slides/27-OptimisticFlip.tsx`
- **Purpose:** Pair with slide 26. Land the constructive lever AND the concrete actions students can take. Emotional turn of the section. (Merges old slides 3.11 + 3.16 — the flip becomes actionable in the same beat.)
- **Conveys:** **If you invest heavily in fundamentals and domain knowledge, you will have a HUGE advantage.** The same dynamic that makes AI most useful to senior people means the people who become senior fastest gain disproportionate leverage. *The lever has rarely been clearer.* Concrete actions:
  - Go deep on at least one **domain** you find genuinely interesting.
  - Build **CS fundamentals** — complexity, data structures, algorithmic thinking.
  - Build **DS fundamentals** — methods, tests, viz, regularization, cross-validation.
  - Practice **judgment** — using AI tools, ask: do I know why this output is good?
  - Practice **explaining your work** — the "did you actually understand this" question is coming.
- **Visual:** A lever (literal physical lever) anchored at a fulcrum. The platform on the lever is short and labeled "your effort" with a small figure standing on it. The output side is enormously long, labeled "advantage compounding." The lever is balanced on the five action items (CS fundamentals, DS fundamentals, domain depth, judgment, explanation), shown as the fulcrum's foundation. Glowing in `primary` with `success` accents on the action chips. The visual message: small effort here → massive output. The action items are on the slide as both the fulcrum's foundation AND legible as a take-home checklist.
- **Source:** `docs/part3_future.md` Slides 3.11 + 3.16 (merged).

### 28 — Working With AI: A Systems Engineering Skill

- **File:** `src/slides/28-SystemsEngineering.tsx`
- **Purpose:** Cover the practical layer. Students need real, actionable advice on *how* to use these tools well. Reinforce the section thesis: systems thinking is itself a fundamental.
- **Conveys:** Working with AI on complex projects requires **systems engineering thinking.** What to understand and configure: project structure and instruction files (e.g., **CLAUDE.md**), skills (reusable instruction packages), subagents (specialized agents for delegated tasks). **Load opinionated instructions** to keep AI agents on track. Many public examples of skills/subagent definitions worth studying — review them, understand why what's in them is in them, try them out. IDEs are still important, but getting less important. Systems thinking is itself a fundamental.
- **Visual:** A small architecture diagram showing the speaker (centered) connected to a configuration node (CLAUDE.md, skills, subagents shown as small attached chips), which in turn connects to a Claude/AI icon. Around the AI icon are the agent's outputs (code, analysis, suggestions). Arrows from the configuration to the AI shown as "opinionated instructions" — making the agent steerable. Small caption: *"This is itself a fundamental."*
- **Source:** `docs/part3_future.md` Slide 3.12.

### 29 — The Rabbit Hole and the Stark Conclusion

- **File:** `src/slides/29-RabbitHoleStark.tsx`
- **Purpose:** Practical warning + the bluntest version of the section's message. (Merges old slides 3.13 + 3.14 — the rabbit hole IS the failure mode that produces the stark conclusion. Cause and consequence on one slide.)
- **Conveys:** **AI as it currently works is very supportive of your ideas.** It will follow you all the way to the end of a rabbit hole — costing you hours. Solid fundamentals are what let you recognize a dead end early (callback to slide 19). And the bluntest framing: **If you don't understand the fundamentals or the domain, AI is useless.** It will give you things; you won't know if those things are good. *This is not a useful or sustainable situation in the professional workplace.*
- **Visual:** A spiral/rabbit-hole diagram — a developer figure descending into a deepening spiral, with AI suggestions stacking on either side as "yes, and..." chips that lead deeper down. At the bottom of the spiral, a stark text plate: **"AI is useless without fundamentals or domain."** The spiral itself drawn in `danger`/`amber` mix; the stark conclusion text in high-contrast `text` against `bg-card`. Below the conclusion: the dead-ends-bridge motif from slide 19, redrawn in miniature, marking the protective skill.
- **Source:** `docs/part3_future.md` Slides 3.13 + 3.14 (merged).

### 30 — How You'll Be Interviewed (Soon)

- **File:** `src/slides/30-Interview.tsx`
- **Purpose:** Concrete, near-term, actionable career advice. Audience can act on this *tomorrow*. The most concrete actionable slide in Part 3.
- **Conveys:** A hypothetical the speaker would actually run if hiring a data scientist now:
  - Give the candidate a coding problem.
  - Let them use any tools they want — including AI.
  - Evaluate the result on **maintainability, explainability, and judgment** (quality of choices).
  - Ask **why** they coded it the way they did.
  - Push on **what they learned about the domain** to solve the problem.
- Implication: prepare to be evaluated on judgment and explanation, not on whether you can produce working code. Know *why* you made every choice.
- **Visual:** A stylized interview-rubric card. Top section: "The setup" with a mini coding-problem icon and an "any tools allowed" badge. Middle section: three large evaluation criteria as glowing chips — **maintainability**, **explainability**, **judgment** (each in a distinct accent color). Bottom section: two interview-question chips — *"Why did you code it this way?"* and *"What did you learn about the domain?"* The visual reads like a one-page evaluation form. Mono font for the questions to convey "this is real."
- **Source:** `docs/part3_future.md` Slide 3.15.

### 31 — Closing: Follow What's Interesting

- **File:** `src/slides/31-Closing.tsx`
- **Purpose:** Close the talk by returning to the opening compass. Land the optimistic forward-looking message. Visual rhyme with slide 02.
- **Conveys:** Callback to Part 1: *"Something being interesting is THE primary motivator for me."* The connection across the talk: **without genuine interest in a domain, you won't develop the depth of knowledge that becomes your edge in the AI era.** The compass from Part 1 and the strategy from Part 3 are the same insight. Forward-looking close: *this is a great moment to enter this field — for the people who invest in fundamentals and follow their genuine interests deeply. The lever has never been bigger for the people willing to do the work.* Optional speaker line (delivered, not necessarily on slide): *"I never planned a career in data science. But I followed what was interesting, invested in fundamentals, and the doors kept opening. That same path is open to you — and the tools you have right now make it more powerful than ever."*
- **Visual:** Direct visual rhyme with slide 02. The same compass — but now the needle pointing to **INTERESTING** is even brighter, and around the compass a faint trail shows the path the speaker walked: brief markers for MUDs, Spinner, Baker, TEI-REX, the Masters, 60+ publications. The compass faces forward (toward the audience's future) rather than backward. The closing tagline anchored at the bottom in muted text: *"Follow what's interesting. Invest in fundamentals. The lever has never been bigger."*
- **Source:** `docs/part3_future.md` Slide 3.17.

---

## Notes for the Slide Builder

- **Authoritative content source.** When implementing each slide, open the corresponding section of the part doc cited in the **Source** field and prefer the speaker's verbatim phrasings over paraphrases. This file is the structural manifest, not the script.
- **Visual continuity matters.** Slides 16–18 (TEI-REX) and slide 23 (TEI-REX feature-selection callback) MUST share visual vocabulary — same node shapes, same colors. Slides 02 and 31 MUST share the compass motif as a deliberate visual rhyme. Slide 19 (dead-ends bridge) is referenced in slide 29 (rabbit hole) and should be designed for callback.
- **Quote slides still need a visual.** Slides 02, 15, 20 lean heavily on a verbatim quote — but per `SLIDE_STYLE.md` Section 1, a quote slide still uses a supporting SVG element (compass for 02; tool-tree for 15; lever motif for 20). No slide is plain text on a background.
- **Animation budget.** Three slides have explicit animation requirements: slide 03 (animated MUD terminal — first-class, not an afterthought), slide 10 (data-flow dots on translation lines), slide 22 (the inversion flip on slide entrance). Other slides use the standard staggered entrance animations defined in `SLIDE_STYLE.md` Section 6.
- **Era cue on slide 03.** The vintage MUD screenshot should feel period-authentic (CRT scanlines, monospaced green-on-black text, possibly a subtle CRT curvature). Resist the urge to make it look "designed" — its charm is in feeling unstyled.
