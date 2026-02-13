const lessons = new Set();

const scenes = {
  briefing: {
    title: "Opening Briefing",
    copy: "A quote from your chairperson is translated two ways: 'We expect rapid adaptation.' In one language it sounds like a demand, in another like support. Regional delegates are angry.",
    promptTitle: "First move: interpretation + response",
    promptCopy: "Which public line do you release within 20 minutes?",
    options: [
      {
        label: "A. 'Our message was misread. Everyone knows what we intended.'",
        result: "You sounded dismissive. Delegates felt blamed for misunderstanding.",
        teach: "Teaching note: In high-stakes English, intention is less important than reader interpretation.",
        effects: { clarity: -8, empathy: -12, credibility: -2, stability: -8 },
        next: "social"
      },
      {
        label: "B. 'We regret the wording. We are issuing a clearer statement in all languages today.'",
        result: "You owned the wording and promised precision. Tension cooled.",
        teach: "Teaching note: Accountability + specific action builds trust faster than vague apologies.",
        effects: { clarity: 8, empathy: 9, credibility: 6, stability: 5 },
        next: "social"
      },
      {
        label: "C. 'No comment until private talks end.'",
        result: "Silence prevented immediate escalation but rumors grew.",
        teach: "Teaching note: Strategic silence can buy time, but creates an information vacuum.",
        effects: { clarity: -5, empathy: -4, credibility: -3, stability: 2 },
        next: "social"
      }
    ]
  },
  social: {
    title: "Signal vs Virality",
    copy: "A video clip says your coalition will 'sacrifice local jobs'. The clip is edited. Students across three countries start #NotOurFuture.",
    promptTitle: "How do you answer misinformation?",
    promptCopy: "Pick one strategy for the next 2 hours.",
    options: [
      {
        label: "A. Publish a fact thread with sources, numbers, and definitions.",
        result: "Journalists and teachers shared your thread. Angry users stayed unconvinced.",
        teach: "Teaching note: Evidence strengthens credibility, but facts alone rarely calm emotions.",
        effects: { clarity: 9, empathy: -1, credibility: 8, stability: 4 },
        next: (state) => (state.empathy < 45 ? "townhall" : "radio")
      },
      {
        label: "B. Publish student stories + one clear data point in each post.",
        result: "Engagement stayed high, but your message remained grounded and human.",
        teach: "Teaching note: Strong English communication often combines logos (facts) with pathos (people).",
        effects: { clarity: 5, empathy: 10, credibility: 4, stability: 7 },
        next: "radio"
      },
      {
        label: "C. Attack the original creator as irresponsible.",
        result: "Supporters cheered, but opponents doubled down and reframed you as arrogant.",
        teach: "Teaching note: Personal attacks shift focus from claim quality to conflict identity.",
        effects: { clarity: -4, empathy: -8, credibility: -3, stability: -10 },
        next: "townhall"
      }
    ]
  },
  townhall: {
    title: "Emergency Town Hall",
    copy: "A live town hall is requested by student unions. Questions are emotional and interrupted by sarcasm.",
    promptTitle: "Choose your speaking style",
    promptCopy: "Which sentence opener do you use repeatedly?",
    options: [
      {
        label: "A. 'Let me be crystal clear: you're wrong about our intentions.'",
        result: "You sounded sharp and organized, but many felt dismissed.",
        teach: "Teaching note: 'Clear' language can still be face-threatening if tone is adversarial.",
        effects: { clarity: 4, empathy: -10, credibility: 2, stability: -7 },
        next: "internal"
      },
      {
        label: "B. 'I hear why that sounds unfair; let me explain the full context.'",
        result: "The room remained tense but you regained listening space.",
        teach: "Teaching note: Validation phrases reduce defensiveness and improve comprehension.",
        effects: { clarity: 6, empathy: 8, credibility: 5, stability: 6 },
        next: "internal"
      },
      {
        label: "C. 'We don't have time for every concern right now.'",
        result: "You shortened the meeting but amplified resentment.",
        teach: "Teaching note: Time-pressure language can imply some voices matter less.",
        effects: { clarity: -2, empathy: -9, credibility: -5, stability: -8 },
        next: "internal"
      }
    ]
  },
  radio: {
    title: "Live Radio Interview",
    copy: "A national radio host asks a loaded question: 'Is your coalition forcing poorer regions to pay for your image?'",
    promptTitle: "Choose your 1-sentence answer",
    promptCopy: "Which sentence best protects meaning under pressure?",
    options: [
      {
        label: "A. 'That's a false question and frankly unfair.'",
        result: "You challenged framing but sounded combative.",
        teach: "Teaching note: Reframing beats rebuttal when questions carry hidden assumptions.",
        effects: { clarity: 1, empathy: -6, credibility: -1, stability: -5 },
        next: "internal"
      },
      {
        label: "B. 'No—our plan pairs climate targets with a youth jobs fund monitored by local councils.'",
        result: "You replaced accusation with concrete policy language.",
        teach: "Teaching note: Specific nouns and verbs prevent ambiguity better than abstract promises.",
        effects: { clarity: 10, empathy: 3, credibility: 8, stability: 5 },
        next: "internal"
      },
      {
        label: "C. 'Everyone is making sacrifices, so criticism is expected.'",
        result: "Your point was realistic, but detached.",
        teach: "Teaching note: Generalizations can sound logical but erase audience perspective.",
        effects: { clarity: 2, empathy: -5, credibility: 1, stability: -2 },
        next: "internal"
      }
    ]
  },
  internal: {
    title: "Internal Split",
    copy: "Your own coalition divides: one group wants hard language, another wants cautious diplomacy. Your memo must prevent a public fracture.",
    promptTitle: "Select memo core",
    promptCopy: "Which line leads your memo?",
    options: [
      {
        label: "A. 'Discipline first: one message, no public disagreement.'",
        result: "Coordination improved, but some members felt silenced.",
        teach: "Teaching note: Directive tone can increase efficiency while reducing psychological safety.",
        effects: { clarity: 6, empathy: -6, credibility: 4, stability: -2 },
        next: "speech"
      },
      {
        label: "B. 'Unity requires disagreement handled with evidence, not accusation.'",
        result: "You set standards for language, not loyalty tests.",
        teach: "Teaching note: Process language ('how we discuss') often lowers conflict better than position language ('what to think').",
        effects: { clarity: 7, empathy: 7, credibility: 6, stability: 9 },
        next: "speech"
      },
      {
        label: "C. 'Pause all messaging until leadership resolves strategy.'",
        result: "You avoided fresh conflict but looked uncertain externally.",
        teach: "Teaching note: Delays can reduce short-term mistakes while eroding narrative control.",
        effects: { clarity: -4, empathy: 1, credibility: -7, stability: 1 },
        next: "speech"
      }
    ]
  }
};

const state = {
  round: 1,
  sceneId: "briefing",
  clarity: 50,
  empathy: 50,
  credibility: 50,
  stability: 50,
  speech: ""
};

const roundLabel = document.getElementById("round-label");
const sceneTitle = document.getElementById("scene-title");
const sceneCopy = document.getElementById("scene-copy");
const promptTitle = document.getElementById("prompt-title");
const promptCopy = document.getElementById("prompt-copy");
const optionsWrap = document.getElementById("options");
const feedback = document.getElementById("feedback");
const feedbackText = document.getElementById("feedback-text");
const teachingNote = document.getElementById("teaching-note");
const continueBtn = document.getElementById("continue");
const restartBtn = document.getElementById("restart");

const scenePanel = document.getElementById("scene-panel");
const speechPanel = document.getElementById("speech-panel");
const endingPanel = document.getElementById("ending-panel");

const speechInput = document.getElementById("speech-input");
const wordCount = document.getElementById("word-count");
const speechWarning = document.getElementById("speech-warning");
const submitSpeech = document.getElementById("submit-speech");
const playAgain = document.getElementById("play-again");

const metrics = {
  clarity: document.getElementById("clarity-value"),
  empathy: document.getElementById("empathy-value"),
  credibility: document.getElementById("credibility-value"),
  stability: document.getElementById("stability-value")
};

let pendingNext = null;

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function words(text) {
  const t = text.trim();
  return t ? t.split(/\s+/).length : 0;
}

function paintHud() {
  Object.keys(metrics).forEach((key) => {
    metrics[key].textContent = String(state[key]);
  });
}

function renderScene() {
  const scene = scenes[state.sceneId];
  roundLabel.textContent = `Round ${state.round} of 5`;
  sceneTitle.textContent = scene.title;
  sceneCopy.textContent = scene.copy;
  promptTitle.textContent = scene.promptTitle;
  promptCopy.textContent = scene.promptCopy;
  optionsWrap.innerHTML = "";
  feedback.classList.add("hidden");

  scene.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.textContent = option.label;
    btn.addEventListener("click", () => choose(option));
    optionsWrap.appendChild(btn);
  });

  paintHud();
}

function applyEffects(effects) {
  Object.entries(effects).forEach(([key, change]) => {
    state[key] = clamp(state[key] + change);
  });
}

function choose(option) {
  applyEffects(option.effects);
  feedbackText.textContent = option.result;
  teachingNote.textContent = option.teach;
  feedback.classList.remove("hidden");

  lessons.add(option.teach.replace("Teaching note: ", ""));
  pendingNext = typeof option.next === "function" ? option.next(state) : option.next;

  [...optionsWrap.children].forEach((btn) => {
    btn.disabled = true;
    btn.style.opacity = "0.65";
  });

  paintHud();
}

function nextStep() {
  if (!pendingNext) return;
  if (pendingNext === "speech") {
    scenePanel.classList.add("hidden");
    speechPanel.classList.remove("hidden");
    wordCount.textContent = `Word count: ${words(speechInput.value)}`;
    return;
  }

  state.sceneId = pendingNext;
  state.round += 1;
  pendingNext = null;
  renderScene();
}

function evaluateSpeech(text) {
  const lower = text.toLowerCase();
  const precise = ["according to", "data", "timeline", "monitor", "fund", "report"];
  const bridge = ["together", "listen", "shared", "respect", "community", "cooperate"];
  const inflammatory = ["enemy", "betray", "punish", "shame", "liar"];

  if (precise.some((word) => lower.includes(word))) state.clarity = clamp(state.clarity + 6);
  if (bridge.some((word) => lower.includes(word))) state.empathy = clamp(state.empathy + 6);
  if (inflammatory.filter((word) => lower.includes(word)).length > 0) {
    state.stability = clamp(state.stability - 9);
    state.credibility = clamp(state.credibility - 4);
  } else {
    state.credibility = clamp(state.credibility + 4);
  }
}

function ending() {
  const avg = (state.clarity + state.empathy + state.credibility + state.stability) / 4;
  if (state.empathy > 68 && state.stability > 66) {
    return {
      title: "Ending: Bridge Builders",
      summary: "Your language de-escalated conflict. Student groups return to negotiation, and your coalition keeps both legitimacy and momentum."
    };
  }
  if (state.clarity > 72 && state.credibility > 70 && state.empathy < 50) {
    return {
      title: "Ending: Correct but Distant",
      summary: "Your messages were precise and trusted by institutions, but many students felt unheard. The agreement survives with low enthusiasm."
    };
  }
  if (state.stability < 45 || avg < 48) {
    return {
      title: "Ending: Fracture Week",
      summary: "Rhetoric outpaced listening. Delegates split publicly, and short clips replaced serious dialogue."
    };
  }
  return {
    title: "Ending: Uneasy Holding Pattern",
    summary: "You prevented collapse and kept channels open, but unresolved language tensions remain before the final treaty vote."
  };
}

function showEnding() {
  const end = ending();
  document.getElementById("ending-title").textContent = end.title;
  document.getElementById("ending-summary").textContent = end.summary;

  const list = document.getElementById("lesson-list");
  list.innerHTML = "";
  [...lessons].slice(0, 6).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });

  speechPanel.classList.add("hidden");
  endingPanel.classList.remove("hidden");
  paintHud();
}

function reset() {
  state.round = 1;
  state.sceneId = "briefing";
  state.clarity = 50;
  state.empathy = 50;
  state.credibility = 50;
  state.stability = 50;
  state.speech = "";
  pendingNext = null;
  lessons.clear();

  speechInput.value = "";
  speechWarning.classList.add("hidden");
  scenePanel.classList.remove("hidden");
  speechPanel.classList.add("hidden");
  endingPanel.classList.add("hidden");
  renderScene();
}

continueBtn.addEventListener("click", nextStep);
restartBtn.addEventListener("click", reset);
playAgain.addEventListener("click", reset);

speechInput.addEventListener("input", () => {
  wordCount.textContent = `Word count: ${words(speechInput.value)}`;
  speechWarning.classList.add("hidden");
});

submitSpeech.addEventListener("click", () => {
  const text = speechInput.value.trim();
  const count = words(text);
  if (count < 110 || count > 140) {
    speechWarning.textContent = "Use 110–140 words so your statement is concise but developed.";
    speechWarning.classList.remove("hidden");
    return;
  }

  state.speech = text;
  evaluateSpeech(text);
  showEnding();
});

renderScene();
