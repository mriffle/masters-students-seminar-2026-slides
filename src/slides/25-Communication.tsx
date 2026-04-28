import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 25 — Communication
 *
 * Source: docs/part3_future.md Slide 3.9 + "Communication" raw material.
 *
 * Argument:
 *   Communication is vital now and will be MORE important, not less, because
 *   when AI lowers the floor on producing output, audiences become more
 *   skeptical. The load-bearing question coming next is:
 *     "Did you actually understand this, or did the AI write it?"
 *
 * Visual concept:
 *   A speaker silhouette at a podium on the left. A thought-bubble rising
 *   above the speaker contains a clean reasoning chain
 *     premise → analysis → conclusion
 *   drawn as three connected nodes in --color-primary (the answer side).
 *
 *   On the right, a small audience of figures looks back at the speaker.
 *   Their eyebrows are raised (drawn explicitly) and small question-mark
 *   icons hover above them — visible skepticism.
 *
 *   The headline pull-quote sits between the speaker and the audience,
 *   set in --color-secondary (magenta — emphasis), and rendered at
 *   wordmark scale. The question is the visual centerpiece; the speaker's
 *   reasoning chain is the answer to that question.
 *
 * Color palette (3 accents, within the rule):
 *   --color-secondary  (magenta) — the headline pull-quote (load-bearing Q)
 *   --color-primary    (cyan)    — the speaker's reasoning chain (the answer)
 *   --color-text-muted           — audience figures, podium, supporting elements
 *   --color-text                  — body labels (chain node labels, podium label)
 *
 * Why these colors:
 *   secondary = "emphasis" deck-wide, and this is the load-bearing question
 *   of the slide. primary = "fundamentals / your edge" deck-wide; the speaker's
 *   reasoning chain IS the demonstration of fundamentals — the speaker walking
 *   through their reasoning is what proves understanding. Audience in muted —
 *   they're the foil, not the subject.
 */

// ---------------------------------------------------------------------------
// Geometry — viewBox 1000 x 540
// ---------------------------------------------------------------------------

const VB = { w: 1000, h: 540 };

// Speaker / podium — left side
const PODIUM = {
  cx: 175,
  topY: 320,
  bottomY: 480,
  topW: 110,
  baseW: 150,
};

// Speaker silhouette — stands behind the podium
const SPEAKER = {
  cx: PODIUM.cx,
  headCy: 250,
  headR: 22,
  shoulderY: 282,
  shoulderHalfW: 38,
  bodyBottomY: PODIUM.topY + 6, // tucks into the podium top
};

// Thought bubble — rises above the speaker, tilted toward the question
const BUBBLE = {
  cx: 320,
  cy: 145,
  rx: 220,
  ry: 90,
};

// Reasoning chain nodes inside the bubble
const CHAIN_Y = BUBBLE.cy;
const CHAIN_NODES = [
  { x: BUBBLE.cx - 130, label: 'premise' },
  { x: BUBBLE.cx, label: 'analysis' },
  { x: BUBBLE.cx + 130, label: 'conclusion' },
];
const CHAIN_NODE_R = 26;

// Audience figures — clustered on the right side, lower third
const AUDIENCE_BASE_Y = 430;
const AUDIENCE_FIGURES = [
  { cx: 720, scale: 1.0,  qmOffsetX:  0 },
  { cx: 800, scale: 1.05, qmOffsetX:  2 },
  { cx: 880, scale: 0.95, qmOffsetX: -2 },
  { cx: 960, scale: 1.0,  qmOffsetX:  3 },
];

// ---------------------------------------------------------------------------
// Slide
// ---------------------------------------------------------------------------

const Communication: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <SlideTitle subtitle="When AI lowers the floor on output, audiences get more skeptical.">
        Why Communication Matters More
      </SlideTitle>

      <div className="relative w-full max-w-[94vw] h-[72vh] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          aria-label="A speaker silhouette stands at a podium on the left. A thought bubble above the speaker contains a clean reasoning chain of three connected nodes labeled 'premise', 'analysis', and 'conclusion'. Between the speaker and the audience, a large pull-quote in magenta reads: 'Did you actually understand this, or did the AI write it?' On the right, four audience figures with raised eyebrows and question-mark icons floating above them face the speaker, expressing skepticism."
        >
          <defs>
            {/* Glow filters */}
            <filter
              id="comm-secondary-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id="comm-primary-glow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Arrowhead for chain links */}
            <marker
              id="comm-chain-arrow"
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path
                d="M 0 0 L 10 5 L 0 10 z"
                fill="var(--color-primary)"
                fillOpacity={0.85}
              />
            </marker>
          </defs>

          {/* ============================================================ */}
          {/* SPEAKER + PODIUM (left)                                      */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Speaker silhouette: head */}
            <circle
              cx={SPEAKER.cx}
              cy={SPEAKER.headCy}
              r={SPEAKER.headR}
              fill="var(--color-text-muted)"
              fillOpacity={0.32}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.85}
              strokeWidth={2}
            />
            {/* Speaker silhouette: shoulders + torso (a stylized U/trapezoid) */}
            <path
              d={[
                `M ${SPEAKER.cx - SPEAKER.shoulderHalfW} ${SPEAKER.shoulderY}`,
                // round the top of shoulders
                `Q ${SPEAKER.cx - SPEAKER.shoulderHalfW + 4} ${SPEAKER.shoulderY - 6}`,
                ` ${SPEAKER.cx - SPEAKER.shoulderHalfW + 14} ${SPEAKER.shoulderY - 4}`,
                `L ${SPEAKER.cx + SPEAKER.shoulderHalfW - 14} ${SPEAKER.shoulderY - 4}`,
                `Q ${SPEAKER.cx + SPEAKER.shoulderHalfW - 4} ${SPEAKER.shoulderY - 6}`,
                ` ${SPEAKER.cx + SPEAKER.shoulderHalfW} ${SPEAKER.shoulderY}`,
                `L ${SPEAKER.cx + SPEAKER.shoulderHalfW + 6} ${SPEAKER.bodyBottomY}`,
                `L ${SPEAKER.cx - SPEAKER.shoulderHalfW - 6} ${SPEAKER.bodyBottomY}`,
                'Z',
              ].join(' ')}
              fill="var(--color-text-muted)"
              fillOpacity={0.22}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.8}
              strokeWidth={2}
            />

            {/* Podium — trapezoid front face */}
            <path
              d={[
                `M ${PODIUM.cx - PODIUM.topW / 2} ${PODIUM.topY}`,
                `L ${PODIUM.cx + PODIUM.topW / 2} ${PODIUM.topY}`,
                `L ${PODIUM.cx + PODIUM.baseW / 2} ${PODIUM.bottomY}`,
                `L ${PODIUM.cx - PODIUM.baseW / 2} ${PODIUM.bottomY}`,
                'Z',
              ].join(' ')}
              fill="var(--color-bg-card)"
              stroke="var(--color-text-muted)"
              strokeOpacity={0.7}
              strokeWidth={2}
            />
            {/* Podium top lip */}
            <rect
              x={PODIUM.cx - PODIUM.topW / 2 - 6}
              y={PODIUM.topY - 8}
              width={PODIUM.topW + 12}
              height={10}
              rx={2}
              fill="var(--color-bg-card)"
              stroke="var(--color-text-muted)"
              strokeOpacity={0.78}
              strokeWidth={2}
            />
            {/* Podium small mic / paper hint */}
            <line
              x1={PODIUM.cx - 14}
              y1={PODIUM.topY - 12}
              x2={PODIUM.cx - 14}
              y2={PODIUM.topY - 32}
              stroke="var(--color-text-muted)"
              strokeOpacity={0.7}
              strokeWidth={1.5}
            />
            <circle
              cx={PODIUM.cx - 14}
              cy={PODIUM.topY - 36}
              r={3.5}
              fill="var(--color-text-muted)"
              fillOpacity={0.85}
            />
            {/* Podium label */}
            <text
              x={PODIUM.cx}
              y={PODIUM.bottomY - 18}
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              fill="var(--color-text-muted)"
              fillOpacity={0.85}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
              }}
            >
              you
            </text>
          </motion.g>

          {/* ============================================================ */}
          {/* THOUGHT BUBBLE — speaker's reasoning chain (the answer)     */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Trail of small bubbles connecting speaker head → main bubble */}
            {[
              { cx: SPEAKER.cx + 26, cy: SPEAKER.headCy - 22, r: 4 },
              { cx: SPEAKER.cx + 56, cy: SPEAKER.headCy - 50, r: 6 },
              { cx: SPEAKER.cx + 96, cy: SPEAKER.headCy - 78, r: 8 },
            ].map((b, i) => (
              <circle
                key={`bubble-trail-${i}`}
                cx={b.cx}
                cy={b.cy}
                r={b.r}
                fill="var(--color-primary)"
                fillOpacity={0.10}
                stroke="var(--color-primary)"
                strokeOpacity={0.55}
                strokeWidth={1.25}
              />
            ))}

            {/* Main bubble */}
            <ellipse
              cx={BUBBLE.cx}
              cy={BUBBLE.cy}
              rx={BUBBLE.rx}
              ry={BUBBLE.ry}
              fill="var(--color-primary)"
              fillOpacity={0.08}
              stroke="var(--color-primary)"
              strokeOpacity={0.7}
              strokeWidth={2}
              filter="url(#comm-primary-glow)"
            />
          </motion.g>

          {/* Reasoning chain nodes inside the bubble */}
          {CHAIN_NODES.map((node, i) => (
            <motion.g
              key={`chain-${node.label}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.15 + i * 0.18,
                duration: 0.45,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <circle
                cx={node.x}
                cy={CHAIN_Y}
                r={CHAIN_NODE_R}
                fill="var(--color-bg-card)"
                stroke="var(--color-primary)"
                strokeOpacity={0.95}
                strokeWidth={2}
              />
              <text
                x={node.x}
                y={CHAIN_Y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={10.5}
                fontWeight={700}
                fill="var(--color-text)"
                fillOpacity={0.95}
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: '0.06em',
                }}
              >
                {node.label}
              </text>
            </motion.g>
          ))}

          {/* Chain arrows between nodes */}
          {CHAIN_NODES.slice(0, -1).map((node, i) => {
            const next = CHAIN_NODES[i + 1];
            const x1 = node.x + CHAIN_NODE_R + 2;
            const x2 = next.x - CHAIN_NODE_R - 4;
            return (
              <motion.line
                key={`chain-link-${i}`}
                x1={x1}
                y1={CHAIN_Y}
                x2={x2}
                y2={CHAIN_Y}
                stroke="var(--color-primary)"
                strokeOpacity={0.85}
                strokeWidth={2}
                markerEnd="url(#comm-chain-arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  delay: 1.3 + i * 0.18,
                  duration: 0.45,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            );
          })}

          {/* Bubble caption — what the chain represents */}
          <motion.text
            x={BUBBLE.cx}
            y={BUBBLE.cy + BUBBLE.ry - 16}
            textAnchor="middle"
            fontSize={11}
            fontStyle="italic"
            fill="var(--color-text-muted)"
            fillOpacity={0.85}
            style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 1.7, duration: 0.45 }}
          >
            walking through your reasoning
          </motion.text>

          {/* ============================================================ */}
          {/* HEADLINE PULL-QUOTE (the load-bearing question, secondary)  */}
          {/* ============================================================ */}
          <motion.g
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Open and close quote marks, slightly offset */}
            <text
              x={150}
              y={335}
              fontSize={56}
              fontWeight={800}
              fill="var(--color-secondary)"
              fillOpacity={0.32}
              style={{ fontFamily: 'Georgia, serif' }}
              aria-hidden="true"
            >
              &ldquo;
            </text>

            {/* Line 1 of the question */}
            <text
              x={500}
              y={310}
              textAnchor="middle"
              fontSize={30}
              fontWeight={800}
              fill="var(--color-secondary)"
              filter="url(#comm-secondary-glow)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '-0.005em',
              }}
            >
              Did you actually understand this,
            </text>
            {/* Line 2 of the question */}
            <text
              x={500}
              y={350}
              textAnchor="middle"
              fontSize={30}
              fontWeight={800}
              fill="var(--color-secondary)"
              filter="url(#comm-secondary-glow)"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '-0.005em',
              }}
            >
              or did the AI write it?
            </text>

            <text
              x={840}
              y={365}
              fontSize={56}
              fontWeight={800}
              fill="var(--color-secondary)"
              fillOpacity={0.32}
              style={{ fontFamily: 'Georgia, serif' }}
              aria-hidden="true"
            >
              &rdquo;
            </text>

            {/* Attribution / source frame — what audiences are starting to ask */}
            <text
              x={500}
              y={382}
              textAnchor="middle"
              fontSize={11}
              fontStyle="italic"
              fill="var(--color-text-muted)"
              fillOpacity={0.8}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
            >
              — the question coming next
            </text>
          </motion.g>

          {/* ============================================================ */}
          {/* AUDIENCE (right) — skeptical figures with raised brows + ?s  */}
          {/* ============================================================ */}
          {AUDIENCE_FIGURES.map((fig, i) => {
            const headR = 18 * fig.scale;
            const headCy = AUDIENCE_BASE_Y - 110 * fig.scale;
            const shoulderY = headCy + headR + 6;
            const shoulderHalfW = 30 * fig.scale;
            const bodyBottomY = AUDIENCE_BASE_Y;

            return (
              <motion.g
                key={`audience-${i}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.3 + i * 0.12,
                  duration: 0.55,
                  ease: [0.4, 0, 0.2, 1],
                }}
              >
                {/* Body */}
                <path
                  d={[
                    `M ${fig.cx - shoulderHalfW} ${shoulderY}`,
                    `Q ${fig.cx - shoulderHalfW + 4} ${shoulderY - 6}`,
                    ` ${fig.cx - shoulderHalfW + 12} ${shoulderY - 4}`,
                    `L ${fig.cx + shoulderHalfW - 12} ${shoulderY - 4}`,
                    `Q ${fig.cx + shoulderHalfW - 4} ${shoulderY - 6}`,
                    ` ${fig.cx + shoulderHalfW} ${shoulderY}`,
                    `L ${fig.cx + shoulderHalfW + 4} ${bodyBottomY}`,
                    `L ${fig.cx - shoulderHalfW - 4} ${bodyBottomY}`,
                    'Z',
                  ].join(' ')}
                  fill="var(--color-text-muted)"
                  fillOpacity={0.18}
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.65}
                  strokeWidth={1.5}
                />
                {/* Head */}
                <circle
                  cx={fig.cx}
                  cy={headCy}
                  r={headR}
                  fill="var(--color-text-muted)"
                  fillOpacity={0.28}
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.85}
                  strokeWidth={1.75}
                />
                {/* Raised eyebrows — drawn explicitly */}
                <path
                  d={`M ${fig.cx - headR * 0.55} ${headCy - headR * 0.55}
                      q ${headR * 0.32} ${-headR * 0.28}
                        ${headR * 0.5} 0`}
                  fill="none"
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.95}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                />
                <path
                  d={`M ${fig.cx + headR * 0.05} ${headCy - headR * 0.55}
                      q ${headR * 0.32} ${-headR * 0.28}
                        ${headR * 0.5} 0`}
                  fill="none"
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.95}
                  strokeWidth={1.6}
                  strokeLinecap="round"
                />
                {/* Eyes — small dots */}
                <circle
                  cx={fig.cx - headR * 0.30}
                  cy={headCy - headR * 0.18}
                  r={1.6}
                  fill="var(--color-text-muted)"
                  fillOpacity={0.9}
                />
                <circle
                  cx={fig.cx + headR * 0.30}
                  cy={headCy - headR * 0.18}
                  r={1.6}
                  fill="var(--color-text-muted)"
                  fillOpacity={0.9}
                />
                {/* Slight frown / pursed mouth */}
                <path
                  d={`M ${fig.cx - headR * 0.30} ${headCy + headR * 0.42}
                      q ${headR * 0.30} ${headR * 0.10}
                        ${headR * 0.60} 0`}
                  fill="none"
                  stroke="var(--color-text-muted)"
                  strokeOpacity={0.85}
                  strokeWidth={1.4}
                  strokeLinecap="round"
                />

                {/* Question-mark icon hovering above the head */}
                <motion.g
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.7 + i * 0.12,
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <text
                    x={fig.cx + fig.qmOffsetX}
                    y={headCy - headR - 14}
                    textAnchor="middle"
                    fontSize={26}
                    fontWeight={800}
                    fill="var(--color-secondary)"
                    fillOpacity={0.85}
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    aria-hidden="true"
                  >
                    ?
                  </text>
                </motion.g>
              </motion.g>
            );
          })}

          {/* Audience label — small, muted */}
          <motion.text
            x={840}
            y={AUDIENCE_BASE_Y + 28}
            textAnchor="middle"
            fontSize={11}
            fontWeight={700}
            fill="var(--color-text-muted)"
            fillOpacity={0.85}
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 2.0, duration: 0.45 }}
          >
            audience
          </motion.text>

          {/* Floor line — anchors podium and audience in the same room */}
          <motion.line
            x1={60}
            y1={490}
            x2={VB.w - 60}
            y2={490}
            stroke="var(--color-text-muted)"
            strokeOpacity={0.18}
            strokeWidth={1}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          />
        </svg>
      </div>
    </SlideContainer>
  );
};

export default Communication;

/*
 * Tradeoffs / open questions:
 *
 *  - Title chosen: "Why Communication Matters More" — leans into the argument
 *    rather than the bare topic. "Communication" alone was the alt; the
 *    chosen form does more work to set up the question. Subtitle states the
 *    mechanism directly: AI lowers the floor on output → audience asks "did
 *    you actually understand this?".
 *
 *  - Color budget = 3 accents (secondary, primary, muted) — within the rule.
 *    secondary carries the load-bearing pull-quote because the deck has
 *    already established secondary = emphasis. primary carries the speaker's
 *    reasoning chain because the deck has established primary = fundamentals,
 *    and walking through reasoning IS the demonstration of fundamentals.
 *    muted carries the audience and podium so the visual hierarchy reads:
 *    QUESTION first (magenta center), ANSWER second (cyan chain), audience as
 *    the foil.
 *
 *  - Pull-quote placement: between the speaker (with their reasoning chain)
 *    on the left and the skeptical audience on the right — the question
 *    literally sits in the air between speaker and audience, which is where
 *    it lives. Drawn at wordmark scale (30pt SVG text) with a soft glow.
 *
 *  - Audience skepticism: drawn with explicit raised eyebrows (curved arcs
 *    above each face), pursed mouths, and floating "?" icons in secondary.
 *    Four figures, slightly varied in scale to avoid robot-uniformity.
 *    Rendered in muted so they read as a group, not as protagonists.
 *
 *  - Reasoning chain content: premise → analysis → conclusion. Three nodes
 *    is the minimum for "chain" to read; "premise/analysis/conclusion" maps
 *    the universal shape of a defensible argument (the speaker can plug any
 *    actual reasoning into this template when delivering).
 *
 *  - Bubble caption "walking through your reasoning" lifts directly from the
 *    Slide 25 Conveys list ("walking through reasoning, defending choices,
 *    translating findings"). Kept terse so the chain shapes do the work.
 *
 *  - The pull-quote question text: "Did you actually understand this, or
 *    did the AI write it?" — verbatim from docs/part3_future.md raw material
 *    and from the Slide 25 brief. Punctuation/casing preserved exactly.
 *    Broken across two lines for visual balance (line 1 longer, line 2 the
 *    AI-write-it punch).
 */
