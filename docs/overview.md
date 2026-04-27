# Seminar Overview: Data Science, Path and Practice in the AI Era

> **Note to slide builder:** This document is the top-level overview of a three-part seminar. It describes the audience, the speaker, the talk's arc, the unifying thesis, and the role each of the three section documents plays. The companion documents — `part1_path.md`, `part2_present.md`, and `part3_future.md` — are self-contained and can be built independently, but this overview document explains how they fit together and what the talk is *for*.

---

## Audience

- **Data Science Masters students** at the University of Washington.
- Mixed background, mostly early-career (broadly: 22–28 years old).
- The speaker assumes the audience is technically capable but has been trained to optimize, specialize, and follow planned career paths since adolescence.
- Many in the audience are anxious about: the path they should take, whether AI will replace them, and how to differentiate themselves in a tightening market.

## Speaker

- A senior data scientist working in academic scientific research at the University of Washington.
- Self-taught programmer; biology background; over 60 publications across many scientific domains.
- Does not have a PhD.
- Core stance: followed what was interesting, invested in fundamentals, ended up with a successful career he never planned.

## Talk Format

- Seminar / lecture format with slides.
- Three sections (no Part 4 — advice is woven into Part 3).
- Approximate slide count: ~39 slides total across the three sections, calibrated against final runtime.
- Tone: conversational, specific, honest, willing to land uncomfortable truths.

---

## Unifying Thesis

The talk has one core thesis that every section reinforces:

**Your process matters more than your path, and your fundamentals matter more than your tools.**

This thesis is not stated bluntly anywhere — it emerges from the structure. Each section is one face of it:

- **Part 1 (Past):** the path doesn't matter; following what's interesting and trusting the intersections of your interests does.
- **Part 2 (Present):** the daily work is mostly translation, judgment, and communication; the toolkit is real but smaller than students think.
- **Part 3 (Future):** AI makes this *more* true, not less. The people who invest in fundamentals and domain depth gain disproportionate advantage.

The three sections are also linked by a single repeated insight: **experience-based pattern recognition** — knowing what to ask, knowing when something is wrong, knowing which simple tool fits — is the load-bearing skill in every era of data science, and it's the skill that's hardest to acquire without doing the work yourself.

---

## Throughlines (Threaded Across All Three Sections)

These threads are planted in Part 1, reinforced in Part 2, and harvested in Part 3:

1. **Follow what's interesting.** Stated in Part 1 as the speaker's lifelong career compass. Reinforced in Part 2 as what makes the academic-research path fit. Harvested in Part 3 as the precondition for developing the deep domain knowledge that wins in the AI era. The closing slide of the talk returns to this explicitly.

2. **Trust the intersections.** Biology + amateur coding got the speaker a startup job. Database consulting + a biology degree got him into bioinformatics. In Part 3, the same insight generalizes: in an AI era, breadth and the ability to combine domains will matter more, not less.

3. **Fundamentals and judgment beat tool-fluency.** Plant in Part 2 ("simple, canonical methods are usually enough — the skill is knowing when") and harvest in Part 3 (without fundamentals, AI is useless; with them, the lever is enormous).

4. **Recognizing dead ends early is the senior skill.** The bridge between Part 2 and Part 3. The same pattern recognition that lets a senior data scientist abandon a wrong path early is what protects them from being led down rabbit holes by AI.

---

## Section Summaries

### Part 1 — Where I've Been: An Unorthodox Path
*(See `part1_path.md` for full content)*

**Purpose:** Give a Masters audience permission to not have their career figured out. Use the speaker's unconventional path as a case study for the "follow interest, trust intersections" message.

**Spine:** Two paired anecdotes — the MUD-to-startup pivot (an obscure obsession in LPC turned into the speaker's first developer job and led to building possibly the first web-based persistent chat-room system, predating social networks by years) and the David Baker interview (applied for a research tech role, got pivoted into bioinformatics on the spot by a future Nobel laureate, because of a fortunate match between the speaker's background and the consortium's just-issued advisory-board directive). Both stories share the same structure: *unplanned intersection of interests + right place at right time = doors open you didn't know existed.*

**Role in the talk:** Establishes credibility through specificity, sets up the speaker's "interesting is the primary motivator" compass, and plants the throughlines that pay off later.

**Slide count:** ~9 slides.

### Part 2 — Where Things Are Now: The Day-to-Day
*(See `part2_present.md` for full content)*

**Purpose:** Show what a working data scientist in academic research actually does, what skills are actually being used, and what the daily reality looks like — without falling into a tour-of-the-toolkit recitation.

**Spine:** The TEI-REX case study — an IARPA competition where the speaker's team was the only one of four to last until the end, classifying ionizing radiation exposure from non-invasive skin samples. The story exercises the full toolkit (feature finding, biomarker discovery, classification, regression, visualization, presentation) under real deadline pressure, and ends with an honest, mixed outcome (much better than chance, excellent at high doses, imperfect at low doses).

**Framing:** Most of the job is translation, judgment, and communication — the speaker sits at a three-way intersection between bench biologists, hardcore statisticians, and software engineers. The toolkit is real but smaller than students assume. Techniques are organized by *the question they answer* (differential analysis, feature selection, modeling, exploration), not by name. The contrarian punchline — *simple, canonical methods are usually enough; the skill is knowing when they aren't* — is the single most quotable message of the section.

**Role in the talk:** Grounds the abstract advice of Parts 1 and 3 in concrete daily reality. Provides the TEI-REX story that becomes the load-bearing example for Part 3's domain-knowledge argument. Plants the dead-ends-recognition bridge that pays off in Part 3.

**Slide count:** ~13 slides.

### Part 3 — Where Things Are Going: Data Science in the AI Era
*(See `part3_future.md` for full content)*

**Purpose:** Make a clear-eyed argument about what AI changes, what it doesn't, and what students should invest in. Close the talk on a forward-looking, optimistic note that returns to the "follow what's interesting" frame from Part 1.

**Spine:** AI inverts what's valuable in data science. Syntax and mechanical execution become commodities; fundamentals, domain knowledge, judgment, and the ability to ask the right questions become the whole job. The headline quote — *"Those who know what to ask for win now, not those who know how to do it"* — anchors the section. The Google-search analogy makes the abstract claim viscerally concrete.

**Uncomfortable truth, landed directly:** AI is most useful right now to senior people who have the frame of reference to evaluate it — and it's harder for junior people to gain that experience when AI is doing the entry-level tasks. The honest constructive flip: *if you invest heavily in fundamentals and domain knowledge, you have a HUGE advantage.* The lever has never been bigger for people willing to do the work.

**Concrete payoff:** The TEI-REX feature-selection story from Part 2 returns as the load-bearing example. The team's secret to success was using biological pathway knowledge to choose features — fundamentals (regularization) plus domain knowledge (which proteins matter in which pathways) producing a dramatic competitive advantage.

**Practical layer:** A slide on systems-engineering thinking for working with AI (Claude Code, skills, subagents, CLAUDE.md, opinionated instructions); the rabbit-hole warning paired with the dead-ends-recognition bridge from Part 2; a hypothetical-interview slide showing how the speaker would actually evaluate a candidate now (any tools allowed, evaluated on maintainability, explainability, and judgment, with deep questioning on *why* and *what was learned about the domain*).

**Closing:** Returns to Part 1's "follow what's interesting" compass. The two themes converge: without genuine interest in a domain, you won't develop the depth that becomes your edge in the AI era. The talk ends forward-looking and optimistic — this is a great moment to enter this field for the people who do the right things.

**Role in the talk:** The closing argument and the call to action. Carries the most weight and the strongest practical advice. Advice from an originally-planned Part 4 is woven in here.

**Slide count:** ~17 slides.

---

## What This Talk Is Not

A few things the speaker has deliberately *not* tried to do:

- **Not a comprehensive survey of data science methods.** Techniques surface only when they earn their place in a story or a thesis.
- **Not a how-to-use-Claude-Code tutorial.** AI tools are pointed at as a category to investigate, not taught.
- **Not a triumph narrative.** Friction points are surfaced honestly: the speaker disliked engineering, disliked corporate, disliked entrepreneurship; TEI-REX wasn't a clean win; presenting work is sometimes stressful; AI helps senior people most and that's hard for juniors.
- **Not a bullet-pointed advice list.** Advice is woven into the structure rather than presented as a separate section. The speaker's original Part 4 outline was deliberately folded into Part 3 because the advice is more credible when it emerges from an argument than when it's listed.

---

## Tone Across the Talk

- **Specific over general.** Names, dates, technologies, project titles, real outcomes. "I learned to code by writing MUDs in LPC" lands; "I had unconventional programming experience" doesn't.
- **Honest about friction and mixed outcomes.** Honest assessments build trust; sanded-down stories don't.
- **Conversational but pointed.** The speaker is willing to make claims that will provoke the audience — *"AI is most useful to senior people right now"* — and trust that the constructive follow-up earns the discomfort.
- **Optimistic, not anxious.** The talk's emotional arc is from "you don't need to have it figured out" (Part 1) through "here's what the work actually looks like" (Part 2) to "here's where the leverage is in the era you're entering" (Part 3). The audience should leave energized.

---

## Document Map

- **`overview.md`** (this document): top-level description, audience, thesis, and how the three sections fit together.
- **`part1_path.md`**: Part 1 — the speaker's unconventional path. Self-contained.
- **`part2_present.md`**: Part 2 — the day-to-day of the work and the TEI-REX case study. Self-contained.
- **`part3_future.md`**: Part 3 — the AI-era argument and the closing. Self-contained.

Each part document contains its own Raw Material section with verbatim speaker phrasings, editorial direction, tone notes, and a slide-by-slide sketch. The slide builder should treat each part document as the authoritative source for that section, and use this overview document only to understand how the sections connect.
