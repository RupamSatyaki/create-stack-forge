import * as p from '@clack/prompts'
import { DATABASES, DATABASE_COMBOS } from '../../constants/databases.js'

export async function promptDatabase(existing) {
  if (existing) return existing

  // Ask single or combo
  const mode = await p.select({
    message: 'Database setup:',
    options: [
      { value: 'single', label: 'Single database' },
      { value: 'combo',  label: 'Primary DB + Redis cache' },
    ],
  })
  if (p.isCancel(mode)) return null

  if (mode === 'combo') {
    const combo = await p.select({
      message: 'Select combo:',
      options: DATABASE_COMBOS,
    })
    if (p.isCancel(combo)) return null
    return combo  // e.g. 'mongodb+redis'
  }

  const db = await p.select({
    message: 'Database:',
    options: DATABASES,
  })

  if (p.isCancel(db)) return null
  return db
}
