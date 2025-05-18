import { ReactNode } from "react";

/**
 * Common props for all components
 */
export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  "data-testid"?: string;
}

/**
 * Props with children
 */
export interface PropsWithChildren extends BaseProps {
  children?: ReactNode;
}

/**
 * Common size variants
 */
export type SizeVariant = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Common color variants
 */
export type ColorVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

/**
 * Common variant types
 */
export type VariantType = "default" | "outline" | "ghost" | "link" | "solid";

/**
 * Common position types
 */
export type Position = "top" | "right" | "bottom" | "left";

/**
 * Common alignment types
 */
export type Alignment = "start" | "center" | "end";

/**
 * Common orientation types
 */
export type Orientation = "horizontal" | "vertical";

/**
 * Toast notification props
 */
export interface ToastProps extends BaseProps {
  title?: string;
  description?: string;
  type?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
  action?: ReactNode;
}

/**
 * Modal/Dialog props
 */
export interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

/**
 * Form field props
 */
export interface FormFieldProps extends BaseProps {
  name: string;
  label?: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}

/**
 * Table column definition
 */
export interface TableColumn<T = any> {
  id: string;
  header: string | ReactNode;
  accessor: keyof T | ((row: T) => any);
  cell?: (value: any, row: T) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  align?: "left" | "center" | "right";
}
