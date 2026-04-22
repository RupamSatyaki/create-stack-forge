// Generates seed.js file based on selected database

export function generateSeeder(database) {
  switch (database) {
    case 'mongodb':
    case 'mongodb-typegoose':
      return `import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { User } from '../models/user.model.js'

dotenv.config()

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Connected to MongoDB')

  await User.deleteMany({})

  await User.insertMany([
    { name: 'Alice',   email: 'alice@example.com',   password: 'hashed_password_1' },
    { name: 'Bob',     email: 'bob@example.com',     password: 'hashed_password_2' },
    { name: 'Charlie', email: 'charlie@example.com', password: 'hashed_password_3' },
  ])

  console.log('Seeded 3 users')
  await mongoose.disconnect()
}

seed().catch(console.error)
`

    case 'pg-prisma':
    case 'mysql-prisma':
    case 'sqlite-prisma':
      return `import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.user.deleteMany()

  await prisma.user.createMany({
    data: [
      { name: 'Alice',   email: 'alice@example.com',   password: 'hashed_password_1' },
      { name: 'Bob',     email: 'bob@example.com',     password: 'hashed_password_2' },
      { name: 'Charlie', email: 'charlie@example.com', password: 'hashed_password_3' },
    ],
  })

  console.log('Seeded 3 users')
  await prisma.$disconnect()
}

seed().catch(console.error)
`

    case 'pg':
      return `import { pool } from '../config/db.js'

const seed = async () => {
  await pool.query('DELETE FROM users')

  await pool.query(\`
    INSERT INTO users (name, email, password) VALUES
    ('Alice',   'alice@example.com',   'hashed_password_1'),
    ('Bob',     'bob@example.com',     'hashed_password_2'),
    ('Charlie', 'charlie@example.com', 'hashed_password_3')
  \`)

  console.log('Seeded 3 users')
  await pool.end()
}

seed().catch(console.error)
`

    case 'mysql':
      return `import { pool } from '../config/db.js'

const seed = async () => {
  await pool.query('DELETE FROM users')

  await pool.query(\`
    INSERT INTO users (name, email, password) VALUES
    ('Alice',   'alice@example.com',   'hashed_password_1'),
    ('Bob',     'bob@example.com',     'hashed_password_2'),
    ('Charlie', 'charlie@example.com', 'hashed_password_3')
  \`)

  console.log('Seeded 3 users')
  await pool.end()
}

seed().catch(console.error)
`

    case 'firebase':
      return `import { db } from '../config/firebase.js'

const seed = async () => {
  const users = [
    { name: 'Alice',   email: 'alice@example.com' },
    { name: 'Bob',     email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' },
  ]

  for (const user of users) {
    await db.collection('users').add(user)
  }

  console.log('Seeded 3 users to Firestore')
}

seed().catch(console.error)
`

    case 'supabase':
      return `import { supabase } from '../config/supabase.js'

const seed = async () => {
  await supabase.from('users').delete().neq('id', 0)

  const { error } = await supabase.from('users').insert([
    { name: 'Alice',   email: 'alice@example.com' },
    { name: 'Bob',     email: 'bob@example.com' },
    { name: 'Charlie', email: 'charlie@example.com' },
  ])

  if (error) throw error
  console.log('Seeded 3 users to Supabase')
}

seed().catch(console.error)
`

    default:
      return `// Add your seed data here\nconsole.log('Seeder ready')\n`
  }
}
