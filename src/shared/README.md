# Shared Directory

This directory contains shared utilities, components, and hooks that are used across multiple features in the application.

## Directory Structure

```
shared/
  ├── components/     - Reusable UI components
  ├── hooks/          - Custom React hooks
  ├── types/          - Common TypeScript interfaces and types
  ├── utils/          - Utility functions
  └── constants/      - Application-wide constants
```

## Guidelines

1. **Reusability**: Components in this directory should be generic and reusable
2. **Minimal Dependencies**: Avoid dependencies on specific features
3. **Documentation**: Document props, usage examples, and any complex behavior
4. **Testing**: Include tests for all shared components

## When to Add to Shared vs. Features

- Add to `shared` when:
  - The component/utility is used by multiple features
  - The functionality is generic and not tied to business logic
  - It represents a UI pattern used throughout the app

- Keep in `features` when:
  - The component is specific to a single feature
  - The component contains business logic specific to a feature
  - The component is unlikely to be reused elsewhere
