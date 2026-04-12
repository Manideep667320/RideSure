/**
 * RideSure Spacing System
 * Source: Stitch "CodeQuest" — Spacing Scale 3 (generous)
 * 
 * Generous spacing creates "Asymmetric Breathing Room" —
 * the hallmark of the Fluid Architect design system.
 */

export const spacing = {
  // Base scale
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 56,
  '7xl': 64,

  // Semantic spacing
  screenPadding: 24,       // Exterior page margins
  cardPadding: 24,         // 1.5rem internal card padding
  sectionGap: 24,          // 1.5rem between sections (no dividers)
  itemGap: 16,             // Gap between list items
  compactGap: 12,          // Tight spacing within components
  buttonPaddingV: 16,      // 1rem vertical button padding
  buttonPaddingH: 32,      // 2rem horizontal button padding
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,        // ROUND_EIGHT — design system default
  lg: 12,
  xl: 16,
  '2xl': 24,    // 1.5rem — Primary cards
  full: 9999,   // Pills
};
