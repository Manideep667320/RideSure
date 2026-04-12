/**
 * RideSure Gradient Definitions
 * Source: Stitch "CodeQuest" — Signature Gradient
 * 
 * "Hero elements and primary CTAs should never be flat."
 * Signature Gradient: secondary → primary at 135° angle
 */

export const gradients = {
  // Signature gradient for primary CTAs
  primary: {
    colors: ['#6a11cb', '#2575fc'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },

  // Subtle gradient for hero sections
  hero: {
    colors: ['#782ad9', '#00347f'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },

  // Success/approved state
  success: {
    colors: ['#0049ad', '#00347f'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  },

  // Surface gradient (very subtle)
  surfaceGlow: {
    colors: ['rgba(106, 17, 203, 0.05)', 'rgba(37, 117, 252, 0.05)'] as const,
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
  },
};
