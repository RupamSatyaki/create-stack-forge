import React from 'react'
import { render } from 'ink'
import { LiveFolderSelect } from './LiveTree.js'

// Renders the ink component and returns selected folders as a Promise
export function renderFolderSelect({ options, initialValues, projectName, part }) {
  return new Promise((resolve) => {
    const { unmount } = render(
      React.createElement(LiveFolderSelect, {
        options,
        initialValues,
        projectName,
        part,
        onSubmit: (result) => {
          unmount()
          resolve(result)
        },
      })
    )
  })
}
