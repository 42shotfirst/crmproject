# Shared Constants

This directory contains application-wide constants that are used across multiple features.

## Available Constants

- `routes.ts`: Application route paths
- `api.ts`: API endpoints and configuration
- `ui.ts`: UI-related constants like breakpoints, animations, etc.
- `dates.ts`: Date formats and related constants

## Constants Guidelines

1. **Naming**: Use UPPER_SNAKE_CASE for constant values
2. **Organization**: Group related constants in appropriate files
3. **Documentation**: Include comments explaining the purpose of constants
4. **TypeScript**: Use proper TypeScript typing

## Creating New Constants

When creating new constants:

1. Determine if they belong in an existing file or need a new one
2. Follow the established naming conventions
3. Include proper documentation
4. Consider using TypeScript enums or const objects for related constants
