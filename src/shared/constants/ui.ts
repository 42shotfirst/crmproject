/**
 * Breakpoints for responsive design
 */
export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Z-index values for consistent layering
 */
export const Z_INDEX = {
  background: -1,
  default: 1,
  dropdown: 1000,
  sticky: 1100,
  fixed: 1200,
  modalBackdrop: 1300,
  modal: 1400,
  popover: 1500,
  tooltip: 1600,
  toast: 1700,
};

/**
 * Animation durations in milliseconds
 */
export const ANIMATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};

/**
 * Common spacing values (in pixels or rem)
 */
export const SPACING = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.5rem",
  xl: "2rem",
  "2xl": "3rem",
  "3xl": "4rem",
};

/**
 * Common border radius values
 */
export const BORDER_RADIUS = {
  none: "0",
  sm: "0.125rem",
  md: "0.25rem",
  lg: "0.5rem",
  xl: "1rem",
  full: "9999px",
};

/**
 * Maximum width constraints
 */
export const MAX_WIDTH = {
  xs: "20rem", // 320px
  sm: "24rem", // 384px
  md: "28rem", // 448px
  lg: "32rem", // 512px
  xl: "36rem", // 576px
  "2xl": "42rem", // 672px
  "3xl": "48rem", // 768px
  "4xl": "56rem", // 896px
  "5xl": "64rem", // 1024px
  "6xl": "72rem", // 1152px
  "7xl": "80rem", // 1280px
  full: "100%",
};
