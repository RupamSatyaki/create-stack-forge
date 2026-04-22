import * as p from '@clack/prompts'
import { STYLING_OPTIONS } from '../../constants/styling.js'

export async function promptStyling(existing) {
  if (existing) return existing

  const styling = await p.select({
    message: 'CSS / Styling:',
    options: STYLING_OPTIONS,
  })

  if (p.isCancel(styling)) return null
  return styling
}
