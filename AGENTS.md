# Nooler Client Agent Guide

Use this file for frontend-specific instructions.

## Planned Stack

- React
- TypeScript
- Tailwind CSS
- TanStack Query
- shadcn/ui, if selected during implementation

## Expected Structure

```txt
src/
  app/
  components/
  features/
  lib/
  services/
```

## Rules

- Prefer TypeScript throughout the client.
- Keep API calls in a dedicated service/query layer.
- Use TanStack Query for server state, caching, and request lifecycle management.
- Keep reusable UI in `components/`.
- Keep workflow-specific code in `features/`.
- Avoid putting server state directly in deeply nested components.
- Use accessible controls and predictable interaction patterns.
- Design for daily productivity rather than a marketing landing page.

## UI Direction

Nooler should feel calm, fast, and work-focused. Prioritize:

- Clear navigation.
- Dense but readable information.
- Responsive layouts.
- Keyboard-friendly workflows where useful.
- Reusable components over one-off UI.

## Environment

Environment files should be created only when the client app is initialized. Do not commit secrets.
