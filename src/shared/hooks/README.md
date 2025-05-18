# Shared Hooks

This directory contains reusable React hooks that are used across multiple features in the application.

## Available Hooks

- `useDebounce`: Debounces a value to prevent excessive updates
- `useLocalStorage`: Persists state to localStorage
- `useMediaQuery`: Responsive design hook for media queries
- `useClickOutside`: Detects clicks outside a referenced element

## Hook Guidelines

1. **Single Responsibility**: Each hook should do one thing well
2. **Documentation**: Include clear documentation with examples
3. **TypeScript**: Use proper TypeScript typing
4. **Testing**: Include tests for all hooks
5. **Performance**: Be mindful of dependencies and memoization

## Creating New Hooks

When creating a new hook:

1. Use the `use` prefix following React conventions
2. Keep the hook focused on a single concern
3. Document parameters, return values, and usage examples
4. Consider edge cases and error handling
