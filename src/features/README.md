# Features Directory Structure

This directory contains feature-based modules for the CRM application. Each feature is organized in its own directory with a consistent structure.

## Directory Structure

Each feature directory follows this structure:

```
features/
  ├── feature-name/
  │   ├── api/            - API integration for the feature
  │   ├── components/     - UI components specific to this feature
  │   ├── hooks/          - Custom React hooks for the feature
  │   ├── types/          - TypeScript interfaces and types
  │   ├── utils/          - Utility functions
  │   ├── context.tsx     - Feature-specific context (if needed)
  │   └── index.ts        - Public API exports
```

## Guidelines

1. **Encapsulation**: Each feature should be self-contained with minimal dependencies on other features
2. **Public API**: Only export what's needed through the index.ts file
3. **Shared Components**: If a component is used by multiple features, consider moving it to the shared components directory
4. **Documentation**: Each feature should include documentation on its purpose and usage
5. **Testing**: Include tests for critical functionality

## Feature Communication

Features should communicate through well-defined interfaces, typically using:

- Context API for state that spans multiple components
- Custom hooks for shared behavior
- Event-based communication for loose coupling
