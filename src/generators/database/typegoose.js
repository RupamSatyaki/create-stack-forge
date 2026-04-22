export const typegooseDbConfig = `import mongoose from 'mongoose'

export const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI)
  console.log('MongoDB connected (Typegoose)')
}
`

export const typegooseUserModel = `import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true } })
export class UserClass {
  @prop({ required: true })
  public name!: string

  @prop({ required: true, unique: true })
  public email!: string

  @prop({ required: true })
  public password!: string
}

export const User = getModelForClass(UserClass)
`

export const typegooseEnv = `MONGO_URI=mongodb://localhost:27017/myapp
PORT=3000
JWT_SECRET=your_jwt_secret_here
`
