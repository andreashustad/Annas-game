# Anna's Game — Fault Lines: Signal & Static

A branching, story-driven web game for students aged 16–18 to practice high-stakes English communication.

## How a teacher checks each student's score

1. Each student completes a run and exports a JSON report from the ending screen.
2. The report includes final scores (Clarity, Empathy, Credibility, Stability), ending, and full timeline.
3. In the **Teacher Review Workspace** (same page), the teacher uploads many JSON files.
4. The game shows per-student rows and class averages.

## GDPR / privacy-by-design approach

- No backend and no automatic network storage.
- Reports are generated locally in the browser.
- Student identity is pseudonymous by default (`studentRef` only).
- Student nickname is optional and excluded from export unless checkbox is enabled.
- Teachers can run the activity with nicknames/class codes instead of real names.

## UX improvements included

- Start panel with nickname guidance (no full names).
- Clear progress bar across simulation days.
- Better teacher workflow (bulk JSON upload + summary table).
- Stronger feedback loop through debrief + teaching notes.

## Run

Open `index.html` in a browser.
