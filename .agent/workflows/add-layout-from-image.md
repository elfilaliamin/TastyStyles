# Add a Layout From an Image

**Input**: An image file in `reference/` and the target `pageType`.

## Step-by-Step Execution Protocol

1. **Analyze the Reference Image**:
   - Deconstruct the image from top to bottom into distinct UI sections.
   - List each section with a one-line structural description and layout intent.

2. **Audit Section Library**:
   - Check `src/sections/` and the section registry.
   - For each identified section, determine whether an existing section can be reused (`REUSE`) or if a new section is required (`NEW`).

3. **Build Required New Sections**:
   - Implement new section components in `src/sections/<SectionName>/Section.tsx`.
   - Add `src/sections/<SectionName>/manifest.ts` adhering to `SectionManifestSchema`.
   - **Architectural Constraints**:
     - Strict token binding: Use ONLY `--ts-*` variables (`var(--ts-color-*)`, `var(--ts-font-*)`, etc.).
     - Dual-radius isolation: Surface containers MUST use `var(--ts-radius-surface, 16px)` (clamped to max 20px). Never use `var(--ts-radius)` or `9999px` on cards or container blocks.
     - Multi-column form grid overflow prevention: Multi-column grids must use `repeat(..., minmax(0, 1fr))` with `boxSizing: 'border-box'` and `minWidth: 0` on inputs.
     - Imagery: Source realistic photography and media URLs exclusively from `src/lib/mediaCatalog.ts`.

4. **Scaffold the Layout**:
   - Run: `npm run new:layout <pageType> <layoutId> "[Layout Label]"`
   - Compose `src/layouts/<pageType>/<layoutId>/Layout.tsx` by assembling the ordered sections.

5. **Complete the Manifest**:
   - In `src/layouts/<pageType>/<layoutId>/manifest.ts`:
     - Provide the ordered `sections` array.
     - Write a precise plain-text architectural `description` (this is compiled into the agent brief).
     - Assign relevant `purposes` and `tags`.
     - Set `source: "reference/<filename>"` pointing to the reference image.

6. **Verify Responsiveness & Multi-Mode Render**:
   - Test layout across all 3 viewports: Mobile (375px), Tablet (768px), Desktop (100%).
   - Verify appearance in both Light and Dark modes.

7. **Run Full Quality Gate**:
   - `npx tsc -b`
   - `npm run lint`
   - `npm test` (`npx tsx scripts/verify.ts`)
   - `npm run build`

8. **Report Summary**:
   - Document: sections reused, sections created, files added, and zero-drift verification status.
