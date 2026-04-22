import { mongoDbConfig, mongoUserModel, mongoEnv } from './mongodb.js'
import { typegooseDbConfig, typegooseUserModel, typegooseEnv } from './typegoose.js'
import { getPrismaSchema, prismaDbConfig, getPrismaEnv } from './prisma.js'
import { pgDbConfig, pgEnv } from './pg.js'
import { mysqlDbConfig, mysqlEnv } from './mysql.js'
import { redisConfig, redisEnv } from './redis.js'
import { firebaseConfig, firebaseEnv } from './firebase.js'
import { supabaseConfig, supabaseEnv } from './supabase.js'
import { generateSeeder } from './seeder.js'
import { DATABASE_COMBOS } from '../../constants/databases.js'

// Resolve combo string to primary + cache
export function resolveDatabase(database) {
  const combo = DATABASE_COMBOS.find(c => c.value === database)
  if (combo) return { primary: combo.primary, cache: combo.cache, isCombo: true }
  return { primary: database, cache: null, isCombo: false }
}

export function getDbFiles(database, includeSeeder = true) {
  const { primary, cache, isCombo } = resolveDatabase(database)

  const files = { ...getPrimaryDbFiles(primary, includeSeeder) }

  // Add Redis cache layer if combo
  if (isCombo && cache === 'redis') {
    files['config/redis.js'] = redisConfig
    // Merge env vars
    const existing = files['.env'] || ''
    files['.env'] = existing + `\n# Redis Cache\nREDIS_URL=redis://localhost:6379\n`
  }

  return files
}

function getPrimaryDbFiles(database, includeSeeder) {
  const seeder = includeSeeder ? { 'db/seed.js': generateSeeder(database) } : {}

  switch (database) {
    case 'mongodb':
      return {
        'config/db.js':         mongoDbConfig,
        'models/user.model.js': mongoUserModel,
        '.env':                 mongoEnv,
        ...seeder,
      }
    case 'mongodb-typegoose':
      return {
        'config/db.js':         typegooseDbConfig,
        'models/user.model.ts': typegooseUserModel,
        '.env':                 typegooseEnv,
        ...seeder,
      }
    case 'pg-prisma':
      return {
        'config/db.js':           prismaDbConfig,
        'prisma/schema.prisma':   getPrismaSchema('postgresql'),
        '.env':                   getPrismaEnv('postgresql'),
        ...seeder,
      }
    case 'mysql-prisma':
      return {
        'config/db.js':           prismaDbConfig,
        'prisma/schema.prisma':   getPrismaSchema('mysql'),
        '.env':                   getPrismaEnv('mysql'),
        ...seeder,
      }
    case 'sqlite-prisma':
      return {
        'config/db.js':           prismaDbConfig,
        'prisma/schema.prisma':   getPrismaSchema('sqlite'),
        '.env':                   getPrismaEnv('sqlite'),
        ...seeder,
      }
    case 'pg':
      return { 'config/db.js': pgDbConfig, '.env': pgEnv, ...seeder }
    case 'mysql':
      return { 'config/db.js': mysqlDbConfig, '.env': mysqlEnv, ...seeder }
    case 'redis':
      return { 'config/redis.js': redisConfig, '.env': redisEnv }
    case 'firebase':
      return { 'config/firebase.js': firebaseConfig, '.env': firebaseEnv, ...seeder }
    case 'supabase':
      return { 'config/supabase.js': supabaseConfig, '.env': supabaseEnv, ...seeder }
    default:
      return {}
  }
}
