# Nooler Client

Frontend web application for Nooler.

## Purpose

This app will provide the user-facing workspace for:

- Chat and conversation workflows
- Tool interactions
- Automation management
- Integration setup
- Account and workspace settings

## Planned Stack

- React
- TypeScript
- Tailwind CSS
- TanStack Query
- shadcn/ui, if selected during implementation

## Architecture

The client will use a feature-based structure:

```txt
src/
  app/
  components/
  features/
  lib/
  services/
```

Feature code should stay close to the workflow it supports. Shared UI belongs in `components/`, and API access belongs in `services/`.

## Status

Initial repository setup.
