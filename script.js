const chapters = [
  {
    title: "Chapter 1: The Statement",
    description:
      'A partner nation says: "We will reconsider our participation if our concerns are not addressed." Your team disagrees on whether this is a threat or normal pressure.',
    questionTitle: "How will you respond?",
    questionCopy: "Choose one official response.",
    options: [
      {
        id: "A",
        label: "A. Firm and Defensive",
        text: "Any withdrawal would severely damage long-term cooperation.",
        effects: { trust: -12, influence: 10, stability: -4, escalation: 1 },
        feedback: "You projected authority, but the tone reduced relational trust."
      },
      {
        id: "B",
        label: "B. Diplomatic and Open",
        text: "We welcome further dialogue and seek clarification regarding your concerns.",
        effects: { trust: 12, influence: 6, stability: 5, escalation: -1 },
        feedback: "You opened space for nuance and protected momentum in talks."
      },
      {
        id: "C",
        label: "C. Publicly Neutral",
        text: "We acknowledge the statement and will continue discussions privately.",
        effects: { trust: 2, influence: -8, stability: 8, escalation: 0 },
        feedback: "Short-term calm improved, but your public influence weakened."
      },
      {
        id: "D",
        label: "D. Strong Warning",
        text: "Withdrawal would signal unwillingness to uphold shared responsibility.",
        effects: { trust: -15, influence: 5, stability: -12, escalation: 2 },
        feedback: "The message escalated tension and hardened positions quickly."
      }
    ]
  },
  {
    title: "Chapter 2: The Viral Post",
    description:
      'A social media post claims the coalition favors foreign economies over local citizens. It is vague, emotional, and spreading fast.',
    questionTitle: "What communication strategy do you use?",
    questionCopy: "Select one immediate response.",
    options: [
      {
        id: "A",
        label: "A. Ignore it",
        text: "Focus on official channels only.",
        effects: { trust: -8, influence: -6, stability: -7, escalation: 1 },
        feedback: "Silence gave misinformation room to shape the narrative."
      },
      {
        id: "B",
        label: "B. Fact-Based Rebuttal",
        text: "Release a clear, evidence-driven statement.",
        effects: { trust: 6, influence: 8, stability: 4, escalation: -1 },
        feedback: "Credibility improved, though emotional audiences stayed mixed."
      },
      {
        id: "C",
        label: "C. Emotional Counter-Narrative",
        text: "Use personal stories to shift sentiment.",
        effects: { trust: 8, influence: 4, stability: 1, escalation: 0 },
        feedback: "Engagement rose and empathy grew, with some loss of nuance."
      },
      {
        id: "D",
        label: "D. Directly Confront",
        text: "Call the post misleading and irresponsible.",
        effects: { trust: -6, influence: 5, stability: -8, escalation: 2 },
        feedback: "Supporters rallied, but polarization intensified."
      }
    ]
  },
  {
    title: "Chapter 3: Cultural Misstep",
    description:
      'Your speech included: "We expect developing regions to adapt quickly." Regional partners call it dismissive.',
    questionTitle: "How do you respond?",
    questionCopy: "Choose one corrective message.",
    options: [
      {
        id: "A",
        label: "A. Defend Wording",
        text: "Clarify intent without apologizing.",
        effects: { trust: -12, influence: 7, stability: -6, escalation: 1 },
        feedback: "You preserved authority, but offense remained unresolved."
      },
      {
        id: "B",
        label: "B. Partial Apology",
        text: "Acknowledge misunderstanding while adding context.",
        effects: { trust: 7, influence: 4, stability: 5, escalation: -1 },
        feedback: "You balanced accountability with strategic positioning."
      },
      {
        id: "C",
        label: "C. Full Apology",
        text: "Take responsibility and revise the language.",
        effects: { trust: 12, influence: -5, stability: 8, escalation: -1 },
        feedback: "Trust recovered strongly, though some saw softer influence."
      },
      {
        id: "D",
        label: "D. Redirect",
        text: "Refocus on shared goals, not phrasing.",
        effects: { trust: -3, influence: 2, stability: 3, escalation: 0 },
        feedback: "You delayed open conflict, but lingering resentment remains."
      }
    ]
  },
  {
    title: "Chapter 4: Internal Conflict",
    description:
      "Coalition members disagree publicly. Some demand hard rhetoric, others want caution. Your memo must set the line.",
    questionTitle: "What is your core message?",
    questionCopy: "Pick one memo direction.",
    options: [
      {
        id: "A",
        label: "A. We must stand firm.",
        text: "Direct + Assertive + Strategic",
        effects: { trust: -6, influence: 9, stability: -8, escalation: 1 },
        feedback: "External resolve increased, but internal cohesion weakened."
      },
      {
        id: "B",
        label: "B. We must compromise.",
        text: "Diplomatic + Collaborative + Transparent",
        effects: { trust: 6, influence: -4, stability: 7, escalation: -1 },
        feedback: "Team alignment improved, with some loss in negotiating edge."
      },
      {
        id: "C",
        label: "C. We must prioritize unity.",
        text: "Diplomatic + Collaborative + Strategic",
        effects: { trust: 5, influence: 1, stability: 8, escalation: -1 },
        feedback: "Short-term stability improved, though hard decisions were delayed."
      },
      {
        id: "D",
        label: "D. We must reassess entirely.",
        text: "Transparent reset of strategy",
        effects: { trust: 2, influence: -6, stability: -2, escalation: 0 },
        feedback: "The reset created reflection but signaled uncertainty externally."
      }
    ]
  }
];

const state = {
  chapterIndex: 0,
  trust: 50,
  influence: 50,
  stability: 50,
  escalation: 0,
  speech: "",
  choices: []
};

const chapterLabel = document.getElementById("chapter-label");
const chapterTitle = document.getElementById("chapter-title");
const chapterDescription = document.getElementById("chapter-description");
const questionTitle = document.getElementById("question-title");
const questionCopy = document.getElementById("question-copy");
const optionsWrap = document.getElementById("options");
const feedbackWrap = document.getElementById("chapter-feedback");
const feedbackCopy = document.getElementById("feedback-copy");
const continueButton = document.getElementById("continue-button");
const gamePanel = document.getElementById("game-panel");
const endingPanel = document.getElementById("ending-panel");
const speechPanel = document.getElementById("speech-panel");
const restartButton = document.getElementById("restart-button");
const playAgainButton = document.getElementById("play-again");
const speechInput = document.getElementById("speech-input");
const submitSpeech = document.getElementById("submit-speech");
const speechWarning = document.getElementById("speech-warning");
const wordCountLabel = document.getElementById("word-count");

function clamp(value) {
  return Math.max(0, Math.min(100, value));
}

function getWordCount(text) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

function renderChapter() {
  const chapter = chapters[state.chapterIndex];
  chapterLabel.textContent = `Chapter ${state.chapterIndex + 1} of 5`;
  chapterTitle.textContent = chapter.title;
  chapterDescription.textContent = chapter.description;
  questionTitle.textContent = chapter.questionTitle;
  questionCopy.textContent = chapter.questionCopy;
  optionsWrap.innerHTML = "";
  feedbackWrap.classList.add("hidden");

  chapter.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.innerHTML = `<strong>${option.label}</strong><br>${option.text}`;
    button.addEventListener("click", () => handleChoice(option));
    optionsWrap.appendChild(button);
  });
}

function handleChoice(option) {
  state.trust = clamp(state.trust + option.effects.trust);
  state.influence = clamp(state.influence + option.effects.influence);
  state.stability = clamp(state.stability + option.effects.stability);
  state.escalation = Math.max(0, state.escalation + option.effects.escalation);
  state.choices.push(option.label);

  feedbackCopy.textContent = option.feedback;
  feedbackWrap.classList.remove("hidden");

  [...optionsWrap.children].forEach((btn) => {
    btn.disabled = true;
    btn.style.opacity = "0.65";
  });
}

function nextStep() {
  state.chapterIndex += 1;
  if (state.chapterIndex < chapters.length) {
    renderChapter();
  } else {
    openSpeechChapter();
  }
}

function openSpeechChapter() {
  gamePanel.classList.add("hidden");
  speechPanel.classList.remove("hidden");
  speechInput.value = state.speech;
  wordCountLabel.textContent = `Word count: ${getWordCount(state.speech)}`;
}

function evaluateSpeech(text) {
  const lower = text.toLowerCase();
  const cooperationWords = ["together", "cooperate", "shared", "partnership", "listen"];
  const empathyWords = ["understand", "respect", "concern", "community", "youth"];
  const tensionWords = ["threat", "punish", "blame", "enemy", "fight"];

  const hasCooperation = cooperationWords.some((word) => lower.includes(word));
  const hasEmpathy = empathyWords.some((word) => lower.includes(word));
  const hostileCount = tensionWords.filter((word) => lower.includes(word)).length;

  if (hasCooperation) state.stability = clamp(state.stability + 6);
  if (hasEmpathy) state.trust = clamp(state.trust + 6);
  if (hostileCount > 1) {
    state.trust = clamp(state.trust - 8);
    state.stability = clamp(state.stability - 7);
    state.escalation += 1;
  } else {
    state.influence = clamp(state.influence + 4);
  }
}

function determineEnding() {
  if (state.trust >= 68 && state.stability >= 68) {
    return {
      title: "Ending 1: Cooperative Breakthrough",
      summary:
        "Your precise and empathetic communication rebuilt bridges. A revised treaty passes through negotiation, and your coalition is praised for measured leadership."
    };
  }

  if (state.influence >= 70 && state.trust < 55) {
    return {
      title: "Ending 2: Controlled but Cold",
      summary:
        "You held the line and delivered results, but public confidence stayed fractured. The agreement survives, yet relationships remain tense and transactional."
    };
  }

  if (state.trust < 42 && state.escalation >= 3) {
    return {
      title: "Ending 4: Polarized World",
      summary:
        "Language hardened divisions and outrage eclipsed diplomacy. Debate became performance, and coalition trust collapsed across regions."
    };
  }

  if (state.stability < 48) {
    return {
      title: "Ending 3: Fragmented Alliance",
      summary:
        "Misalignment and unresolved rhetoric pushed members apart. The coalition splintered as partners withdrew from a process they no longer trusted."
    };
  }

  return {
    title: "Conditional Outcome: Uneasy Pause",
    summary:
      "You prevented collapse, but core disagreements remain. The world watches whether your next words build momentum—or reopen fault lines."
  };
}

function renderEnding() {
  const ending = determineEnding();
  document.getElementById("ending-title").textContent = ending.title;
  document.getElementById("ending-summary").textContent = ending.summary;
  document.getElementById("final-trust").textContent = `${state.trust}/100`;
  document.getElementById("final-influence").textContent = `${state.influence}/100`;
  document.getElementById("final-stability").textContent = `${state.stability}/100`;
  document.getElementById("speech-result").textContent = state.speech;

  speechPanel.classList.add("hidden");
  endingPanel.classList.remove("hidden");
}

function resetGame() {
  state.chapterIndex = 0;
  state.trust = 50;
  state.influence = 50;
  state.stability = 50;
  state.escalation = 0;
  state.speech = "";
  state.choices = [];

  endingPanel.classList.add("hidden");
  speechPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");
  speechWarning.classList.add("hidden");
  renderChapter();
}

continueButton.addEventListener("click", nextStep);
restartButton.addEventListener("click", resetGame);
playAgainButton.addEventListener("click", resetGame);

speechInput.addEventListener("input", () => {
  const count = getWordCount(speechInput.value);
  wordCountLabel.textContent = `Word count: ${count}`;
  speechWarning.classList.add("hidden");
});

submitSpeech.addEventListener("click", () => {
  const text = speechInput.value.trim();
  const count = getWordCount(text);
  if (count < 120 || count > 150) {
    speechWarning.textContent = "Your speech must be between 120 and 150 words.";
    speechWarning.classList.remove("hidden");
    return;
  }

  state.speech = text;
  evaluateSpeech(text);
  renderEnding();
});

renderChapter();
