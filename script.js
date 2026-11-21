const lessons = new Set();
const timeline = [];

const scenes = {
  briefing: {
    day: 1,
    title: "Day 1 — Translation Dispute",
    copy:
      "A partner delegation says your summit language sounds like an order, not cooperation. Their youth minister threatens to pause participation unless you clarify.",
    promptTitle: "Your first public line",
    promptCopy: "Choose your immediate statement.",
    options: [
      { id: "A", text: "'Our meaning was obvious. The criticism is overblown.'", result: "You sounded defensive and dismissive.", teach: "Interpretation matters more than intention in public English.", effects: { clarity: -8, empathy: -11, credibility: -3, stability: -8 }, next: "rumor" },
      { id: "B", text: "'We regret the phrasing and will publish clarified wording in all working languages by 18:00.'", result: "You combined accountability with a concrete action.", teach: "Specific commitments are stronger than vague reassurance.", effects: { clarity: 8, empathy: 8, credibility: 7, stability: 5 }, next: "rumor" },
      { id: "C", text: "'We are listening and will discuss concerns directly before commenting further.'", result: "You bought time but left a public vacuum.", teach: "Silence can de-escalate briefly but can also feed speculation.", effects: { clarity: -4, empathy: 3, credibility: -2, stability: 1 }, next: "rumor" },
      { id: "D", text: "'We reject manipulative framing and stand by our message.'", result: "Your core supporters applauded; neutrals moved away.", teach: "Combative framing often increases polarization.", effects: { clarity: -2, empathy: -10, credibility: -4, stability: -9 }, next: "rumor" }
    ]
  },
  rumor: {
    day: 2,
    title: "Day 2 — Viral Rumor Surge",
    copy:
      "An edited clip claims the coalition will cut local apprenticeships to fund foreign projects. The hashtag #JobsNotPromises trends overnight.",
    promptTitle: "Misinformation response",
    promptCopy: "What do you do in the first 90 minutes?",
    options: [
      { id: "A", text: "Publish a fact-check thread with source links and corrected subtitles.", result: "You regained journalistic trust but emotional audiences stayed skeptical.", teach: "Facts build credibility; they need human framing to persuade broad audiences.", effects: { clarity: 9, empathy: -1, credibility: 8, stability: 3 }, next: (state) => (state.empathy < 46 ? "townhall" : "radio") },
      { id: "B", text: "Publish student testimonies paired with one verifiable data point per post.", result: "You combined emotional resonance with evidence.", teach: "Balanced rhetoric (logos + pathos) improves reach and trust.", effects: { clarity: 5, empathy: 10, credibility: 4, stability: 7 }, next: "radio" },
      { id: "C", text: "Ignore social media and communicate only through official channels.", result: "You preserved formal tone but lost narrative control online.", teach: "Channel choice is a language decision: where you speak affects what is heard.", effects: { clarity: -2, empathy: -5, credibility: -3, stability: -5 }, next: "townhall" },
      { id: "D", text: "Call the original creator dishonest and demand takedowns.", result: "Conflict intensified and the rumor became bigger news.", teach: "Attacking people can amplify the message you want to weaken.", effects: { clarity: -4, empathy: -8, credibility: -5, stability: -10 }, next: "townhall" }
    ]
  },
  townhall: {
    day: 3,
    title: "Day 3 — Emergency Town Hall",
    copy:
      "Student unions demand a live Q&A. Questions are sharp, emotional, and interrupted by sarcasm clips from earlier statements.",
    promptTitle: "Your recurring response frame",
    promptCopy: "Choose the line you keep returning to.",
    options: [
      { id: "A", text: "'Let me be clear: several claims here are simply wrong.'", result: "You sounded structured, but many felt corrected rather than heard.", teach: "Precision without face-saving language can trigger resistance.", effects: { clarity: 4, empathy: -9, credibility: 3, stability: -5 }, next: "internal" },
      { id: "B", text: "'I understand why that sounds unfair; here is the full policy context.'", result: "You reduced defensiveness and kept dialogue open.", teach: "Validation phrases improve comprehension under stress.", effects: { clarity: 6, empathy: 8, credibility: 5, stability: 6 }, next: "internal" },
      { id: "C", text: "'We cannot answer every concern in this format; submit questions later.'", result: "The session ended faster, but distrust grew.", teach: "Gatekeeping language can be interpreted as exclusion.", effects: { clarity: -2, empathy: -8, credibility: -4, stability: -7 }, next: "internal" },
      { id: "D", text: "'I will answer three hardest questions first and publish full replies tonight.'", result: "You signaled courage and process transparency.", teach: "Process clarity can restore legitimacy in contested conversations.", effects: { clarity: 8, empathy: 6, credibility: 7, stability: 5 }, next: "internal" }
    ]
  },
  radio: {
    day: 3,
    title: "Day 3 — Live Radio Ambush",
    copy:
      "A host asks: 'Is your coalition asking poorer regions to pay for your reputation?' The question contains a strong assumption.",
    promptTitle: "One-sentence answer",
    promptCopy: "Which answer do you give live?",
    options: [
      { id: "A", text: "'That framing is unfair and inaccurate.'", result: "You challenged framing but sounded combative.", teach: "Reframing should redirect substance, not just reject tone.", effects: { clarity: 2, empathy: -6, credibility: -1, stability: -4 }, next: "internal" },
      { id: "B", text: "'No. The plan pairs climate targets with locally monitored youth job funds and quarterly public reports.'", result: "You replaced accusation with concrete language.", teach: "Specific nouns and measurable commitments reduce ambiguity.", effects: { clarity: 10, empathy: 2, credibility: 8, stability: 6 }, next: "internal" },
      { id: "C", text: "'Every side must make sacrifices in difficult times.'", result: "You sounded realistic but emotionally distant.", teach: "Generalizations can erase lived experience and lower trust.", effects: { clarity: 1, empathy: -5, credibility: 1, stability: -2 }, next: "internal" },
      { id: "D", text: "'I hear the fear. We will publish a country-by-country impact table tonight.'", result: "You acknowledged concern and committed to evidence.", teach: "Empathy plus verifiable follow-up is strong crisis rhetoric.", effects: { clarity: 7, empathy: 7, credibility: 6, stability: 6 }, next: "internal" }
    ]
  },
  internal: {
    day: 4,
    title: "Day 4 — Coalition Split",
    copy:
      "Inside your team, one bloc wants hard messaging and another wants restorative language. A leak is likely within hours.",
    promptTitle: "Choose memo strategy",
    promptCopy: "What line opens your internal memo?",
    options: [
      { id: "A", text: "'One message only. Public disagreement ends now.'", result: "Discipline improved; resentment increased.", teach: "Authoritative tone can increase compliance but reduce commitment.", effects: { clarity: 6, empathy: -7, credibility: 3, stability: -2 }, next: "leak" },
      { id: "B", text: "'Disagreement is allowed; accusations are not. Use evidence and proposed wording.'", result: "You set standards for discourse, not ideological loyalty.", teach: "Process language often stabilizes high-conflict teams.", effects: { clarity: 8, empathy: 8, credibility: 6, stability: 8 }, next: "leak" },
      { id: "C", text: "'Pause all outward communication until leadership alignment.'", result: "You prevented fresh errors but looked uncertain outside.", teach: "Communication delay trades short-term risk for long-term narrative drift.", effects: { clarity: -3, empathy: 1, credibility: -7, stability: 0 }, next: "leak" },
      { id: "D", text: "'We will run two message tracks for two audiences.'", result: "Short-term flexibility created long-term contradiction risk.", teach: "Inconsistent framing across audiences can damage credibility when exposed.", effects: { clarity: -8, empathy: 2, credibility: -9, stability: -6 }, next: "leak" }
    ]
  },
  leak: {
    day: 5,
    title: "Day 5 — Draft Leak",
    copy:
      "A draft memo leaks with an ambiguous sentence: 'some regions must adapt faster than others.' Opponents call it discriminatory.",
    promptTitle: "Repair strategy",
    promptCopy: "How do you address the leaked phrase?",
    options: [
      { id: "A", text: "Publish a full apology and revised sentence naming shared obligations and support mechanisms.", result: "Trust recovered with affected groups; hardliners called it weak.", teach: "Revision + explicit replacement wording shows real accountability.", effects: { clarity: 7, empathy: 10, credibility: 3, stability: 7 }, next: "finalBrief" },
      { id: "B", text: "Defend intent and accuse critics of bad-faith reading.", result: "Your supporters stayed loyal; conflict widened.", teach: "Intent defense rarely resolves harm from ambiguous phrasing.", effects: { clarity: -3, empathy: -9, credibility: -4, stability: -9 }, next: "finalBrief" },
      { id: "C", text: "Publish side-by-side language analysis of original and revised text.", result: "Teachers and media praised your transparency.", teach: "Metalinguistic explanation can turn controversy into learning.", effects: { clarity: 10, empathy: 5, credibility: 8, stability: 5 }, next: "finalBrief" },
      { id: "D", text: "Avoid the phrase and pivot to unrelated policy wins.", result: "The pivot looked evasive and prolonged criticism.", teach: "Avoidance can preserve short-term face but weakens trust over time.", effects: { clarity: -5, empathy: -4, credibility: -7, stability: -4 }, next: "finalBrief" }
    ]
  }
};

const state = {
  sceneId: "briefing",
  step: 1,
  clarity: 50,
  empathy: 50,
  credibility: 50,
  stability: 50,
  studentAlias: "anonymous",
  studentId: crypto.randomUUID(),
  authoredStatements: [],
  choices: [],
  finalSpeech: ""
};

const startPanel = document.getElementById("start-panel");
const startBtn = document.getElementById("start-game");
const aliasInput = document.getElementById("student-alias");
const includeAlias = document.getElementById("include-alias");
const progressLabel = document.getElementById("progress-label");
const progressFill = document.getElementById("progress-fill");

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

const statementInput = document.getElementById("statement-input");
const statementCount = document.getElementById("statement-count");

const scenePanel = document.getElementById("scene-panel");
const finalBriefPanel = document.getElementById("final-brief-panel");
const endingPanel = document.getElementById("ending-panel");

const speechInput = document.getElementById("speech-input");
const wordCount = document.getElementById("word-count");
const speechWarning = document.getElementById("speech-warning");
const submitSpeech = document.getElementById("submit-speech");
const playAgain = document.getElementById("play-again");
const copyJsonBtn = document.getElementById("copy-json");
const downloadCsvBtn = document.getElementById("download-csv");
const exportStatus = document.getElementById("export-status");

const reportFiles = document.getElementById("report-files");
const reviewBody = document.getElementById("review-body");
const reviewSummary = document.getElementById("review-summary");

const metrics = {
  clarity: document.getElementById("clarity-value"),
  empathy: document.getElementById("empathy-value"),
  credibility: document.getElementById("credibility-value"),
  stability: document.getElementById("stability-value")
};

let pendingNext = null;

function clamp(value) { return Math.max(0, Math.min(100, value)); }
function words(text) { const t = text.trim(); return t ? t.split(/\s+/).length : 0; }

function updateHud() {
  Object.keys(metrics).forEach((key) => { metrics[key].textContent = String(state[key]); });
}

function updateProgress(day) {
  progressLabel.textContent = `Progress: Day ${day} of 6`;
  progressFill.style.width = `${(day / 6) * 100}%`;
}

function applyEffects(effects) {
  Object.entries(effects).forEach(([key, delta]) => { state[key] = clamp(state[key] + delta); });
}

function evaluateAuthoredSentence(text) {
  const count = words(text);
  if (count < 10 || count > 40) {
    return {
      feedback: "No custom language bonus applied (sentence should be 10–40 words).",
      lesson: "Concise sentence design helps control interpretation in crisis communication.",
      effects: { clarity: 0, empathy: 0, credibility: 0, stability: 0 }
    };
  }

  const lower = text.toLowerCase();
  const precision = ["because", "by", "today", "report", "data", "publish", "timeline"];
  const empathy = ["hear", "understand", "concern", "respect", "community", "students"];
  const inflammatory = ["liar", "enemy", "ignorant", "punish", "fake", "shame"];

  let c = 0; let e = 0; let cr = 0; let s = 0;
  if (precision.some((w) => lower.includes(w))) { c += 3; cr += 2; }
  if (empathy.some((w) => lower.includes(w))) { e += 3; s += 1; }
  if (inflammatory.some((w) => lower.includes(w))) { e -= 4; cr -= 3; s -= 4; }
  if (lower.includes("we") && lower.includes("will")) { c += 1; cr += 1; }

  return {
    feedback: "Your authored sentence influenced the round outcome.",
    lesson: "Word choice, tone, and commitment markers can measurably alter message impact.",
    effects: { clarity: c, empathy: e, credibility: cr, stability: s }
  };
}

function logTimeline(entry) {
  timeline.push({
    step: state.step,
    scene: state.sceneId,
    day: scenes[state.sceneId].day,
    ...entry,
    clarity: state.clarity,
    empathy: state.empathy,
    credibility: state.credibility,
    stability: state.stability
  });
}

function renderScene() {
  const scene = scenes[state.sceneId];
  roundLabel.textContent = `Day ${scene.day} of 6`;
  sceneTitle.textContent = scene.title;
  sceneCopy.textContent = scene.copy;
  promptTitle.textContent = scene.promptTitle;
  promptCopy.textContent = scene.promptCopy;
  optionsWrap.innerHTML = "";
  feedback.classList.add("hidden");
  statementInput.value = "";
  statementInput.disabled = false;
  statementCount.textContent = "Word count: 0";

  scene.options.forEach((option) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "option";
    btn.innerHTML = `<strong>${option.id}.</strong> ${option.text}`;
    btn.addEventListener("click", () => choose(option));
    optionsWrap.appendChild(btn);
  });

  updateProgress(scene.day);
  updateHud();
}

function choose(option) {
  applyEffects(option.effects);

  const userSentence = statementInput.value.trim();
  const authored = evaluateAuthoredSentence(userSentence);
  applyEffects(authored.effects);

  if (userSentence) {
    state.authoredStatements.push({ scene: state.sceneId, text: userSentence, effects: authored.effects });
  }

  const nextScene = typeof option.next === "function" ? option.next(state) : option.next;
  pendingNext = nextScene;
  state.choices.push({ scene: state.sceneId, option: option.id, text: option.text, next: nextScene });

  lessons.add(option.teach);
  lessons.add(authored.lesson);

  feedbackText.textContent = `${option.result} ${authored.feedback}`;
  teachingNote.textContent = `Teaching note: ${option.teach}`;
  feedback.classList.remove("hidden");

  logTimeline({ choice: option.id, optionText: option.text, customStatement: userSentence || "", customEffects: JSON.stringify(authored.effects) });

  [...optionsWrap.children].forEach((btn) => { btn.disabled = true; btn.style.opacity = "0.65"; });
  statementInput.disabled = true;
  updateHud();
}

function nextStep() {
  if (!pendingNext) return;
  state.step += 1;

  if (pendingNext === "finalBrief") {
    scenePanel.classList.add("hidden");
    finalBriefPanel.classList.remove("hidden");
    updateProgress(6);
    wordCount.textContent = `Word count: ${words(speechInput.value)}`;
    pendingNext = null;
    return;
  }

  state.sceneId = pendingNext;
  pendingNext = null;
  renderScene();
}

function evaluateFinalSpeech(text) {
  const lower = text.toLowerCase();
  const precise = ["timeline", "report", "data", "monitor", "target", "publish"];
  const bridge = ["together", "listen", "shared", "respect", "students", "community"];
  const risk = ["enemy", "punish", "shame", "liar", "betray"];

  if (precise.some((word) => lower.includes(word))) { state.clarity = clamp(state.clarity + 6); state.credibility = clamp(state.credibility + 4); }
  if (bridge.some((word) => lower.includes(word))) { state.empathy = clamp(state.empathy + 6); state.stability = clamp(state.stability + 3); }
  if (risk.some((word) => lower.includes(word))) { state.stability = clamp(state.stability - 8); state.empathy = clamp(state.empathy - 4); }

  logTimeline({ choice: "FINAL_SPEECH", optionText: "Final authored statement", customStatement: text, customEffects: "applied" });
}

function determineEnding() {
  const avg = (state.clarity + state.empathy + state.credibility + state.stability) / 4;
  if (state.empathy >= 70 && state.stability >= 68) return { title: "Ending: Cooperative Breakthrough", summary: "You used precise, respectful English to rebuild trust. The summit produces a revised agreement with strong student backing." };
  if (state.clarity >= 74 && state.credibility >= 72 && state.empathy < 52) return { title: "Ending: Efficient but Cold", summary: "Your messaging was technically strong and institutionally trusted, but many students felt spoken at rather than spoken with." };
  if (state.stability < 46 || avg < 50) return { title: "Ending: Narrative Fracture", summary: "Competing interpretations overtook your messaging. Delegations leave with hardened language and weaker relationships." };
  return { title: "Ending: Fragile Progress", summary: "You prevented collapse and preserved dialogue, but key wording disputes remain unresolved before ratification." };
}

function buildTeacherReport() {
  const aliasAllowed = includeAlias.checked;
  return {
    game: "Fault Lines: Signal & Static",
    completedAt: new Date().toISOString(),
    studentRef: state.studentId,
    studentAlias: aliasAllowed ? state.studentAlias : null,
    gdpr: {
      localOnly: true,
      storesNoNameByDefault: true,
      aliasIncluded: aliasAllowed
    },
    score: { clarity: state.clarity, empathy: state.empathy, credibility: state.credibility, stability: state.stability },
    choices: state.choices,
    authoredStatements: state.authoredStatements,
    timeline,
    ending: determineEnding().title
  };
}

async function copyReportJson() {
  const report = JSON.stringify(buildTeacherReport(), null, 2);
  try {
    await navigator.clipboard.writeText(report);
    exportStatus.textContent = "JSON report copied to clipboard.";
  } catch {
    exportStatus.textContent = "Clipboard unavailable. Open developer tools and copy from console output.";
    console.log(report);
  }
}

function downloadCsvTimeline() {
  const headers = ["step", "day", "scene", "choice", "optionText", "customStatement", "clarity", "empathy", "credibility", "stability"];
  const rows = timeline.map((row) => headers.map((h) => `"${String(row[h] ?? "").replace(/"/g, '""')}"`).join(","));
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `fault-lines-${state.studentId.slice(0, 8)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  exportStatus.textContent = "CSV timeline downloaded.";
}

function showEnding() {
  const end = determineEnding();
  document.getElementById("ending-title").textContent = end.title;
  document.getElementById("ending-summary").textContent = end.summary;

  const lessonList = document.getElementById("lesson-list");
  lessonList.innerHTML = "";
  [...lessons].slice(0, 10).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    lessonList.appendChild(li);
  });

  finalBriefPanel.classList.add("hidden");
  endingPanel.classList.remove("hidden");
  updateHud();
}

async function loadTeacherReports(files) {
  const reports = [];
  for (const file of files) {
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      if (json?.score && json?.ending) reports.push(json);
    } catch {
      // ignore invalid report files
    }
  }

  reviewBody.innerHTML = "";
  if (!reports.length) {
    reviewSummary.textContent = "No valid reports loaded.";
    return;
  }

  let totalC = 0, totalE = 0, totalCr = 0, totalS = 0;
  reports.forEach((r) => {
    totalC += Number(r.score.clarity || 0);
    totalE += Number(r.score.empathy || 0);
    totalCr += Number(r.score.credibility || 0);
    totalS += Number(r.score.stability || 0);

    const tr = document.createElement("tr");
    const student = r.studentAlias || `anonymous-${String(r.studentRef || "unk").slice(0, 6)}`;
    tr.innerHTML = `<td>${student}</td><td>${r.score.clarity}</td><td>${r.score.empathy}</td><td>${r.score.credibility}</td><td>${r.score.stability}</td><td>${r.ending}</td>`;
    reviewBody.appendChild(tr);
  });

  const n = reports.length;
  reviewSummary.textContent = `Loaded ${n} reports. Class averages — Clarity: ${(totalC / n).toFixed(1)}, Empathy: ${(totalE / n).toFixed(1)}, Credibility: ${(totalCr / n).toFixed(1)}, Stability: ${(totalS / n).toFixed(1)}.`;
}

function reset() {
  state.sceneId = "briefing";
  state.step = 1;
  state.clarity = 50;
  state.empathy = 50;
  state.credibility = 50;
  state.stability = 50;
  state.studentId = crypto.randomUUID();
  state.authoredStatements = [];
  state.choices = [];
  state.finalSpeech = "";

  timeline.length = 0;
  lessons.clear();
  pendingNext = null;

  statementInput.value = "";
  speechInput.value = "";
  speechWarning.classList.add("hidden");
  exportStatus.textContent = "";

  scenePanel.classList.remove("hidden");
  finalBriefPanel.classList.add("hidden");
  endingPanel.classList.add("hidden");

  renderScene();
}

startBtn.addEventListener("click", () => {
  state.studentAlias = aliasInput.value.trim() || "anonymous";
  startPanel.classList.add("hidden");
});
continueBtn.addEventListener("click", nextStep);
restartBtn.addEventListener("click", reset);
playAgain.addEventListener("click", reset);
copyJsonBtn.addEventListener("click", copyReportJson);
downloadCsvBtn.addEventListener("click", downloadCsvTimeline);
reportFiles.addEventListener("change", (event) => loadTeacherReports(event.target.files));

statementInput.addEventListener("input", () => { statementCount.textContent = `Word count: ${words(statementInput.value)}`; });

speechInput.addEventListener("input", () => {
  wordCount.textContent = `Word count: ${words(speechInput.value)}`;
  speechWarning.classList.add("hidden");
});

submitSpeech.addEventListener("click", () => {
  const text = speechInput.value.trim();
  const count = words(text);
  if (count < 120 || count > 160) {
    speechWarning.textContent = "Use 120–160 words so your statement is substantial but concise.";
    speechWarning.classList.remove("hidden");
    return;
  }

  state.finalSpeech = text;
  evaluateFinalSpeech(text);
  showEnding();
});

renderScene();
updateProgress(1);
