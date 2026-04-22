export const mongoDbConfig = `import mongoose from 'mongoose'

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB connected')
}
`

export const mongoUserModel = `import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true })

export const User = mongoose.model('User', userSchema)
`

export const mongoEnv = `MONGO_URI=mongodb://localhost:27017/myapp
PORT=3000
JWT_SECRET=your_jwt_secret_here
`
