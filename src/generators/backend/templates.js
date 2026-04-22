// All backend template files with conditional imports

export function generateRoutesIndex(folders) {
  const has = (f) => folders.includes(f)
  const lines = [`import { Router } from 'express'`]

  if (has('controllers')) {
    lines.push(`import userRoutes from './user.routes.js'`)
  }

  lines.push(``, `const router = Router()`)

  if (has('controllers')) {
    lines.push(`router.use('/users', userRoutes)`)
  }

  lines.push(``, `export default router`, '')
  return lines.join('\n')
}

export function generateUserRoutes(folders) {
  const has = (f) => folders.includes(f)
  const lines = [`import { Router } from 'express'`]

  if (has('controllers')) {
    lines.push(`import { getUsers, createUser } from '../controllers/user.controller.js'`)
  }
  if (has('middlewares')) {
    lines.push(`import { verifyToken } from '../middlewares/auth.middleware.js'`)
  }

  lines.push(``, `const router = Router()`)

  if (has('controllers') && has('middlewares')) {
    lines.push(`router.get('/', verifyToken, getUsers)`)
    lines.push(`router.post('/', createUser)`)
  } else if (has('controllers')) {
    lines.push(`router.get('/', getUsers)`)
    lines.push(`router.post('/', createUser)`)
  } else {
    lines.push(`// Add your route handlers here`)
  }

  lines.push(``, `export default router`, '')
  return lines.join('\n')
}

export function generateUserController(folders) {
  const has = (f) => folders.includes(f)
  const lines = []

  if (has('utils')) {
    lines.push(`import { asyncHandler } from '../utils/asyncHandler.js'`)
    lines.push(`import { ApiResponse } from '../utils/ApiResponse.js'`)
  }
  if (has('models')) {
    lines.push(`import { User } from '../models/user.model.js'`)
  }
  if (has('services')) {
    lines.push(`import { userService } from '../services/user.service.js'`)
  }

  lines.push('')

  if (has('utils')) {
    lines.push(`export const getUsers = asyncHandler(async (req, res) => {`)
  } else {
    lines.push(`export const getUsers = async (req, res) => {`)
    lines.push(`  try {`)
  }

  if (has('services')) {
    lines.push(`  const users = await userService.getAll()`)
  } else if (has('models')) {
    lines.push(`  const users = await User.find()`)
  } else {
    lines.push(`  const users = []`)
  }

  if (has('utils')) {
    lines.push(`  res.json(new ApiResponse(200, users, 'Users fetched'))`)
    lines.push(`})`)
  } else {
    lines.push(`  res.json({ success: true, data: users })`)
    lines.push(`  } catch (err) { res.status(500).json({ message: err.message }) }`)
    lines.push(`}`)
  }

  lines.push('')

  if (has('utils')) {
    lines.push(`export const createUser = asyncHandler(async (req, res) => {`)
  } else {
    lines.push(`export const createUser = async (req, res) => {`)
    lines.push(`  try {`)
  }

  if (has('models')) {
    lines.push(`  const user = await User.create(req.body)`)
  } else {
    lines.push(`  const user = req.body`)
  }

  if (has('utils')) {
    lines.push(`  res.json(new ApiResponse(201, user, 'User created'))`)
    lines.push(`})`)
  } else {
    lines.push(`  res.json({ success: true, data: user })`)
    lines.push(`  } catch (err) { res.status(500).json({ message: err.message }) }`)
    lines.push(`}`)
  }

  lines.push('')
  return lines.join('\n')
}

export function generateUserService(folders) {
  const has = (f) => folders.includes(f)
  const lines = []

  if (has('models')) {
    lines.push(`import { User } from '../models/user.model.js'`)
    lines.push('')
    lines.push(`export const userService = {`)
    lines.push(`  getAll: () => User.find(),`)
    lines.push(`  getById: (id) => User.findById(id),`)
    lines.push(`  create: (data) => User.create(data),`)
    lines.push(`  update: (id, data) => User.findByIdAndUpdate(id, data, { new: true }),`)
    lines.push(`  delete: (id) => User.findByIdAndDelete(id),`)
    lines.push(`}`)
  } else {
    lines.push(`// Add your service logic here`)
    lines.push(`export const userService = {`)
    lines.push(`  getAll: async () => [],`)
    lines.push(`  create: async (data) => data,`)
    lines.push(`}`)
  }

  lines.push('')
  return lines.join('\n')
}

export const UTILS_TEMPLATES = {
  'asyncHandler.js': `export const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next)
  } catch (err) {
    next(err)
  }
}
`,
  'ApiResponse.js': `export class ApiResponse {
  constructor(statusCode, data, message = 'Success') {
    this.statusCode = statusCode
    this.data = data
    this.message = message
    this.success = statusCode < 400
  }
}
`,
  'ApiError.js': `export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message)
    this.statusCode = statusCode
    this.success = false
  }
}
`,
}

export const MIDDLEWARE_TEMPLATES = {
  'error.middleware.js': `export const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500
  res.status(status).json({ success: false, message: err.message })
}
`,
  'auth.middleware.js': `import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET)
    next()
  } catch {
    res.status(401).json({ message: 'Invalid token' })
  }
}
`,
}
