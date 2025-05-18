# Shared Components

This directory contains reusable UI components that are used across multiple features in the application.

## Component Documentation

Each component should include:

1. **PropTypes/TypeScript Interface**: Clear definition of props
2. **Usage Examples**: Simple examples of how to use the component
3. **Variants/States**: Documentation of different states or variants

## Component Guidelines

1. **Composition over Configuration**: Prefer component composition over complex prop configurations
2. **Accessibility**: Ensure all components meet WCAG 2.1 AA standards
3. **Responsive Design**: Components should work across different screen sizes
4. **Performance**: Be mindful of re-renders and expensive operations
5. **Testing**: Include unit tests for all components

## Directory Structure

Components are organized by category:

```
components/
  ├── data-display/      - Tables, lists, cards for displaying data
  ├── feedback/          - Alerts, notifications, progress indicators
  ├── inputs/            - Form controls and input components
  ├── layout/            - Layout components like grids, containers
  ├── navigation/        - Menus, tabs, breadcrumbs
  └── overlays/          - Modals, popovers, tooltips
```

## Adding New Components

When adding a new component:

1. Determine if it belongs in a feature or shared directory
2. Follow the established naming conventions
3. Include proper documentation
4. Consider creating a story for the component
