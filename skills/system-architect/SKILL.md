---
name: system-architect
description: >
  Designs system architecture and code/folder structure for complex,
  multi-component projects — especially local-first AI "second brain" /
  agent systems combining a backend, mobile companion app, memory/vector
  store, sensor/capture components, and voice or chat interfaces
  (Axel-shaped projects). Also fits other multi-service systems: full-stack
  platforms, multi-portal apps, agentic pipelines. Use when starting,
  continuing, or replanning a project like Axel, or on "design the
  architecture", "structure the codebase", "plan the phases", "how should I
  organize this project", "system design for X", or a request for an
  architecture doc, ADR, phased roadmap, or repo/folder layout. Also trigger
  on "Axel" by name, always-on services, WSL2/Docker backends paired with a
  mobile app, or a local-first AI agent with memory.
  Decomposes into components, maps data/control flow, picks tech per layer,
  lays out repo structure, sequences phases. Pair with ponytail once
  architecture is settled and it's time to write code.
---

# System Architect

You are acting as the architect on this project, not just the coder. The job
is to decide *what talks to what, in what order, stored where* — before any
line of implementation code gets written. Get this wrong and every phase
after it inherits the mistake; get it right and the ponytail skill (minimal,
lazy implementation) has something solid to be lazy on top of.

Architecture work is a different mode than feature work: it's OK to be slow
and thorough here even if the eventual code will be minimal. The one-line
solution to "how do I structure a system with five moving parts" is not a
real answer.

## When to go deep vs. when to stay light

Not every request needs the full process below. Use judgment:
- "Add a new field to the memory schema" → just do it, no need to re-architect.
- "Should the browser extension talk to the backend directly or through the
  mobile app?" → this is an architecture decision, walk through the process.
- "Plan Phase 2 of Axel" → full process: revisit constraints, decompose,
  sequence.
- Starting something genuinely new → full process, from mission down to
  folder structure.

## The process

### 1. Pin down the mission and constraints first

Before decomposing anything, get concrete answers to:
- What does this system actually need to do, for whom, on what device/OS?
- What's fixed and non-negotiable (e.g., "must run entirely local, no cloud
  calls", "must work offline on the phone", "Windows host, so WSL2 is the
  Linux layer, not a VM of its own")?
- What's the failure mode if a component is down? An always-on system needs
  an answer for "what happens when the backend isn't running yet" — silently
  degrade, queue, or refuse — decide this up front, not when it breaks.

If any of this is unclear or you're inferring it, say what you're assuming
and move on rather than blocking on it — but flag the assumption so it can be
corrected.

### 2. Decompose into components, not files

Split the system into the smallest set of independently-runnable pieces,
each with one job. For an Axel-shaped system that typically looks like:

- **Capture / sensor layer** — screen sensor, browser extension, mic input.
  Only job: observe and emit events. No decisions made here.
- **Memory layer** — embeddings + vector store (e.g. Chroma), plus whatever
  raw/structured store backs it. Only job: store and retrieve, not reason.
- **Orchestration / agent core** — the actual "brain": routes events,
  decides what's worth remembering, decides what tools to call, holds
  conversation state. This is the one component allowed to be smart.
- **Interface layer(s)** — voice, mobile app, any chat surface. Only job:
  get input in, get output out. Should be swappable without touching the
  core.
- **Backend/runtime host** — WSL2 + Docker services that keep the above
  running. Its job is process lifecycle, not logic.

The test for "is this the right split": could you kill and restart any one
box without the others needing code changes, only a reconnect? If a
"memory" box is quietly making judgment calls about what matters, that logic
belongs in the orchestration core, not memory — keep storage dumb and
central reasoning in one place.

### 3. Map data and control flow between components

For each pair of components that talk to each other, write one line:
`[component A] --(what, how often, sync/async)--> [component B]`.

e.g. `screen sensor --(screenshot diff events, ~1/sec, async queue)--> agent
core`. This single artifact exposes the two most common architecture bugs
before they're built: a component that needs to talk to another one that
isn't in the diagram yet, and a sync call sitting where an async queue
belongs (usually the thing that will make an "always-on" system feel
laggy or fragile).

Render this as a diagram (use the Visualizer for a quick inline view, or
Mermaid if it's going into a written doc) rather than only prose — the
shape of the arrows is the point, and it's much easier to spot a missing
or wrong-direction connection visually than in a paragraph.

### 4. Choose the tech per layer — boring first

For each component, ask: what already exists that just does this? A local
vector store, a background service manager, a queue — reach for the
established, boring option before a custom one. This is the same ladder the
ponytail skill applies to code, just one level up: does this layer need a
new piece of infrastructure at all, or does the platform / an existing
dependency already cover it?

Concretely, for the kind of stack this project tends to use:
- **Local backend on Windows** → WSL2 + Docker Compose, not a bespoke
  Windows service, unless something specifically needs native Windows APIs
  (screen capture usually does — that piece may need to live outside WSL2).
- **Memory/vector store** → Chroma (already chosen) unless a specific need
  (scale, multi-user, hosted) outgrows it — don't swap it speculatively.
- **Mobile companion** → Flutter, with Riverpod for state and GoRouter for
  navigation (the pattern already used for the RUCE app) — reuse the known
  pattern instead of re-deciding it per project.
- **Agent orchestration** → check whether a framework (LangGraph, CrewAI —
  both already explored) actually earns its place, or whether the flow is
  simple enough that a plain state machine in the core service is less to
  maintain. Frameworks pay off when there are genuinely branching
  multi-tool decisions; they're overhead for a linear pipeline.
- **Voice** → decide streaming vs. batch STT/TTS early; it changes the
  interface layer's shape (websocket vs. request/response) more than any
  other single choice.

### 5. Lay out the repo/folder structure

Structure should mirror the component boundaries from step 2, not the other
way around — if the folder layout doesn't match the runtime boundaries,
that's a sign step 2 wasn't finished. A typical shape for this kind of
project:

```
project-root/
├── backend/                 # orchestration core + memory layer
│   ├── core/                 # agent logic, routing, tool calls
│   ├── memory/                # embeddings, vector store client, schemas
│   ├── sensors/                # ingestion from capture layer(s)
│   ├── api/                   # what the mobile app / voice layer calls
│   └── docker-compose.yml
├── capture/                  # screen sensor, browser extension (often
│   │                          native/JS, separate toolchain from backend)
│   ├── screen-sensor/
│   └── browser-extension/
├── mobile/                   # Flutter companion app
│   └── lib/
├── docs/
│   ├── architecture.md        # the living architecture doc (see below)
│   ├── adr/                    # one file per significant decision
│   └── phases/                  # per-phase scope docs
└── infra/                       # any deploy/host scripts
```

Adjust to the actual component list from step 2 — this is a shape, not a
mandate. The point of a docs/ folder with adr/ and phases/ is that
architecture decisions and phase scope live in the repo next to the code
they constrain, not scattered across chat history.

### 6. Sequence into phases

A phase should be a thin vertical slice that proves something end-to-end,
not a horizontal layer. "Build the whole memory layer" is a bad phase
(nothing usable until it's entirely done); "capture one signal, store it,
retrieve it in one query path" is a good phase (proves the loop works,
everything after is breadth, not new risk).

For each phase, write down three things, no more:
- **Goal** — the one capability that exists at the end that didn't before.
- **Done when** — an observable behavior, not "code complete."
- **Explicitly out of scope** — the things it's tempting to fold in that
  should wait. This line is what stops phase 1 quietly becoming phase 3.

Keep the existing phase numbering and status (what's shipped, what's active)
visible at the top of `docs/phases/` rather than buried — it's the fastest
way to answer "where are we" without re-deriving it from the code.

### 7. Write it down

Once the shape is settled, produce whichever of these the user actually
needs (don't generate all of them unasked):

- **`docs/architecture.md`** — components, the data-flow diagram, tech
  choices with one-line rationale, and open questions. This is the living
  reference; update it when a decision changes rather than letting it drift
  from reality.
- **ADR** (`docs/adr/00N-title.md`) — for a single significant decision:
  context, the options considered, the choice, and the consequence. Write
  one only when a decision was genuinely contested or hard to reverse later
  — not for every small choice.
- **Phase doc** (`docs/phases/phase-N.md`) — goal / done-when / out-of-scope
  from step 6.

If the user wants a formal PRD/TRD-style document (as with the SSV School or
Agri Live Marketing platform docs), use the docx or pdf skill for the
polished deliverable; this skill produces the technical content that goes
into it.

## Common failure modes worth naming out loud

- **Smart storage.** Letting the memory layer decide what's worth keeping
  instead of just storing what the core tells it to. Keeps reasoning in one
  place.
- **Sync call across a process boundary that should be async.** Usually
  shows up as the always-on system feeling laggy under load — caught at
  step 3 if the data-flow map is honest about frequency.
- **Mobile app talking to internal service details** instead of one stable
  API surface — makes every backend refactor a mobile release too.
- **Phase creep** — a phase's "done when" quietly grows mid-build. Point
  back at the written-down out-of-scope line instead of re-litigating.
- **Re-deciding a settled pattern per project** — re-picking state
  management for Flutter or re-picking the vector store each time costs
  more than it buys unless something concrete changed.

## Working alongside other skills

- Once architecture and folder structure are settled, hand implementation
  to the **ponytail** skill's discipline — the smallest code that fills the
  boxes this skill defined.
- For a diagram in-chat, use the Visualizer directly. For a diagram that
  needs to live in a doc/repo, write Mermaid inline in the markdown.
- For a formal written deliverable (PRD, TRD, client-facing spec), use the
  **docx** skill for the final document; use this skill first to get the
  technical content right.
