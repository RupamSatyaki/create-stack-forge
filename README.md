# create-stack-forge ⚡

> Scaffold fullstack apps in seconds — with live wireframe, conditional imports, and smart templates.

[![npm version](https://img.shields.io/npm/v/@rupamsatyaki/create-stack-forge)](https://www.npmjs.com/package/@rupamsatyaki/create-stack-forge)
[![node](https://img.shields.io/node/v/@rupamsatyaki/create-stack-forge)](https://nodejs.org)
[![license](https://img.shields.io/npm/l/@rupamsatyaki/create-stack-forge)](./LICENSE)

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
- [CLI Flags](#cli-flags)
- [Interactive Mode](#interactive-mode)
- [Generated Structure](#generated-structure)
- [Framework Options](#framework-options)
- [Database Options](#database-options)
- [Styling Options](#styling-options)
- [Conditional Imports](#conditional-imports)
- [Live Wireframe](#live-wireframe)
- [Color-coded Output](#color-coded-output)
- [Configuration File](#configuration-file)
- [Dependencies](#dependencies)

---

## Features

- **Interactive CLI** with live wireframe preview (side-by-side folder tree)
- **Frontend frameworks** — React 18/19, Vue 2/3, Vanilla JS/TS
- **Backend frameworks** — Express 4/5, Fastify 4/5 (JS/TS)
- **9 database options** — MongoDB, PostgreSQL, MySQL, SQLite, Redis, Firebase, Supabase
- **Multiple DB combos** — MongoDB + Redis, PostgreSQL + Redis, MySQL + Redis
- **ORM choice** — Mongoose or Typegoose (TypeScript-friendly)
- **5 styling options** — Tailwind, Bootstrap, Sass, CSS Modules, Styled Components
- **Conditional imports** — only imports what you select
- **Auto-generated package.json** with correct dependencies per selection
- **Database seeder** — `db/seed.js` with sample data, `npm run seed`
- **Template versioning** — choose framework version at scaffold time
- **Update command** — update config files of existing projects
- **Dry-run mode** — preview what would be generated without creating files
- **Color-coded output** — Created / Skipped / Updated / dry-run per file
- **Extras** — Git init, ESLint, Prettier, Docker, .env templates
- **`.forgerc.json`** — saved config for future updates

---

## Installation

### Use without installing (recommended)

```bash
npx @rupamsatyaki/create-stack-forge my-app
```

### Install globally

```bash
npm install -g @rupamsatyaki/create-stack-forge
```

Then use directly:

```bash
create-stack-forge my-app
```

### Install as dev dependency (for teams)

```bash
npm install --save-dev @rupamsatyaki/create-stack-forge
```

Add to `package.json` scripts:

```json
{
  "scripts": {
    "scaffold": "create-stack-forge"
  }
}
```

---

## Usage

```bash
# Interactive mode — full prompts with live wireframe
npx @rupamsatyaki/create-stack-forge my-app

# Default preset — React 18 + Express 4 + MongoDB + Tailwind (no prompts)
npx @rupamsatyaki/create-stack-forge my-app --default

# Only backend
npx @rupamsatyaki/create-stack-forge my-app --default --only backend

# Only frontend
npx @rupamsatyaki/create-stack-forge my-app --default --only frontend

# Skip prompts with flags
npx @rupamsatyaki/create-stack-forge my-app --frontend react --backend express --db mongodb --css tailwind

# Preview without creating files
npx @rupamsatyaki/create-stack-forge my-app --default --dry-run

# Update existing project config files
npx @rupamsatyaki/create-stack-forge update ./my-app

# Update with dry-run
npx @rupamsatyaki/create-stack-forge update ./my-app --dry-run
```

---

## Commands

### `create-stack-forge [project-name]`

Main scaffold command. Runs interactive prompts if no flags provided.

```bash
npx @rupamsatyaki/create-stack-forge my-app
```

### `create-stack-forge update [path]`

Updates config files of an existing `create-stack-forge` project.
Reads `.forgerc.json` from the project root (auto-saved on generation).

```bash
npx @rupamsatyaki/create-stack-forge update ./my-app
npx @rupamsatyaki/create-stack-forge update .          # current directory
npx @rupamsatyaki/create-stack-forge update ./my-app --dry-run
```

**What can be updated:**
- `package.json` — regenerate with latest dependencies
- Database config files — `config/db.js`, `prisma/schema.prisma`
- Styling config files — `tailwind.config.js`, `postcss.config.js`
- `.gitignore`
- `.env.example`

---

## CLI Flags

| Flag | Description | Example |
|------|-------------|---------|
| `--default` | Use default preset, skip all prompts | `--default` |
| `--only <part>` | Scaffold only `frontend` or `backend` | `--only backend` |
| `--frontend <fw>` | Set frontend framework | `--frontend react` |
| `--backend <fw>` | Set backend framework | `--backend express` |
| `--db <db>` | Set database | `--db mongodb` |
| `--css <style>` | Set styling option | `--css tailwind` |
| `--dry-run` | Preview only, no files created | `--dry-run` |

### Flag values

**`--frontend`**
```
react | vue | vanilla
```

**`--backend`**
```
express | fastify
```

**`--db`**
```
mongodb | pg-prisma | pg | mysql-prisma | mysql | sqlite-prisma | redis | firebase | supabase
```

**`--css`**
```
tailwind | bootstrap | sass | modules | styled
```

---

## Interactive Mode

Full step-by-step prompts with live wireframe:

```
┌─────────────────────────────────────────────────────┐
│   create-stack-forge — Let's build your stack!      │
└─────────────────────────────────────────────────────┘

? Project name: my-app

? What to include?
  ◉ Frontend
  ◉ Backend

── FRONTEND ──────────────────────────────────────────

? Frontend framework:
❯ React (JS)
  React (TS)
  Vue (JS)  ...

? React version:
❯ React 18 (stable)
  React 19 (latest)

? CSS / Styling:
❯ Tailwind CSS
  Bootstrap  ...

? Select frontend folders:     │  Preview:
  ◉ components                 │  📁 my-app/
  ◉ pages          ←live→      │  └── 📁 frontend/
  ◯ hooks                      │      ├── 📁 components/
  ◉ utils                      │      ├── 📁 pages/
  ◯ context                    │      ├── 📁 utils/
                               │      └── 📄 package.json

── BACKEND ───────────────────────────────────────────

? Backend framework:
❯ Express (JS)
  Express (TS)  ...

? Express version:
❯ Express 4 (stable)
  Express 5 (latest)

? Database setup:
❯ Single database
  Primary DB + Redis cache

? Database:
❯ MongoDB (Mongoose)
  MongoDB (Typegoose — TS)
  PostgreSQL (Prisma)  ...

? Select backend folders:      │  Preview:
  ◉ routes                     │  📁 my-app/
  ◉ controllers    ←live→      │  └── 📁 backend/
  ◉ models                     │      ├── 📁 routes/
  ◉ config                     │      ├── 📁 controllers/
  ◯ middlewares                │      ├── 📁 models/
  ◯ services                   │      ├── 📁 config/
                               │      └── 📄 package.json

? Optional extras:
  ◉ .env + .env.example
  ◯ Git init
  ◯ ESLint
  ◯ Prettier
  ◯ Docker

? Confirm and generate? › Yes
```

---

## Generated Structure

### Default preset output

```
my-app/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── index.js
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── hooks/
│   │   │   └── useFetch.js
│   │   ├── utils/
│   │   │   └── index.js
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   ├── index.html
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   ├── controllers/
│   │   │   └── user.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── error.middleware.js
│   │   ├── models/
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── index.js
│   │   │   └── user.routes.js
│   │   ├── utils/
│   │   │   ├── asyncHandler.js
│   │   │   ├── ApiResponse.js
│   │   │   └── ApiError.js
│   │   └── index.js
│   ├── db/
│   │   └── seed.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── .forgerc.json
└── README.md
```

---

## Framework Options

### Frontend

| Value | Description |
|-------|-------------|
| `react-js` | React (JavaScript) |
| `react-ts` | React (TypeScript) |
| `vue-js` | Vue 3 (JavaScript) |
| `vue-ts` | Vue 3 (TypeScript) |
| `vanilla-js` | Vanilla JavaScript |
| `vanilla-ts` | Vanilla TypeScript |

### Backend

| Value | Description |
|-------|-------------|
| `express-js` | Express (JavaScript) |
| `express-ts` | Express (TypeScript) |
| `fastify-js` | Fastify (JavaScript) |
| `fastify-ts` | Fastify (TypeScript) |

### Template Versions

| Framework | Available Versions |
|-----------|--------------------|
| React | 18 (stable), 19 (latest) |
| Vue | 2 (legacy), 3 (latest) |
| Express | 4 (stable), 5 (latest) |
| Fastify | 4 (stable), 5 (latest) |

---

## Database Options

### Single Database

| Value | ORM/Driver | Auto-generated files |
|-------|-----------|----------------------|
| `mongodb` | Mongoose | `config/db.js`, `models/user.model.js`, `.env` |
| `mongodb-typegoose` | Typegoose (TS) | `config/db.js`, `models/user.model.ts`, `.env` |
| `pg-prisma` | Prisma | `config/db.js`, `prisma/schema.prisma`, `.env` |
| `pg` | pg (raw) | `config/db.js`, `.env` |
| `mysql-prisma` | Prisma | `config/db.js`, `prisma/schema.prisma`, `.env` |
| `mysql` | mysql2 | `config/db.js`, `.env` |
| `sqlite-prisma` | Prisma | `config/db.js`, `prisma/schema.prisma`, `.env` |
| `redis` | redis | `config/redis.js`, `.env` |
| `firebase` | firebase-admin | `config/firebase.js`, `.env` |
| `supabase` | @supabase/supabase-js | `config/supabase.js`, `.env` |

### Combo (Primary DB + Redis Cache)

| Value | Description |
|-------|-------------|
| `mongodb+redis` | MongoDB as primary + Redis for caching |
| `pg-prisma+redis` | PostgreSQL (Prisma) + Redis |
| `mysql+redis` | MySQL + Redis |

### Database Seeder

Every project gets `db/seed.js` with sample data and an npm script:

```bash
npm run seed
```

---

## Styling Options

| Value | Files generated | Dev dependency |
|-------|----------------|----------------|
| `tailwind` | `tailwind.config.js`, `postcss.config.js`, CSS directives | `tailwindcss postcss autoprefixer` |
| `bootstrap` | CSS import in main entry | `bootstrap` |
| `sass` | `styles/index.scss` with variables | `sass` |
| `modules` | `styles/App.module.css` example | — |
| `styled` | `styles/theme.js` example | `styled-components` |

---

## Conditional Imports

The key feature — imports are added **only** if the folder was selected.

### Example: routes + controllers + models + utils selected

```js
// src/index.js
import express from 'express'
import { connectDB } from './config/db.js'      // config selected
import routes from './routes/index.js'           // routes selected
import { errorHandler } from './middlewares/...' // middlewares selected

// routes/user.routes.js
import { getUsers } from '../controllers/user.controller.js'  // controllers selected
import { verifyToken } from '../middlewares/auth.middleware.js' // middlewares selected

// controllers/user.controller.js
import { asyncHandler } from '../utils/asyncHandler.js'  // utils selected
import { User } from '../models/user.model.js'           // models selected
```

### If middlewares NOT selected

```js
// routes/user.routes.js — no middleware import
import { getUsers, createUser } from '../controllers/user.controller.js'

router.get('/', getUsers)   // no verifyToken
router.post('/', createUser)
```

### Import logic table

| Selected folder | Import added in | Code added |
|----------------|----------------|------------|
| `routes` | `src/index.js` | `app.use('/api', routes)` |
| `config` | `src/index.js` | `connectDB()` call |
| `middlewares` | `src/index.js` | `app.use(errorHandler)` |
| `controllers` | `routes/user.routes.js` | controller imports |
| `models` | `controllers/user.controller.js` | `User` model import |
| `services` | `controllers/user.controller.js` | service import |
| `utils` | `controllers/` + `services/` | `asyncHandler`, `ApiResponse` |

---

## Live Wireframe

During folder selection, a real-time tree updates on every keypress:

```
Select backend folders:        Preview:
↑↓ move  space select          📁 my-app/
                               └── 📁 backend/
❯ ◉ routes                         ├── 📁 routes/
  ◉ controllers                    ├── 📁 controllers/
  ◉ models                         ├── 📁 models/
  ◯ middlewares                    └── 📄 package.json
  ◯ services
  ◯ utils
```

---

## Color-coded Output

Every file operation is logged with color:

```
  ✔ Created   backend/src/index.js
  ✔ Created   backend/src/routes/index.js
  ✔ Created   backend/src/controllers/user.controller.js
  ⚡ Skipped   backend/src/services/     (not selected)
  ↺ Updated   backend/package.json
  ◆ dry-run   Would create backend/src/models/user.model.js
```

---

## Configuration File

`.forgerc.json` is auto-saved in the project root after generation:

```json
{
  "projectName": "my-app",
  "includeFrontend": true,
  "includeBackend": true,
  "frontend": {
    "framework": "react-js",
    "version": "18",
    "styling": "tailwind",
    "folders": ["components", "pages", "hooks", "utils", "context", "services"]
  },
  "backend": {
    "framework": "express-js",
    "version": "4",
    "database": "mongodb",
    "folders": ["routes", "controllers", "models", "config", "middlewares", "utils"]
  },
  "extras": {
    "gitInit": true,
    "env": true,
    "eslint": false,
    "prettier": false,
    "docker": false
  },
  "createdAt": "2026-04-22T00:00:00.000Z"
}
```

Used by `create-stack-forge update` to regenerate config files.

---

## Dependencies

### Runtime (installed with the package)

| Package | Purpose |
|---------|---------|
| `@clack/prompts` | Interactive CLI prompts |
| `chalk` | Colored terminal output |
| `commander` | CLI argument/flag parsing |
| `fs-extra` | File and folder operations |
| `ink` | React-based CLI UI (live wireframe) |
| `ora` | Spinner animations |
| `react` | Required by ink |

### Dev

| Package | Purpose |
|---------|---------|
| `vitest` | Unit testing |
| `eslint` | Linting |

---

## License

MIT © [RupamSatyaki](https://github.com/RupamSatyaki)
