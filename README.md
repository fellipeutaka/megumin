# Megumin

This repository contains the `sileo` toast package and a small browser example
for testing its UI and animations.

## Workspaces

- `packages/sileo` — the publishable Sileo package.
- `apps/example` — the original Sileo Next.js site, adapted to exercise the Base UI-powered toast API.

## Development

```bash
bun install
bun run dev
```

The example is served at [http://localhost:3000](http://localhost:3000). It includes
the original light/dark palette, interactive demos, and documentation pages.

Use these commands for production checks:

```bash
bun run typecheck
bun run build
```

See [`packages/sileo/README.md`](./packages/sileo/README.md) for the library
API and usage details.
