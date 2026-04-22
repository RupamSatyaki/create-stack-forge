# Changelog

All notable changes to `create-stack-forge` will be documented here.

Format: `[version] - YYYY-MM-DD`
Types: `Added` | `Changed` | `Fixed` | `Removed`

---

## [1.0.0] - 2026-04-22

### Added

#### Core CLI
- Interactive CLI with step-by-step prompts using `@clack/prompts`
- ASCII art banner on startup
- `--default` flag — skips all prompts, uses default preset (React 18 + Express 4 + MongoDB + Tailwind)
- `--only frontend` / `--only backend` — scaffold only one part
- `--frontend`, `--backend`, `--db`, `--css` flags to skip individual prompts
- `--dry-run` flag — preview all files that would be created without writing anything
- `create-stack-forge update [path]` subcommand — update config files of existing projects

#### Frontend
- React (JS/TS), Vue (JS/TS), Vanilla (JS/TS) framework support
- Template versioning — React 18 / 19, Vue 2 / 3
- Styling options — Tailwind CSS, Bootstrap, Sass/SCSS, CSS Modules, Styled Components
- Selectable folders — `components`, `pages`, `hooks`, `utils`, `context`, `services`, `assets`, `styles`
- Auto-generated `vite.config.js`, `index.html`, `package.json`, `.env`, `.gitignore`
- Pre-written templates — `App.jsx`, `main.jsx`, `Home.jsx`, `AppContext.jsx`, `api.js`, `useFetch.js`

#### Backend
- Express (JS/TS), Fastify (JS/TS) framework support
- Template versioning — Express 4 / 5, Fastify 4 / 5
- Selectable folders — `routes`, `controllers`, `models`, `config`, `middlewares`, `services`, `utils`
- Auto-generated `package.json` with `start`, `dev`, `seed` scripts
- Pre-written templates — `index.js`, `user.routes.js`, `user.controller.js`, `user.service.js`
- Utility files — `asyncHandler.js`, `ApiResponse.js`, `ApiError.js`
- Middleware files — `auth.middleware.js` (JWT), `error.middleware.js`

#### Database Support
- MongoDB (Mongoose)
- MongoDB (Typegoose — TypeScript-friendly with decorators)
- PostgreSQL via Prisma
- PostgreSQL via `pg` (raw Pool)
- MySQL via Prisma
- MySQL via `mysql2`
- SQLite via Prisma
- Redis (standalone)
- Firebase (Firestore via `firebase-admin`)
- Supabase (`@supabase/supabase-js`)
- Combo options — MongoDB + Redis, PostgreSQL + Redis, MySQL + Redis (cache layer)
- Auto-generated `config/db.js` per database
- Auto-generated `.env` with correct variable names per database

#### Database Seeder
- `db/seed.js` auto-generated for every project with sample User data
- `npm run seed` script added to `backend/package.json`
- Seeder templates for MongoDB, Prisma, pg, mysql2, Firebase, Supabase

#### Conditional Imports
- `src/index.js` imports `routes` only if routes folder selected
- `src/index.js` calls `connectDB()` only if config folder selected
- `src/index.js` uses `errorHandler` only if middlewares folder selected
- `routes/user.routes.js` imports controllers only if controllers selected
- `routes/user.routes.js` uses `verifyToken` only if middlewares selected
- `controllers/user.controller.js` imports models only if models selected
- `controllers/user.controller.js` imports services only if services selected
- `controllers/user.controller.js` uses `asyncHandler`/`ApiResponse` only if utils selected
- `App.jsx` wraps with `AppProvider` only if context selected
- `App.jsx` renders `<Home />` only if pages selected
- `main.jsx` imports styling only if styling option selected

#### Live Wireframe
- Real-time folder tree preview during folder selection using `ink` (React for CLI)
- Side-by-side layout — left: checkbox list, right: live tree
- Arrow key navigation, space to select, enter to confirm

#### Color-coded Output
- `✔ Created` — green, for every file written
- `⚡ Skipped` — yellow, for folders not selected
- `↺ Updated` — cyan, for files updated via update command
- `◆ dry-run` — magenta, for dry-run preview
- `✖ Deleted` — red, for deleted files

#### Configuration
- `.forgerc.json` auto-saved in project root after generation
- Stores full config — framework, version, database, folders, extras
- Used by `update` command to regenerate files

#### Extras
- Git init (`git init` in project root)
- `.env` + `.env.example` templates
- ESLint config (`.eslintrc.js`)
- Prettier config (`.prettierrc`)
- Docker — `Dockerfile` for frontend and backend, `docker-compose.yml`

#### Package
- `engines` field — requires Node.js >= 18
- `bin` — `create-stack-forge` command registered globally
- Dependencies — `@clack/prompts`, `chalk`, `commander`, `fs-extra`, `ink`, `ora`, `react`

---

## [Unreleased]

### Planned
- Auth boilerplate — JWT register/login/logout routes pre-written
- Auto `npm install` after generation
- CI/CD templates — GitHub Actions, GitLab CI
- Monorepo mode — pnpm workspaces + Turborepo
- `--save` flag to persist custom presets as named templates
- Testing setup — Vitest (frontend), Jest (backend) with sample test files
- Swagger/OpenAPI auto-setup
- Multiple `.env` files — `.env.development`, `.env.production`, `.env.test`
