import React, { useState } from 'react'
import { Box, Text, useInput, useApp } from 'ink'

// Side-by-side folder selector with live tree preview
export function LiveFolderSelect({ options, initialValues = [], projectName, part, onSubmit }) {
  const { exit } = useApp()
  const [cursor, setCursor]     = useState(0)
  const [selected, setSelected] = useState(new Set(initialValues))

  useInput((input, key) => {
    if (key.upArrow)   setCursor(c => Math.max(0, c - 1))
    if (key.downArrow) setCursor(c => Math.min(options.length - 1, c + 1))

    if (input === ' ') {
      setSelected(prev => {
        const next = new Set(prev)
        const val  = options[cursor].value
        next.has(val) ? next.delete(val) : next.add(val)
        return next
      })
    }
    if (key.return) onSubmit([...selected])
    if (key.escape) onSubmit(null)
  })

  const selectedFolders = [...selected]

  return React.createElement(Box, { flexDirection: 'row', gap: 4 },
    // Left: Checklist
    React.createElement(Box, { flexDirection: 'column', width: 32 },
      React.createElement(Text, { bold: true, color: 'cyan' }, `Select ${part} folders:`),
      React.createElement(Text, { dimColor: true }, '↑↓ move  space select  enter confirm'),
      React.createElement(Box, { marginTop: 1, flexDirection: 'column' },
        ...options.map((opt, i) => {
          const isSelected = selected.has(opt.value)
          const isCursor   = i === cursor
          return React.createElement(Box, { key: opt.value },
            React.createElement(Text, { color: isCursor ? 'cyan' : undefined },
              `${isCursor ? '❯ ' : '  '}${isSelected ? '◉' : '◯'} ${opt.label}`
            )
          )
        })
      )
    ),
    // Right: Live tree
    React.createElement(Box, { flexDirection: 'column' },
      React.createElement(Text, { bold: true, color: 'cyan' }, 'Preview:'),
      React.createElement(Box, { marginTop: 1, flexDirection: 'column' },
        React.createElement(Text, null, `📁 `, React.createElement(Text, { bold: true }, `${projectName}/`)),
        React.createElement(Text, null, `└── 📁 ${part}/`),
        ...selectedFolders.map((f, i) =>
          React.createElement(Text, { key: f, color: 'green' },
            `    ${i === selectedFolders.length - 1 ? '└──' : '├──'} 📁 ${f}/`
          )
        ),
        React.createElement(Text, { dimColor: true }, '    └── 📄 package.json')
      )
    )
  )
}
