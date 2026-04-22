export const redisConfig = `import { createClient } from 'redis'

export const redis = createClient({ url: process.env.REDIS_URL })

export const connectDB = async () => {
  await redis.connect()
  console.log('Redis connected')
}
`

export const redisEnv = `REDIS_URL=redis://localhost:6379
PORT=3000
JWT_SECRET=your_jwt_secret_here
`
