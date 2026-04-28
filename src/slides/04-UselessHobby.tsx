import React from 'react';
import { motion } from 'framer-motion';
import SlideContainer from '../components/SlideContainer';
import SlideTitle from '../components/SlideTitle';
import type { SlideProps } from '../types';

/**
 * Slide 04 - How a "Useless" Hobby Got Me Hired
 *
 * The single most important story in Part 1. Two beats:
 *   1. CONNECTION: A Seattle startup was using Spinner -- a web server coded
 *      in microLPC, the same language family as the speaker's MUD hobby. He
 *      was hired specifically because of the obscure obsession.
 *   2. CHAT-ROOM: Built possibly the FIRST web-based persistent chat-room
 *      system (public/private/semi-private rooms, invitations) -- and it
 *      predated the social-network era by years.
 *
 * Visual layout:
 *   - Top: connection diagram (path/node grammar continued from slide 03)
 *       [MUDs / LPC]  --(same language family)-->  [Spinner / microLPC]
 *           |                                              |
 *           +------- speaker brings the hobby --->  [chat-room mock]
 *     The MUDs/LPC and Spinner/microLPC nodes share an "LPC family" badge so
 *     the language-family bridge is visually obvious. Chat-room is rendered
 *     as a small browser-styled UI mock with three rooms (public / private /
 *     semi-private), users inside, lock icons.
 *   - Middle: a one-line caption -- the lesson, stated explicitly.
 *   - Bottom: horizontal timeline showing the GAP -- the speaker's chat
 *     rooms first, then a long muted stretch, then Friendster (2002),
 *     MySpace (2003), Facebook (2004) appearing far later in muted text.
 *
 * Motif continuity with slide 03 (branching-path/intersection):
 *   - Pursued path: solid stroke in --color-primary at ~0.55 opacity for
 *     directional connectors.
 *   - "Where the action is" node: --color-primary at full opacity with
 *     Gaussian glow filter, larger node radius (the chat-room destination).
 *   - Italic muted text for trajectory annotations ("same language family",
 *     "speaker's chat rooms", "social networks arrive years later").
 *   - Same defs/glow filter pattern (Gaussian blur + feMerge).
 *
 * Color budget (3 accent max):
 *   - --color-primary  -> the speaker's pursued path: LPC, Spinner, chat
 *     room destination, the speaker's timeline marker.
 *   - --color-text-muted -> the social-network markers, the timeline
 *     backbone, abandoned/secondary annotations.
 *   - --color-text -> the lesson caption (primary text).
 *   No secondary/tertiary/success/danger accents are introduced.
 */

const UselessHobby: React.FC<SlideProps> = () => {
  return (
    <SlideContainer>
      <div className="w-full max-w-[92vw] h-full flex flex-col items-center justify-start gap-2">
        <div className="-mb-6">
          <SlideTitle subtitle="Spinner · microLPC · the first persistent web chat">
            How a "Useless" Hobby Got Me Hired
          </SlideTitle>
        </div>

        {/* Connection diagram: LPC --(same family)--> Spinner -> chat-room */}
        <motion.div
          className="w-full max-w-[92vw] h-[50vh]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <ConnectionDiagram />
        </motion.div>

        {/* Lesson caption: the explicit takeaway. */}
        <motion.p
          className="text-center font-light tracking-wide max-w-[80vw] leading-snug"
          style={{
            color: 'var(--color-text)',
            fontSize: '1.15rem',
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          The "useless" thing you're obsessed with
          <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            {' '}is often where your edge comes from.
          </span>
        </motion.p>

        {/* Timeline: speaker's chat rooms first, then the gap, then social
            networks arriving years later in muted text. The visual punchline
            is the gap. */}
        <motion.div
          className="w-full max-w-[86vw] h-[18vh] mt-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.85, duration: 0.7 }}
        >
          <GapTimeline />
        </motion.div>
      </div>
    </SlideContainer>
  );
};

// ---------------------------------------------------------------------------
// Connection diagram
// ---------------------------------------------------------------------------
//
// Three nodes laid out left-to-right, with a "LPC family" bracket spanning
// the first two so the language-family bridge is visually obvious.
//
//   [MUDs / LPC]                     [Spinner / microLPC]
//        \________ same language ________/
//                  |
//                  | speaker brings the hobby
//                  v
//                  [ chat-room mock ]   <-- glowing destination
//
// Geometry uses a 1000 x 380 viewBox.
const ConnectionDiagram: React.FC = () => {
  const LPC = { x: 160, y: 130 };
  // SPN is shifted slightly left so its italic sub-label
  // ("Seattle startup's web server") clears the left edge of the chat-room
  // panel without being clipped.
  const SPN = { x: 500, y: 130 };
  const CHAT = { cx: 820, cy: 270, w: 340, h: 230 }; // box geometry
  // Anchor at the center of the chat-room box's left edge.
  const CHAT_LEFT = { x: CHAT.cx - CHAT.w / 2, y: CHAT.cy };
  // Where the family-bridge meets (midpoint between LPC and SPN).
  const BRIDGE_MID = { x: (LPC.x + SPN.x) / 2, y: LPC.y };

  return (
    <svg
      viewBox="0 0 1000 420"
      className="w-full h-full"
      aria-label="Connection diagram: MUDs/LPC and Spinner/microLPC are the same language family; the speaker built a persistent chat-room system on Spinner."
    >
      <defs>
        <filter id="useless-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="useless-glow-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* "LPC family" bracket: a thin curved bracket beneath the two top
          nodes, with an italic muted label. Bracket itself is in --color-
          primary so the audience reads "these two nodes share a family". */}
      <motion.path
        d={`M ${LPC.x} ${LPC.y + 60} C ${LPC.x} ${LPC.y + 96}, ${SPN.x} ${SPN.y + 96}, ${SPN.x} ${SPN.y + 60}`}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth={1.8}
        strokeOpacity={0.7}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ delay: 0.95, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* Tiny tick descending from the bracket midpoint to anchor the label */}
      <motion.line
        x1={BRIDGE_MID.x}
        y1={BRIDGE_MID.y + 92}
        x2={BRIDGE_MID.x}
        y2={BRIDGE_MID.y + 102}
        stroke="var(--color-primary)"
        strokeOpacity={0.7}
        strokeWidth={1.8}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.15, duration: 0.4 }}
      />
      <motion.text
        x={BRIDGE_MID.x}
        y={BRIDGE_MID.y + 122}
        textAnchor="middle"
        fill="var(--color-text)"
        fontSize={20}
        fontWeight={500}
        fontStyle="italic"
        letterSpacing={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.95 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        same language family
      </motion.text>

      {/* Path from Spinner down to the chat-room box (the deliverable the
          speaker built on top of Spinner). Solid primary, glowing. */}
      <motion.path
        d={`M ${SPN.x} ${SPN.y + 18} C ${SPN.x} ${SPN.y + 90}, ${CHAT_LEFT.x - 80} ${CHAT_LEFT.y - 40}, ${CHAT_LEFT.x} ${CHAT_LEFT.y}`}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth={2.4}
        strokeOpacity={0.75}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.75 }}
        transition={{ delay: 1.35, duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* Arrowhead at the chat-room box edge */}
      <motion.polygon
        points={`${CHAT_LEFT.x - 10},${CHAT_LEFT.y - 5} ${CHAT_LEFT.x},${CHAT_LEFT.y} ${CHAT_LEFT.x - 10},${CHAT_LEFT.y + 5}`}
        fill="var(--color-primary)"
        fillOpacity={0.9}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 2.0, duration: 0.4 }}
      />
      {/* Italic annotation along the connector. Centered above the
          chat-room panel so it does not collide with it. */}
      <motion.text
        x={CHAT.cx}
        y={CHAT.cy - CHAT.h / 2 - 22}
        textAnchor="middle"
        fill="var(--color-text)"
        fontSize={20}
        fontWeight={500}
        fontStyle="italic"
        letterSpacing={1}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.95 }}
        transition={{ delay: 1.7, duration: 0.5 }}
      >
        baked persistence into webapps
      </motion.text>

      {/* MUDs / LPC node (the speaker's hobby; glowing primary) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{ transformOrigin: `${LPC.x}px ${LPC.y}px` }}
      >
        <circle
          cx={LPC.x}
          cy={LPC.y}
          r={14}
          fill="var(--color-primary)"
          fillOpacity={0.28}
          stroke="var(--color-primary)"
          strokeWidth={2.5}
          filter="url(#useless-glow)"
        />
        <circle
          cx={LPC.x}
          cy={LPC.y}
          r={5}
          fill="var(--color-primary)"
          opacity={0.95}
        />
        <text
          x={LPC.x}
          y={LPC.y - 30}
          fill="var(--color-primary)"
          fontSize={20}
          fontWeight={700}
          textAnchor="middle"
          letterSpacing={1.5}
          filter="url(#useless-glow-soft)"
        >
          MUDs / LPC
        </text>
        <text
          x={LPC.x}
          y={LPC.y + 36}
          fill="var(--color-text)"
          fontSize={18}
          fontWeight={500}
          fontStyle="italic"
          textAnchor="middle"
          letterSpacing={1}
          opacity={0.9}
        >
          the obsession
        </text>
      </motion.g>

      {/* Spinner / microLPC node (the bridge -- same language family) */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.75, duration: 0.5 }}
        style={{ transformOrigin: `${SPN.x}px ${SPN.y}px` }}
      >
        <circle
          cx={SPN.x}
          cy={SPN.y}
          r={13}
          fill="var(--color-primary)"
          fillOpacity={0.18}
          stroke="var(--color-primary)"
          strokeWidth={2.2}
        />
        <circle
          cx={SPN.x}
          cy={SPN.y}
          r={4}
          fill="var(--color-primary)"
          opacity={0.85}
        />
        <text
          x={SPN.x}
          y={SPN.y - 30}
          fill="var(--color-text)"
          fontSize={20}
          fontWeight={700}
          textAnchor="middle"
          letterSpacing={1.2}
        >
          Spinner / microLPC
        </text>
        <text
          x={SPN.x}
          y={SPN.y + 36}
          fill="var(--color-text)"
          fontSize={16}
          fontWeight={500}
          fontStyle="italic"
          textAnchor="middle"
          letterSpacing={0.4}
          opacity={0.9}
        >
          Seattle startup's web server
        </text>
      </motion.g>

      {/* Chat-room mock (the destination -- what the speaker built).
          Browser-window-styled box with a title bar, three rooms with users
          and lock icons. Glowing as the "where the action is" node. */}
      <ChatRoomMock
        cx={CHAT.cx}
        cy={CHAT.cy}
        w={CHAT.w}
        h={CHAT.h}
        delay={1.45}
      />
    </svg>
  );
};

// ---------------------------------------------------------------------------
// Chat-room mock (sub-component of ConnectionDiagram)
// ---------------------------------------------------------------------------
//
// A small browser-window-styled UI box containing three "rooms":
//   - "#general"             public         (no lock)
//   - "#dev-talk"            semi-private   (half-lock / open lock)
//   - "@invite-only"         private        (locked)
// Each room shows a few user dots inside.
const ChatRoomMock: React.FC<{
  cx: number;
  cy: number;
  w: number;
  h: number;
  delay: number;
}> = ({ cx, cy, w, h, delay }) => {
  const x = cx - w / 2;
  const y = cy - h / 2;

  // Title bar geometry
  const titleH = 24;
  const titleY = y;
  const bodyY = y + titleH;
  const bodyH = h - titleH;

  // Room rows inside the body
  const roomCount = 3;
  const roomGap = 6;
  const roomPad = 10;
  const roomH = (bodyH - roomPad * 2 - roomGap * (roomCount - 1)) / roomCount;
  const roomX = x + roomPad;
  const roomW = w - roomPad * 2;

  const rooms: Array<{
    name: string;
    privacy: 'public' | 'semi' | 'private';
    users: number;
  }> = [
    { name: '#general', privacy: 'public', users: 5 },
    { name: '#dev-talk', privacy: 'semi', users: 3 },
    { name: '@invite-only', privacy: 'private', users: 2 },
  ];

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
      filter="url(#useless-glow-soft)"
    >
      {/* Outer box (the "browser window") */}
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill="var(--color-bg-card)"
        stroke="var(--color-primary)"
        strokeWidth={2}
        strokeOpacity={0.95}
      />
      {/* Title bar */}
      <rect
        x={x}
        y={titleY}
        width={w}
        height={titleH}
        rx={10}
        fill="var(--color-primary)"
        fillOpacity={0.14}
      />
      {/* Window dots (decorative, not interactive) */}
      <circle cx={x + 12} cy={titleY + titleH / 2} r={3} fill="var(--color-primary)" fillOpacity={0.5} />
      <circle cx={x + 24} cy={titleY + titleH / 2} r={3} fill="var(--color-primary)" fillOpacity={0.35} />
      <circle cx={x + 36} cy={titleY + titleH / 2} r={3} fill="var(--color-primary)" fillOpacity={0.25} />
      <text
        x={x + w / 2}
        y={titleY + titleH / 2 + 4}
        textAnchor="middle"
        fontSize={11}
        fontWeight={600}
        fill="var(--color-primary)"
        letterSpacing={1.5}
      >
        chat-rooms
      </text>

      {/* Bottom-of-title divider */}
      <line
        x1={x}
        y1={bodyY}
        x2={x + w}
        y2={bodyY}
        stroke="var(--color-primary)"
        strokeOpacity={0.3}
        strokeWidth={1}
      />

      {/* Rooms */}
      {rooms.map((room, i) => {
        const ry = bodyY + roomPad + i * (roomH + roomGap);
        return (
          <g key={room.name}>
            <rect
              x={roomX}
              y={ry}
              width={roomW}
              height={roomH}
              rx={6}
              fill="var(--color-primary)"
              fillOpacity={0.06}
              stroke="var(--color-primary)"
              strokeOpacity={0.4}
              strokeWidth={1}
            />
            {/* Room name */}
            <text
              x={roomX + 10}
              y={ry + roomH / 2 + 4}
              fontSize={11}
              fontWeight={600}
              fill="var(--color-primary)"
              fillOpacity={0.95}
              letterSpacing={0.6}
              fontFamily="JetBrains Mono, Fira Code, monospace"
            >
              {room.name}
            </text>
            {/* Users (small dots) */}
            <g>
              {Array.from({ length: room.users }).map((_, ui) => (
                <circle
                  key={ui}
                  cx={roomX + roomW - 50 - ui * 8}
                  cy={ry + roomH / 2}
                  r={2.6}
                  fill="var(--color-primary)"
                  fillOpacity={0.85}
                />
              ))}
            </g>
            {/* Privacy lock icon at the right edge */}
            <PrivacyIcon
              x={roomX + roomW - 16}
              y={ry + roomH / 2}
              privacy={room.privacy}
            />
          </g>
        );
      })}
    </motion.g>
  );
};

// Lock icon variants: open (public), ajar (semi), closed (private).
const PrivacyIcon: React.FC<{
  x: number;
  y: number;
  privacy: 'public' | 'semi' | 'private';
}> = ({ x, y, privacy }) => {
  // Body rect
  const bw = 9;
  const bh = 7;
  const bx = x - bw / 2;
  const by = y - 1;
  const opacity =
    privacy === 'private' ? 0.95 : privacy === 'semi' ? 0.7 : 0.45;

  // Shackle shape (semicircle on top of the body)
  let shackleD: string;
  if (privacy === 'private') {
    // Closed shackle: full arc both feet planted on the body top.
    shackleD = `M ${bx + 1} ${by} v -2 a ${bw / 2 - 1} ${bw / 2 - 1} 0 0 1 ${bw - 2} 0 v 2`;
  } else if (privacy === 'semi') {
    // Ajar: right foot lifted slightly.
    shackleD = `M ${bx + 1} ${by} v -2 a ${bw / 2 - 1} ${bw / 2 - 1} 0 0 1 ${bw - 2} 0 v -1`;
  } else {
    // Open: right foot fully lifted off the body.
    shackleD = `M ${bx + 1} ${by} v -2 a ${bw / 2 - 1} ${bw / 2 - 1} 0 0 1 ${bw - 2} 0 v -3`;
  }

  return (
    <g>
      <rect
        x={bx}
        y={by}
        width={bw}
        height={bh}
        rx={1.5}
        fill="var(--color-primary)"
        fillOpacity={opacity * 0.4}
        stroke="var(--color-primary)"
        strokeOpacity={opacity}
        strokeWidth={1}
      />
      <path
        d={shackleD}
        fill="none"
        stroke="var(--color-primary)"
        strokeOpacity={opacity}
        strokeWidth={1}
        strokeLinecap="round"
      />
    </g>
  );
};

// ---------------------------------------------------------------------------
// Gap timeline
// ---------------------------------------------------------------------------
//
// A horizontal timeline. The speaker's chat-rooms marker sits on the far left
// in --color-primary; a long, mostly empty stretch of muted timeline follows;
// then Friendster (2002), MySpace (2003), Facebook (2004) appear bunched on
// the far right in muted text. The visual punchline is the GAP.
const GapTimeline: React.FC = () => {
  // viewBox: 1000 x 160. Backbone runs at y = 90.
  const yAxis = 90;
  const xLeft = 60;
  const xRight = 940;

  // Speaker marker
  const SPEAKER_X = 110; // far-left anchor

  // Social network markers (bunched far right). 2002 .. 2004 scale.
  const SOCIAL_X_FRIENDSTER = 700;
  const SOCIAL_X_MYSPACE = 800;
  const SOCIAL_X_FACEBOOK = 900;

  return (
    <svg
      viewBox="0 0 1000 160"
      className="w-full h-full"
      aria-label="Timeline: speaker's chat rooms came years before Friendster (2002), MySpace (2003), Facebook (2004)."
    >
      <defs>
        <filter id="timeline-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Backbone (muted timeline line) */}
      <motion.line
        x1={xLeft}
        y1={yAxis}
        x2={xRight}
        y2={yAxis}
        stroke="var(--color-text-muted)"
        strokeOpacity={0.7}
        strokeWidth={1.8}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.7 }}
        transition={{ delay: 0.1, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* Backbone arrowhead on the right (time flows forward) */}
      <motion.polygon
        points={`${xRight - 8},${yAxis - 4} ${xRight},${yAxis} ${xRight - 8},${yAxis + 4}`}
        fill="var(--color-text-muted)"
        fillOpacity={0.8}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      />

      {/* Italic annotation across the gap, above the backbone. Anchored to
          the right side of the gap (just left of the social-network cluster)
          so it does not collide with the "speaker's chat rooms" marker label
          on the left. Slightly tighter letter spacing keeps it inside the
          available gap width. */}
      <motion.text
        x={SOCIAL_X_FRIENDSTER - 20}
        y={yAxis - 30}
        textAnchor="end"
        fill="var(--color-text)"
        fontSize={18}
        fontWeight={500}
        fontStyle="italic"
        letterSpacing={0.6}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.95 }}
        transition={{ delay: 0.85, duration: 0.5 }}
      >
        years of empty space before anything else like it
      </motion.text>

      {/* Speaker's marker: glowing primary, larger, with label above and date
          range below. */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        style={{ transformOrigin: `${SPEAKER_X}px ${yAxis}px` }}
      >
        {/* Vertical tick on the backbone */}
        <line
          x1={SPEAKER_X}
          y1={yAxis - 14}
          x2={SPEAKER_X}
          y2={yAxis + 14}
          stroke="var(--color-primary)"
          strokeOpacity={0.9}
          strokeWidth={2}
        />
        <circle
          cx={SPEAKER_X}
          cy={yAxis}
          r={8}
          fill="var(--color-primary)"
          fillOpacity={0.3}
          stroke="var(--color-primary)"
          strokeWidth={2}
          filter="url(#timeline-glow)"
        />
        <circle
          cx={SPEAKER_X}
          cy={yAxis}
          r={3}
          fill="var(--color-primary)"
        />
        <text
          x={SPEAKER_X}
          y={yAxis - 26}
          textAnchor="middle"
          fill="var(--color-primary)"
          fontSize={18}
          fontWeight={700}
          letterSpacing={1.2}
          filter="url(#timeline-glow)"
        >
          speaker's chat rooms
        </text>
        <text
          x={SPEAKER_X}
          y={yAxis + 36}
          textAnchor="middle"
          fill="var(--color-text)"
          fontSize={16}
          fontWeight={500}
          fontStyle="italic"
          letterSpacing={1}
          opacity={0.9}
        >
          late 1990s
        </text>
      </motion.g>

      {/* Social-network markers, bunched far right, in muted text. */}
      {[
        { x: SOCIAL_X_FRIENDSTER, label: 'Friendster', date: '2002' },
        { x: SOCIAL_X_MYSPACE, label: 'MySpace', date: '2003' },
        { x: SOCIAL_X_FACEBOOK, label: 'Facebook', date: '2004' },
      ].map((m, i) => (
        <motion.g
          key={m.label}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 + i * 0.15, duration: 0.45 }}
        >
          <line
            x1={m.x}
            y1={yAxis - 8}
            x2={m.x}
            y2={yAxis + 8}
            stroke="var(--color-text-muted)"
            strokeOpacity={0.6}
            strokeWidth={1.2}
          />
          <circle
            cx={m.x}
            cy={yAxis}
            r={3.5}
            fill="var(--color-bg)"
            stroke="var(--color-text-muted)"
            strokeOpacity={0.7}
            strokeWidth={1.2}
          />
          <text
            x={m.x}
            y={yAxis + 28}
            textAnchor="middle"
            fill="var(--color-text)"
            fontSize={16}
            fontWeight={600}
            letterSpacing={1}
            opacity={0.9}
          >
            {m.label}
          </text>
          <text
            x={m.x}
            y={yAxis + 48}
            textAnchor="middle"
            fill="var(--color-text)"
            fillOpacity={0.85}
            fontSize={15}
            fontStyle="italic"
            fontWeight={500}
            letterSpacing={1}
          >
            {m.date}
          </text>
        </motion.g>
      ))}
    </svg>
  );
};

export default UselessHobby;
