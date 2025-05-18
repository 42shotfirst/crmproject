# Shared Utilities

This directory contains utility functions that are used across multiple features in the application.

## Available Utilities

- `formatters.ts`: Functions for formatting dates, currency, numbers, etc.
- `validation.ts`: Common validation functions
- `api.ts`: API utility functions and error handling
- `storage.ts`: Local storage and session storage utilities

## Utility Guidelines

1. **Pure Functions**: Utilities should be pure functions when possible
2. **TypeScript**: Use proper TypeScript typing
3. **Documentation**: Include JSDoc comments with examples
4. **Testing**: Include tests for all utilities
5. **Organization**: Group related utilities in appropriate files

## Creating New Utilities

When creating a new utility:

1. Determine if it belongs in an existing file or needs a new one
2. Follow the established naming conventions
3. Include proper documentation with examples
4. Consider edge cases and error handling
