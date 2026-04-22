export const supabaseConfig = `import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export const connectDB = async () => {
  console.log('Supabase client ready')
}
`

export const supabaseEnv = `SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
PORT=3000
JWT_SECRET=your_jwt_secret_here
`
