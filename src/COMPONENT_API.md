# Component API Documentation

## Overview

This document provides documentation for the key components in the CRM application. It includes information about props, usage examples, and best practices.

## Core Components

### Dashboard Components

#### `<Sidebar />`

**Description**: Main navigation sidebar for the application.

**Props**:
```typescript
interface SidebarProps {
  className?: string;
  collapsed?: boolean;
  onToggle?: () => void;
}
```

**Usage**:
```jsx
<Sidebar collapsed={isMobile} onToggle={() => setIsMobile(!isMobile)} />
```

**Notes**:
- Responsive design that collapses on mobile
- Supports custom navigation items
- Includes user profile section

#### `<DashboardLayout />`

**Description**: Main layout component for dashboard pages.

**Props**:
```typescript
interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  actions?: React.ReactNode;
  sidebar?: boolean;
}
```

**Usage**:
```jsx
<DashboardLayout title="Dashboard" actions={<Button>New Item</Button>}>
  <DashboardContent />
</DashboardLayout>
```

**Notes**:
- Includes the sidebar, header, and main content area
- Handles responsive layout adjustments
- Manages sidebar state

### Contact Components

#### `<ContactForm />`

**Description**: Form for creating and editing contacts.

**Props**:
```typescript
interface ContactFormProps {
  contact?: Contact;
  onSubmit: (data: ContactFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}
```

**Usage**:
```jsx
<ContactForm 
  contact={selectedContact}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  isLoading={isSubmitting}
/>
```

**Notes**:
- Handles both create and edit modes
- Supports custom fields
- Includes validation

#### `<CsvImportExport />`

**Description**: Component for importing and exporting contacts via CSV.

**Props**:
```typescript
interface CsvImportExportProps {
  onImport: (data: Contact[]) => void;
  onExport: () => void;
  isImporting?: boolean;
  isExporting?: boolean;
}
```

**Usage**:
```jsx
<CsvImportExport 
  onImport={handleImport}
  onExport={handleExport}
  isImporting={isImporting}
  isExporting={isExporting}
/>
```

**Notes**:
- Handles file validation
- Supports mapping fields
- Provides progress feedback

### Report Components

#### `<ReportsDashboard />`

**Description**: Dashboard for viewing and managing reports.

**Props**:
```typescript
interface ReportsDashboardProps {
  reports?: Record<string, ReportData>;
  onExport?: (format: 'csv' | 'pdf', reportType: string) => void;
}
```

**Usage**:
```jsx
<ReportsDashboard 
  reports={reportsData}
  onExport={handleExport}
/>
```

**Notes**:
- Displays multiple report types in tabs
- Supports exporting in different formats
- Includes customization options

## Shared Components

### UI Components

#### `<Card />`

**Description**: Container component for content sections.

**Props**:
```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
```

**Usage**:
```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
```

#### `<Button />`

**Description**: Button component with various styles and states.

**Props**:
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
}
```

**Usage**:
```jsx
<Button variant="outline" size="sm" onClick={handleClick}>
  Click Me
</Button>
```

#### `<Tabs />`

**Description**: Tabbed interface component.

**Props**:
```typescript
interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}
```

**Usage**:
```jsx
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

## Best Practices

### Component Design

1. **Single Responsibility**: Each component should do one thing well
2. **Composability**: Design components that can be combined in various ways
3. **Prop Drilling**: Avoid excessive prop drilling by using context or composition
4. **Default Props**: Provide sensible defaults for optional props
5. **Error Handling**: Include error states and fallbacks

### Accessibility

1. **Semantic HTML**: Use appropriate HTML elements
2. **ARIA Attributes**: Add ARIA attributes when necessary
3. **Keyboard Navigation**: Ensure components are keyboard accessible
4. **Focus Management**: Handle focus appropriately, especially in modals
5. **Color Contrast**: Ensure sufficient contrast for text and UI elements

### Performance

1. **Memoization**: Use React.memo for expensive components
2. **Lazy Loading**: Defer loading of non-critical components
3. **Virtualization**: Use virtualization for long lists
4. **Optimized Renders**: Minimize unnecessary re-renders
5. **Bundle Size**: Keep an eye on component bundle size

### Testing

1. **Unit Tests**: Test component rendering and behavior
2. **Interaction Tests**: Test user interactions
3. **Snapshot Tests**: Capture component output for regression testing
4. **Accessibility Tests**: Verify accessibility compliance
5. **Visual Tests**: Ensure visual consistency
