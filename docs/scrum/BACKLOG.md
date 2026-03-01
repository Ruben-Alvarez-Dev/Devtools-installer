# Product Backlog - DevTools Installer

## Visión del Producto

**DevTools Installer** es un instalador universal y scaffolding de herramientas de desarrollo que permite:
1. **Instalar** herramientas de desarrollo (CLIs, IDEs, runtimes, frameworks, etc.)
2. **Configurar** perfiles agénticos de IA (Claude Code, Cursor, Goose, etc.)
3. **Gestionar** API keys y proveedores LLM de forma segura
4. **Sincronizar** configuraciones entre máquinas

---

## Estado del Proyecto

**Última actualización:** 2026-03-01
**Versión:** 0.1.0-alpha
**Commits totales:** 9

### ✅ Completado

| Componente | Estado | Commits |
|------------|--------|---------|
| Catálogo 34 herramientas | Done | e2b2c86, 24f9992, 457ffb7 |
| Material UI migration | Done | d757506, 56949ed, 71311e6 |
| Páginas (6) | Done | e96a880, 49fd0d2, 0a221aa |
| Installer package | Done | de1d918 |
| Tests Go | Done | All passing |

---

## Epics

### Epic 1: Catálogo Universal de Herramientas ✅ DONE
**Descripción:** Catálogo completo de herramientas de desarrollo organizadas por categorías
**Valor:** Usuario puede instalar cualquier herramienta desde una sola app

| ID | Story | Puntos | Estado |
|----|-------|--------|--------|
| 1.1 | Catálogo de IDEs con IA (Cursor, Windsurf, Zed, Replit, Void) | 5 | ✅ Done |
| 1.2 | Catálogo de CLIs de IA (Claude Code, Aider, Goose, Gemini CLI, Codex) | 5 | ✅ Done |
| 1.3 | Catálogo de Extensiones VS Code (Copilot, Cline, Continue, Codeium, Cody) | 5 | ✅ Done |
| 1.4 | Catálogo de Modelos Locales (Ollama, LM Studio, Jan, GPT4All, LocalAI) | 5 | ✅ Done |
| 1.5 | Catálogo de Runtimes (Node, Python, Go, Rust, Deno) | 3 | ✅ Done |
| 1.6 | Catálogo de Herramientas DevOps (Docker, kubectl, Terraform) | 3 | ✅ Done |
| 1.7 | Catálogo de CLIs clásicos (git, gh, ripgrep, fd, bat) | 3 | ✅ Done |

**Total herramientas:** 34

---

### Epic 2: Sistema de Instalación Multi-Plataforma 🔄 IN PROGRESS
**Descripción:** Motor de instalación que funciona en macOS, Linux y Windows
**Valor:** Usuario puede instalar herramientas independientemente de su OS

| ID | Story | Puntos | Estado |
|----|-------|--------|--------|
| 2.1 | Instalación via Homebrew (macOS/Linux) | 5 | ✅ Done |
| 2.2 | Instalación via Homebrew Cask | 3 | ✅ Done |
| 2.3 | Instalación via Winget (Windows) | 5 | ❌ Todo |
| 2.4 | Instalación via Apt/Dnf (Linux) | 3 | ❌ Todo |
| 2.5 | Instalación via Script directo | 3 | ❌ Todo |
| 2.6 | Instalación via Descarga directa | 5 | ❌ Todo |
| 2.7 | Instalación via NPM/Pip/Cargo | 3 | ❌ Todo |
| 2.8 | Detección automática de plataforma | 2 | ✅ Done |
| 2.9 | Barra de progreso de instalación | 3 | ❌ Todo |
| 2.10 | Rollback en caso de error | 5 | ❌ Todo |

---

### Epic 3: Configuración Agéntica ❌ TODO
**Descripción:** Sistema para configurar perfiles de agentes de IA
**Valor:** Usuario puede configurar Claude Code, Cursor, etc. desde la app
**Prioridad:** Alta

| ID | Story | Puntos | Estado |
|----|-------|--------|--------|
| 3.1 | Configuración de Claude Code (CLAUDE.md, settings.json) | 8 | ❌ Todo |
| 3.2 | Configuración de Cursor (.cursorrules, settings) | 5 | ❌ Todo |
| 3.3 | Configuración de Goose (config.yaml) | 5 | ❌ Todo |
| 3.4 | Configuración de Aider (.aider.conf.yml) | 5 | ❌ Todo |
| 3.5 | Configuración de Ollama (modelfile, keep-alive) | 5 | ❌ Todo |
| 3.6 | Sistema de perfiles agénticos (work, personal, etc.) | 8 | ❌ Todo |
| 3.7 | Templates de configuración por tipo de proyecto | 5 | ❌ Todo |

---

### Epic 4: Gestión de API Keys y Proveedores ❌ TODO
**Descripción:** Sistema seguro para gestionar API keys de múltiples proveedores LLM
**Valor:** Usuario puede configurar y rotar API keys de forma segura
**Prioridad:** Alta

| ID | Story | Puntos | Estado |
|----|-------|--------|--------|
| 4.1 | Almacenamiento seguro de API keys (Keychain/Credential Manager) | 8 | ❌ Todo |
| 4.2 | Soporte para Anthropic API | 3 | ❌ Todo |
| 4.3 | Soporte para OpenAI API | 3 | ❌ Todo |
| 4.4 | Soporte para Google AI (Gemini) | 3 | ❌ Todo |
| 4.5 | Soporte para Azure OpenAI | 3 | ❌ Todo |
| 4.6 | Soporte para proveedores locales (Ollama, LM Studio) | 3 | ❌ Todo |
| 4.7 | Rotación automática de keys | 5 | ❌ Todo |
| 4.8 | Validación de keys activas | 3 | ❌ Todo |

---

### Epic 5: Sistema de Skills y Workflows ❌ TODO
**Descripción:** Configuración de skills, recipes y workflows para agentes
**Valor:** Usuario puede personalizar el comportamiento de sus agentes
**Prioridad:** Media

| ID | Story | Puntos | Estado |
|----|-------|--------|--------|
| 5.1 | Importar skills desde marketplace | 5 | ❌ Todo |
| 5.2 | Crear skills personalizados | 8 | ❌ Todo |
| 5.3 | Configurar hooks (pre-tool, post-tool) | 5 | ❌ Todo |
| 5.4 | Templates de workflows comunes | 5 | ❌ Todo |
| 5.5 | Sistema de normas (contexto, generales) | 5 | ❌ Todo |

---

### Epic 6: UI/UX 🔄 IN PROGRESS
**Descripción:** Interfaz de usuario moderna y accesible
**Valor:** Usuario tiene una experiencia agradable

| ID | Story | Puntos | Estado |
|----|-------|--------|--------|
| 6.1 | Dashboard con estado de herramientas | 5 | ✅ Done |
| 6.2 | Catálogo navegable por categorías | 5 | ✅ Done |
| 6.3 | Vista de detalles de herramienta | 3 | ✅ Done |
| 6.4 | Búsqueda y filtros | 3 | 🔄 Partial |
| 6.5 | Tema claro/oscuro | 2 | ❌ Todo |
| 6.6 | Notificaciones de actualizaciones | 3 | ❌ Todo |
| 6.7 | Página de Sprints | 5 | ✅ Done |
| 6.8 | Gráfico Gantt | 5 | ✅ Done |
| 6.9 | Página de Backlog | 5 | ✅ Done |
| 6.10 | Página de Métricas | 5 | ✅ Done |

---

### Epic 7: Detección de Herramientas Instaladas ❌ TODO
**Descripción:** Sistema para detectar qué herramientas ya están instaladas
**Valor:** Usuario ve el estado real de su sistema

| ID | Story | Puntos | Estado |
|----|-------|--------|--------|
| 7.1 | Detección de herramientas via PATH | 3 | ❌ Todo |
| 7.2 | Detección de versiones instaladas | 5 | ❌ Todo |
| 7.3 | Detección de aplicaciones macOS | 3 | ❌ Todo |
| 7.4 | Detección de programas Windows | 3 | ❌ Todo |
| 7.5 | Cache de detección | 2 | ❌ Todo |

---

## Roadmap

### v0.1.0 - Foundation (Actual)
- [x] Catálogo de 34 herramientas
- [x] UI con Material UI
- [x] 6 páginas funcionales
- [x] Installer package base (Homebrew)
- [x] Tests Go

### v0.2.0 - Installation System
- [ ] Winget installer (Windows)
- [ ] Apt/Dnf installer (Linux)
- [ ] Script installer
- [ ] Progress bar UI
- [ ] Error handling + rollback

### v0.3.0 - Detection
- [ ] Detección de herramientas instaladas
- [ ] Detección de versiones
- [ ] Estado real en Dashboard

### v0.4.0 - Agent Configuration
- [ ] Claude Code config
- [ ] Cursor config
- [ ] Perfiles agénticos

### v0.5.0 - API Keys
- [ ] Keychain storage
- [ ] Multi-provider support
- [ ] Key validation

### v1.0.0 - Production Ready
- [ ] All features complete
- [ ] CI/CD pipeline
- [ ] Auto-update
- [ ] Documentation

---

## Definition of Done (DoD)

- [x] Código revisado
- [x] Tests unitarios pasando
- [ ] Tests de integración pasando
- [ ] Documentación actualizada
- [x] Sin warnings de linter
- [ ] Build exitoso
- [ ] Demo funcional

---

## Definition of Ready (DoR)

- [ ] Historia de usuario escrita
- [ ] Criterios de aceptación definidos
- [ ] Dependencias identificadas
- [ ] Estimada en story points
- [ ] Priorizada en el backlog

---

## Changelog

### 2026-03-01
- **9 commits** realizados
- Catálogo expandido de 14 a 34 herramientas
- Migración completa a Material UI
- Añadidas páginas: Sprints, Gantt, Backlog, Metrics
- Tool Detail modal
- Installer package con Homebrew support
- Todos los tests pasando
