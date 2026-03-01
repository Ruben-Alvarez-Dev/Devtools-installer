# DevTools Installer

A cross-platform development tools installer with native GUI built with Wails (Go + React).

## Features

- **Cross-platform**: macOS, Linux, Windows support
- **Multiple package managers**: Homebrew, apt, dnf, winget, chocolatey
- **Tool categories**: Runtimes, IDEs, DevOps/Cloud, CLI Tools
- **Version management**: Install and switch between multiple versions
- **Update detection**: Check and apply updates for installed tools

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Wails v2 |
| Backend | Go 1.21+ |
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS v4 |
| State | Zustand |

## Development

```bash
# Run in development mode
wails dev

# Build for production
wails build
```

## Project Structure

```
├── app.go                  # Wails bindings for frontend
├── main.go                 # Entry point
├── internal/
│   ├── domain/             # Domain models (Tool, Version, Config)
│   ├── services/           # Application logic
│   ├── installers/         # Package manager wrappers
│   ├── detectors/          # Installed tools detection
│   └── platform/           # OS abstraction layer
├── pkg/
│   ├── catalog/            # YAML tool catalog
│   └── versioning/         # Version resolution
└── frontend/               # React + TypeScript UI
```

## Supported Tools

### Runtimes
- Node.js, Python, Go, Rust, Deno

### IDEs
- Visual Studio Code, Cursor

### DevOps/Cloud
- Docker, kubectl, Terraform

### CLI Tools
- Git, GitHub CLI, ripgrep, fd, bat

## License

MIT
