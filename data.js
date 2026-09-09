// ==========================================================================
//  data.js — Content Layer & Single Source of Truth for Studio Portfolio
// ==========================================================================

window.STUDIO = {
  profile: {
    name: "Studio",
    title: "Product Designer & Thinker",
    tagline: "I turn complex ideas into simple, intuitive experiences.",
    bio: "UI/UX designer, product thinker, and writer exploring the space between people, technology, and ideas. Currently focused on AI interaction design, systems architecture, and high-craft digital experiences.",
    email: "hello@studio.example",
    location: "San Francisco, CA / Remote",
    availability: "Available for select advisory & design leadership",
    socials: {
      LinkedIn: "https://linkedin.com/in/example",
      Behance: "https://behance.net/example",
      Dribbble: "https://dribbble.com/example",
      GitHub: "https://github.com/example",
      X: "https://x.com/example"
    }
  },

  principles: [
    {
      n: "01",
      t: "Start with the problem.",
      d: "Most design failures begin with a solution looking for a problem. We fall in love with novelty before we understand the friction."
    },
    {
      n: "02",
      t: "Complexity behind the surface.",
      d: "If the user feels the complexity, the design hasn't done its job. The highest craft is making intricate orchestration appear effortless."
    },
    {
      n: "03",
      t: "Good UX is invisible.",
      d: "The best interfaces disappear into the task. When flow is broken, people notice the UI; when flow succeeds, they only notice their own velocity."
    },
    {
      n: "04",
      t: "Words are part of the interface.",
      d: "Microcopy, labels, empty states, and errors aren't decorative additions; they are the primary mental model of the product."
    },
    {
      n: "05",
      t: "Prototype before defending.",
      d: "A working prototype ends more arguments than a slide deck. When you can touch an interaction, intuition replaces speculation."
    },
    {
      n: "06",
      t: "Technology is a material.",
      d: "AI, sensors, latent spaces, and latency are design materials like wood, ink, and paper. Learn their grain and treat them with respect."
    }
  ],

  about: {
    story: [
      "I believe the greatest software does not feel like software at all — it feels like an extension of thought.",
      "Over the past 6+ years, I have worked across the stack from generative AI interfaces and enterprise telemetry to public infrastructure and healthcare systems. My approach merges rigorous systems thinking with editorial typographic discipline.",
      "Before building interfaces, I studied literature and cognitive science. That foundation taught me that interface design is primarily the craft of translating human intention into mechanical response without losing the nuance of either."
    ],
    interests: [
      { t: "Design", n: "Interfaces, design systems, typography & spatial ergonomics." },
      { t: "Product", n: "Product strategy, roadmap scoping, metric trade-offs & discovery." },
      { t: "Writing", n: "Essays, technical microcopy, editorial storytelling & fragments." },
      { t: "AI / ML", n: "Co-authoring patterns, confidence states, RAG ergonomics & agents." },
      { t: "Systems", n: "State machines, distributed workflows, data density & pipelines." },
      { t: "Visuals", n: "Editorial art direction, generative geometry, motion & palette craft." },
      { t: "Building", n: "Functional prototypes, interactive micro-tools, creative code & web." }
    ],
    human: [
      { t: "Currently learning", d: "Vector embeddings, latent space visualization, and generative audio synthesis." },
      { t: "Currently building", d: "A minimal desktop distraction-free distraction journal and an LLM prompt evaluation tool." },
      { t: "Currently reading", d: "“The Design of Everyday Things” by Don Norman (re-read), and essays by Paul Graham on craft." },
      { t: "Currently thinking about", d: "How interfaces should gracefully degrade when AI models produce ambiguous or uncertain outputs." }
    ],
    orbit: [
      { title: "Interface Design", tag: "Core", radius: 85, speed: 28 },
      { title: "Design Systems", tag: "Craft", radius: 130, speed: 38 },
      { title: "Interaction Models", tag: "AI", radius: 180, speed: 48 },
      { title: "Information Arch", tag: "UX", radius: 220, speed: 56 },
      { title: "Creative Coding", tag: "Dev", radius: 260, speed: 64 },
      { title: "Microcopy Craft", tag: "Words", radius: 295, speed: 72 }
    ]
  },

  projects: [
    {
      slug: "kriya",
      n: "01",
      title: "Kriya",
      year: "2024",
      category: "AI / Government Services / Orchestration",
      filterCategory: "ai",
      role: "Product UX, Systems Design, Prototyping",
      thesis: "Simplifying access to complex government workflows.",
      cover: { 
        tone: "clay", 
        accent: "#c06f50",
        svg: `<svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" class="cover-svg">
          <circle cx="60" cy="90" r="28" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-dasharray="3 3"/>
          <circle cx="60" cy="90" r="14" fill="rgba(255,255,255,0.85)"/>
          <path d="M88 90 H136" stroke="rgba(255,255,255,0.6)" stroke-width="1.5" marker-end="url(#arrow)"/>
          <rect x="136" y="60" width="70" height="60" rx="8" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.75)" stroke-width="1.5"/>
          <line x1="148" y1="78" x2="194" y2="78" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-linecap="round"/>
          <line x1="148" y1="92" x2="182" y2="92" stroke="rgba(255,255,255,0.5)" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M206 90 H248" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
          <circle cx="270" cy="90" r="22" fill="rgba(255,255,255,0.9)"/>
          <path d="M264 90 L268 94 L276 86" stroke="#c06f50" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`
      },
      metrics: [
        { label: "Completion Rate", value: "+64%" },
        { label: "Time-to-File", value: "3.2m vs 24m" },
        { label: "Citizen Satisfaction", value: "4.8 / 5.0" }
      ],
      problem: "Government services are usually a maze of forms, disjointed PDFs, and disconnected regional departments. Citizens give up halfway, resulting in backlogs, manual in-person visits, and profound civic frustration. Kriya explored a single orchestrated layer that turns multi-step bureaucratic processes into a calm, guided experience.",
      idea: "A single conversational + form-based surface that orchestrates multiple back-office services. The user expresses intent in natural language; the system automatically resolves cross-department prerequisites, handles routing, validates attachments on the fly, and tracks status.",
      process: [
        "Stakeholder mapping across 3 state departments and civil registry systems",
        "Comprehensive service blueprint of the existing 14-step paper and legacy portal flow",
        "Information architecture for a unified civic 'front door'",
        "Wireframes exploring conversational guidance combined with structured state cards",
        "High-fidelity prototypes in Figma coupled with a functional coded prototype in HTML/JS",
        "Two rounds of rigorous usability testing with 8 citizens across diverse age groups"
      ],
      design: [
        "A calm home dashboard that shows active applications, pending steps, and what the system is waiting on.",
        "An intent-based entry point ('I need to renew my municipal license') instead of an intimidating department directory.",
        "A live status timeline that explains what happened, what is happening right now, and what comes next in plain human language.",
        "Smart document intake with instant edge validation, preventing erroneous submissions before they hit civil workers."
      ],
      learned: "The hardest part of designing for government is not the UI. It's the seams between departments. The interface must make those seams invisible without hiding the truth or accountability from the citizen.",
      nextSlug: "unidash"
    },
    {
      slug: "unidash",
      n: "02",
      title: "UniDash",
      year: "2023",
      category: "Dashboard / Data / Product",
      filterCategory: "data",
      role: "Product Design, UX Research, Prototyping",
      thesis: "A dashboard that explains itself, instead of demanding interpretation.",
      cover: { 
        tone: "ink", 
        accent: "#2d3748",
        svg: `<svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" class="cover-svg">
          <rect x="40" y="45" width="240" height="90" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
          <path d="M60 110 L100 95 L140 102 L180 75 L220 80 L260 60" stroke="#df8866" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="260" cy="60" r="4" fill="#df8866"/>
          <rect x="165" y="55" width="60" height="18" rx="4" fill="rgba(223,136,102,0.25)" stroke="#df8866" stroke-width="1"/>
          <text x="172" y="68" fill="#fff" font-size="10" font-family="Inter, sans-serif" font-weight="600">+28.4% Δ</text>
        </svg>`
      },
      metrics: [
        { label: "Time-to-Decision", value: "-72%" },
        { label: "Executive Adoption", value: "91%" },
        { label: "Weekly Queries Saved", value: "14 hrs/team" }
      ],
      problem: "Most dashboards show walls of numbers, colorful sparklines, and disconnected bar charts. Few explain them. Operators spend hours deciphering what anomalous spikes mean and debating causation before taking action. UniDash was an exploration of how a data product could narrate its own state — surfacing what changed, why it changed, and what to do about it.",
      idea: "A modular, narrative-first data workspace where every visualization is paired with a concise natural-language explainer: the change delta, the probable root cause, and a recommended tactical next step.",
      process: [
        "Audit of 12 existing enterprise telemetry and analytics dashboards",
        "Card-sorting and information hierarchy exercise with 14 data analysts and team leads",
        "Component library built specifically for 'self-explaining' data widgets",
        "High-fidelity interactive prototype with realistic time-series mutations",
        "Comparative usability sessions measuring decision-making speed and comprehension confidence"
      ],
      design: [
        "Widget taxonomy divided into 4 clear cognitive types: Status, Trend, Anomaly, and Forecast.",
        "Each widget pairs a high-contrast micro-chart with a 1-sentence narrative verdict.",
        "Inline actions ('Why?', 'What changed?', 'Simulate rollback') that unfold a 3-bullet breakdown.",
        "A 'Daily Brief' morning view that distills twenty operational metrics down to the top 3 requiring human intervention."
      ],
      learned: "Data products should optimize for time-to-decision, not time-to-insight. An insightful chart without operational direction is merely a decoration, not a tool.",
      nextSlug: "ratemyshift"
    },
    {
      slug: "ratemyshift",
      n: "03",
      title: "RateMyShift",
      year: "2023",
      category: "Healthcare / Feedback / Workforce",
      filterCategory: "healthcare",
      role: "Product UX, Research, Service Design",
      thesis: "Giving shift workers a voice without adding to their cognitive burden.",
      cover: { 
        tone: "moss", 
        accent: "#465d49",
        svg: `<svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" class="cover-svg">
          <circle cx="90" cy="90" r="26" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
          <path d="M80 92 C80 92, 86 82, 90 82 C94 82, 100 92, 100 92" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          <circle cx="160" cy="90" r="26" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
          <line x1="150" y1="90" x2="170" y2="90" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          <circle cx="230" cy="90" r="30" fill="rgba(255,255,255,0.9)" stroke="#fff" stroke-width="2"/>
          <path d="M220 86 C220 86, 225 96, 230 96 C235 96, 240 86, 240 86" stroke="#465d49" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`
      },
      metrics: [
        { label: "Daily Participation", value: "84%" },
        { label: "Avg Submission Time", value: "9.4 sec" },
        { label: "Retention Impact", value: "+18%" }
      ],
      problem: "Healthcare shift workers and bedside nurses are surveyed constantly by HR, but rarely see visible changes. Exhausted after a 12-hour trauma rotation, nobody wants to fill out a 20-question survey. RateMyShift explored a lightweight, in-the-moment feedback loop that respects precious time, emotional bandwidth, and psychological safety.",
      idea: "A 10-second end-of-shift micro-survey with tactile tap-based sentiments, adaptive branching questions, and an open, public accountability loop that shows which hospital policies were updated as a direct result.",
      process: [
        "In-depth qualitative interviews with 11 nurses, ward attendants, and clinical leads",
        "Mapping existing institutional feedback channels and emotional friction points",
        "Rapid prototyping of an end-of-shift flow completed entirely with single thumb taps under 15 seconds",
        "Privacy and trust architecture: 100% anonymous by default with cryptographic zero-knowledge guarantees",
        "Co-design of the public response loop with hospital administration"
      ],
      design: [
        "Three-tap initial sentiment entry (rough / neutral / energizing) with custom haptic response.",
        "Contextual smart prompts that only expand if the worker reports friction or unsafe staffing ratios.",
        "A public 'What Changed' ward board showing tangible actions taken from previous weeks.",
        "An anonymized managerial intelligence view that identifies burnout clusters without revealing staff identities."
      ],
      learned: "Feedback tools fail when the feedback loop is a black hole. Frontline workers will share candidly when they can visibly witness that speaking up directly improves their tomorrow.",
      nextSlug: "healthcare-concept"
    },
    {
      slug: "healthcare-concept",
      n: "04",
      title: "Healthcare Product Concept",
      year: "2022",
      category: "Healthcare / UX / Systems",
      filterCategory: "healthcare",
      role: "Concept, UX, Prototyping",
      thesis: "Rethinking the patient intake experience for complex longitudinal care.",
      cover: { 
        tone: "sand", 
        accent: "#8b7a66",
        svg: `<svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" class="cover-svg">
          <rect x="50" y="50" width="100" height="80" rx="8" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
          <line x1="65" y1="70" x2="110" y2="70" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
          <line x1="65" y1="84" x2="135" y2="84" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round"/>
          <line x1="65" y1="98" x2="120" y2="98" stroke="rgba(255,255,255,0.7)" stroke-width="1.5" stroke-linecap="round"/>
          <path d="M165 90 H195" stroke="rgba(255,255,255,0.8)" stroke-width="2" stroke-dasharray="4 3"/>
          <rect x="205" y="60" width="70" height="60" rx="8" fill="rgba(255,255,255,0.9)"/>
          <circle cx="240" cy="84" r="12" fill="#8b7a66"/>
          <line x1="222" y1="104" x2="258" y2="104" stroke="#8b7a66" stroke-width="2" stroke-linecap="round"/>
        </svg>`
      },
      metrics: [
        { label: "Intake Duration", value: "60s vs 12m" },
        { label: "Doctor Prep Speed", value: "30s summary" },
        { label: "History Accuracy", value: "98.5%" }
      ],
      problem: "Patients navigating chronic illnesses repeatedly answer identical questions on clipboards in sterile waiting rooms. Intake forms are long, cold, disconnected from past medical encounters, and rarely synthesized into actionable briefs for the attending physician.",
      idea: "A persistent patient health narrative that pre-fills previous records, updates incrementally, and travels seamlessly across care specialists — accompanied by an AI clinician brief that summarizes recent delta changes in under 30 seconds.",
      process: [
        "Shadowing 4 outpatient clinics over 2 weeks to observe patient-physician intake dynamics",
        "Mapping the patient journey from pre-visit home anxiety to exam room consultation",
        "Designing a 'living profile' data model that balances medical precision with human clarity",
        "Simultaneous high-fidelity prototyping of both patient mobile views and doctor desktop tablets",
        "Usability validation with 12 chronic care patients and 3 board-certified clinicians"
      ],
      design: [
        "A patient app that captures symptom changes and daily medications in 60 seconds with progressive disclosure.",
        "A clinician visual card that highlights 'What changed since your last visit 4 months ago'.",
        "Shared vocabulary: the patient and doctor view identical terminology, democratizing medical agency.",
        "Intelligent voice-to-structured-summary transcription during physical examinations."
      ],
      learned: "Healthcare UX is fundamentally not a button or layout problem. It is an information trust problem. The interface is simply the visible boundary of a complex negotiation between vulnerable humans and rigid institutions.",
      nextSlug: "ai-experiments"
    },
    {
      slug: "ai-experiments",
      n: "05",
      title: "AI Product Experiments",
      year: "2024",
      category: "AI / Interaction / Prototyping",
      filterCategory: "ai",
      role: "Concept, Interaction, Prototyping",
      thesis: "Exploring how interfaces fundamentally transform when AI is a co-author.",
      cover: { 
        tone: "rust", 
        accent: "#9a4c2d",
        svg: `<svg viewBox="0 0 320 180" fill="none" xmlns="http://www.w3.org/2000/svg" class="cover-svg">
          <circle cx="160" cy="90" r="50" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-dasharray="4 4"/>
          <circle cx="160" cy="90" r="32" stroke="rgba(255,255,255,0.6)" stroke-width="1.5"/>
          <circle cx="160" cy="90" r="16" fill="rgba(255,255,255,0.9)"/>
          <line x1="80" y1="90" x2="115" y2="90" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round"/>
          <line x1="205" y1="90" x2="240" y2="90" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round"/>
          <line x1="160" y1="25" x2="160" y2="50" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round"/>
          <line x1="160" y1="130" x2="160" y2="155" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round"/>
        </svg>`
      },
      metrics: [
        { label: "Prototypes Built", value: "6 sandboxes" },
        { label: "User Studies", value: "32 participants" },
        { label: "Open-source stars", value: "2.4k" }
      ],
      problem: "Most AI software is still being built as static legacy web forms with an awkward chatbot sidebar tacked on. This series of experimental prototypes asked: what does a graphical interface look like when the computational model is a co-author, not merely an asynchronous chatbot?",
      idea: "A suite of interaction primitives: streaming canvas editors, intent-driven direct manipulation, visible probabilistic confidence rings, and instantaneous reversible time-travel debugging.",
      process: [
        "Systematic literature review of modern Human-Computer Interaction (HCI) and LLM latency research",
        "Engineering 6 working browser prototypes exploring different token-streaming patterns",
        "Weekly critique sessions with senior interaction designers and ML research engineers",
        "Public write-ups and viral demo releases exploring failure states as creative material"
      ],
      design: [
        "A canvas workspace where text doesn't dump into a chat bubble, but streams dynamically into contextual blocks.",
        "A transparent 'Why this response' inspector that surfaces citation provenance and token certainty.",
        "An atomic undo engine: every AI generation has a branched timeline that can be rewound or forked.",
        "Graceful degradation: visual cues that communicate model ambiguity before the user relies on a hallucinated premise."
      ],
      learned: "AI interfaces must never pretend to be infallible magic. People trust and utilize systems far more effectively when the interface is radically honest about uncertainty, attribution, and model limits.",
      nextSlug: "kriya"
    }
  ],

  articles: [
    {
      slug: "good-interfaces-feel-obvious",
      title: "Why good interfaces feel obvious",
      date: "Nov 4, 2024",
      read: "5 min read",
      tag: "Design Philosophy",
      excerpt: "Obvious is not the same as simple. It is the hard-won result of dozens of discarded decisions the user never has to see.",
      body: [
        "When we say an interface 'feels obvious,' we usually mean we didn't have to pause to construct a mental model of how it works. Our fingers moved, the screen responded, and our goal was reached without cognitive stutter.",
        "Yet simplicity is an illusion. The apparent obviousness of a well-crafted product is never a natural state — it is the residue of hundreds of discarded alternatives, endless debates over button ergonomics, and rigorous reduction of visual noise.",
        "In this essay, I examine why obviousness is the highest and most difficult craft in software design, and how to tell the difference between true clarity and superficial minimalism.",
        "### The Trap of Superficial Minimalism",
        "Many design teams confuse minimalism with subtraction. They remove labels, hide critical controls inside cryptic hamburger menus, and replace unambiguous text with faint gray icons. The result looks clean on a presentation slide, but feels impenetrable in daily usage.",
        "True obviousness does not hide tools; it places them exactly where the hand reaches instinctively. It honors affordance. When a knob wants to turn, you give it depth; when a button triggers a permanent action, you give it gravity.",
        "### Cognitive Momentum",
        "Every interaction has inertia. When an interface respects the user's momentum, questions dissolve before they can be voiced. We achieve this by:",
        "1. **Pre-empting the next thought**: If someone copies an address, the subsequent screen should anticipate navigation or sharing.",
        "2. **Harmonizing vocabulary**: Using standard terms instead of reinventing internal company jargon.",
        "3. **Clear feedback loops**: Acknowledging state transitions within 100 milliseconds so the nervous system never wonders if a click registered.",
        "### The Designer as an Invisible Filter",
        "As designers, our primary responsibility is to absorb the ambient chaos of engineering constraints, business objectives, and technical edge cases — and refract only the calmest, most inevitable essence toward the human on the other side of the glass.",
        "When your design succeeds, no one will congratulate you on the interface. They will simply feel capable, fast, and empowered. That is the ultimate metric of craft."
      ]
    },
    {
      slug: "designing-for-uncertainty",
      title: "Designing for uncertainty in generative UI",
      date: "Oct 18, 2024",
      read: "7 min read",
      tag: "AI & Interaction",
      excerpt: "Deterministic software gives identical outputs for identical inputs. Generative models do not. Here is how interfaces must adapt.",
      body: [
        "For fifty years, the cornerstone of software design was determinism. If you pressed `Cmd + B` in a word processor, the highlighted characters turned bold. Every single time. The user and the machine shared an inviolable contract of certainty.",
        "Generative AI disrupts this contract. For the first time, our software is probabilistic. It hallucinates, improvises, suggests, and occasionally stumbles. If we continue wrapping probabilistic systems in deterministic UI shells, users will inevitably experience betrayal and cognitive fatigue.",
        "### Exposing the Grain of the Model",
        "Good craftspeople respect the grain of their material. Wood swells with humidity; metal expands with heat. The grain of an LLM is variance and probability.",
        "Instead of disguising this variance behind a facade of omniscient authority, thoughtful interfaces should expose uncertainty as a primary design dimension:",
        "- **Visual confidence spectra**: Soft highlights indicating which sections of an AI synthesis are strictly grounded in retrieved documents versus inferred extrapolations.",
        "- **Branching alternatives**: Providing effortless alternative drafts with a single keystroke rather than forcing the user to renegotiate the entire prompt.",
        "- **Co-authorship over delegation**: Positioning the tool as an eager apprentice sitting beside you, rather than an oracle speaking from a mountain.",
        "### Failures as Design Material",
        "When a model fails, the interface must not collapse into a generic red error message. A graceful failure is an invitation to collaborate. Give the user the levers to adjust temperature, clarify ambiguous constraints, or inject missing context without losing their place.",
        "The future of software is not autonomous black boxes; it is augmented agency."
      ]
    },
    {
      slug: "the-craft-of-invisible-microcopy",
      title: "The craft of invisible microcopy",
      date: "Sep 29, 2024",
      read: "4 min read",
      tag: "Writing & Content",
      excerpt: "Words are not decorative garnish sprinkled on top of wireframes. They are the structural beams of the user's mental model.",
      body: [
        "Look at any confusing screen in enterprise software and strip away the colors, shadows, and layout grids. Nine times out of ten, what remains is an incomprehensible sentence.",
        "Designers often treat typography as a visual aesthetic — selecting font weights, line heights, and letter spacing — while treating the actual letters as an afterthought. This is a profound mistake.",
        "### Words as Functional Primitives",
        "A button label like 'Submit' communicates nothing about consequence. Does it save a draft? Does it charge a credit card? Does it notify a supervisor?",
        "Compare this with 'Confirm & Pay $49' or 'Publish to 1,200 Subscribers'. Precise microcopy immediately eliminates friction because it resolves ambiguity before the action takes place.",
        "### Four Rules for Calming Copy",
        "1. **Never blame the user**: An error like 'Invalid postal code entered' subtly indicts the human. 'Please enter a 5-digit zip code' points to the solution.",
        "2. **Honor the emotional register**: If a user is deleting their account or reporting a clinical emergency, cute whimsical copy is an insult.",
        "3. **Cut every superfluous word**: If a modal title says 'Export File', the button should say 'Export', not 'Click here to proceed with exporting'.",
        "4. **State the outcome, not the process**: Help people understand where they will land, not just the machinery required to launch."
      ]
    },
    {
      slug: "time-to-decision",
      title: "Rethinking the dashboard: Time-to-decision",
      date: "Aug 12, 2024",
      read: "6 min read",
      tag: "Data UX",
      excerpt: "Dashboards shouldn't optimize for vanity metrics and endless exploration. They should optimize for rapid, confident human decisions.",
      body: [
        "The modern enterprise analytics landscape suffers from a visual pandemic: the 40-widget mega-dashboard. Every vice president demands their bespoke chart; every data pipeline receives an obligatory pie chart.",
        "Yet when critical incidents occur, leaders abandon the dashboard and scramble into Slack channels asking: 'Are we down? Is churn spiking? Who is fixing this?'",
        "### The Fallacy of Passive Telemetry",
        "Raw data is not information. Information is difference that makes a difference. When a dashboard merely presents numbers without baseline context or historical variance, it transfers the entire cognitive burden of interpretation onto the viewer.",
        "If a metric displays 'Active Users: 14,210', is that good? Did it drop 20% since yesterday? Is it seasonal? The number in isolation is useless.",
        "### Building the Self-Narrating Workspace",
        "In our work on UniDash, we established a new rule: *No chart may exist without a paired sentence.*",
        "If a visualization cannot explain its own trend in plain human words, it does not belong on the executive overview. By pairing dynamic statistical anomaly detection with human-readable briefs, we compressed weekly operational reviews from 90 minutes of chart-hunting down to 18 minutes of focused strategic execution.",
        "Design your systems to respect human attention. It is the only non-renewable resource your users possess."
      ]
    }
  ],

  experiments: [
    {
      id: "kinetic-type",
      title: "Kinetic Variable Type",
      date: "2024.08",
      tag: "Typography / Math",
      desc: "Interactive typography that responds to cursor velocity and proximity using variable font axes.",
      type: "interactive-text"
    },
    {
      id: "tactile-switch",
      title: "Tactile Paper Physics",
      date: "2024.06",
      tag: "Physics / Spring",
      desc: "Spring-tension toggle switch simulating tactile paper resistance and physical friction.",
      type: "interactive-switch"
    },
    {
      id: "generative-noise",
      title: "Organic Clay Noise",
      date: "2024.05",
      tag: "Canvas / Perlin",
      desc: "Real-time generative vector flow field generating warm terracotta topographic contours.",
      type: "interactive-canvas"
    },
    {
      id: "microcopy-oracle",
      title: "The Microcopy Oracle",
      date: "2024.04",
      tag: "Writing / Tool",
      desc: "Generative critique engine that transforms corporate jargon into plain, calming product copy.",
      type: "interactive-oracle"
    }
  ]
};
