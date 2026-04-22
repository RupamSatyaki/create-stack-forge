export const pgDbConfig = `import pg from 'pg'
const { Pool } = pg

export const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

export const connectDB = async () => {
  await pool.connect()
  console.log('PostgreSQL connected')
}
`

export const pgEnv = `DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
DB_NAME=myapp
PORT=3000
JWT_SECRET=your_jwt_secret_here
`
