/**
 * RideSure Typography System
 * Source: Stitch "CodeQuest" — "The Fluid Architect"
 * 
 * Headlines: Plus Jakarta Sans (geometric authority)
 * Body/Labels: Manrope (editorial warmth + legibility)
 */

export const typography = {
  fontFamily: {
    headlineBold: 'PlusJakartaSans-Bold',
    headlineSemiBold: 'PlusJakartaSans-SemiBold',
    headlineMedium: 'PlusJakartaSans-Medium',
    bodyRegular: 'Manrope-Regular',
    bodyMedium: 'Manrope-Medium',
    bodySemiBold: 'Manrope-SemiBold',
    bodyBold: 'Manrope-Bold',
    labelMedium: 'Manrope-Medium',
  },
  fontSize: {
    // Display scale
    displayLg: 56,    // 3.5rem — Impactful balances / brand moments
    displayMd: 45,    // 2.8rem
    displaySm: 36,    // 2.25rem

    // Headline scale
    headlineLg: 32,   // 2rem
    headlineMd: 28,   // 1.75rem
    headlineSm: 24,   // 1.5rem — Page titles, primary card headers

    // Title scale
    titleLg: 22,      // 1.375rem
    titleMd: 18,      // 1.125rem — List item headers, sub-sections
    titleSm: 16,      // 1rem

    // Body scale
    bodyLg: 16,       // 1rem — Descriptions, policy text
    bodyMd: 14,       // 0.875rem
    bodySm: 12,       // 0.75rem

    // Label scale
    labelLg: 14,      // 0.875rem
    labelMd: 12,      // 0.75rem — Micro-copy, metadata
    labelSm: 11,      // 0.6875rem
  },
  lineHeight: {
    displayLg: 64,
    displaySm: 44,
    headlineSm: 32,
    titleMd: 24,
    bodyLg: 24,
    bodyMd: 20,
    labelMd: 16,
  },
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1.0,
  },
};
