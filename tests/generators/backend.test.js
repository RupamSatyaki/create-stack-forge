import { describe, it, expect } from 'vitest'
import { generateExpressIndex } from '../../src/generators/backend/express.js'

describe('Backend Generator', () => {
  it('should generate Express index with routes', () => {
    const folders = ['routes', 'config']
    const result = generateExpressIndex(folders, 'mongodb')
    expect(result).toContain('import routes from')
    expect(result).toContain('app.use(\'/api\', routes)')
    expect(result).toContain('connectDB')
  })

  it('should not import routes if not selected', () => {
    const folders = ['config']
    const result = generateExpressIndex(folders, 'mongodb')
    expect(result).not.toContain('import routes from')
  })

  it('should include error handler if middlewares selected', () => {
    const folders = ['middlewares']
    const result = generateExpressIndex(folders, 'none')
    expect(result).toContain('import { errorHandler }')
    expect(result).toContain('app.use(errorHandler)')
  })
})
