/**
 * RideSure Design System Colors
 * Source: Stitch "CodeQuest" Project — "The Fluid Architect" Design System
 * 
 * Palette: Deep cobalt + vibrant violet, anchored by warm neutrals.
 * Rule: No 1px borders. Define boundaries through background color shifts.
 */

export const colors = {
  // ─── Primary Palette ───────────────────────────────────
  primary: '#00347f',
  primaryContainer: '#0049ad',
  onPrimary: '#ffffff',
  onPrimaryContainer: '#a8c0ff',
  primaryFixed: '#d9e2ff',
  primaryFixedDim: '#b0c6ff',
  onPrimaryFixed: '#001945',
  onPrimaryFixedVariant: '#00419c',

  // ─── Secondary Palette ─────────────────────────────────
  secondary: '#782ad9',
  secondaryContainer: '#924bf3',
  onSecondary: '#ffffff',
  onSecondaryContainer: '#fffbff',
  secondaryFixed: '#eddcff',
  secondaryFixedDim: '#d7baff',
  onSecondaryFixed: '#280056',
  onSecondaryFixedVariant: '#6100be',

  // ─── Tertiary Palette ──────────────────────────────────
  tertiary: '#5f2800',
  tertiaryContainer: '#823a00',
  onTertiary: '#ffffff',
  onTertiaryContainer: '#ffae7f',
  tertiaryFixed: '#ffdbc9',
  tertiaryFixedDim: '#ffb68c',
  onTertiaryFixed: '#321200',
  onTertiaryFixedVariant: '#753400',

  // ─── Surface / Neutral Palette ─────────────────────────
  background: '#f8f9fa',
  surface: '#f8f9fa',
  surfaceBright: '#f8f9fa',
  surfaceDim: '#d9dadb',
  surfaceContainer: '#edeeef',
  surfaceContainerHigh: '#e7e8e9',
  surfaceContainerHighest: '#e1e3e4',
  surfaceContainerLow: '#f3f4f5',
  surfaceContainerLowest: '#ffffff',
  surfaceVariant: '#e1e3e4',
  surfaceTint: '#0058cc',

  // ─── On-Surface ────────────────────────────────────────
  onBackground: '#191c1d',
  onSurface: '#191c1d',
  onSurfaceVariant: '#4b4454',

  // ─── Outline ───────────────────────────────────────────
  outline: '#7c7486',
  outlineVariant: '#cdc2d7',

  // ─── Error ─────────────────────────────────────────────
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onError: '#ffffff',
  onErrorContainer: '#93000a',

  // ─── Inverse ───────────────────────────────────────────
  inverseSurface: '#2e3132',
  inverseOnSurface: '#f0f1f2',
  inversePrimary: '#b0c6ff',

  // ─── Override Colors (Gradient endpoints) ──────────────
  gradientStart: '#6a11cb',   // overrideSecondaryColor
  gradientEnd: '#2575fc',     // overridePrimaryColor
  neutralOverride: '#f9fafb', // overrideNeutralColor

  // ─── Semantic Aliases ──────────────────────────────────
  success: '#0049ad',         // Using primaryContainer for success
  successContainer: '#d9e2ff',
  warning: '#823a00',         // tertiaryContainer
  warningContainer: '#ffdbc9',

  // ─── Text Convenience Aliases ──────────────────────────
  text: {
    primary: '#191c1d',
    secondary: '#4b4454',
    muted: '#7c7486',
    inverse: '#ffffff',
    accent: '#00347f',
    link: '#0058cc',
  },
};
