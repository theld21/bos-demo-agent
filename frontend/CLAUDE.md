## WHAT: Project Overview & Tech Stack
Enterprise frontend application for the BOS project.
- **Framework:** Nuxt.js 4.4.2 (Vue 3.5.30)
- **UI & Styling:** Ant Design Vue 4.2.0, TailwindCSS 6.14.0, Material Symbols
- **State & HTTP:** Pinia 3.0.4, Axios 1.14.0
- **Language:** JavaScript (ES Modules)

## Project Structure Map
- `app/assets/`: Tailwind entries (`css/main.css`) and static image assets.
- `app/components/layout/`: Structural page layout components.
- `app/components/ui/`: Reusable presentation/UI components.
- `app/stores/`: Modular Pinia state management.
- `app/pages/`: Nuxt file-based routing.
- `app/locales/`: i18n translation strings (`en.json`, `vi.json`).
- `app/utils/`: Shared utilities (e.g., `swal.js`, `translate.js`).

## HOW: Code Style & Architecture Guidelines
- **Vue Components:** Strictly use functional component style with `<script setup>` (Composition API).
- **Naming Conventions:**
  - Components & Component Files: `PascalCase` (e.g., `AppHeader.vue`).
  - Stores: `camelCase` with `use` prefix (e.g., `useAuthStore`).
  - Utility Files: `camelCase`.
- **State Management (Pinia):** Follow the modular Composition API pattern. Every store must be split into:
  - `state.js`: Reactive refs.
  - `getters.js`: Computed properties.
  - `actions.js`: Methods.
  - `index.js`: Store assembly returning `{ ...state, ...getters, ...actions }`.
- **API Requests:** DO NOT import Axios directly. Use the configured Nuxt plugin via `const { $api } = useNuxtApp()`. The interceptor automatically handles Bearer tokens and 401 redirects.
- **UI & Styling:** - Prefer Ant Design Vue components (`a-button`, `a-form`, etc.) for complex interactive UI.
- **i18n:** Use `$t('key.path')` in templates or `const { t } = useI18n()` in scripts. DO NOT hardcode text strings in the UI.

## HOW: Workflow
- This project runs locally on port 3001.
- The backend API is expected to run locally on port 8080.
- Do not modify `nuxt.config.ts` or `tailwind.config.js` unless explicitly instructed.
- Never run git commit, push command