# Repository Guidelines

## Project Structure & Module Organization

This is a single-page React portfolio built with Create React App. The main page is in `src/App.jsx`; reusable portfolio sections live in `src/components/`, with content and translations in `src/data.js` and `src/i18n.js`. Additional experiences are grouped under `src/app/` (including `animated/`, `newsroom/`, and `case-study/`), with app-specific data, components, and styles nearby. Shared Tailwind input is `src/styles/tailwind.css`. Tests and Jest setup are in `src/tests/` and `src/setupTests.js`. Put served static files in `public/`; source media and legacy static files are in `assets/`. `build/` is generated output and should not be edited by hand.

## Build, Test, and Development Commands

- `npm install` installs dependencies from the lockfile.
- `npm start` runs the local development server at `http://localhost:3000`.
- `npm test` runs Jest once with coverage (watch mode disabled).
- `npm run build` creates the production bundle in `build/`.

## Coding Style & Naming Conventions

Follow `.editorconfig`: UTF-8, LF line endings, four spaces, and a final newline. Use the existing React and JavaScript patterns; components use PascalCase filenames and names (for example, `ContactForm.jsx`), while utilities and data modules use camelCase. Keep app-specific styles and data beside their feature. The project uses the `react-app` and `react-app/jest` ESLint configurations; no separate formatter is configured.

## Testing Guidelines

Tests use Jest with React Testing Library and `@testing-library/user-event`. Add tests under `src/tests/` using the `*.test.jsx` naming pattern and verify user-visible behavior. Run `npm test` before submitting. Jest is configured for 100% global branch, function, line, and statement coverage over its included source files; excluded files are listed in `package.json`.

## Commit & Pull Request Guidelines

Recent commits use short, imperative, lowercase summaries (for example, `update logo` or `update app`). Keep commits focused and describe the user-visible change. PRs should include a concise summary, relevant issue or context, verification performed, and screenshots for visual changes. Mention any unrun checks or configuration changes.

## Security & Configuration

Do not commit credentials, private keys, or local environment files. Keep public assets free of sensitive information, and use the existing static-asset conventions for downloadable files.

<!-- antislop:start -->
## antislop
For UI, copy, people, mobile layout, or code comments work, read `antislop.md` (core) and then the skill for the task:
- UI / visual: `.agents/skills/antislop-ui/SKILL.md`
- Copy & text: `.agents/skills/antislop-copywriting/SKILL.md`
- People: `.agents/skills/antislop-human/SKILL.md`
- Mobile / responsive: `.agents/skills/antislop-layoutmobile/SKILL.md`
- Code comments: `.agents/skills/antislop-code/SKILL.md`
Before starting, follow the core's "Two Usage Modes" section in strict order: explicit session instruction first, then global preference, then ask. A session instruction always wins. For a resolved mode, say `antislop active: <mode> (session override).` or `antislop active: <mode> (global preference).` once before presenting findings or making edits, using the actual mode and source. Acknowledging the user's request without naming the source does not replace this notice.
Only an explicit choice of antislop during or after selects a session mode. A request to review, audit, or avoid file edits does not select a mode; read the global preference in that case. Another skill's mode does not select antislop's mode.
If the mode is unresolved, ask during/after and end the response; wait for the answer before any UI review, planning, or concept. For read-only tasks, put the active-mode notice only at the start of the final answer, never in progress messages. For editing tasks, announce before the first edit and omit it from the final answer.
To update antislop later: download `antislop.md` again, or run `npx antislop-ai --update` if it was installed as skill folders.
<!-- antislop:end -->
