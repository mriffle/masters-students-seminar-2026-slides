import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 03 - The Side Obsession: MUDs
 *
 * Headline-anecdote setup for Part 1. Two beats merged:
 *   1. Engineering -> Biology (first pivot, chose interest over plan)
 *   2. The MUD obsession that LOOKED unproductive (the payoff lands on slide 04)
 *
 * Visual hierarchy:
 *   - Hero: a CRT-styled terminal panel running an animated MUD session
 *     (era-authentic late-90s feel, monospaced phosphor green text, scanlines,
 *     subtle screen curvature/glow, faux bezel).
 *   - Supporting: a small horizontal path diagram above the terminal showing
 *     Engineering (abandoned, dashed/muted) -> Biology (pursued, solid) with a
 *     side branch to MUDs/LPC (the side obsession, glowing primary). This
 *     ESTABLISHES the branching-path motif for slides 04-07.
 *
 * Color budget (3 accent max):
 *   - --color-primary  -> path diagram pursued/glowing nodes, MUD branch glow
 *   - --color-success  -> CRT phosphor green for the terminal text.
 *   - --color-text-muted -> abandoned/dashed branches, faded labels
 *
 * --color-success overload (acknowledged):
 *   This slide overloads --color-success (deck-wide meaning: "right approach /
 *   fit / correct") for CRT phosphor terminal text. The contextual frame --
 *   faux CRT bezel, scanlines, terminal status bar reading
 *   "zMUD 6.16 -- midgaard.org:4000  CONNECTED", and DikuMUD-flavored session
 *   content -- makes the audience read this as "phosphor green CRT," not as
 *   "the speaker was correct to obsess over MUDs." The contextual frame
 *   carries the meaning here; the deck-wide semantic of --color-success is
 *   not violated for the audience.
 *
 * Animation:
 *   - The MUD session reveals one line at a time on a ~600ms cadence, with
 *     a blinking cursor on the active line. After the full session reveals
 *     (and a hold), the buffer clears and the loop restarts so the slide
 *     stays alive if it sits on screen. The reveal is JSX-driven (no script).
 */

// --- MUD session content (era-authentic; ~14 lines, terse) ---
// A small encounter in a fantasy MUD: room description, combat, status line.
// Mixes player input (prefixed with `> `) and server output, the way a real
// telnet MUD client logs would have looked in 1998-1999.
type Line = { kind: 'sys' | 'cmd' | 'room' | 'combat' | 'status'; text: string };

const MUD_SESSION: Line[] = [
  { kind: 'sys', text: 'Connected to midgaard.org 4000.' },
  { kind: 'cmd', text: '> look' },
  { kind: 'room', text: 'The Town Square of Midgaard' },
  { kind: 'room', text: 'A wide cobblestone plaza, lit by flickering torches. A' },
  { kind: 'room', text: 'dusty road leads north to the city gates. A grizzled' },
  { kind: 'room', text: 'orc warrior stands here, glaring at you.' },
  { kind: 'sys', text: 'Exits: north south east west' },
  { kind: 'cmd', text: '> attack orc' },
  { kind: 'combat', text: 'You swing your steel sword at a grizzled orc warrior.' },
  { kind: 'combat', text: 'You hit a grizzled orc warrior hard.' },
  { kind: 'combat', text: 'A grizzled orc warrior misses you.' },
  { kind: 'cmd', text: '> cast \'magic missile\' orc' },
  { kind: 'combat', text: 'A grizzled orc warrior is DEAD!' },
  { kind: 'status', text: 'HP: 78/100  MP: 42/50  EXP: 1389' },
];

// Cadence (ms) per line type. Commands type slightly faster than server output
// to feel like the player is hammering keys.
const LINE_DELAY_MS = (kind: Line['kind']): number => {
  switch (kind) {
    case 'cmd':
      return 480;
    case 'sys':
      return 420;
    case 'room':
      return 520;
    case 'combat':
      return 600;
    case 'status':
      return 700;
  }
};

const HOLD_AFTER_COMPLETE_MS = 3500; // pause on full buffer before looping

const colorForKind = (kind: Line['kind']): string => {
  // Phosphor green for almost everything. The status line gets a slightly
  // brighter tint (rendered as pure --color-success) so the player feels the
  // beat. Commands are rendered slightly dimmer to suggest "echoed input."
  switch (kind) {
    case 'cmd':
      return 'var(--color-success)';
    case 'status':
      return 'var(--color-success)';
    default:
      return 'var(--color-success)';
  }
};

const opacityForKind = (kind: Line['kind']): number => {
  switch (kind) {
    case 'cmd':
      return 0.95;
    case 'sys':
      return 0.7;
    case 'room':
      return 0.9;
    case 'combat':
      return 0.92;
    case 'status':
      return 1.0;
  }
};

/** Animated MUD terminal -- reveals lines one at a time, then loops. */
const MudTerminal: React.FC = () => {
  const [revealed, setRevealed] = useState(0); // number of lines visible

  useEffect(() => {
    let cancelled = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const scheduleNext = (idx: number) => {
      if (cancelled) return;
      if (idx >= MUD_SESSION.length) {
        // Full buffer is up. Hold, then clear and restart the loop.
        timer = setTimeout(() => {
          if (cancelled) return;
          setRevealed(0);
          // Brief blank-screen beat before re-typing.
          timer = setTimeout(() => {
            if (cancelled) return;
            setRevealed(1);
            scheduleNext(1);
          }, 700);
        }, HOLD_AFTER_COMPLETE_MS);
        return;
      }
      const delay = LINE_DELAY_MS(MUD_SESSION[idx - 1].kind);
      timer = setTimeout(() => {
        if (cancelled) return;
        setRevealed(idx + 1);
        scheduleNext(idx + 1);
      }, delay);
    };

    // Kick off: show the first line after a short initial beat.
    timer = setTimeout(() => {
      if (cancelled) return;
      setRevealed(1);
      scheduleNext(1);
    }, 900);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Outer faux CRT bezel (chrome-ish dark plastic). */}
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          background:
            'linear-gradient(160deg, var(--color-bg-card) 0%, var(--color-bg) 55%, var(--color-bg-alt) 100%)',
          boxShadow:
            '0 12px 40px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      />
      {/* Inner screen cavity */}
      <div
        className="absolute rounded-xl overflow-hidden"
        style={{
          inset: '18px',
          background:
            'radial-gradient(ellipse at center, #03130a 0%, #020a06 65%, #010604 100%)',
          boxShadow:
            'inset 0 0 60px rgba(0, 230, 118, 0.12), inset 0 0 18px rgba(0,0,0,0.7)',
        }}
      >
        {/* Phosphor glow wash */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, rgba(0, 230, 118, 0.10), transparent 65%)',
          }}
        />

        {/* Scanlines: stacked thin horizontal stripes */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, rgba(0,0,0,0.0) 0px, rgba(0,0,0,0.0) 2px, rgba(0,0,0,0.28) 3px, rgba(0,0,0,0.0) 4px)',
            mixBlendMode: 'multiply',
          }}
        />

        {/* Subtle screen curvature: a vignette at the corners */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* Top status bar of the "client" -- adds period flavor without
            distracting. Purely decorative. */}
        <div
          className="absolute top-0 left-0 right-0 px-4 py-1.5 flex items-center justify-between text-[10px] font-mono"
          style={{
            color: 'var(--color-success)',
            opacity: 0.55,
            borderBottom: '1px solid rgba(0, 230, 118, 0.18)',
            background: 'rgba(0, 0, 0, 0.35)',
            letterSpacing: '0.08em',
          }}
        >
          <span>zMUD 6.16 -- midgaard.org:4000</span>
          <span className="hidden md:inline">CONNECTED</span>
        </div>

        {/* Terminal text body */}
        <div
          className="absolute left-0 right-0 bottom-0 px-5 md:px-7 pt-9 pb-5 font-mono leading-[1.45] text-[13px] md:text-[15px] lg:text-[16px]"
          style={{
            top: 0,
            // Faint phosphor text-shadow on every line via text-shadow attr.
            textShadow:
              '0 0 4px rgba(0, 230, 118, 0.55), 0 0 10px rgba(0, 230, 118, 0.25)',
          }}
        >
          {MUD_SESSION.slice(0, revealed).map((line, i) => (
            <motion.div
              key={`${revealed}-${i}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: opacityForKind(line.kind) }}
              transition={{ duration: 0.18 }}
              style={{
                color: colorForKind(line.kind),
                whiteSpace: 'pre',
              }}
            >
              {line.text}
              {i === revealed - 1 && (
                <span
                  className="inline-block ml-1 align-middle"
                  style={{
                    width: '0.55em',
                    height: '1em',
                    background: 'var(--color-success)',
                    opacity: 0.9,
                    animation: 'mud-cursor-blink 1s steps(1) infinite',
                    boxShadow: '0 0 6px rgba(0,230,118,0.8)',
                    verticalAlign: '-0.12em',
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom edge specular highlight to suggest glass */}
        <div
          className="absolute left-0 right-0 bottom-0 h-3 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(255,255,255,0.04), transparent)',
          }}
        />
      </div>

      {/* Inline keyframes for the cursor blink (CSS-only, infinite) */}
      <style>{`
        @keyframes mud-cursor-blink {
          0%, 49% { opacity: 0.9; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

// --- Path diagram (motif establishment for slides 04-07) ---
//
// Horizontal layout:
//   [Engineering] ---dashed/muted--->  (abandoned)
//                  \
//                   ---> [Biology] ---solid---> (continues right, off-frame)
//                                  \
//                                   ---glow---> [MUDs / LPC]   <-- side obsession
//
// The Engineering node sits to the upper-left, dimmed; a dashed muted line
// connects it to the Biology node (the pivot). Biology continues forward as a
// solid line. A side branch leaves Biology and lands on the MUD/LPC node,
// which glows in --color-primary -- this is "where the action is."
const PathDiagram: React.FC = () => {
  // viewBox geometry (logical units)
  // 0..800 wide, 0..220 tall -- shrunk from 1000x200 so each viewBox unit
  // maps to more pixels, making fonts/strokes render larger at the same
  // numeric values. Round 2: more aggressive sizing pass.
  const ENG = { x: 70, y: 110 };
  const BIO = { x: 380, y: 110 };
  const MUD = { x: 670, y: 75 };
  const FORWARD = { x: 790, y: 145 }; // off-frame continuation tail

  return (
    <svg
      viewBox="0 0 800 220"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Path: engineering (abandoned), pivot to biology, side obsession in MUDs/LPC"
    >
      <defs>
        <filter id="mud-node-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Engineering -> Biology connector (dashed, muted -- the abandoned
          plan). Drawn first so nodes overlay it. */}
      <motion.line
        x1={ENG.x}
        y1={ENG.y}
        x2={BIO.x}
        y2={BIO.y}
        stroke="var(--color-text-muted)"
        strokeWidth={5}
        strokeOpacity={0.75}
        strokeDasharray="12 10"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.75 }}
        transition={{ delay: 0.55, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Biology -> forward (solid, primary -- the pursued path continues
          off-frame; slide 04 picks up here). */}
      <motion.line
        x1={BIO.x}
        y1={BIO.y}
        x2={FORWARD.x}
        y2={FORWARD.y}
        stroke="var(--color-primary)"
        strokeWidth={6}
        strokeOpacity={0.85}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ delay: 0.85, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Biology -> MUDs side branch (solid, glowing primary -- the side
          obsession, "where the action is"). Curved upward to read as a fork. */}
      <motion.path
        d={`M ${BIO.x} ${BIO.y} C ${BIO.x + 110} ${BIO.y}, ${MUD.x - 100} ${MUD.y}, ${MUD.x} ${MUD.y}`}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth={7}
        strokeOpacity={1}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ delay: 1.05, duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
        filter="url(#mud-node-glow)"
      />

      {/* Engineering node (abandoned, dim) */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <circle
          cx={ENG.x}
          cy={ENG.y}
          r={20}
          fill="var(--color-bg-card)"
          stroke="var(--color-text-muted)"
          strokeOpacity={0.9}
          strokeWidth={4}
          strokeDasharray="6 5"
        />
        <text
          x={ENG.x}
          y={ENG.y - 38}
          fill="var(--color-text)"
          fillOpacity={1}
          fontSize={38}
          fontWeight={700}
          textAnchor="middle"
          letterSpacing={1.2}
        >
          Engineering
        </text>
      </motion.g>

      {/* Biology node (pursued, primary) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        style={{ transformOrigin: `${BIO.x}px ${BIO.y}px` }}
      >
        <circle
          cx={BIO.x}
          cy={BIO.y}
          r={24}
          fill="var(--color-primary)"
          fillOpacity={0.25}
          stroke="var(--color-primary)"
          strokeWidth={5}
        />
        <text
          x={BIO.x}
          y={BIO.y - 42}
          fill="var(--color-text)"
          fontSize={40}
          fontWeight={800}
          textAnchor="middle"
          letterSpacing={1.2}
        >
          Biology
        </text>
      </motion.g>

      {/* MUD/LPC node (the side obsession, glowing) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: `${MUD.x}px ${MUD.y}px` }}
      >
        <circle
          cx={MUD.x}
          cy={MUD.y}
          r={28}
          fill="var(--color-primary)"
          fillOpacity={0.35}
          stroke="var(--color-primary)"
          strokeWidth={6}
          filter="url(#mud-node-glow)"
        />
        <circle
          cx={MUD.x}
          cy={MUD.y}
          r={11}
          fill="var(--color-primary)"
          opacity={1}
        />
        <text
          x={MUD.x}
          y={MUD.y - 48}
          fill="var(--color-primary)"
          fontSize={40}
          fontWeight={900}
          textAnchor="middle"
          letterSpacing={1.8}
          filter="url(#mud-node-glow)"
        >
          MUDs / LPC
        </text>
        <text
          x={MUD.x}
          y={MUD.y + 88}
          fill="var(--color-primary)"
          fillOpacity={1}
          fontSize={28}
          fontWeight={700}
          textAnchor="middle"
          letterSpacing={1.2}
        >
          side obsession
        </text>
      </motion.g>

      {/* "Pivot" tag floating above the Eng->Bio connector, in muted text,
          to make the abandoned-engineering reading legible without words on
          the slide proper. */}
      <motion.text
        x={(ENG.x + BIO.x) / 2}
        y={ENG.y - 60}
        fill="var(--color-text)"
        fillOpacity={1}
        fontSize={32}
        fontWeight={700}
        textAnchor="middle"
        letterSpacing={1.2}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        pivot
      </motion.text>
    </svg>
  );
};

/**
 * Unavoidable physical-material color literals (documented exceptions).
 *
 * The two groups below cannot be expressed via existing palette variables and
 * are therefore retained as raw literals. They are localized to this slide
 * and exist purely to render the CRT physical-material illusion.
 *
 * (a) CRT screen-cavity dark-green hex values:
 *       #03130a, #020a06, #010604
 *     CRT physical-material colors -- a very dark green-tinted black backing
 *     the phosphor text. No clean palette equivalent (the deck has no
 *     "near-black-green" variable). Localized to the screen-cavity gradient
 *     only.
 *
 * (b) rgba(0, 230, 118, X) literals (five occurrences):
 *     Encoded --color-success (#00e676) for surfaces requiring alpha
 *     composition. CSS rgba() cannot take a CSS variable without a
 *     channel-split, so these literals must mirror --color-success.
 *     IF --color-success CHANGES IN src/styles/global.css, THESE LITERALS
 *     MUST BE UPDATED TO MATCH.
 */
const MudObsession: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-[92vw] h-full flex flex-col items-center justify-start gap-2">
        <SlideTitle subtitle="Late 1990s. Supposed to be doing biology.">
          The Side Obsession
        </SlideTitle>

        {/* Path diagram: horizontal strip just below the title.
            Establishes the branching-path motif that slides 04-07 will reuse.
            Round 2: stretched to full container width and given more vertical
            space so labels and node markers no longer feel under-weighted
            against the large terminal hero below. */}
        <motion.div
          className="w-full h-[21vh]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <PathDiagram />
        </motion.div>

        {/* Hero: the CRT-styled MUD terminal */}
        <motion.div
          className="relative w-full max-w-[78vw] h-[55vh] mt-1"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <MudTerminal />
        </motion.div>
      </div>
    </SlideContainer>
  );
};

export default MudObsession;
