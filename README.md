# DevTools Installer

A cross-platform development tools installer with native GUI built with Wails (Go + React).

![Version](https://img.shields.io/badge/version-0.1.0--alpha-blue)
![Go](https://img.shields.io/badge/Go-1.21+-00ADD8?logo=go)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Material UI](https://img.shields.io/badge/Material%20UI-5-007FFF?logo=mui)

## Features

- **Cross-platform**: macOS, Linux, Windows support
- **Multiple package managers**: Homebrew, apt, dnf, winget, chocolatey, npm, pip
- **AI Tools focus**: IDEs, CLIs, extensions and local models
- **Version management**: Install and switch between multiple versions
- **Update detection**: Check and apply updates for installed tools

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Wails v2 |
| Backend | Go 1.21+ |
| Frontend | React 18 + TypeScript |
| UI Library | Material UI v5 |
| State | Zustand |
| Build | Vite |

## Development

```bash
# Run in development mode
wails dev

# Build for production
wails build

# Run tests
go test ./...
```

## Project Structure

```
├── app.go                     # Wails bindings for frontend
├── main.go                    # Entry point
├── api/specs/                 # OpenAPI specifications
├── internal/
│   ├── domain/                # Domain models (Tool, Version, Config)
│   ├── installers/            # Package manager wrappers
│   ├── detectors/             # Installed tools detection
│   └── platform/              # OS abstraction layer
├── pkg/
│   └── catalog/               # YAML tool catalog
├── frontend/                  # React + TypeScript UI
│   └── src/
│       ├── components/        # MUI components
│       ├── pages/             # Page components
│       ├── stores/            # Zustand stores
│       └── types/             # TypeScript types
└── docs/
    └── scrum/                 # Project documentation
```

## Tool Catalog (34 tools)

### AI IDEs (5)
Cursor, Windsurf, Zed, Replit, Void

### AI CLIs (5)
Claude Code, Aider, Goose, Gemini CLI, Codex

### AI Extensions (5)
GitHub Copilot, Cline, Continue, Codeium, Cody

### Local Models (5)
Ollama, LM Studio, Jan, GPT4All, LocalAI

### Runtimes (5)
Node.js, Python, Go, Rust, Deno

### DevOps (3)
Docker, kubectl, Terraform

### CLI Tools (4)
git, gh, ripgrep, fd, bat

## Roadmap

### v0.1.0 - Foundation ✅ (Current)
- [x] Catálogo de 34 herramientas
- [x] UI con Material UI (6 páginas)
- [x] Installer package (Homebrew)
- [x] Tests Go

### v0.2.0 - Installation System
- [ ] Winget installer (Windows)
- [ ] Apt/Dnf installer (Linux)
- [ ] Progress bar UI
- [ ] Error handling + rollback

### v0.3.0 - Detection
- [ ] Detección de herramientas instaladas
- [ ] Estado real en Dashboard

### v0.4.0 - Agent Configuration
- [ ] Claude Code config
- [ ] Cursor config
- [ ] Perfiles agénticos

### v0.5.0 - API Keys
- [ ] Keychain storage
- [ ] Multi-provider support

### v1.0.0 - Production Ready
- [ ] CI/CD pipeline
- [ ] Auto-update
- [ ] Full documentation

## Pages

| Page | Description | Status |
|------|-------------|--------|
| Dashboard | Overview with stats | ✅ |
| Catalog | Browse all tools | ✅ |
| Sprints | Sprint management | ✅ |
| Gantt | Project timeline | ✅ |
| Backlog | Product backlog | ✅ |
| Metrics | Project metrics | ✅ |

## Screenshots

Coming soon...

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `go test ./...`
5. Submit a pull request

## License

MIT
