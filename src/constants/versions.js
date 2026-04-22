export const FRONTEND_VERSIONS = {
  'react-js': [
    { value: '19', label: 'React 19 (latest)', pkg: 'react@^19.0.0 react-dom@^19.0.0' },
    { value: '18', label: 'React 18 (stable)', pkg: 'react@^18.0.0 react-dom@^18.0.0' },
  ],
  'react-ts': [
    { value: '19', label: 'React 19 (latest)', pkg: 'react@^19.0.0 react-dom@^19.0.0' },
    { value: '18', label: 'React 18 (stable)', pkg: 'react@^18.0.0 react-dom@^18.0.0' },
  ],
  'vue-js': [
    { value: '3', label: 'Vue 3 (latest)', pkg: 'vue@^3.0.0' },
    { value: '2', label: 'Vue 2 (legacy)',  pkg: 'vue@^2.7.0' },
  ],
  'vue-ts': [
    { value: '3', label: 'Vue 3 (latest)', pkg: 'vue@^3.0.0' },
  ],
}

export const BACKEND_VERSIONS = {
  'express-js': [
    { value: '5', label: 'Express 5 (latest)', pkg: 'express@^5.0.0' },
    { value: '4', label: 'Express 4 (stable)', pkg: 'express@^4.18.0' },
  ],
  'express-ts': [
    { value: '5', label: 'Express 5 (latest)', pkg: 'express@^5.0.0' },
    { value: '4', label: 'Express 4 (stable)', pkg: 'express@^4.18.0' },
  ],
  'fastify-js': [
    { value: '5', label: 'Fastify 5 (latest)', pkg: 'fastify@^5.0.0' },
    { value: '4', label: 'Fastify 4 (stable)', pkg: 'fastify@^4.0.0' },
  ],
  'fastify-ts': [
    { value: '5', label: 'Fastify 5 (latest)', pkg: 'fastify@^5.0.0' },
    { value: '4', label: 'Fastify 4 (stable)', pkg: 'fastify@^4.0.0' },
  ],
}

// Default versions used in --default preset
export const DEFAULT_VERSIONS = {
  frontend: '18',
  backend: '4',
}
