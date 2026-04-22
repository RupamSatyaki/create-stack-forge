export const DATABASES = [
  { value: 'mongodb',        label: 'MongoDB (Mongoose)',    pkg: 'mongoose' },
  { value: 'mongodb-typegoose', label: 'MongoDB (Typegoose — TS)', pkg: 'mongoose @typegoose/typegoose reflect-metadata' },
  { value: 'pg-prisma',      label: 'PostgreSQL (Prisma)',   pkg: 'prisma @prisma/client' },
  { value: 'pg',             label: 'PostgreSQL (pg)',       pkg: 'pg' },
  { value: 'mysql-prisma',   label: 'MySQL (Prisma)',        pkg: 'prisma @prisma/client' },
  { value: 'mysql',          label: 'MySQL (mysql2)',        pkg: 'mysql2' },
  { value: 'sqlite-prisma',  label: 'SQLite (Prisma)',       pkg: 'prisma @prisma/client' },
  { value: 'redis',          label: 'Redis (standalone)',    pkg: 'redis' },
  { value: 'firebase',       label: 'Firebase (Firestore)',  pkg: 'firebase-admin' },
  { value: 'supabase',       label: 'Supabase',              pkg: '@supabase/supabase-js' },
  { value: 'none',           label: 'None',                  pkg: '' },
]

// Combo options — primary DB + Redis cache layer
export const DATABASE_COMBOS = [
  { value: 'mongodb+redis',   label: 'MongoDB + Redis (cache)',    primary: 'mongodb',   cache: 'redis' },
  { value: 'pg-prisma+redis', label: 'PostgreSQL + Redis (cache)', primary: 'pg-prisma', cache: 'redis' },
  { value: 'mysql+redis',     label: 'MySQL + Redis (cache)',      primary: 'mysql',     cache: 'redis' },
]
