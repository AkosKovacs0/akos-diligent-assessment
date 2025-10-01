# Development Container Setup

This project includes a devcontainer configuration that provides a consistent, reproducible development environment.

## What's Included

- **Node.js 20 LTS** - Latest long-term support version
- **TypeScript** - Pre-configured with all tooling
- **SQLite** - Database tools and CLI
- **Zsh** - Enhanced shell experience
- **Git & GitHub CLI** - Version control tools

## VS Code Extensions

The following extensions are automatically installed:

- ESLint - Code linting
- Prettier - Code formatting
- TypeScript - Enhanced TypeScript support
- Vitest - Test runner integration
- Thunder Client - API testing
- SQLite Viewer - Database inspection
- GitHub Copilot - AI pair programming (if available)

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop)
- [VS Code](https://code.visualstudio.com/)
- [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### Using the Devcontainer

1. **Open in VS Code:**

   ```bash
   code .
   ```

2. **Reopen in Container:**

   - Press `F1` or `Cmd/Ctrl+Shift+P`
   - Type "Dev Containers: Reopen in Container"
   - Select the command and wait for the container to build

3. **Automatic Setup:**
   - Dependencies are installed automatically (`npm install`)
   - Database is seeded with sample data
   - Development server starts on port 3000

### Manual Commands

If you need to run commands manually:

```bash
# Install dependencies
npm install

# Seed the database
npm run db:seed

# Start development server
npm run dev

# Run tests
npm test

# Run tests with UI
npm run test:ui
```

## API Access

Once the container is running, the API is available at:

- **Host:** http://localhost:3000
- **Container:** http://localhost:3000

The port is automatically forwarded from the container to your host machine.

## Database

The SQLite database is stored in the `data/` directory, which is mounted as a volume. This ensures:

- Data persists between container rebuilds
- You can inspect the database from your host machine

To view the database:

- Use the SQLite extension in VS Code
- Or run: `sqlite3 data/tickets.db`

## Customization

### Adding Extensions

Edit `.devcontainer/devcontainer.json` and add extension IDs to the `extensions` array.

### Changing Node Version

Edit `.devcontainer/Dockerfile` and change the base image version.

### Adding Dependencies

The container will automatically run `npm install` on creation, so just update `package.json` and rebuild.

## Troubleshooting

### Container won't start

```bash
# Rebuild container
Cmd/Ctrl+Shift+P -> "Dev Containers: Rebuild Container"
```

### Port already in use

```bash
# Stop any local processes on port 3000
lsof -ti:3000 | xargs kill -9
```

### Clean slate

```bash
# Remove all containers and volumes
docker-compose down -v
# Rebuild from scratch
Cmd/Ctrl+Shift+P -> "Dev Containers: Rebuild Container Without Cache"
```

## Benefits for Interviews

This devcontainer setup is perfect for candidate assessments:

1. **Zero Setup Time** - Candidates can start coding immediately
2. **Consistent Environment** - No "works on my machine" issues
3. **All Tools Included** - Everything needed for the assessment
4. **Professional Setup** - Demonstrates real-world practices
5. **Easy to Share** - Just share the repository

## GitHub Codespaces

This devcontainer configuration is also compatible with [GitHub Codespaces](https://github.com/features/codespaces), allowing candidates to complete the assessment entirely in the browser without any local setup!
