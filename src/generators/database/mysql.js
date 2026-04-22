export const mysqlDbConfig = `import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  user:     process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

export const connectDB = async () => {
  await pool.getConnection()
  console.log('MySQL connected')
}
`

export const mysqlEnv = `DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=password
DB_NAME=myapp
PORT=3000
JWT_SECRET=your_jwt_secret_here
`
