/**
 * RideSure Shadow System
 * Source: Stitch "CodeQuest" — "The Fluid Architect"
 * 
 * "Depth is a functional tool, not a decoration."
 * Use Tonal Layering first. Shadows are secondary.
 * Ambient Shadows: Y:12px, Blur:32px, Color: onSurface 8% opacity
 */

import { Platform } from 'react-native';

export const shadows = {
  // No shadow — use tonal layering instead
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  // Subtle lift — for cards that need just a hint of float
  sm: {
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },

  // Ambient shadow — for floating elements per design system spec
  md: {
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 32,
    elevation: 4,
  },

  // Strong float — for sticky CTAs, modals
  lg: {
    shadowColor: '#191c1d',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 48,
    elevation: 8,
  },

  // Primary-tinted shadow — for branded elevation
  primaryTinted: {
    shadowColor: '#00347f',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 6,
  },
};
