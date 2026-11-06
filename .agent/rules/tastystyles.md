# TastyStyles rules
- Read `understand/project.md` and `understand/overview.md` before any change.
- Never add a token in one place only (tokenModel + compileMarkdown + verify.ts together).
- Layouts and sections use only `--ts-*` variables. No hex colors, no hardcoded radii.
- Use `var(--ts-radius)` for controls, `var(--ts-radius-surface, 16px)` for surfaces.
- Images only from `src/config/mediaCatalog.ts`.
- Finish every task by running: npx tsc -b && npm run lint && npm test && npm run build.
- Update `understand/project.md` when structure changes.
