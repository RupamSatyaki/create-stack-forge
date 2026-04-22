import { writeFile } from '../../utils/fileWriter.js'
import { resolvePath, frontendPath, backendPath } from '../../utils/pathResolver.js'

export async function generateDocker(projectName, config) {
  if (config.includeBackend) {
    const backendDockerfile = `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
`
    await writeFile(backendPath(projectName, 'Dockerfile'), backendDockerfile)
  }

  if (config.includeFrontend) {
    const frontendDockerfile = `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
`
    await writeFile(frontendPath(projectName, 'Dockerfile'), frontendDockerfile)
  }

  // docker-compose.yml
  const services = []
  
  if (config.includeBackend) {
    services.push(`  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - ./backend:/app
      - /app/node_modules`)
  }

  if (config.includeFrontend) {
    services.push(`  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    volumes:
      - ./frontend:/app
      - /app/node_modules`)
  }

  const compose = `version: '3.8'

services:
${services.join('\n\n')}
`
  await writeFile(resolvePath(projectName, 'docker-compose.yml'), compose)
}
