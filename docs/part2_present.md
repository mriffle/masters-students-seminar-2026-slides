# Part 2: Where Things Are Now — The Day-to-Day of a Working Data Scientist in Research

> **Note to slide builder:** This document is self-contained. The "Raw Material" section preserves the speaker's facts and verbatim phrasings. The "Section Overview," "Thesis," and "Tone Notes" give editorial direction. The "Slide Sketch" is the structural guide. When in doubt, prefer the speaker's phrasings from Raw Material over paraphrases. The TEI-REX case study is the centerpiece of this section — do not compress it the way the corporate years got compressed in Part 1.

---

## Raw Material

### The Four Modes of Work

The speaker does four meaningfully different kinds of data-science work. They should be presented as a taxonomy, not flattened into "I do data science."

**1. Principal on generalized web applications for data visualization, sharing, and analysis.**
- **Limelight** — a web platform for visualizing, sharing, and analyzing proteomics data.
- **Proxl** — a web platform for protein cross-linking proteomics data, which is highly structural in nature.
- These projects involve all areas of data science: collaboration with users (researchers) to determine features, gather feedback; software engineering; databases and data architecture; data visualization; thinking about how to generalize problems so multiple workflows are supported; coming up with standards for data formats (e.g., XML formats for data uploads).

**2. Automated processing workflows with Nextflow.**
- Widely used pipelines for automated data processing and analysis.
- Vital for: data reproducibility, data standards, data provenance, data transparency, data accessibility.

**3. Direct work on research problems.**
- Domains worked on: radiation exposure, Alzheimer's disease, Parkinson's disease, environmental proteomics (oceans), pharmacology, aging.
- Involves: data cleaning, focus on having good metadata, lots of machine learning, statistics, and data visualization.
- Specific techniques surface naturally here: linear regression, classification (logistic regression, xgboost), PCA plots, looking at variance, feature finding with OLS or boruta, volcano plots.
- *Important framing:* "Scientists have expectations about visualizations they're used to seeing. Knowing these is important." Visualization conventions are a cultural skill, not just a technical one.

**4. Open-source data analysis algorithms and software.**
- Develops algorithms and software, maintains them as open-source projects on GitHub.
- Involves: software engineering, computer science, data visualization.

### Typical Week (Hours Breakdown)

- **~10–20% meetings.** Rare to have a day with no meetings, but they're valuable — get as much done as possible in them.
- **~20% writing and generating figures.** (This is communication-as-deliverable, not meetings.)
- **~50% coding.**
- **~10% reading.**
- **~10%+ hacking on personal projects, trying out ideas.** Often the most fun part of the week. Sometimes more than 10%.

**Editorial direction:** Show this as a chart. Two specific things should be highlighted for the audience:
- Half the job isn't coding. Students will be surprised.
- Personal-project / hacking time is *deliberate*, not a confession. It's how you stay sharp and how the next project gets generated. Previews Part 4.

### Tools and Setup

- **Python** — primary language. Vast ecosystem of ML and data visualization tools, incredibly valuable. R is a viable path; speaker doesn't use it. Personal preference: better IDEs, faster execution, more intuitive interfaces to libraries in Python.
- **VS Code** — primary IDE.
- **Jupyter Notebooks** — still used routinely, but pivoting away from this more and more in favor of well-structured Python code in VS Code. VS Code supports Jupyter notebooks natively, so no need for Anaconda anymore.
- **Claude Code CLI** — being used a *lot*. Recent shift. This is the natural pivot point to Part 3.
- **Obsidian** — for note-taking and knowledge management. Invaluable.
- **Slack** — for collaboration.

**Editorial direction:** Don't present this as a tour of an IDE. The interesting question hiding in this list is *what changed in the last 2-3 years and why?* The Jupyter→VS Code shift, the introduction of Claude Code, the role of Obsidian — these reflect real shifts in how the work gets done. Frame as "here's what shifted and what it tells you" rather than "here's my toolbox."

### Techniques (Grouped by the Question They Answer, Not by Name)

The speaker explicitly worried about a list-of-nouns problem. Group techniques by the *question they answer*. The grouping below is the editorial structure for the slide(s).

**"What's different between two groups?"** (Differential analysis)
- t-tests, Mann-Whitney, limma
- Volcano plots as the canonical visualization
- **Prerequisite that doesn't get taught:** normalization (L1, median, MAD, VSN, etc.). Important to understand and know when to use each.

**"Which features actually matter?"** (Feature selection)
- boruta, OLS, classifier-based or regression-based feature importance
- Concrete example: finding proteins predictive of Alzheimer's disease.

**"Can I predict an outcome from features?"** (Modeling)
- Linear regression with elastic net regularization (used daily)
- Logistic regression and xgboost for classification
- **Beat on:** regularization (L1, L2 — what regularization is, why it matters)
- **Beat on:** cross-validation, essential to understand

**"What does my data even look like?"** (Exploration)
- Bar charts, box plots, tables
- PCA plots, looking at variance
- Visualizing metadata relationships
- Understanding data missingness, scales
- Essential to understand your data before reaching for anything else.

### The Contrarian Punchline (verbatim and near-verbatim)

- **"Often simple, canonical methods are enough. No need to explore more complex methods if simple ones work."**
- But sometimes they don't. Then you may need non-linear models like GAM, more sophisticated linear models like SVM, even occasionally deep learning (made easy with scikit-learn).
- **The real skill is knowing when the simple tool is enough and when it isn't.**

### TEI-REX Case Study (centerpiece of Part 2)

This is the extended narrative that makes the whole section work. Preserve the specifics.

- **Project name:** TEI-REX
- **Funder:** IARPA (the intelligence research agency; the speaker referred to it as "the intelligence arm of the US Army")
- **Selection:** IARPA selected the top 4 teams in the country and pitted them against each other in a competition.
- **The problem:** Could one classify, from a non-invasive surface skin sample, whether someone had been exposed to ionizing radiation, and if so:
  - How strong was the dose?
  - What type of radiation was it?
  - How long ago was the exposure?
- **Difficulty:** This is a super difficult problem.
- **Structure:** Multiple phases. Each phase included:
  - Time for the team to conduct experiments, develop methods and ML classifiers/regressors
  - Then they were shipped **hundreds of blinded samples** to classify/regress on
  - They sent answers back and were evaluated
  - Only the top teams proceeded to the next, harder phase
- **Escalation across phases:** lower doses, more covariates (sex and other genetic diversity).
- **Outcome:** **The speaker's team was the only team to last until the end.**
- **Pressure dynamics (verbatim and near-verbatim):**
  - "You didn't have much time to just try things out."
  - "You had to decide and pivot immediately if things weren't working."
  - Timelines and deadlines were very tight.
- **What it exercised:** A masterclass — taught by necessity — in feature finding, biomarker discovery, classification, regression, data visualization, report writing, and presenting results.
- **Honest assessment of results (do not sand this down):**
  - Not perfect at very low doses
  - Much better than randomly guessing
  - Extremely good at higher doses
  - Developed cutting-edge tools and methods

**Editorial direction:** The honest, mixed outcome is *more credible* than a triumphant one. Students have only seen Kaggle outcomes where the leaderboard says you won. The TEI-REX outcome — world-class work on a hard problem with a meaningfully-better-than-random-but-imperfect result — is a useful corrective.

### Friction / Honest Notes

- High-stakes projects like TEI-REX are higher stress.
- Presenting work can be stressful as well.
- The Part 1 "low stress" framing should not leave students thinking the job is frictionless — name these honestly.

### The Bridge to Part 3 (the dead-ends insight)

The speaker noted: *"I'm sure I'd waste a lot more time now if I had less experience and couldn't recognize dead ends early."* This is the load-bearing insight that bridges Part 2 to Part 3. The same experience-based pattern recognition that lets you recognize dead ends in your own work is what lets you recognize when AI is wrong. Plant this at the end of Part 2, harvest in Part 3.

---

## Section Overview

This section answers: *what does a working data scientist in academic research actually do day-to-day, and what skills are actually being used right now?*

The speaker explicitly worried this section would be hard to make interesting because tool/technique lists bore audiences. The solution is two-fold:

1. **Frame the section around translation, judgment, and communication, not the toolkit.** The tools are real but smaller than students think; the hard part is the judgment of which simple tool to apply, and the communication that makes the result useful to non-data-scientists.
2. **Anchor the section with the TEI-REX case study.** It's a concrete narrative where the techniques surface naturally under pressure, and it solves the "interesting" problem on its own.

The four modes of work are themselves a useful taxonomy that students don't usually see — most career talks present "data scientist" as one job, but this speaker does four meaningfully different kinds of data-science work, each demanding different skills.

## Thesis

**The day-to-day of a working data scientist in research is mostly translation, judgment, and communication. The technical toolkit is real but smaller than you think, and most of it is canonical. The hard part is knowing which simple thing to apply and how to convince three different audiences — bench biologists, hardcore statisticians, and software engineers — that you applied it correctly.**

This thesis is the editorial frame for everything in Part 2. The toolkit slides exist to support it. The TEI-REX story exists to demonstrate it under pressure.

## Tone Notes

- **Lead with translation, not tools.** The audience needs to hear the framing before they see the technique buckets, or they'll process it as a tool list.
- **Honest outcomes everywhere.** TEI-REX wasn't a clean win; presenting is sometimes stressful; the simple methods usually work but not always. Honesty builds credibility.
- **Domain breadth is a selling point.** The variety of disease and science domains the speaker has worked on is itself an argument for the academic-research path. Don't let this go unstated.
- **Don't teach proteomics.** One sentence of context is enough for Limelight / Proxl / Nextflow. The audience doesn't need to understand the biology to follow the message.
- **The visualization-conventions point is sneaky-good.** Volcano plots, PCA plots, normalization conventions aren't just technical — they're cultural conventions of the field, and knowing your audience's conventions is a real skill.
- **Plant the dead-ends seed at the end.** It's the bridge to Part 3.

---

## Slide Sketch

### Slide 2.1 — Title / Frame

**Purpose:** Open the section by stating the thesis up front, before any details.

**Content:**
- Title direction: "What I Actually Do" or "The Day-to-Day."
- Headline claim, displayed or spoken: *"Most of this job is translation, judgment, and communication. The toolkit is smaller than you think."*

**Notes:** Lightweight. The speaker establishes the frame so the rest of the section reads as evidence.

---

### Slide 2.2 — The Three-Way Translation

**Purpose:** Make the "translator" framing concrete before the audience sees any tools or techniques.

**Content:**
- Three audiences the speaker translates between, day-to-day:
  - **Bench biologists** — have a question, don't always know how to ask it computationally.
  - **Hardcore statisticians** — can answer a clean question, don't have the domain context.
  - **Software engineers** — can build infrastructure, don't know what should be built.
- The data scientist sits at the intersection.
- This is the part of the job that doesn't get taught in a Masters program.

**Notes:** This is the conceptual anchor of Part 2. Everything that follows is an instance of work that requires this translation.

---

### Slide 2.3 — Four Modes of Work

**Purpose:** Show that "data scientist" is not one job. Establish scope before zooming in.

**Content:** Four modes, each with a one-line description:

1. **Generalized web applications for data viz, sharing, and analysis.** Examples: **Limelight** (proteomics — the large-scale study of proteins) and **Proxl** (cross-linking proteomics — mapping how proteins physically touch in 3D). Used by research labs.
2. **Automated processing workflows with Nextflow.** Reproducible data pipelines — push a button, raw data goes in, processed results come out the same way every time. Loaded with reproducibility, provenance, transparency, and accessibility.
3. **Direct work on research problems.** Across radiation exposure, Alzheimer's, Parkinson's, ocean proteomics, pharmacology, aging.
4. **Open-source algorithms and software.** Maintained on GitHub.

**Notes:** Brief explanations of Limelight, Proxl, and Nextflow are necessary because most DS Masters students have never encountered them. Don't teach the biology — one sentence each is enough. The breadth of mode #3's domains should be visible on this slide.

---

### Slide 2.4 — Domain Breadth (Optional / Could Merge with 2.3)

**Purpose:** Make the variety of scientific domains visible as a payoff for the academic path.

**Content:**
- Same data scientist, same core toolkit, applied across:
  - Radiation exposure
  - Alzheimer's disease
  - Parkinson's disease
  - Ocean / environmental proteomics
  - Pharmacology
  - Aging biology
- Quote-worthy framing: *"The toolkit travels. The domain doesn't."*

**Notes:** Could be its own slide for visual impact, or folded into Slide 2.3. Decision based on time budget. The visual of seeing all those domains in one place is the payoff for the "interesting and constantly changing projects" claim from Part 1.

---

### Slide 2.5 — A Typical Week

**Purpose:** Ground the audience in daily reality. Correct the assumption that the job is 90% coding.

**Content:** A chart showing approximate weekly time allocation:
- ~50% coding
- ~20% writing and generating figures
- ~10–20% meetings
- ~10% reading
- ~10%+ hacking on personal projects / trying out ideas

**Two callouts on this slide:**
- **Half the job isn't coding.** Communication-as-deliverable (writing, figures, presentations) is a major part of the work, not a footnote.
- **Personal-project time is deliberate, not a confession.** It's how you stay sharp and how the next project gets generated.

**Notes:** A visual chart is more memorable than a bulleted list. The speaker can verbalize the surprise factor for students.

---

### Slide 2.6 — The Toolkit (and What's Shifting)

**Purpose:** Show the tools, but frame the shift as the interesting story.

**Content:**
- **Python** as primary language. Vast ML/viz ecosystem. (R is fine; speaker prefers Python for IDE, speed, library ergonomics.)
- **VS Code** as primary IDE.
- **Jupyter Notebooks** still used, but speaker is moving toward well-structured Python code in VS Code (which supports notebooks natively — no Anaconda needed).
- **Claude Code CLI** — used heavily and increasingly. Recent shift.
- **Obsidian** for notes and knowledge management.
- **Slack** for collaboration.

**Editorial framing:** *"The interesting question isn't what's on this list. It's what changed in the last 2–3 years."* The Jupyter→VS Code drift, the arrival of Claude Code, and the role of a knowledge-management tool like Obsidian are the real signals about where the work is going.

**Notes:** Keep the tour brief. The shift framing is what makes this slide earn its keep, and it pre-pivots toward Part 3.

---

### Slide 2.7 — Techniques, Grouped by the Question They Answer

**Purpose:** Cover the technique landscape without it feeling like a list of nouns.

**Content:** Four buckets, each labeled with a question:

- **"What's different between two groups?"** → t-tests, Mann-Whitney, limma. Volcano plots as canonical viz. *Prerequisite that's rarely taught:* normalization (L1, median, MAD, VSN) — knowing when to use which.
- **"Which features actually matter?"** → boruta, OLS, classifier/regression-based feature importance. *Concrete example:* finding proteins predictive of Alzheimer's.
- **"Can I predict an outcome from features?"** → elastic-net linear regression, logistic regression, xgboost. *Beats:* regularization (L1/L2 — what it is, why it matters); cross-validation (non-negotiable).
- **"What does my data even look like?"** → bar/box plots, PCA, missingness analysis, scale checks, metadata relationships.

**Notes:** Each bucket is organized by a question the audience can imagine asking. This turns the technique inventory into a decision tree. The speaker can elaborate on regularization and cross-validation as the core ML literacy beats.

---

### Slide 2.8 — The Contrarian Punchline: Simple Usually Wins

**Purpose:** Deliver the highest-value message in the section. Students arrive primed to use sophisticated methods; this is the corrective.

**Content:**
- Verbatim or near-verbatim: **"Often, simple, canonical methods are enough. No need to explore more complex methods if simple ones work."**
- But sometimes they don't. Then: GAM, SVM, occasional deep learning (made easy with scikit-learn).
- **The real skill is knowing when the simple tool is enough and when it isn't.**
- Brief callout: visualization conventions are *cultural* — volcano plots, PCA plots, specific normalizations are what scientists in the field expect to see. Knowing your audience's conventions is part of the skill.

**Notes:** This is the most quotable single message in Part 2. Give it its own slide. Don't bury it in a technique list.

---

### Slide 2.9 — Case Study: TEI-REX (1 of 3) — The Setup

**Purpose:** Open the centerpiece narrative. Establish stakes and the problem.

**Content:**
- **Project: TEI-REX**
- **Funder:** IARPA (the U.S. intelligence research agency)
- **Selection:** IARPA picked the top 4 teams in the country and put them in head-to-head competition.
- **The problem:** From a non-invasive surface skin sample, can you classify whether someone has been exposed to ionizing radiation — and if so, how strong the dose, what type of radiation, and how long ago?
- This is a hard problem. State this plainly.

**Notes:** The visual on this slide should make the stakes feel real. The audience needs to feel the difficulty of the problem before they hear about the methods.

---

### Slide 2.10 — Case Study: TEI-REX (2 of 3) — The Pressure

**Purpose:** Show the pressure dynamics. This is what separates research data science under deadlines from coursework.

**Content:**
- Multiple phases. Each phase: team gets time to develop methods → hundreds of blinded samples shipped → team classifies/regresses → results sent back and evaluated → only top teams advance.
- Each phase escalated: lower doses, more covariates (sex, genetic diversity).
- Verbatim: **"You didn't have much time to just try things out."**
- Verbatim: **"You had to decide and pivot immediately if things weren't working."**
- Tight timelines and deadlines.

**Notes:** This is the slide where students see what real-world DS pressure looks like. The "decide and pivot immediately" line is the load-bearing skill that course projects don't teach.

---

### Slide 2.11 — Case Study: TEI-REX (3 of 3) — What It Taught and How It Ended

**Purpose:** Close the case study. Honest outcome. Pull out the skills exercised.

**Content:**
- **The team was the only one to last until the end of the competition.**
- A masterclass — taught by necessity — in: feature finding, biomarker discovery, classification, regression, data visualization, report writing, presenting results.
- **Honest outcome (do not sand down):**
  - Not perfect at very low doses
  - Much better than randomly guessing
  - Extremely good at higher doses
  - Developed cutting-edge tools and methods

**Notes:** This is where the audience sees that the techniques from Slide 2.7 — feature finding, classification, regression, normalization, visualization — were the actual tools used in a real high-stakes project. The honest outcome is what makes the message credible. Don't overstate.

---

### Slide 2.12 — What's Actually Hard / What's Frustrating

**Purpose:** Add honest texture. Counterbalance the "low stress" framing from Part 1 so students don't think the job is frictionless.

**Content:**
- High-stakes projects (e.g., TEI-REX) are stressful.
- Presenting work is sometimes stressful and never gets fully comfortable.
- (Optional add: translating between audiences who don't share vocabulary; convincing collaborators to clean their metadata.)

**Notes:** Brief. One slide. The honesty is the value.

---

### Slide 2.13 — Bridge to Part 3: Dead Ends and Pattern Recognition

**Purpose:** Plant the seed for Part 3. Make the connection between experience-based judgment and the AI era explicit.

**Content:**
- Verbatim or near-verbatim: *"I'd waste a lot more time now if I had less experience and couldn't recognize dead ends early."*
- The same pattern recognition that lets you recognize dead ends in your own work is what lets you recognize when AI is wrong.
- This is the experience that's hardest to acquire when AI does the typing for you.
- Soft transition: *"Which brings us to where things are going."*

**Notes:** Closing slide of Part 2. The bridge insight should land cleanly so Part 3 opens with momentum.

---

## Open Questions / Decisions to Defer

- **TEI-REX detail level.** Currently three slides (setup / pressure / outcome). Could compress to two if time-constrained, but the three-slide arc gives the story room to breathe and is the most memorable artifact in the talk. Recommend keeping at three.
- **Domain breadth as separate slide vs. merged.** Slide 2.4 could fold into 2.3 if slide count is tight. Visual impact is reason to keep it separate.
- **Toolkit slide depth.** Slide 2.6 could be one slide or two depending on how much the speaker wants to dwell on the Jupyter→VS Code shift and the arrival of Claude Code. One slide is sufficient if Part 3 will cover the AI-tool angle in depth.
- **Where to surface "no PhD."** If not surfaced in Part 1, this section's "I do all this without a PhD" framing on the Four Modes slide (2.3) or the Typical Week slide (2.5) could be effective. Decide based on Part 1 choice.
- **Whether to verbalize the three-way translation list (2.2) in different terms.** Some speakers will prefer "scientists / statisticians / engineers"; the speaker's own framing from earlier in the conversation was "bench biologists, programmers, and hardcore statisticians." Use the latter if the speaker prefers his own words.
- **Slide count.** Current sketch is 13 slides. This is the longest section and probably should be — it's the meat of the talk. Calibrate against runtime.
