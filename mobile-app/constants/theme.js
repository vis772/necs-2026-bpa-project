// NECS 2026 Design System - Theme Constants

export const Colors = {
  // Background colors
  bgPrimary: '#0a0a0f',
  bgSecondary: '#12121a',
  bgTertiary: '#1a1a24',
  bgElevated: '#222230',
  
  // Text colors
  textPrimary: '#ffffff',
  textSecondary: '#b8b8c8',
  textMuted: '#6b6b7b',
  
  // Accent colors
  accentCyan: '#00f0ff',
  accentMagenta: '#ff00aa',
  accentYellow: '#ffd700',
  accentOrange: '#ff6b35',
  
  // Status colors
  statusLive: '#ef4444',
  statusUpcoming: '#f59e0b',
  statusCompleted: '#22c55e',
  statusPending: '#6b7280',
  
  // Border colors
  borderDefault: '#2a2a3a',
  borderFocused: '#00f0ff',
  
  // Game-specific colors
  gameValorant: '#ff4655',
  gameRocketLeague: '#0080ff',
  gameSmash: '#e60012',
  
  // Gradients (as arrays for linear gradients)
  gradientPrimary: ['#00f0ff', '#ff00aa'],
  gradientDark: ['#0a0a0f', '#1a1a24'],
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
};

export const FontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  '2xl': 22,
  '3xl': 28,
  '4xl': 36,
};

export const BorderRadius = {
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  glow: {
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 12,
  },
};

// Tab bar icon mapping
export const TabIcons = {
  scores: { active: 'podium', inactive: 'podium-outline' },
  stats: { active: 'stats-chart', inactive: 'stats-chart-outline' },
  replays: { active: 'play-circle', inactive: 'play-circle-outline' },
  brackets: { active: 'git-network', inactive: 'git-network-outline' },
  chat: { active: 'chatbubbles', inactive: 'chatbubbles-outline' },
};

export default {
  Colors,
  Spacing,
  FontSizes,
  BorderRadius,
  Shadows,
  TabIcons,
};
