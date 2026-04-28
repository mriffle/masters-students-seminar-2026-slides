import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 08 - Section 1 Takeaways
 *
 * The closing slide of Part 1. Makes the three throughlines explicit before
 * transitioning into Part 2. The audience needs these three lessons
 * crystallized -- each tied directly to a story they JUST heard.
 *
 * Three takeaways (load-bearing, verbatim per SLIDES.md / part1_path.md):
 *   1. Follow what's interesting.
 *      The MUD obsession wasn't wasted.
 *   2. Pay attention to fit, not just performance.
 *      Corporate and entrepreneurship taught me what I'm not.
 *   3. Trust the intersections.
 *      Biology + coding, then biology + consulting, opened every door
 *      that mattered.
 *
 * Soft transition tagline at bottom (verbatim):
 *   "Now let me show you what those intersections actually look like as a
 *    working data scientist."
 *
 * Layout:
 *   - Title at top.
 *   - Three horizontal cards, each ~1/3 of the row width. Each card pairs a
 *     tiny callback icon (~80x60 SVG) with a large primary headline and a
 *     muted italic sub-line.
 *   - Transition tagline anchored at the bottom of the slide (footer style,
 *     italic, muted).
 *
 * Card vocabulary -- continuity with slide 07's secondary cards:
 *   --color-bg-card background, muted border (color-mix mute at low alpha),
 *   generous padding, rounded-lg.
 *
 * Callback icons (small, supporting -- the takeaway TEXT is the hero):
 *   - Card 1: a miniature CRT terminal with a few green phosphor lines
 *     (a `>` prompt, a couple of greek-bar blocks of text). The terminal
 *     frame is rendered in --color-primary; the phosphor text inside is in
 *     --color-success. Era-authentic CRT phosphor green -- documented
 *     overload, see note below.
 *   - Card 2: two short dashed --color-danger branches at low opacity, with
 *     X-mark terminators -- the dashed-danger branch motif from slide 05.
 *   - Card 3: three short converging lines meeting at a single glowing
 *     --color-primary node -- the intersection diagram motif from slide 06,
 *     compressed.
 *
 * Color palette (more reuse than typical -- this is a callback slide):
 *   - --color-primary    -> throughline headlines, MUD terminal frame on
 *                            Card 1, intersection node on Card 3.
 *   - --color-success    -> phosphor green INSIDE Card 1's terminal.
 *                            Documented overload, same as slide 03 -- this
 *                            is era-authentic CRT phosphor (the contextual
 *                            CRT frame carries the meaning), NOT the deck-
 *                            wide "right approach / fit" semantic.
 *   - --color-danger     -> Card 2's dashed branches and X terminators.
 *                            Consistent with slide 05's precedent.
 *   - --color-text-muted -> sub-lines, transition tagline, card borders.
 *   - --color-text       -> minor text inside cards (not counted as accent).
 *
 * Tight on opacity throughout: the icons should be dim enough not to
 * compete with the takeaway text.
 */

const Part1Takeaways: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-[92vw] h-full flex flex-col items-center justify-start gap-[1vh]">
        <SlideTitle subtitle="Three throughlines to carry into Part 2.">
          Section 1 Takeaways
        </SlideTitle>

        {/* Three horizontal callback cards, each ~1/3 width. */}
        <div className="w-full max-w-[90vw] grid grid-cols-3 gap-[1.5vw] flex-1 items-stretch pb-[0.5vh]">
          <TakeawayCard
            delay={0.35}
            headline="Follow what's interesting."
            subline="The MUD obsession wasn't wasted."
            Icon={MudTerminalMark}
          />
          <TakeawayCard
            delay={0.55}
            headline="Pay attention to fit, not just performance."
            subline="Corporate and entrepreneurship taught me what I'm not."
            Icon={DashedDangerBranches}
          />
          <TakeawayCard
            delay={0.75}
            headline="Trust the intersections."
            subline="Biology + coding, then biology + consulting, opened every door that mattered."
            Icon={IntersectionMark}
          />
        </div>

        {/* Soft transition tagline -- footer-style, muted. Anchored
            near the bottom of the slide. */}
        <motion.p
          className="text-center font-normal leading-snug mt-[0.5vh] mb-0 max-w-[80vw]"
          style={{
            color: 'var(--color-text-muted)',
            fontSize: 'clamp(1.15rem, 1.7vw, 1.6rem)',
            opacity: 1,
            letterSpacing: '0.01em',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.6 }}
        >
          Now let me show you what those intersections actually look like as a
          working data scientist.
        </motion.p>
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// TakeawayCard -- one of three horizontal cards
// ---------------------------------------------------------------------------
//
// Layout per card (vertically stacked):
//   - Tiny callback icon (~80x60 SVG) at the top.
//   - Throughline headline (large, primary, bold).
//   - Sub-line (small, muted, italic).
//
// Card style mirrors slide 07's SecondaryCard vocabulary -- same
// background, muted border, rounded-lg, generous padding -- so the deck
// reads as continuous.
const TakeawayCard: React.FC<{
  headline: string;
  subline: string;
  delay: number;
  Icon: React.FC;
}> = ({ headline, subline, delay, Icon }) => {
  return (
    <motion.div
      className="rounded-lg flex flex-col h-full"
      style={{
        background: 'var(--color-bg-card)',
        border:
          '1px solid color-mix(in srgb, var(--color-text-muted) 24%, transparent)',
        padding: 'clamp(1.5rem, 2.4vw, 2.2rem) clamp(1.5rem, 2.4vw, 2.2rem)',
        gap: 'clamp(1rem, 2vh, 1.6rem)',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Callback icon -- scaled up to fill the upper region of the card.
          flex-1 lets it claim the empty vertical space; centered both axes so
          the three icons read as anchors at card scale. Fixed aspect so the
          three icons stay visually equivalent across cards. */}
      <div
        className="flex-1 flex items-center justify-center w-full min-h-0"
        aria-hidden
      >
        <div
          style={{
            width: 'min(100%, clamp(16rem, 24vw, 28rem))',
            aspectRatio: '96 / 64',
            maxHeight: '100%',
          }}
        >
          <Icon />
        </div>
      </div>

      {/* Throughline headline -- large, primary. The hero of each card.
          minHeight reserves two lines of headline space across all three
          cards so the title baselines align even when only card 2's title
          actually wraps to two lines. Computed from fontSize * line-height
          (1.15) * 2 lines. */}
      <h2
        className="font-bold leading-[1.15] tracking-tight"
        style={{
          color: 'var(--color-primary)',
          fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
          minHeight: 'calc(clamp(1.6rem, 2.4vw, 2.4rem) * 1.15 * 2)',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        {headline}
      </h2>

      {/* Sub-line -- muted, italic. The story callback. */}
      <p
        className="leading-snug italic"
        style={{
          color: 'var(--color-text-muted)',
          fontSize: 'clamp(1rem, 1.3vw, 1.3rem)',
          opacity: 0.92,
        }}
      >
        {subline}
      </p>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// MudTerminalMark -- Card 1 callback icon (mini CRT terminal)
// ---------------------------------------------------------------------------
//
// A miniature CRT-screen rectangle: thin --color-primary frame with a few
// short --color-success ("phosphor green") lines inside -- a `>` prompt
// followed by 1-2 lines of greek-bar text and a blinking-style cursor block.
//
// Documented --color-success overload (same as slide 03):
//   --color-success encodes era-authentic CRT phosphor here, NOT the deck-
//   wide "right approach / fit / correct" semantic. The contextual CRT frame
//   (rounded rectangle reading as a terminal screen) carries the meaning.
const MudTerminalMark: React.FC = () => {
  return (
    <svg
      viewBox="0 0 96 64"
      className="w-full h-full"
      aria-label="Miniature MUD terminal mark"
    >
      {/* Outer terminal frame in --color-primary. */}
      <rect
        x={2}
        y={2}
        width={92}
        height={60}
        rx={5}
        fill="var(--color-bg-card)"
        stroke="var(--color-primary)"
        strokeOpacity={0.95}
        strokeWidth={2.5}
      />
      {/* Inner screen cavity -- subtle dark fill that reads as the CRT face. */}
      <rect
        x={6}
        y={9}
        width={84}
        height={49}
        rx={3}
        fill="var(--color-bg)"
        fillOpacity={0.85}
      />
      {/* Tiny status-bar dot at top-left of the frame -- micro-cue that says
          "this is a terminal," at frame scale. */}
      <circle
        cx={9}
        cy={6}
        r={1.2}
        fill="var(--color-primary)"
        fillOpacity={0.7}
      />
      <circle
        cx={13}
        cy={6}
        r={1.2}
        fill="var(--color-primary)"
        fillOpacity={0.4}
      />
      <circle
        cx={17}
        cy={6}
        r={1.2}
        fill="var(--color-primary)"
        fillOpacity={0.4}
      />

      {/* Phosphor green text inside the screen -- a `>` prompt and two short
          "greek bar" runs of text suggesting room/combat lines. Rendered as
          rectangles for that "small unreadable squint of text" feel. */}
      {/* Line 1: "> look" -- prompt + a short bar */}
      <text
        x={11}
        y={22}
        fill="var(--color-success)"
        fillOpacity={0.95}
        fontSize={8}
        fontFamily="JetBrains Mono, Fira Code, monospace"
        fontWeight={600}
      >
        &gt;
      </text>
      <rect
        x={18}
        y={17}
        width={26}
        height={3}
        rx={1}
        fill="var(--color-success)"
        fillOpacity={0.75}
      />

      {/* Line 2: longer greek-bar -- room description */}
      <rect
        x={11}
        y={28}
        width={62}
        height={3}
        rx={1}
        fill="var(--color-success)"
        fillOpacity={0.55}
      />

      {/* Line 3: medium greek-bar -- continuation */}
      <rect
        x={11}
        y={35}
        width={48}
        height={3}
        rx={1}
        fill="var(--color-success)"
        fillOpacity={0.55}
      />

      {/* Line 4: prompt + cursor -- "> " followed by a blinking cursor block */}
      <text
        x={11}
        y={49}
        fill="var(--color-success)"
        fillOpacity={0.95}
        fontSize={8}
        fontFamily="JetBrains Mono, Fira Code, monospace"
        fontWeight={600}
      >
        &gt;
      </text>
      <rect
        x={19}
        y={45}
        width={4}
        height={4}
        fill="var(--color-success)"
        fillOpacity={0.95}
      >
        <animate
          attributeName="fill-opacity"
          values="0.95;0;0.95"
          dur="1.1s"
          repeatCount="indefinite"
        />
      </rect>

      {/* Faint scanline striping inside the screen -- only a couple of
          stripes at low opacity, just enough to evoke CRT without being
          loud at this scale. */}
      <line
        x1={6}
        y1={20}
        x2={90}
        y2={20}
        stroke="#000"
        strokeOpacity={0.2}
        strokeWidth={0.5}
      />
      <line
        x1={6}
        y1={32}
        x2={90}
        y2={32}
        stroke="#000"
        strokeOpacity={0.2}
        strokeWidth={0.5}
      />
      <line
        x1={6}
        y1={44}
        x2={90}
        y2={44}
        stroke="#000"
        strokeOpacity={0.2}
        strokeWidth={0.5}
      />
    </svg>
  );
};

// ---------------------------------------------------------------------------
// DashedDangerBranches -- Card 2 callback icon
// ---------------------------------------------------------------------------
//
// Two short dashed branches in --color-danger at low opacity, fanning out
// from a small muted origin dot, each terminating in an X-mark. Compressed
// version of slide 05's PathBranches diagram (corporate / entrepreneurship
// dead ends), at icon scale.
const DashedDangerBranches: React.FC = () => {
  return (
    <svg
      viewBox="0 0 96 64"
      className="w-full h-full"
      aria-label="Two abandoned dashed branches with X-mark terminators"
    >
      {/* Origin dot (small, muted) -- the divergence point. */}
      <circle
        cx={10}
        cy={32}
        r={3}
        fill="var(--color-bg-card)"
        stroke="var(--color-text-muted)"
        strokeOpacity={0.85}
        strokeWidth={1.6}
      />
      <circle
        cx={10}
        cy={32}
        r={1.4}
        fill="var(--color-text-muted)"
        fillOpacity={0.95}
      />

      {/* Upper dashed branch -- danger, dashed. */}
      <path
        d="M 12 32 C 30 32, 50 14, 72 14"
        fill="none"
        stroke="var(--color-danger)"
        strokeOpacity={0.95}
        strokeWidth={3.5}
        strokeDasharray="5 3.5"
        strokeLinecap="round"
      />
      {/* Lower dashed branch */}
      <path
        d="M 12 32 C 30 32, 50 50, 72 50"
        fill="none"
        stroke="var(--color-danger)"
        strokeOpacity={0.95}
        strokeWidth={3.5}
        strokeDasharray="5 3.5"
        strokeLinecap="round"
      />

      {/* Upper X-mark terminator */}
      <g>
        <line
          x1={72 - 6}
          y1={14 - 6}
          x2={72 + 6}
          y2={14 + 6}
          stroke="var(--color-danger)"
          strokeOpacity={1}
          strokeWidth={3.5}
          strokeLinecap="round"
        />
        <line
          x1={72 - 6}
          y1={14 + 6}
          x2={72 + 6}
          y2={14 - 6}
          stroke="var(--color-danger)"
          strokeOpacity={1}
          strokeWidth={3.5}
          strokeLinecap="round"
        />
      </g>

      {/* Lower X-mark terminator */}
      <g>
        <line
          x1={72 - 6}
          y1={50 - 6}
          x2={72 + 6}
          y2={50 + 6}
          stroke="var(--color-danger)"
          strokeOpacity={1}
          strokeWidth={3.5}
          strokeLinecap="round"
        />
        <line
          x1={72 - 6}
          y1={50 + 6}
          x2={72 + 6}
          y2={50 - 6}
          stroke="var(--color-danger)"
          strokeOpacity={1}
          strokeWidth={3.5}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

// ---------------------------------------------------------------------------
// IntersectionMark -- Card 3 callback icon
// ---------------------------------------------------------------------------
//
// Three short converging lines meeting at a single glowing --color-primary
// node. Compressed version of slide 06's IntersectionDiagram. The node sits
// near the right of the icon (where the door opens in slide 06); three
// thin primary lines fan in from the left edge.
const IntersectionMark: React.FC = () => {
  return (
    <svg
      viewBox="0 0 96 64"
      className="w-full h-full"
      aria-label="Three converging lines meeting at a single glowing node"
    >
      <defs>
        <filter
          id="takeaways-intersection-glow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Three converging lines -- top, middle, bottom. All in primary,
          drawn straight (curves would feel busy at icon scale). They meet at
          the apex node on the right. */}
      <line
        x1={6}
        y1={14}
        x2={66}
        y2={32}
        stroke="var(--color-primary)"
        strokeOpacity={1}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <line
        x1={6}
        y1={32}
        x2={66}
        y2={32}
        stroke="var(--color-primary)"
        strokeOpacity={1}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
      <line
        x1={6}
        y1={50}
        x2={66}
        y2={32}
        stroke="var(--color-primary)"
        strokeOpacity={1}
        strokeWidth={3.5}
        strokeLinecap="round"
      />

      {/* Origin dots at the left-edge ends of the three lines --
          they suggest "three threads coming in." */}
      <circle cx={6} cy={14} r={2.6} fill="var(--color-primary)" fillOpacity={0.95} />
      <circle cx={6} cy={32} r={2.6} fill="var(--color-primary)" fillOpacity={0.95} />
      <circle cx={6} cy={50} r={2.6} fill="var(--color-primary)" fillOpacity={0.95} />

      {/* Apex node -- glowing primary. Drawn last so it sits on top of the
          line ends. */}
      <circle
        cx={66}
        cy={32}
        r={8}
        fill="var(--color-primary)"
        fillOpacity={0.3}
        stroke="var(--color-primary)"
        strokeWidth={2.5}
        strokeOpacity={1}
        filter="url(#takeaways-intersection-glow)"
      />
      <circle
        cx={66}
        cy={32}
        r={3}
        fill="var(--color-primary)"
        fillOpacity={1}
      />
    </svg>
  );
};

export default Part1Takeaways;
