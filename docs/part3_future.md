# Part 3: Where Things Are Going — Data Science in the AI Era

> **Note to slide builder:** This document is self-contained. The "Raw Material" section preserves the speaker's facts and verbatim phrasings. The "Section Overview," "Thesis," and "Tone Notes" give editorial direction. The "Slide Sketch" is the structural guide. When in doubt, prefer the speaker's phrasings from Raw Material over paraphrases. This is the closing section of the talk — there is no Part 4. Advice is woven in throughout, and the talk ends here.

---

## Raw Material

### The Headline Argument

- AI is going to fundamentally change what you need to be good at.
- Knowing the specific syntax to do X or Y in Python or R isn't going to be important.
- **Domain knowledge will be king.** In research, that means knowing the science. In other fields, it means knowing that field deeply.
- Knowing the fundamentals of data science and computer science will be essential.
- AI will suggest methods. **You absolutely need to know if those are good suggestions.** You need to know:
  - If the cross-validation scheme chosen makes sense
  - If the normalization methods make sense
  - If the statistics for evaluating performance make sense
  - All of this in the context of *your data*.

### The Headline Quote (Verbatim)

- **"Those who know what to ask for win now, not those who know how to do it."**

This is the single most important line in Part 3 and probably in the talk. It belongs on its own slide.

### The Google-Search Analogy (Verbatim and Near-Verbatim)

- **"Ever notice how some people are extremely good at using Google to find niche answers? Some people are not good at this at all. AI is exactly like this, but to the Nth degree."**

**Editorial direction:** This analogy is the most relatable framing in the section. Every student in the audience has seen this difference among friends and classmates. It makes the abstract claim ("knowing what to ask matters") concrete and viscerally understood. Build a slide around it.

### Understanding Your Data

- Understanding your data is vital now and will be in the future.
- AI can help: it can scan your metadata, show you which values are present, make initial (often good, but not perfect) guesses about what each column is.
- You need to iterate on this with the AI and save a metadata description off (perhaps as a markdown document).
- But understanding and exploring your metadata is and will always be essential.

### The Rabbit Hole Warning

- AI, as it currently works, is very supportive of your ideas.
- **It will take you all the way to the end of a rabbit hole, costing you hours.**
- Having a solid understanding of fundamentals will help you avoid this.
- The same pattern recognition that helps experienced scientists recognize dead ends in their own work is what helps recognize when AI is wrong. (This is the bridge from Part 2.)

### The "Senior People Benefit Most Right Now" Claim

This is a deliberately uncomfortable but true claim the speaker wants to land directly, not soften.

- Right now, AI is most useful to more senior people.
- Why: they have the frame of reference, the fundamentals, and the domain knowledge to evaluate what's being given to them and to frame requests effectively.
- **It's harder for junior people to get that senior experience when AI is around to do things for them.** The path to seniority is being eroded by the very tool that rewards seniority most.
- Students should be aware of this and push on it if they want to get ahead.
- **The flip side is the optimistic message:** if you are one of the people who invests heavily in understanding the fundamentals and domain knowledge, you will have a **HUGE advantage.** Land this clearly.

### Communication

- Communication skills are vital now and will continue to be vital in the future.
- This isn't going away. It may get even more important.
- Implicit reason: when AI lowers the floor on producing output, the audience for your work becomes more skeptical. People want to know whether you actually understood the work or whether AI wrote it. The ability to walk through your reasoning, defend your choices, and translate findings becomes more important.

### What AI Won't Do

- The speaker does not think AI will steal data science jobs long-term.
- It will *change* them.
- Domain knowledge and creativity will be king.
- You need both to ask the right questions — questions other people aren't asking.

### The Hypothetical Interview (the speaker would do this if hiring now)

- Give the candidate a coding problem.
- Let them use any tools they want.
- Evaluate the produced output on:
  - **Maintainability**
  - **Explainability**
  - (Speaker said maintainability twice; the third evaluation criterion is implied to be something like correctness or quality of choices — see editorial note below.)
- Ask them **why** things are coded the way they are.
- Push on **what they learned about the domain** to solve the problem.

**Editorial direction:** The speaker said "maintainability, explainability, and maintainability" — the duplication is likely a transcription/typing artifact. The intent is clearly that there are three evaluation criteria. Reasonable third criterion based on context: **judgment** or **quality of choices**. Confirm with speaker before slide build, but framing the three criteria as *maintainability, explainability, and judgment* is a coherent and defensible reading of the intent.

This is concrete career advice the audience can act on. They should prepare to be evaluated on judgment and explanation, not on whether they can produce working code.

### Working Effectively With AI Tools

- You need to understand how the AI coding tools work to use them effectively.
- Examples of what to learn: Claude Code skills, subagents, **CLAUDE.md** instruction files.
- **You need to load opinionated instructions into these systems to keep AI agents on track.**
- There are many examples of public skills and subagent definitions that are effective.
- Essential to: review them, understand why what's in them is in them, try them out, get good at the tools.
- IDEs are still important, but getting less important.

### Systems-Engineering Skills (the underrated angle)

- Right now (this might get less true as tools improve), developing complex software projects with AI requires some degree of **systems engineering skills**.
- How do you configure your project and instructions?
- Which subagents are doing what?
- You need to be able to think about this and understand how to architect this kind of system.
- **This is a fundamentals point, not a tools point.** Systems thinking is itself a fundamental.

### Computer Science Fundamentals

- AI can give you answers that are amazingly inefficient.
- You need to be able to ask architecture questions about things like:
  - Complexity
  - Can we set up a GPU CUDA path here?
  - Can we vectorize the operations here?
  - How about using hash maps?
- Without CS fundamentals, you can't push back on AI suggestions effectively.

### The Stark Conclusion

- **If you don't understand the fundamentals or the domain you're working in, AI is useless.**
- It will give you things, but you can't know if those are good things.
- This is not a useful or sustainable situation in the professional workplace.

### What Counts as a "Domain"

- Biology
- Research
- FDA rules
- Computer science
- Web development
- Databases
- Data visualization
- Etc.

(Domain knowledge is broader than just "science" — applies to any deep field of expertise.)

### The TEI-REX Domain-Knowledge Story (concrete example, ties back to Part 2)

This is the load-bearing concrete example for Part 3.

- In TEI-REX, choosing the right features had a **dramatic effect** on how good the team's models were.
- Regularization can only do so much — that's fundamentals, and regularization is a tool every team had.
- Knowing **which proteins are involved in which biological pathways** — that's domain knowledge, and not every team had it.
- **Choosing features based on biological pathway knowledge was the team's secret to success** in TEI-REX.

**Editorial direction:** This story is gold. It's a concrete, real, recent example of fundamentals + domain knowledge producing a dramatic competitive advantage. It also closes the loop from Part 2: the audience already knows what TEI-REX was, so the speaker doesn't need to re-set up the story — just refer to it and explain what made the difference. Use this as the centerpiece example of why domain knowledge matters in the AI era.

### Frequency / Ubiquity

- The speaker thinks people will be using these tools every day.
- AI will touch nearly every aspect of the data science process — if not all of it.

### Closing Frame

The talk ends here. The closing combines two ideas:

1. **Return to the "follow what's interesting" frame from Part 1.** Without genuine interest in a domain, you won't develop the depth of knowledge that becomes your edge in the AI era. The two themes converge: the love-of-science point and the domain-knowledge point are the same point seen from different sides.
2. **Forward-looking optimism.** This is a great moment to enter the field — for the people who invest in fundamentals and domain depth. The lever for advantage has rarely been clearer.

---

## Section Overview

This section answers: *what will be valuable in the future of data science as AI takes on a larger role?* It is also the closing section of the talk. There is no Part 4 — advice is woven in throughout, and the section ends with a return to the "follow what's interesting" frame from Part 1.

The section's argument is structural: AI doesn't make data scientists obsolete; it *inverts* what's valuable about them. Things that used to be the bulk of the job (writing code, remembering syntax, looking up library APIs) become commodities. Things that used to be prerequisites (domain knowledge, fundamentals, judgment, knowing what questions to ask) become the entire job. This is good news for people with deep fundamentals and domain expertise. It's bad news for people who confused proficiency-with-tools for proficiency-at-the-work.

The corollary is uncomfortable but worth landing directly: AI is currently most useful to senior people because they can evaluate what they're given. Junior people both benefit less *and* face a harder path to seniority because the entry-level tasks that used to build experience are being automated. The honest answer is not to soften this but to point at the lever it implies: **invest in fundamentals and domain knowledge now, and the advantage compounds dramatically.**

The section flows in five movements: thesis → what becomes less valuable (briefly) → what becomes more valuable (the bulk) → working effectively with AI tools (practical layer) → call-to-action and closing. The TEI-REX feature-selection story is the load-bearing concrete example and ties Part 3 back to Part 2.

## Thesis

**AI inverts what's valuable in data science. Syntax and mechanical execution become commodities. Fundamentals, domain knowledge, judgment, and the ability to ask the right questions become the whole job. The people who invest in those things now will have a huge advantage — and the people who lean on AI to skip them will struggle to ever build the experience that makes AI useful in the first place.**

## Tone Notes

- **Land the uncomfortable truths directly.** "AI most useful to senior people" and "harder for juniors to gain seniority" are not softened. They're stated, then immediately followed by the constructive lever (invest in fundamentals; the advantage is huge).
- **Optimism, not doom.** The section is forward-looking. The headline message is "this is a great time to enter the field if you do the right things," not "AI is a threat."
- **Concrete > abstract.** The TEI-REX feature-selection story is the centerpiece example. Use it. The Google-search analogy is the centerpiece *framing*. Use it.
- **Practical advice the audience can act on.** Specifically: prepare to be evaluated on judgment and explanation in interviews; study public skills/subagent definitions to understand them; build CS fundamentals so you can push back on AI suggestions.
- **Close the talk by returning to "follow what's interesting."** The closing should feel like the opening's payoff. The compass that motivated the speaker's career is the same compass that points to the kind of deep domain investment that wins in the AI era.

---

## Slide Sketch

### Slide 3.1 — Title / Thesis Setup

**Purpose:** Open the closing section. Signal the shift from describing the present to making claims about the future.

**Content:**
- Title direction: "Where Things Are Going" or "Data Science in the AI Era."
- Headline claim, displayed or spoken: *"AI doesn't make data scientists obsolete. It changes what makes one valuable."*

**Notes:** Lightweight. The speaker establishes the frame. Keep visual minimal.

---

### Slide 3.2 — The Headline Quote

**Purpose:** Land the most quotable line in the talk early so it has time to echo.

**Content:**
- Centerpiece quote (verbatim), displayed prominently: **"Those who know what to ask for win now, not those who know how to do it."**
- Brief framing: *the value of "knowing how to do it" is collapsing. The value of "knowing what to ask for" is rising.*

**Notes:** Single-quote slide. The quote does the work. Don't crowd it.

---

### Slide 3.3 — The Google Analogy

**Purpose:** Make the abstract thesis concrete with an analogy every student already understands.

**Content:**
- Verbatim or near-verbatim: **"Some people are extremely good at finding niche answers on Google. Some aren't. AI is exactly like this, but to the Nth degree."**
- Framing: the gap between "good at asking" and "bad at asking" was already real with search engines. AI amplifies that gap dramatically.
- The skill that separates the two groups is the same skill that becomes load-bearing in the AI era: knowing what to ask, knowing how to evaluate the answer, having the context to push back.

**Notes:** This slide should feel like a moment of recognition for the audience. They've all seen this difference among classmates. Lean into the relatability.

---

### Slide 3.4 — What Becomes Less Valuable

**Purpose:** Brief but honest. Students need to hear what's being commoditized before they hear what's becoming more valuable.

**Content:**
- Specific syntax in Python or R
- Memorizing library APIs
- Mechanical execution — writing the code once you know what to write
- Looking up "how do I do X" answers

**Editorial framing:** *These were the bulk of what an entry-level DS hire used to do. They are no longer where the value lives.*

**Notes:** One slide. Don't dwell. The audience needs to hear it acknowledged so the rest of the section feels honest.

---

### Slide 3.5 — What Becomes More Valuable: Domain Knowledge

**Purpose:** The first and most important "what becomes more valuable" beat.

**Content:**
- **Domain knowledge will be king.**
- "Domain" is broad: biology, research, FDA rules, CS, web development, databases, data visualization, any field of deep expertise.
- AI will suggest methods. You need to know if those are good suggestions *in the context of your data*.
- Examples of what only domain context can tell you: whether a normalization is appropriate, whether the cross-validation scheme is sound, whether the evaluation statistics are right for this data, what the field's conventions are.

**Notes:** Plant the term "domain knowledge" prominently. The next slide will give the killer concrete example.

---

### Slide 3.6 — Concrete Example: TEI-REX Feature Selection

**Purpose:** Make the domain-knowledge claim viscerally real with a story the audience already knows.

**Content:**
- Callback to TEI-REX from Part 2.
- The team's secret to success: **choosing features based on biological pathway knowledge.**
- Regularization (a fundamentals tool every team had) can only do so much.
- Knowing **which proteins are involved in which pathways** is domain knowledge, and not every team had it.
- This had a **dramatic** effect on model quality.
- Generalizable lesson: in any AI-augmented work, domain knowledge is what separates a good model from a great one. AI doesn't have your domain. You do.

**Notes:** This is the load-bearing concrete example for Part 3. The audience already knows what TEI-REX is from Part 2, so the speaker can drop right into "here's what actually made us win." This slide does more for the section's credibility than any abstract argument.

---

### Slide 3.7 — What Becomes More Valuable: Fundamentals

**Purpose:** Establish that fundamentals are not a "nice to have" — they are the precondition for using AI well.

**Content:** Two parallel branches:

**Data science fundamentals:**
- Knowing what tests make sense when
- Knowing what visualizations make sense when
- Knowing how methods *actually work* — linear regression, logistic regression, xgboost, hierarchical clustering, etc.
- Knowing whether AI's suggestions on cross-validation, normalization, and evaluation metrics are appropriate for your data

**Computer science fundamentals:**
- AI can produce code that is amazingly inefficient
- You need to ask architectural questions: complexity, vectorization, hash maps, GPU/CUDA paths
- Without CS fundamentals, you can't push back on AI suggestions effectively

**Notes:** Concrete examples in both columns. The CS examples (vectorization, hash maps, CUDA) are deliberately specific so students can imagine the conversations they'd need to have with AI.

---

### Slide 3.8 — What Becomes More Valuable: Knowing Your Data

**Purpose:** A specific instance of fundamentals + domain knowledge that deserves its own slide.

**Content:**
- AI can help: scanning metadata, summarizing column values, making initial guesses about column meanings.
- But initial guesses are often good and never perfect.
- **You iterate with the AI**, then save off a metadata description (e.g., as a markdown document).
- Understanding and exploring your metadata is and will always be essential.
- Tie back: this is the same "understand your data" point from Part 2's exploration bucket — it is now *more* important, not less.

**Notes:** Brief slide. Reinforces a point already made in Part 2 with new urgency.

---

### Slide 3.9 — What Becomes More Valuable: Communication

**Purpose:** Communication is a future-proof skill. State this plainly.

**Content:**
- Communication skills are vital now and will be vital in the future.
- It may get *more* important, not less.
- Why: when AI lowers the floor on producing output, the audience for your work becomes more skeptical. People will ask: "did you actually understand this, or did the AI write it?"
- The ability to walk through your reasoning, defend your choices, and translate findings becomes more important precisely because AI lowers the floor on production.

**Notes:** Short slide. The "did you actually understand this" question is the single most concrete framing of why communication matters more now.

---

### Slide 3.10 — The Uncomfortable Truth: AI Helps Senior People Most

**Purpose:** Land the deliberately uncomfortable claim. Don't soften.

**Content:**
- Right now, AI is most useful to senior people.
- Why: they have the fundamentals, frame of reference, and domain knowledge to evaluate AI's output and frame requests effectively.
- The harder corollary: **it's harder for junior people to gain that senior experience when AI is doing the entry-level tasks for them.**
- Be aware of this. Push on it.

**Notes:** This is a hard slide and the speaker wants it landed directly, not softened. The next slide is the constructive flip.

---

### Slide 3.11 — The Optimistic Flip: Your Lever Is Bigger Than Ever

**Purpose:** Pair with 3.10. Land the constructive message clearly.

**Content:**
- **If you invest heavily in fundamentals and domain knowledge, you will have a HUGE advantage.**
- The same dynamic that makes AI most useful to senior people means the people who become senior fastest — by deeply investing in fundamentals and domain depth — gain disproportionate leverage.
- The lever for advantage in this field has rarely been clearer.
- This is a great moment to enter — *for the people who do the right things.*

**Notes:** This is the emotional turn of the section. After the discomfort of 3.10, this slide should land as the actionable, optimistic answer. Don't crowd it.

---

### Slide 3.12 — Working With AI Tools: A Systems Engineering Skill

**Purpose:** Cover the practical layer — students need real, actionable advice on how to use these tools well.

**Content:**
- Working with AI on complex projects requires **systems engineering thinking.**
- You need to understand and configure:
  - Project structure and instruction files (e.g., **CLAUDE.md**)
  - Skills (reusable instruction packages for specific kinds of work)
  - Subagents (specialized agents for delegated tasks)
- You need to **load opinionated instructions** into these systems to keep AI agents on track.
- There are many public examples of skills and subagent definitions worth studying. Review them, understand why what's in them is in them, try them out.
- IDEs are still important, but getting less important.
- Systems thinking is itself a fundamental — this is the same fundamentals message in a new domain.

**Notes:** One slide. Don't try to teach Claude Code in a slide — point at the categories and convince the audience it's worth investigating. The "this is itself a fundamental" framing keeps the section's thesis intact.

---

### Slide 3.13 — The Rabbit Hole Warning

**Purpose:** Practical, vivid warning the audience can act on. Pays off the bridge from Part 2.

**Content:**
- **AI as it currently works is very supportive of your ideas.**
- It will follow you all the way to the end of a rabbit hole — costing you hours.
- Solid fundamentals are what let you recognize a dead end early.
- Callback to Part 2: *"I'd waste a lot more time today if I didn't have the experience to recognize dead ends early."* That experience-based pattern recognition is exactly what's hardest to acquire when AI does the typing for you — and exactly what protects you from AI's failure mode.

**Notes:** This slide rewards the audience for paying attention to Part 2's bridge slide. The same insight returns with more weight.

---

### Slide 3.14 — The Stark Conclusion

**Purpose:** State the consequence plainly.

**Content:**
- **If you don't understand the fundamentals or the domain, AI is useless.**
- It will give you things. You won't know if those things are good.
- This is not a useful or sustainable situation in the professional workplace.

**Notes:** Single-statement slide. The bluntness is the value. This is the scariest possible version of the message and it sets up the next slide's actionable advice.

---

### Slide 3.15 — How You'll Be Interviewed (Soon)

**Purpose:** Concrete, near-term, actionable career advice. Audience can act on this *tomorrow.*

**Content:**
- A hypothetical the speaker would actually run if hiring a data scientist now:
  - Give the candidate a coding problem.
  - Let them use any tools they want — including AI.
  - Evaluate the result on **maintainability, explainability, and judgment** (quality of choices).
  - Ask **why** they coded it the way they did.
  - Push on **what they learned about the domain** to solve the problem.
- The implication for students: prepare to be evaluated on judgment and explanation, not on whether you can produce working code. Know *why* you made every choice.

**Notes:** This is the most concrete, actionable slide in Part 3. It gives the audience something specific to do tomorrow. *(Editorial note: the speaker said "maintainability, explainability, and maintainability" — the third criterion is interpreted as "judgment" or "quality of choices." Confirm before final build.)*

---

### Slide 3.16 — How To Invest Your Remaining Time

**Purpose:** Actionable advice synthesizing everything in Part 3 into specific things students can do now.

**Content:** A short list of investments that compound:
- Go deep on at least one **domain.** Pick one you find genuinely interesting and learn it more deeply than anyone in your cohort.
- Build **CS fundamentals** — complexity, data structures, algorithmic thinking. AI is amazingly inefficient when you don't push back on it.
- Build **DS fundamentals** — know how methods actually work, when to use which test, when to use which visualization, what regularization and cross-validation actually do.
- **Practice judgment.** Use AI tools, but ask yourself: do I know why this output is good? Do I know what's wrong with it?
- **Practice explaining your work.** The "did you actually understand this" question is coming.

**Notes:** This slide can be a bulleted list — the audience needs concrete take-home items. End with something like: *"The students who do these things will have an enormous advantage. The tools you have available right now are the most powerful any generation has ever had."*

---

### Slide 3.17 — Closing: Follow What's Interesting

**Purpose:** Close the talk by returning to the opening compass. Land the optimistic forward-looking message.

**Content:**
- Callback to Part 1: *"Something being interesting is THE primary motivator for me."*
- The connection across the talk: **without genuine interest in a domain, you won't develop the depth of knowledge that becomes your edge in the AI era.** The compass from Part 1 and the strategy from Part 3 are the same insight.
- Forward-looking close: *this is a great moment to enter this field if you invest in fundamentals and follow your genuine interests deeply. The lever has never been bigger for the people willing to do the work.*
- Optional final line, in the speaker's own voice: *"I never planned a career in data science. But I followed what was interesting, invested in fundamentals, and the doors kept opening. That same path is open to you — and the tools you have right now make it more powerful than ever."*

**Notes:** This is the last slide of the talk. Keep it clean. The callback to Part 1 closes the loop and gives the talk a coherent arc. The forward-looking close should leave the audience energized, not anxious.

---

## Open Questions / Decisions to Defer

- **The third interview criterion.** The speaker said "maintainability, explainability, and maintainability" — likely a duplication. The slide sketch interprets the third as "judgment" (quality of choices). Worth a quick confirmation before slide build. Alternatives: correctness, soundness, design quality.
- **Slide count.** Current sketch is 17 slides — the longest section. This is appropriate given Part 3 is the closing section and contains the talk's core argument. Calibrate against runtime; if compression is needed, candidates for merging are 3.4 (less valuable) into 3.1, and 3.8 (knowing your data) into 3.7 (fundamentals).
- **Whether to make Slide 3.10 (uncomfortable truth) and Slide 3.11 (optimistic flip) one slide or two.** Two slides give the discomfort time to land before the constructive answer. One slide is faster but risks burying the discomfort. Recommend two.
- **Whether to surface specific public skills/subagent examples on Slide 3.12.** Naming a few well-known examples could help, but risks dating the slide quickly. Recommend keeping abstract.
- **Final closing line.** The optional speaker-voice line in Slide 3.17 is suggested, not mandatory. Speaker preference will determine the exact ending.
